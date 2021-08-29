import * as React from 'react';
import { BopIcon } from '../svg/BopIcon';
import BopTreble from '../svg/BopTreble';
import { useHistory, useLocation, Link } from 'react-router-dom';
import {SearchComponent} from './SearchComponent';

const renderSearchComponent = (location: any) =>  location.pathname.includes('search') ? <SearchComponent/> : null

const renderNavLinks = () => {    
    return (
        <nav className="nav">
            <ul className="nav-links">
                <li>
                    <Link to="/concerts">Concerts</Link>
                </li>
                <li>
                    <Link to="/sports">Sports</Link>
                </li>
                <li>
                    <Link to="/festivals">Festivals</Link>
                </li>
                <li>
                    <Link to="/theatres">Theatres</Link>
                </li>
            </ul>
        </nav>
    )
}

export const Header = () => {
    let history = useHistory();
    let location = useLocation();
    return (
        <header className="header">
            <div className="header_content">
            <div className="bop-logo_container" onClick={() => history.push('/home')}>
                <BopTreble className={"bop-logo_treble"}/>
                <BopIcon className={"bop-logo_icon"} />
            </div>
            <nav className="header_nav-bar">
                {renderSearchComponent(location)}
                {renderNavLinks()}
            </nav>
            </div>
        </header>
    )
}