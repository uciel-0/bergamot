import * as React from 'react';
import {LoaderState, initialLoaderState} from './Reducers';
import {LoaderActions} from './Actions';

export interface LoaderContextType {
  LoaderState: LoaderState;
  LoaderDispatch: React.Dispatch<LoaderActions>
}

export const LoaderContext = React.createContext<LoaderContextType>({
  LoaderState: initialLoaderState,
  LoaderDispatch: () => null
});