import test from 'ava';
import sinon from 'sinon';
import colors from 'colors/safe';
import display from '../../src/lib/display';

test.beforeEach((t)=> {
  sinon.stub(console, 'log');
});

test.afterEach((t) => {
  console.log.restore();
});

test('it should color dirs blue', (t) => {
  const path = 'my-file-path.js';
  const text = colors.blue.bold(path);

  display([{
    path,
    mode: { dir: true },
    files: []
  }], 0);

  t.true(console.log.calledOnce);
  t.is(text, console.log.getCall(0).args[0]);
});

test('it should color executables red', (t) => {
  const path = 'my-file-path.js';
  const text = colors.red.bold(path);

  display([{
    path,
    mode: { exec: true },
    files: []
  }], 0);

  t.true(console.log.calledOnce);
  t.is(text, console.log.getCall(0).args[0]);
});

test('it should color normal files black', (t) => {
  const path = 'my-file-path.js';
  const text = colors.black(path);

  display([{
    path,
    mode: {},
    files: []
  }], 0);

  t.true(console.log.calledOnce);
  t.is(text, console.log.getCall(0).args[0]);
});

test('it should show files in a folder', (t) => {
  const path = 'my-file-path.js';
  const text = `  ${colors.black(path)}`;

  display([{
    path: 'dir-1',
    mode: { dir: true },
    files: [
      {
        path,
        mode: {},
        files: []
      }
    ]
  }], 0);

  t.true(console.log.calledTwice);
  t.is(text, console.log.getCall(1).args[0]);
});
