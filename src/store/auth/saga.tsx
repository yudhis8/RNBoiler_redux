import {put, call, takeLatest, all} from 'redux-saga/effects';

import {handleError} from '../helper';
import {
  POST_LOGIN_BEGIN,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS,
  POST_LOGOUT_BEGIN,
  POST_LOGIN_REQUEST,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILURE,
} from './constant';

import {login} from '../../api/auth';

export function* postLogin({payload}) {
  try {
    yield put({type: POST_LOGIN_BEGIN});
    console.log(payload);
    // const data = yield call(login, payload.form);
    // console.log(data);
    // Once user authenticated
    yield put({
      type: POST_LOGIN_SUCCESS,
      // payload: data.data,
    });
  } catch (error) {
    console.log(error);
    yield call(handleError, error, POST_LOGIN_FAILURE);
  }
}

export function* postLogout({payload}) {
  try {
    yield put({type: POST_LOGOUT_BEGIN});

    // Once user loggedout from server
    yield put({
      type: POST_LOGOUT_SUCCESS,
    });
  } catch (error) {
    yield call(handleError, error, POST_LOGOUT_FAILURE);
  }
}

export default function* authFetch() {
  yield all([
    takeLatest(POST_LOGIN_REQUEST, postLogin),
    takeLatest(POST_LOGOUT_REQUEST, postLogout),
  ]);
}
