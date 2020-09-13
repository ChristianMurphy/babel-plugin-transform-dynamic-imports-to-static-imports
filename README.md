# babel-plugin-transform-dynamic-imports-to-static-imports

[![npm](https://img.shields.io/npm/v/babel-plugin-transform-dynamic-imports-to-static-imports.svg)](https://www.npmjs.com/package/babel-plugin-transform-dynamic-imports-to-static-imports)
[![build](https://github.com/ChristianMurphy/babel-plugin-transform-dynamic-imports-to-static-imports/workflows/build/badge.svg?branch=main)](https://github.com/ChristianMurphy/babel-plugin-transform-dynamic-imports-to-static-imports/actions?query=branch%3Amain)

> A transform to translate dynamic imports to static imports

## Installation:

```shell
npm install babel-plugin-transform-dynamic-imports-to-static-imports
```

## Usage:

with configuration file:

```json
{
  "plugins": ["babel-plugin-transform-dynamic-imports-to-static-imports"]
}
```

Via CLI

```shell
babel --plugins babel-plugin-transform-dynamic-imports-to-static-imports script.js
```

via node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["babel-plugin-transform-dynamic-imports-to-static-imports"],
});
```

## Example of Transform

input:

```javascript
import * as zero from "./zero";
import "./one";

async function test() {
  import("./two");
  await import("./three");
  import("./four")
    .then((test) => {
      /* do something */
    })
    .then();
  await import("./five").then((test) => {
    /* do something */
  });
}
```

output:

```javascript
import * as $$1 from "./five";
import * as $$0 from "./four";
import "./three";
import "./two";
import * as zero from "./zero";
import "./one";

async function test() {
  Promise.resolve($$0)
    .then((test) => {
      /* do something */
    })
    .then();
  await Promise.resolve($$1).then((test) => {
    /* do something */
  });
}
```

for more examples see [test.js](./test.js)

## Caveat

dynamic imports with dynamic paths do not have a static equivalent.

```javascript
async function test() {
  import(`dynamic${test}`);
  await import(`dynamic${test}`);
  import(`dynamic${test}`)
    .then((test) => {
      /* do something */
    })
    .then();
  await import(`dynamic${test}`).then((test) => {
    /* do something */
  });
}
```

will output:

```javascript
async function test() {
  import(`dynamic${test}`);
  await import(`dynamic${test}`);
  import(`dynamic${test}`)
    .then((test) => {
      /* do something */
    })
    .then();
  await import(`dynamic${test}`).then((test) => {
    /* do something */
  });
}
```

for more examples see [test.js](./test.js)
