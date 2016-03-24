[![NPM](https://nodei.co/npm/ls-all.png)](https://nodei.co/npm/ls-all/)

[![Build Status](https://travis-ci.org/cantidio/node-ls-all.svg?branch=master)](https://travis-ci.org/cantidio/node-ls-all)
[![Code Climate](https://codeclimate.com/github/cantidio/node-ls-all/badges/gpa.svg)](https://codeclimate.com/github/cantidio/node-ls-all)
[![Test Coverage](https://codeclimate.com/github/cantidio/node-ls-all/badges/coverage.svg)](https://codeclimate.com/github/cantidio/node-ls-all/coverage)
[![Dependencies](https://david-dm.org/cantidio/node-ls-all.svg)](https://david-dm.org/cantidio/node-ls-all)
[![devDependencies Status](https://david-dm.org/cantidio/node-ls-all/dev-status.svg)](https://david-dm.org/cantidio/node-ls-all#info=devDependencies)


# LS-ALL
> This is still in heavy[-metal] development.

A simplistic deep file listing module for node (ls -Rla)

## Install
```
  npm install --save ls-all
```
## Usage
### CLI
```
  ls-all -r ./dir-1 ./dir-2 ./dir-3/*
```
List all files in a dir. Recursive optional.

### API
#### list(paths, [options])
Returns a promise with an array of files.

##### options
Type: object
* recurse: true|false

### Examples
```js
const list = require('list-all');
list([
  './src',
  './tests'
], { recurse: true }).then((files)=>{
  console.log('files');
  console.log(JSON.stringify(files,null,2));
});
```
Logs the file tree of the given paths.

### License
MIT
