#!/usr/bin/env node
'use strict';
const meow = require('meow');
const list = require('../lib/list');
const display = require('../lib/display');

const cli = meow({
  help: `
  Usage
    $ ls-all [options] ...folders

    Options
    -f, --flatten
    -r, --recurse

  Examples
    $ ls-all ./folder-1 ./folder-2
      folder-1:
        file-1
        file-2
` }, {
  alias: {
    r: 'recurse',
    f: 'flatten'
  },
  default: {
    r: false,
    f: false
  }
});

if (cli.input.length === 0) {
  cli.input.push('.');
}

list(cli.input, cli.flags).then((files)=> {
  display(files, 0);
}).catch((err)=> {
  console.log('Error', err.message);
});
