import * as React from 'react';
import { BopIcon } from '../svg/BopIcon';
import BopTreble from '../svg/BopTreble';
import { useHistory, useLocation, Link } from 'react-router-dom';
import {SearchComponent} from './SearchComponent';
import { Loader } from '../components/Loader';
import {SearchResultsContext} from '../store/searchResults/Context';
import { SearchResultsActions, setLastQuery } from '../store/searchResults/Actions';

const renderSearchComponent = (isExpanded: boolean) =>  isExpanded ? <SearchComponent/> : null

const renderNavLinks = (dispatch: React.Dispatch<SearchResultsActions>) => {
    const onTabClick = (tabName: string) => dispatch(setLastQuery(tabName));
    return (
        <nav className="nav">
            <ul className="nav-links">
                <li>
                    <Link to="/concerts" onClick={() => onTabClick('Concerts')}>Concerts</Link>
                </li>
                <li>
                    <Link to="/sports" onClick={() => onTabClick('Sports')}>Sports</Link>
                </li>
                <li>
                    <Link to="/festivals" onClick={() => onTabClick('Festivals')}>Festivals</Link>
                </li>
                <li>
                    <Link to="/theatre" onClick={() => onTabClick('Theatre')}>Theatre</Link>
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
    const isExpanded = location.pathname.includes('search') || location.pathname.includes('concerts') || location.pathname.includes('sports') || location.pathname.includes('festivals') || location.pathname.includes('theatre');
    const headerContainerStyle = isExpanded ? 'wavy white-text' : 'white-background black-text';
    const {searchResultsState, searchResultsDispatch} = React.useContext(SearchResultsContext);
    return (
        <div className={headerContainerStyle}>
            <header className="header">
                <div className="header_content">
                <div className="bop-logo_container" onClick={() => history.push('/home')}>
                    <BopTreble className={"bop-logo_treble"}/>
                    <BopIcon className={"bop-logo_icon"} />
                </div>
                <nav className="header_nav-bar">
                    {renderSearchComponent(isExpanded)}
                    {renderNavLinks(searchResultsDispatch)}
                </nav>
                </div>
            </header>
            {isExpanded && renderBanner(searchResultsState.lastQuery, '')}
        </div>
    )
}