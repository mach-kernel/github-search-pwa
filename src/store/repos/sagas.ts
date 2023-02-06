import { RepoActionType } from "./types";
import * as actions from './actions';
import { ActionType } from "typesafe-actions";
import { all, fork, takeEvery } from "@redux-saga/core/effects";

function* repoSearchRequest(
  action: ActionType<typeof actions.repoSearchAction>
) {

}

function* watchRepoSearchRequest() {
  yield takeEvery(RepoActionType.REPO_SEARCH_REQUEST, repoSearchRequest);
}

export function* repoSaga() {
  yield all([
    fork(watchRepoSearchRequest)
  ]);
}