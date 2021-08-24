import * as React from 'react';
import {LoaderContext} from '../store/loader/Context';

export const Loader = () => {
    const {loaderState} = React.useContext(LoaderContext);
    return ( 
        <div className="loader_container">
            <div className={loaderState.isLoading ? 'loader loader--active' : 'loader'}/>
        </div>
    ) 
}
