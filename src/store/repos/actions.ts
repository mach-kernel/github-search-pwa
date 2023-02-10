import { action, createAsyncAction } from "typesafe-actions";
import { RepoActionType, Repository, SearchRepoQuery } from "./types";

export const repoSearchAction = createAsyncAction(
  RepoActionType.REPO_SEARCH_REQUEST,
  RepoActionType.REPO_SEARCH_SUCCESS,
  RepoActionType.REPO_SEARCH_FAILURE,
)<SearchRepoQuery, Repository[], Error>();

export const updateQueryAction = (
  repo: Partial<SearchRepoQuery>
) => action(RepoActionType.REPO_SEARCH_UPDATE_QUERY, repo);
