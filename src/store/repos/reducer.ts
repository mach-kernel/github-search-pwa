import { Reducer } from 'redux';
import { RepoAction, RepoActionType, RepoState } from './types';

export const initialState: RepoState = {
  repositories: []
};

export const reducer: Reducer<RepoState, RepoAction> = (
  state: RepoState = initialState,
  action: RepoAction,
) => {
  switch (action.type) {
    case RepoActionType.REPO_SEARCH_SUCCESS: {
      return { ...state, repositories: action.payload };
    }
    default: { return state; }
  }
};