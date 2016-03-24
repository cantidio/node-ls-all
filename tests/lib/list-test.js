import sinon from 'sinon';
import test from 'ava';
import fs from 'fs';
import list from '../../src/lib';
import helper from './_list-helper';

test.before((t)=> {
  sinon.stub(fs, 'readdir', helper.readdir);
  sinon.stub(fs, 'statSync', helper.statSync);
});

test.after((t) => {
  fs.readdir.restore();
  fs.statSync.restore();
});

test('it should return list of dir files', (t) => {
  const dirs = [helper.rootDir];
  return list(dirs, {}).then((files)=> {
    t.same(files, helper.listRoot);
  });
});

test('it should return a deep list of dir files when running with recurse', (t) => {
  const dirs = [helper.rootDir];
  return list(dirs, { recurse:true }).then((files)=> {
    t.same(files, helper.listDeep);
  });
});

test('it should throw an error if dir does not exist', (t) => {
  const dirs = ['INVALID'];
  t.throws(list(dirs, {}));
});
