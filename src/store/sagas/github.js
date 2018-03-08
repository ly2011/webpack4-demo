import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';

import { ActionTypes } from '@/store/types';
import { get } from '@/utils/request';

// github
function* getRepos({ payload }) {
  try {
    const response = yield call(
      get,
      `https://api.github.com/search/repositories?q=${payload.query}&sort=stars`
    );
    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_SUCCESS,
      payload: { data: response.data.items }
    });
  } catch (err) {
    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_FAILURE,
      payload: err
    });
  }
}

function* watchGetRepos() {
  yield takeLatest(ActionTypes.GITHUB_GET_REPOS_REQUEST, getRepos);
}

export default function* rootSaga() {
  yield all([watchGetRepos()]);
}
