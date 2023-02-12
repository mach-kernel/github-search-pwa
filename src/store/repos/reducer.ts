import { Reducer } from 'redux';
import { RepoAction, RepoActionType, Repository, RepoState } from './types';

export const initialState: RepoState = {
  query: {
    page: 1,
  },
  rows: [],
  loading: false,
  total: 0,
  page: 1,
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
      if ((action.payload.page ?? 1) <= state.page) {
        return { ...state, ...action.payload };
      }

      return { ...state, ...action.payload, rows: [...state.rows, ...action.payload.rows!] };
    }
    case RepoActionType.REPO_SEARCH_UPDATE_QUERY: {
      let query = { ...(state.query ?? {}), ...action.payload };
      return { ...state, query };
    }
    case RepoActionType.REPO_SEARCH_CLEAR_QUERY: {
      return initialState;
    }
    default: { return state; }
  }
};