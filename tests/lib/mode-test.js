import test from 'ava';
import Mode from '../../src/lib/mode';

test('it should be exec', (t) => {
  const mode = new Mode(33261);
  t.is(mode.exec, true);
});

test('it should be dir', (t) => {
  const mode = new Mode(1612877);
  t.is(mode.dir, true);
});

test('it should be link', (t) => {
  const mode = new Mode(8576);
  t.is(mode.link, true);
});

test('it should be socket', (t) => {
  const mode = new Mode(24992);
  t.is(mode.socket, true);
});
