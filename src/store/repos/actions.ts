import { action, createAsyncAction } from "typesafe-actions";
import { RepoActionType, Repository, RepoState, SearchRepoQuery } from "./types";

export const repoSearchAction = createAsyncAction(
  RepoActionType.REPO_SEARCH_REQUEST,
  RepoActionType.REPO_SEARCH_SUCCESS,
  RepoActionType.REPO_SEARCH_FAILURE,
)<SearchRepoQuery, Partial<RepoState>, Error>();

export const updateQueryAction = (
  repo: Partial<SearchRepoQuery>
) => action(RepoActionType.REPO_SEARCH_UPDATE_QUERY, repo);

export const setLoading = (loading: boolean) => action(RepoActionType.REPO_SET_LOADING, loading);
export const clearQuery = () => action(RepoActionType.REPO_SEARCH_CLEAR_QUERY);