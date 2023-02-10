import { RepoActionType, SearchRepoQuery } from "./types";
import * as actions from './actions';
import { ActionType } from "typesafe-actions";
import { all, call, fork, takeEvery, debounce, put } from "@redux-saga/core/effects";
import { Octokit } from "octokit";

function* repoSearchRequest(
  action: ActionType<typeof actions.repoSearchAction.request>
) {
  const client = new Octokit();
  const { data } = yield call(() => client.rest.search.repos(action.payload));
  console.log(data);
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