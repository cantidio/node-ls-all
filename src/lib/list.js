'use strict';
const fs = require('fs');
const joinPath = require('path').join;
const flatten = require('tree-flatten');
const Mode = require('./mode');

function _readDir(dir) {
  return new Promise((resolve, reject)=> {
    fs.readdir(dir, (err, files)=> {
      if (err) {
        reject(err);
      } else {
        const filesInfo = files.map((file)=> {
          const filePath = joinPath(dir, file);

          return {
            path: filePath,
            mode: new Mode(fs.statSync(filePath).mode),
            files: []
          };
        });

        resolve({
          path: joinPath(dir),
          mode: new Mode(fs.statSync(dir).mode),
          files: filesInfo
        });
      }
    });
  });
}

function _listFiles(path, options) {
  const recurse = !!options.recurse;
  return _readDir(path).then((file)=> {
    if (!recurse) {
      return file;
    }

    const files = file.files.map((innerFile)=> {
      if (!innerFile.mode.dir) {
        return Promise.resolve(innerFile);
      }

      return _listFiles(innerFile.path, options);
    });

    return Promise.all(files).then((files)=> {
      const mode = file.mode;
      const path = file.path;
      return {
        path,
        mode,
        files
      };
    });
  });
}

function list(paths, options) {
  const opts = Object.assign({}, options);
  const promises = paths.map((path)=> _listFiles(path, opts));
  return Promise.all(promises).then((files)=> {
    if (opts.flatten) {
      return files
        .map((root)=> flatten(root, 'files'))
        .reduce((a, b)=> a.concat(b), []);
    }

    return files;
  });
}

module.exports = list;
