import { Store, AnyAction } from 'redux';

import { all, fork } from 'redux-saga/effects';
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware, { Task } from '@redux-saga/core';
import { Context, createWrapper } from 'next-redux-wrapper';

// Repos
import { RepoState } from "./repos/types";
import { reducer as repoReducer } from './repos/reducer';
import { repoSaga } from "./repos/sagas";

import { Action } from 'typesafe-actions';

export interface ApplicationState {
  repo: RepoState;
}

export interface ApplicationStore<T, A extends Action<any>> extends Store<T, A> {
  sagaTask?: Task;
}

const rootReducer = combineReducers<ApplicationState>({
  repo: repoReducer,
});

export function* rootSaga() {
  yield all([
    fork(repoSaga),
  ])
}

const makeStore = (
  _: Context
): ApplicationStore<ApplicationState, AnyAction> => {
  const sagaMiddleware = createSagaMiddleware();

  const store: ApplicationStore<ApplicationState, AnyAction> = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<ApplicationStore<ApplicationState, AnyAction>>(
  makeStore, 
  { debug: process.env.NODE_ENV === 'development' }
);