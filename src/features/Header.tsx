import * as React from 'react';
import { BopIcon } from '../svg/BopIcon';
import BopTreble from '../svg/BopTreble';
import { useHistory, useLocation } from 'react-router-dom';
import {History} from 'history';
import {SearchComponent} from './SearchComponent';
import { Loader } from '../components/Loader';
import {SearchResultsContext} from '../store/searchResults/Context';
import { SearchResultsActions } from '../store/searchResults/Actions';

const renderSearchComponent = (isExpanded: boolean) =>  isExpanded ? <SearchComponent/> : null

const renderNavLinks = (dispatch: React.Dispatch<SearchResultsActions>, history: History) => {

    const onNavItemClick = (tabName: string) => history.push('/' + tabName.toLowerCase());
    
    return (
        <div className="navigation">
            <input type="checkbox" className="navigation_checkbox" id="navi-toggle" name="checkbox"/>
            <label htmlFor="navi-toggle" className="navigation_button">
                <span className="navigation_icon">&nbsp;</span>
            </label>
            <div className="navigation_background">&nbsp;</div>

            <nav className="navigation_nav">
                <ul className="nav_links">
                    <label htmlFor="navi-toggle" id="concerts" onClick={() => onNavItemClick('Concerts')}>
                        Concerts
                    </label>
                    <label htmlFor="navi-toggle" id="sports" onClick={() => onNavItemClick('Sports')}>
                        Sports
                    </label>
                    <label htmlFor="navi-toggle" id="festivals" onClick={() => onNavItemClick('Festivals')}>
                        Festivals
                    </label>
                    <label htmlFor="navi-toggle" id="theatre" onClick={() => onNavItemClick('Theatre')}>
                        Theatre
                    </label>
                </ul>
            </nav>
        </div>
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
                    {renderNavLinks(searchResultsDispatch, history)} 
                </nav>
                </div>
            </header>
            {isExpanded && renderBanner(searchResultsState.lastQuery, '')}
        </div>
    )
}