let counter = 0;

function babelTransformDynamicImportsToStaticImports({ types: t }) {
  return {
    name: "transform-dynamic-imports-to-static-imports",
    visitor: {
      Import(path) {
        // ignore non-static paths
        // for example import(`${dynamicPath}`)
        if (!t.isStringLiteral(path.parent.arguments[0])) return;

        // path from `import(path)`
        const importPath = path.parent.arguments[0];

        const wrappingPath = path.parentPath.parentPath;

        // `import("path")` and `await import("path")`
        const isErasableImport =
          wrappingPath.isExpressionStatement() ||
          (wrappingPath.isAwaitExpression() &&
            wrappingPath.parentPath.isExpressionStatement());

        // these imports can be added to the top of the file
        // and removed from their current location
        if (isErasableImport) {
          // generate static import
          // import "path"
          const staticImport = t.importDeclaration([], importPath);

          // add to beginning of program
          path
            .findParent((path) => path.isProgram())
            .node.body.unshift(staticImport);

          // remove the wrapping expression
          path.parentPath.parentPath.remove();
          return;
        }

        // generate an identifier for the import
        // for example `import * as $$0 from 'path'`
        const importIdentifier = `\$\$${counter}`;

        // generate static import expression
        const staticImport = t.importDeclaration(
          [t.importNamespaceSpecifier(t.identifier(importIdentifier))],
          importPath
        );

        // add to beginning of program
        path
          .findParent((path) => path.isProgram())
          .node.body.unshift(staticImport);
        // replace `import("module-name")`
        // with `Promise.resolve($$0)`
        path.parentPath.replaceWith(
          t.callExpression(
            t.memberExpression(
              t.identifier("Promise"),
              t.identifier("resolve")
            ),
            [t.identifier(importIdentifier)]
          )
        );
        counter++;
        return;
      },
    },
  };
}

module.exports = babelTransformDynamicImportsToStaticImports;
module.exports.default = babelTransformDynamicImportsToStaticImports;
