const { default: pluginTester } = require("babel-plugin-tester");
const { default: plugin } = require("./index");

pluginTester({
  plugin: plugin,
  babelOptions: {
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-top-level-await",
    ],
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
      output: 'import * as $$0 from "test";\nPromise.resolve($$0).then(doSomething);',
    },
    {
      title: "dynamic import chained with catch",
      code: 'import("test").catch(doSomething);',
      output: 'import * as $$1 from "test";\nPromise.resolve($$1).catch(doSomething);',
    },
    {
      title: "dynamic import chained with finally",
      code: 'import("test").finally(doSomething);',
      output: 'import * as $$2 from "test";\nPromise.resolve($$2).finally(doSomething);',
    },
    {
      title: "awaited dynamic import chained with then",
      code: 'await import("test").then(doSomething);',
      output: 'import * as $$3 from "test";\nawait Promise.resolve($$3).then(doSomething);',
    },
    {
      title: "awaited dynamic import chained with catch",
      code: 'await import("test").catch(doSomething);',
      output: 'import * as $$4 from "test";\nawait Promise.resolve($$4).catch(doSomething);',
    },
    {
      title: "awaited dynamic import chained with finally",
      code: 'await import("test").finally(doSomething);',
      output: 'import * as $$5 from "test";\nawait Promise.resolve($$5).finally(doSomething);',
    },
  ],
});
