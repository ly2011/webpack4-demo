/*
* @Author: ly2011
* @Date:   2018-03-07 18:05:46
* @Last Modified by:   ly2011
* @Last Modified time: 2018-03-07 18:29:06
*/
import test from 'tape';
import { delay } from 'redux-saga';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { incrementAsync } from './index'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync();
  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  )
  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end();
})
