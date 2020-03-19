import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
  key: 'LIFTED_REDUX_STORE',
  AsyncStorage,
};

const appReducer = persistCombineReducers(config, {});

export default function rootReducer(state, action) {
  return appReducer(state, action);
}
