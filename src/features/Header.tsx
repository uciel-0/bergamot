import * as React from 'react';
import { BopIcon } from '../svg/BopIcon';
import { useHistory } from 'react-router-dom';

export const Header = () => {
    let history = useHistory();
    return (
        <div>
            <header className="header">
                <div className="logo-box" onClick={() => history.push('/home')}>
                    <BopIcon className={"logo"} />
                </div>
                <nav className="header_nav-bar">
                {/* <a className="nav-bar_item"> Artists </a>
                <a className="nav-bar_item"> Concerts </a>
                <a className="nav-bar_item"> Sports </a> */}
            </nav>
            </header>
        </div>
    )
}