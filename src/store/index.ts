import { Store, AnyAction, applyMiddleware } from 'redux';

import { all, fork } from 'redux-saga/effects';
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Repos
import { RepoState } from "./repos/types";
import { reducer as repoReducer } from './repos/reducer';
import { repoSaga } from "./repos/sagas";
import createSagaMiddleware from '@redux-saga/core';
import { Context, createWrapper } from 'next-redux-wrapper';

export interface ApplicationState {
  repo: RepoState
}

const rootReducer = combineReducers<ApplicationState>({
  repo: repoReducer
})

export function* rootSaga() {
  yield all([
    fork(repoSaga),
  ])
}

const makeStore = (
  _: Context
): Store<ApplicationState, AnyAction> => {
  return configureStore({
    reducer: rootReducer,
    middleware: [createSagaMiddleware()],
  });
};

export const wrapper = createWrapper<Store<ApplicationState>>(
  makeStore, 
  { debug: process.env.NODE_ENV === 'development' }
);