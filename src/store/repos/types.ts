import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type RepoAction = ActionType<typeof actions>;

export enum RepoActionType {
  REPO_SEARCH_REQUEST = '@@repo/REPO_SEARCH_REQUEST',
  REPO_SEARCH_SUCCESS = '@@repo/REPO_SEARCH_SUCCESS',
  REPO_SEARCH_FAILURE = '@@repo/REPO_SEARCH_FAILURE',
};

export interface RepoState {
  repositories: any[];
}