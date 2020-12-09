# [Count CLI](https://github.com/awesome-cli/count-cli)

[![NPM version](https://img.shields.io/npm/v/count-cli?style=flat-square)](https://www.npmjs.com/package/count-cli)
[![NPM downloads](https://img.shields.io/npm/dm/count-cli?style=flat-square)](https://www.npmjs.com/package/count-cli)

## About

Count files and directories including hidden and visible items

## Prerequisites

- Node.js
- npm/Yarn

## How to Install

First, install the CLI by npm:

```sh
$ npm install -g count-cli
```

Or Yarn:

```sh
$ yarn global add count-cli
```

## How to Use

```sh
$ count-cli [options]
```

**Instead of `count-cli` you can use aliases: `count` & `cc`**

## Options

- `-s, --size` output files size
- `-r, --recursive [depth]` output result including files from subdirectories
- `-x, --exclude [dirs ...]` output result without given files & directories
- `-i, --include [dirs ...]` output result for given files & directories

## License

This project is licensed under the MIT License © 2020-present Jakub Biesiada
