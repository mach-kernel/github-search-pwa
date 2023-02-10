import { RepoActionType, SearchRepoQuery, SearchRepoResponse } from "./types";
import * as actions from './actions';
import { ActionType } from "typesafe-actions";
import { all, call, fork, takeEvery, debounce, put } from "@redux-saga/core/effects";
import { Octokit } from "octokit";
import { globalToast } from "@/pages/_app";

function* repoSearchRequest(
  action: ActionType<typeof actions.repoSearchAction.request>
) {
  if (!action.payload.q.length) return;

  try {
    yield put(actions.setLoading(true));

    const client = new Octokit();
    const { data } = yield call(() => client.rest.search.repos(action.payload));
    yield put(actions.repoSearchAction.success({
      rows: data.items,
      total: data.total_count,
    }));
  } catch {
    globalToast({ 
      title: 'Error',
      description: 'Unable to get repos',
      status: 'error',
      isClosable: true,
      position: "top-right"
    })
  }

  yield put(actions.setLoading(false));
}

function* updateQuery(
  action: ActionType<typeof actions.updateQueryAction>
) {
  yield put(actions.repoSearchAction.request(action.payload as SearchRepoQuery));
}

function* watchRepoSearchRequest() {
  yield debounce(500, RepoActionType.REPO_SEARCH_REQUEST, repoSearchRequest);
}

function* watchUpdateQuery() {
  yield takeEvery(RepoActionType.REPO_SEARCH_UPDATE_QUERY, updateQuery);
}

export function* repoSaga() {
  yield all([
    fork(watchRepoSearchRequest),
    fork(watchUpdateQuery),
  ]);
}