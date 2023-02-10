import { Reducer } from 'redux';
import { RepoAction, RepoActionType, RepoState } from './types';

export const initialState: RepoState = {
  rows: []
};

export const reducer: Reducer<RepoState, RepoAction> = (
  state: RepoState = initialState,
  action: RepoAction,
) => {
  switch (action.type) {
    case RepoActionType.REPO_SEARCH_SUCCESS: {
      return { ...state, rows: action.payload };
    }
    case RepoActionType.REPO_SEARCH_UPDATE_QUERY: {
      let query = { ...(state.query ?? {}), ...action.payload };
      return { ...state, query };
    }
    default: { return state; }
  }
};