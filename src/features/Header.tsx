import * as React from 'react';
import { BopIconBlack } from '../svg/BopIconBlack';
import { BopIconWhite } from '../svg/BopIconWhite';
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchComponent } from './SearchComponent';
import { Loader } from '../components/Loader';
import { SearchResultsContext } from '../store/searchResults/Context';
import { SearchResultsActions } from '../store/searchResults/Actions';
//import User from '../svg/User';
//import Help from '../svg/Help';

const renderSearchComponent = (isExpanded: boolean) => isExpanded ? <SearchComponent /> : null

const NavLinks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const onNavItemClick = (tabName: string) => navigate('/' + tabName.toLowerCase());
    const navLinksStyle = location.pathname.includes('home') ? 'nav_links' : 'nav_links white'
    return (
        <div className="navigation">
            <input type="checkbox" className="navigation_checkbox" id="navi-toggle" name="checkbox" />
            <label htmlFor="navi-toggle" className="navigation_button">
                <span className="navigation_icon">&nbsp;</span>
            </label>
            <div className="navigation_background">&nbsp;</div>

            <nav className="navigation_nav">
                <ul className={navLinksStyle}>
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
        <Loader />
    </>
)

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isExpanded = location.pathname.includes('search') || location.pathname.includes('concerts') || location.pathname.includes('sports') || location.pathname.includes('festivals') || location.pathname.includes('theatre');
    const headerContainerStyle = isExpanded ? 'wavy white-text' : 'white-background black-text';
    // const iconStyles = (mainClass: string) => history.location.pathname.includes('home') ? `${mainClass}` : `${mainClass} ${mainClass}-white`
    const { searchResultsState, searchResultsDispatch } = React.useContext(SearchResultsContext);
    return (
        <div className={headerContainerStyle}>
            <header className="header">
                <div className="header_content">
                    <div className="bop-logo_container" onClick={() => navigate('/home')}>
                        {location.pathname.includes('home') ? <BopIconBlack className={"bop-logo_icon"} /> : <BopIconWhite className='bop-logo_icon' />}
                    </div>
                    <nav className="header_nav-bar">
                        {renderSearchComponent(isExpanded)}
                        {<NavLinks />}
                    </nav>
                    {/* <span className="header_icons"> */}
                        {/* <User className={iconStyles('fa-user')}/> */}
                        {/* <Help className={iconStyles('fa-help')}/> */}
                    {/* </span> */}
                </div>
            </header>
            {isExpanded && renderBanner(searchResultsState.lastQuery, '')}
        </div>
    )
}