/*
* @Author: ly2011
* @Date:   2018-03-07 17:05:46
* @Last Modified by:   ly2011
* @Last Modified time: 2018-03-07 18:19:47
*/
import { all, fork } from 'redux-saga/effects';

import github from './github';
import counter from './counter';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    fork(github),
    fork(counter)
  ]);
}
