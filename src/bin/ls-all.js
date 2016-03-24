#!/usr/bin/env node
'use strict';
const meow = require('meow');
const list = require('../lib/list');
const display = require('../lib/display');

const cli = meow({
  help: `
  Usage
    $ ls-all ...folders

    Options
    -r, --recursive

  Examples
    $ ls-all ./folder-1
      > folder-1:
      >   file-1
      >   file-2
` }, {
  alias: {
    r: 'recurse'
  },
  default: {
    r: false
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
