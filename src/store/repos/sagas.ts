import { RepoActionType, type SearchRepoQuery } from './types'
import * as actions from './actions'
import { type ActionType } from 'typesafe-actions'
import { all, call, fork, takeEvery, debounce, put, takeLatest } from '@redux-saga/core/effects'
import { Octokit } from 'octokit'
import { globalToast } from '@/pages/_app'

function * repoSearchRequest (
  action: ActionType<typeof actions.repoSearchAction.request>
) {
  if (!action.payload.q?.length) return

  try {
    yield put(actions.setLoading(true))

    const client = new Octokit()
    const { data } = yield call(async () => await client.rest.search.repos(action.payload))
    yield put(actions.repoSearchAction.success({
      rows: data.items,
      total: data.total_count,
      page: action.payload.page
    }))
  } catch (e) {
    globalToast({
      title: 'Error',
      description: 'Unable to get repos',
      status: 'error',
      isClosable: true,
      position: 'top-right'
    })
  }

  yield put(actions.setLoading(false))
}

function * fireQueryAfterUpdate (
  action: ActionType<typeof actions.updateQueryAction>
) {
  yield put(actions.repoSearchAction.request(action.payload as SearchRepoQuery))
}

function * updateQueryString (
  action: ActionType<typeof actions.updateQueryAction>
) {
  if (!history) return;

  if (!action.payload.q?.length) {
    history.pushState({}, '', '/repos')
  } else {
    const queryString = Object.entries(action.payload).reduce(
      (q, [k, v]) => (q + `${encodeURIComponent(k)}=${encodeURIComponent(v)}&`),
      ''
    )

    history.pushState({}, '', `/repos?${queryString}`)
  }
}

function * watchRepoSearchRequest () {
  if (typeof process !== undefined) {
    yield takeEvery(RepoActionType.REPO_SEARCH_REQUEST, repoSearchRequest)
  } else {
    yield debounce(1000, RepoActionType.REPO_SEARCH_REQUEST, repoSearchRequest)
  }
}

// Sinks query updates into querystring
function * watchUpdateQueryString () {
  yield debounce(250, RepoActionType.REPO_SEARCH_UPDATE_QUERY, updateQueryString)
}

// Sinks query updates into the above debounce search
function * watchUpdateQuery () {
  yield takeLatest(RepoActionType.REPO_SEARCH_UPDATE_QUERY, fireQueryAfterUpdate)
}

export function * repoSaga () {
  yield all([
    fork(watchRepoSearchRequest),
    fork(watchUpdateQueryString),
    fork(watchUpdateQuery)
  ])
}
