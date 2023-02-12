import { type Store, type AnyAction, Reducer } from 'redux'

import { all, fork } from 'redux-saga/effects'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import createSagaMiddleware, { END, type Task } from '@redux-saga/core'
import { type Context, createWrapper, HYDRATE } from 'next-redux-wrapper'

// Repos
import { type RepoState } from './repos/types'
import { reducer as repoReducer } from './repos/reducer'
import { repoSaga } from './repos/sagas'

import { type Action } from 'typesafe-actions'

export interface ApplicationState {
  repo: RepoState,
  server?: boolean,
}

export interface ApplicationStore<T, A extends Action<any>> extends Store<T, A> {
  sagaTask?: Task
}

const rootReducer: Reducer<ApplicationState, AnyAction> = (state: ApplicationState | undefined, action: AnyAction): ApplicationState => {
  let s = combineReducers<ApplicationState>({
    repo: repoReducer
  })(state, action);

  // handle next-redux-wrapper 
  if (action.type == HYDRATE) { return {...s, ...action.payload } as ApplicationState; }
  return s;
}


export function * rootSaga () {
  yield all([
    fork(repoSaga)
  ])
}

const makeStore = (
  _: Context
): ApplicationStore<ApplicationState, AnyAction> => {
  const sagaMiddleware = createSagaMiddleware()

  const store: ApplicationStore<ApplicationState, AnyAction> = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
  })

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper<ApplicationStore<ApplicationState, AnyAction>>(
  makeStore,
  { debug: process.env.NODE_ENV === 'development' }
)
