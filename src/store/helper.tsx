import {put} from 'redux-saga/effects';

import {POST_LOGIN_FAILURE} from './auth/constant';

export function* handleError(error, failureConstant) {
  // If response undefined, user seems offline
  if (error.response === undefined) {
    yield put({
      type: failureConstant,
      payload: {
        error: {
          message:
            error.message === 'Network Error'
              ? 'Your are offline!'
              : 'The app is experiencing issue, try again later',
        },
      },
    });
  } else {
    const errorData = error.response.data;
    if (typeof errorData === 'object') {
      // If token invalid, force logout from the app
      if (errorData.code == 403 && errorData.message == 'Unauthorized') {
        yield put({
          type: POST_LOGIN_FAILURE,
          payload: {
            error: {
              message: 'You are logged out, please login again',
            },
          },
        });
      }
      // Show notification to user
      else {
        yield put({
          type: failureConstant,
          payload: {
            error: errorData,
          },
        });
      }
    } else {
      yield put({
        type: failureConstant,
        payload: {
          error: {
            message: 'Server is experiencing issue, try again later',
          },
        },
      });
    }
  }
}
