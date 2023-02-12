import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { components, operations } from '@octokit/openapi-types';

export type RepoAction = ActionType<typeof actions>;

export enum RepoActionType {
  REPO_SEARCH_REQUEST = '@@repo/REPO_SEARCH_REQUEST',
  REPO_SEARCH_SUCCESS = '@@repo/REPO_SEARCH_SUCCESS',
  REPO_SEARCH_FAILURE = '@@repo/REPO_SEARCH_FAILURE',

  REPO_SEARCH_CLEAR_QUERY = '@@repo/REPO_SEARCH_CLEAR_QUERY',
  REPO_SEARCH_UPDATE_QUERY = '@@repo/REPO_SEARCH_UPDATE_QUERY',
  REPO_SET_LOADING = '@@repo/REPO_SET_LOADING'
};

// From @octokit's OpenAPI schemas
export type Repository = components["schemas"]['repo-search-result-item'];
export type SearchRepoQuery = operations['search/repos']['parameters']['query'];
export type SearchRepoResponse = operations['search/repos']['responses']['200']['content']['application/json'];

export interface RepoState {
  query?: Partial<SearchRepoQuery>;
  rows: Repository[];
  total: number;
  page: number;
  loading: boolean;
}