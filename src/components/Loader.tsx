import * as React from 'react';
import {LoaderContext} from '../store/loader/Context';

export const Loader = () => {
    const {LoaderState} = React.useContext(LoaderContext);
    return ( 
        <div className="Loader_container">
            <div className={LoaderState.isLoading ? 'Loader Loader--active' : 'Loader'}/>
        </div>
    ) 
}
