//  @flow

import authReducer from './auth/reducer';

import React from 'react';
import {compose, createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import saga from './saga';

const rootReducer = combineReducers({
  auth: authReducer,
});

// Setup react-navigation middleware
// const navigationMiddleware = createReactNavigationReduxMiddleware(
//   state => state.nav,
// );

// create redux-saga middleware
const sagaMiddleware = createSagaMiddleware();

// setup redux-persist middleware
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Defince all redux middleware
// const middlewares = [sagaMiddleware];
// const middlewares = [navigationMiddleware, sagaMiddleware];
const middlewares = [sagaMiddleware];

// Connect to redux-remove-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// export component for wrap app component with navigation state
// const App = createReduxContainer(Router, 'root');
// const mapStateToProps = state => ({
//   state: state.nav,
// });
// export const AppWithNavigationState = connect(mapStateToProps)(App);

// Export for Provider
export const store = createStore(persistedReducer, enhancer);

// Export persistore for PersistGate component
// export const persistor = persistStore(store);

sagaMiddleware.run(saga);

// store.subscribe(() => {
//   const token = store.getState().auth.token;
//   console.log(token);
//   if (token) {
//     http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   }
// });
