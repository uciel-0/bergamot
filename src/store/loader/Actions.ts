export enum LoaderActionTypes {
  SET_LOADING = 'SET_LOADING'
}
interface SetLoaderState {
  type: LoaderActionTypes.SET_LOADING;
  payload: boolean;
}

export const setLoaderState = (payload: boolean): SetLoaderState => ({
  type: LoaderActionTypes.SET_LOADING,
  payload
});

export type LoaderActions = SetLoaderState;