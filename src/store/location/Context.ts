import * as React from 'react';
import { LocationActions } from './Actions';
import { initialLocationState, LocationState } from './Reducer';

export interface LocationContextType {
    locationState: LocationState;
    locationDispatch: React.Dispatch<LocationActions>
}

export const LocationContext = React.createContext<LocationContextType>({
    locationState: initialLocationState,
    locationDispatch: () => null
});