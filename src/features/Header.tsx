import * as React from 'react';
import { BopIcon } from '../svg/BopIcon';
import BopTreble from '../svg/BopTreble';
import { useHistory, useLocation, Link } from 'react-router-dom';
import {SearchComponent} from './SearchComponent';
import { Loader } from '../components/Loader';
import {SearchResultsContext} from '../store/searchResults/Context';

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

const renderBanner = (displayText: string, imageUrl: string) => (
<>
  <div className="Banner">
    <p className="Banner_name">{displayText || ""}</p>
    {/* <img className="Banner_image" src={imageUrl} alt={displayText} /> */}
  </div>
  <Loader/>
</>
)

export const Header = () => {
    let history = useHistory();
    let location = useLocation();
    const isExpanded = location.pathname.includes('search');
    const headerContainerStyle = isExpanded ? 'wavy white-text' : 'white-background black-text';
    const {searchResultsState} = React.useContext(SearchResultsContext);
    return (
        <div className={headerContainerStyle}>
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
            {isExpanded && renderBanner(searchResultsState.lastQuery, '')}
        </div>
    )
}