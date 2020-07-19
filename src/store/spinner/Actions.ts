export enum SpinnerActionTypes {
  SET_LOADING = 'SET_LOADING'
}
  
interface SetSpinnerState {
  type: SpinnerActionTypes.SET_LOADING;
  payload: boolean;
}

export const setSpinnerState = (payload: boolean): SetSpinnerState => ({
  type: SpinnerActionTypes.SET_LOADING,
  payload
});

export type SpinnerActions = SetSpinnerState;