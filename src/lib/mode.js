'use strict';
/*jslint bitwise: true */

const modeMap = {
  exec:   64,    //S_IXUSR
  dir:    16384, //S_IFDIR
  link:   40960, //S_IFLNK
  socket: 49152  //S_IFSOCK
};

module.exports = class FileMode {
  constructor(mode) {
    Object.keys(modeMap).forEach((k)=> {
      this[k] = Boolean(mode & modeMap[k]);
    });
  }
};
