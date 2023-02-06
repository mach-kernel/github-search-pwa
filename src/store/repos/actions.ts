import { createAsyncAction } from "typesafe-actions";
import { RepoActionType } from "./types";

export const repoSearchAction = createAsyncAction(
  RepoActionType.REPO_SEARCH_REQUEST,
  RepoActionType.REPO_SEARCH_SUCCESS,
  RepoActionType.REPO_SEARCH_FAILURE,
)<any, any, any>();
