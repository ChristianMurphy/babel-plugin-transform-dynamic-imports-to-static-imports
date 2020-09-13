# Contributing

## Setup

Have [Node.js version 10+](https://nodejs.org/en/download) and [Git](https://git-scm.com/downloads) installed.
Have a [GitHub account](https://github.com) with [commit signing setup](https://github.blog/2016-04-05-gpg-signature-verification).

Fork the `babel-plugin-transform-dynamic-imports-to-static-imports` repository to your GitHub Account.

Then run

```shell
git clone https://github.com/<your-github-username>/babel-plugin-transform-dynamic-imports-to-static-imports
cd babel-plugin-transform-dynamic-imports-to-static-imports
npm install
```

## Running tests

```shell
npm test
```

## Linting code

```shell
npm run lint
```

lint errors can automatically be fixed with:

```shell
npm run format
```

## Additional Resources

To learn about working with babel plugins, check out the [babel plugin handbook](https://github.com/jamiebuilds/babel-handbook/blob/HEAD/translations/en/plugin-handbook.md).

To see the structure of the abstract syntax tree and have a playground to test the transform use [ASTExplorer](https://astexplorer.net/#/gist/2e40ef91b449382adf170e283a00e52e/dc79a8e4166e4a36cbf8a8529e148943c9d230fb).
