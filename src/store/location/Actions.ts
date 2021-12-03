import { Location } from "./Reducer";

export enum LocationActionTypes {
  SET_LOCATION = 'SET_LOCATION'
}

interface SetLocation {
    type: LocationActionTypes.SET_LOCATION;
    payload: Location;
}

export const setLocationStateAction = (payload: Location): SetLocation => ({
    type: LocationActionTypes.SET_LOCATION,
    payload
});

export type LocationActions = SetLocation;