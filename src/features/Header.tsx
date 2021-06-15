import * as React from 'react';
import { BopIcon } from '../svg/BopIcon';
import BopTreble from '../svg/BopTreble';
import { useHistory } from 'react-router-dom';

export const Header = () => {
    let history = useHistory();
    return (
        <div>
           
            <header className="header">
                <div className="logo-box" onClick={() => history.push('/home')}>
                    <BopTreble/>
                    <BopIcon className={"logo"} />
                </div>
            </header>
            <nav className="nav">
                <ul className="nav-links">
                    <li>
                        <a href="#"> Concerts</a>
                    </li>
                    <li>
                        <a href="#"> Sports </a>
                    </li>
                    <li>
                        <a href="#"> Festivals </a>
                    </li>
                    <li>
                        <a href="#"> Theatres </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}