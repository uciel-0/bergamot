import * as React from 'react';
import {LoaderState, initialLoaderState} from './Reducers';
import {LoaderActions} from './Actions';

export interface LoaderContextType {
  loaderState: LoaderState;
  loaderDispatch: React.Dispatch<LoaderActions>
}

export const LoaderContext = React.createContext<LoaderContextType>({
  loaderState: initialLoaderState,
  loaderDispatch: () => null
});