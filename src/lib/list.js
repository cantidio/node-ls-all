'use strict';
const fs = require('fs');
const joinPath = require('path').join;
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
        mode,
        path,
        files
      };
    });
  });
}

function list(paths, options) {
  const promises = paths.map((path)=> _listFiles(path, options));
  return Promise.all(promises);
}

module.exports = list;
