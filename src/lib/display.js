'use strict';
const colors = require('colors/safe');
const basename = require('path').basename;
const fullPath = false;
const identChar = ' ';
const identSize = 2;

function getFileColor(file) {
  if (file.mode.dir) {
    return colors.blue.bold;
  } else if (file.mode.exec) {
    return colors.red.bold;
  } else {
    return colors.black;
  }
}

function printFile(file, spaces) {
  const color = getFileColor(file);
  const ident = identChar.repeat(spaces);
  const name = fullPath ? file.path : basename(file.path);
  const msg = color(name);

  console.log(`${ident}${msg}`);
}

module.exports = function displayFiles(files, spaces) {
  files.forEach((file)=> {
    printFile(file, spaces);
    if (file.mode.dir) {
      displayFiles(file.files, spaces + identSize);
    }
  });
};
