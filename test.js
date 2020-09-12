const { default: pluginTester } = require("babel-plugin-tester");
const { default: plugin } = require("./index");

pluginTester({
  plugin: plugin,
  babelOptions: {
    plugins: ["@babel/plugin-syntax-top-level-await"],
  },
  tests: [
    {
      title: "dynamic import with static global path",
      code: 'import("test");',
      output: 'import "test";',
    },
    {
      title: "dynamic import with static local path",
      code: 'import("./test");',
      output: 'import "./test";',
    },
    {
      title: "dynamic import with dynamic path, cannot be made static",
      code: "import(`${tooDynamic}`);",
      output: "import(`${tooDynamic}`);",
    },
    {
      title: "awaited dynamic import with global path",
      code: 'await import("test");',
      output: 'import "test";',
    },
    {
      title: "awaited dynamic import with local path",
      code: 'await import("./test");',
      output: 'import "./test";',
    },
    {
      title: "awaited dynamic import with dynamic path, cannot be made static",
      code: "await import(`${tooDynamic}`);",
      output: "await import(`${tooDynamic}`);",
    },
    {
      title: "dynamic import chained with then",
      code: 'import("test").then(doSomething);',
      output:
        'import * as $$0 from "test";\nPromise.resolve($$0).then(doSomething);',
    },
    {
      title: "dynamic import chained with catch",
      code: 'import("test").catch(doSomething);',
      output:
        'import * as $$1 from "test";\nPromise.resolve($$1).catch(doSomething);',
    },
    {
      title: "dynamic import chained with finally",
      code: 'import("test").finally(doSomething);',
      output:
        'import * as $$2 from "test";\nPromise.resolve($$2).finally(doSomething);',
    },
    {
      title: "awaited dynamic import chained with then",
      code: 'await import("test").then(doSomething);',
      output:
        'import * as $$3 from "test";\nawait Promise.resolve($$3).then(doSomething);',
    },
    {
      title: "awaited dynamic import chained with catch",
      code: 'await import("test").catch(doSomething);',
      output:
        'import * as $$4 from "test";\nawait Promise.resolve($$4).catch(doSomething);',
    },
    {
      title: "awaited dynamic import chained with finally",
      code: 'await import("test").finally(doSomething);',
      output:
        'import * as $$5 from "test";\nawait Promise.resolve($$5).finally(doSomething);',
    },
    {
      title: "dynamic import in arrow function",
      code: '() => import("test");',
      output: 'import * as $$6 from "test";\n\n() => Promise.resolve($$6);',
    },
    {
      title: "awaited dynamic import in arrow function",
      code: 'async () => await import("test");',
      output:
        'import * as $$7 from "test";\n\nasync () => await Promise.resolve($$7);',
    },
    {
      title: "dynamic import assigned to var",
      code: 'var test = import("test");',
      output:
        'import * as $$8 from "test";\nvar test = Promise.resolve($$8);',
    },
    {
      title: "dynamic import assigned to let",
      code: 'let test = import("test");',
      output:
        'import * as $$9 from "test";\nlet test = Promise.resolve($$9);',
    },
    {
      title: "dynamic import assigned to const",
      code: 'const test = import("test");',
      output:
        'import * as $$10 from "test";\nconst test = Promise.resolve($$10);',
    },
    {
      title: "awaited dynamic import assigned to var",
      code: 'var test = await import("test");',
      output:
        'import * as $$11 from "test";\nvar test = await Promise.resolve($$11);',
    },
    {
      title: "awaited dynamic import assigned to let",
      code: 'let test = await import("test");',
      output:
        'import * as $$12 from "test";\nlet test = await Promise.resolve($$12);',
    },
    {
      title: "awaited dynamic import assigned to const",
      code: 'const test = await import("test");',
      output:
        'import * as $$13 from "test";\nconst test = await Promise.resolve($$13);',
    },
  ],
});
