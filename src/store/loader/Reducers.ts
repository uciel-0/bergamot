import {LoaderActionTypes, LoaderActions} from './Actions';

export interface LoaderState {
  isLoading: boolean;
}
  
export const loaderReducer = (state: LoaderState, action: LoaderActions) => {
  switch(action.type) {
    case LoaderActionTypes.SET_LOADING:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
}

export const initialLoaderState: LoaderState = {
  isLoading: false
}