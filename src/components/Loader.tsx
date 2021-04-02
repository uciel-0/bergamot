import * as React from 'react';
import {SpinnerContext} from '../store/spinner/Context';

export const Loader = () => {
    const {spinnerState} = React.useContext(SpinnerContext);
    return ( 
        <div className="Loader_container">
            <div className={spinnerState.isLoading ? 'Loader Loader--active' : 'Loader'}/>
        </div>
    ) 
}
