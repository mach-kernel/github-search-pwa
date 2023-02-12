import { type Store, type AnyAction } from 'redux'

import { all, fork } from 'redux-saga/effects'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import createSagaMiddleware, { type Task } from '@redux-saga/core'
import { type Context, createWrapper } from 'next-redux-wrapper'

// Repos
import { type RepoState } from './repos/types'
import { reducer as repoReducer } from './repos/reducer'
import { repoSaga } from './repos/sagas'

import { type Action } from 'typesafe-actions'

export interface ApplicationState {
  repo: RepoState
}

export interface ApplicationStore<T, A extends Action<any>> extends Store<T, A> {
  sagaTask?: Task
}

const rootReducer = combineReducers<ApplicationState>({
  repo: repoReducer
})

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
