import * as React from 'react';
import {SpinnerState, initialSpinnerState} from './Reducers';
import {SpinnerActions} from './Actions';

export interface SpinnerContextType {
  spinnerState: SpinnerState;
  spinnerDispatch: React.Dispatch<SpinnerActions>
}

export const SpinnerContext = React.createContext<SpinnerContextType>({
  spinnerState: initialSpinnerState,
  spinnerDispatch: () => null
});