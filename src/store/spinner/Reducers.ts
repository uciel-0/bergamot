import {SpinnerActionTypes, SpinnerActions} from './Actions';

export interface SpinnerState {
  isLoading: boolean;
}
  
export const spinnerReducer = (state: SpinnerState, action: SpinnerActions) => {
  switch(action.type) {
    case SpinnerActionTypes.SET_LOADING:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
}

export const initialSpinnerState: SpinnerState = {
  isLoading: false
}