/*
* @Author: ly2011
* @Date:   2018-03-07 17:05:46
* @Last Modified by:   ly2011
* @Last Modified time: 2018-03-07 18:19:47
*/
import { delay } from 'redux-saga';
import { put, takeEvery, all, call } from 'redux-saga/effects';

export function* helloSaga() {
  console.log('Hello Sagas!');
  yield '我们下次再见！';
}

// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
// export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Our worker Saga: 将异步执行 increment 任务
export function* incrementAsync() {
  // yield delay(1000);
  yield call(delay, 1000); // use the call Effect
  yield put({ type: 'INCREMENT' }); // Saga 指示 middleware 发起一个 INCREMENT 的action.
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action 调用后，派生一个新的 incrementAsync 任务
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
