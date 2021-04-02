import * as React from 'react';
import {LoaderContext} from '../store/loader/Context';

export const Loader = () => {
    const {loaderState} = React.useContext(LoaderContext);
    return ( 
        <div className="Loader_container">
            <div className={loaderState.isLoading ? 'Loader Loader--active' : 'Loader'}/>
        </div>
    ) 
}
