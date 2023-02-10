import { Reducer } from 'redux';
import { RepoAction, RepoActionType, RepoState } from './types';

export const initialState: RepoState = {
  rows: [],
  loading: false,
  total: 0,
};

export const reducer: Reducer<RepoState, RepoAction> = (
  state: RepoState = initialState,
  action: RepoAction,
) => {
  switch (action.type) {
    case RepoActionType.REPO_SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    case RepoActionType.REPO_SEARCH_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case RepoActionType.REPO_SEARCH_UPDATE_QUERY: {
      let query = { ...(state.query ?? {}), ...action.payload };
      return { ...state, query };
    }
    default: { return state; }
  }
};