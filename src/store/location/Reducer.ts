import { LocationActionTypes, LocationActions } from "./Actions";

export interface LocationState {
    location: Location;
}

export interface Location {
    lat: string;
    long: string;
    region: string;
    city: string;
    loaded: boolean;
}

export const locationReducer = (state: LocationState, action: LocationActions) => {
    switch(action.type) {
        case LocationActionTypes.SET_LOCATION: 
            return {...state, location: action.payload};
        default: 
            return state;
    }
}

export const initialLocationState: LocationState = {
    location: {
        lat: '', 
        long: '',
        region: '',
        city: '',
        loaded: false
    }
}