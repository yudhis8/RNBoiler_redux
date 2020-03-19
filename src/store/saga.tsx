import {all, fork} from 'redux-saga/effects';

import authFetch from './auth/saga';

export default function* rootSaga() {
  yield all([authFetch()]);
}
