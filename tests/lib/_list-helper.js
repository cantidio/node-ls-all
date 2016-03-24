'use strict';
const Mode = require('../../src/lib/mode');

const dirTree = {
  'dir-0': ['file-0', 'file-1', 'dir-0'],
  'dir-0/dir-0':['file-0', 'file-1', 'dir-0'],
  'dir-0/dir-0/dir-0':[]
};

const readdir = (path, cb) => {
  const dir = dirTree[path];
  if (dir) {
    cb(null, dir);
  } else {
    cb(new Error('not a dir'));
  }
};

const statSync = (dir) => {
  let mode;
  if (dirTree[dir]) {
    mode = 16877;
  } else {
    mode = 2;
  }

  return { mode };
};

const listRoot = [{
  path: 'dir-0',
  mode: new Mode(statSync('dir-0').mode),
  files: [
    {
      path: 'dir-0/file-0',
      mode: new Mode(statSync('dir-0/file-0').mode),
      files: []
    },
    {
      path: 'dir-0/file-1',
      mode: new Mode(statSync('dir-0/file-1').mode),
      files: []
    },
    {
      path: 'dir-0/dir-0',
      mode: new Mode(statSync('dir-0/dir-0').mode),
      files: []
    }
  ]
}];

const listDeep = [{
  path: 'dir-0',
  mode: new Mode(statSync('dir-0').mode),
  files: [
    {
      path: 'dir-0/file-0',
      mode: new Mode(statSync('dir-0/file-0').mode),
      files: []
    },
    {
      path: 'dir-0/file-1',
      mode: new Mode(statSync('dir-0/file-1').mode),
      files: []
    },
    {
      path: 'dir-0/dir-0',
      mode: new Mode(statSync('dir-0/dir-0').mode),
      files: [{
        path:'dir-0/dir-0/file-0',
        mode: new Mode(statSync('dir-0/dir-0/file-0').mode),
        files: []
      }, {
        path:'dir-0/dir-0/file-1',
        mode: new Mode(statSync('dir-0/dir-0/file-1').mode),
        files: []
      }, {
        path:'dir-0/dir-0/dir-0',
        mode: new Mode(statSync('dir-0/dir-0/dir-0').mode),
        files: []
      }]
    }
  ]
}];

module.exports = {
  readdir,
  statSync,
  listRoot,
  listDeep,
  rootDir: Object.keys(dirTree)[0]
};
