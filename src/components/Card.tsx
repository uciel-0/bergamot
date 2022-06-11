import * as React from 'react'
import TicketmasterLogo from '../svg/TicketmasterLogo';
import StubhubLogo from '../svg/StubhubLogo';
import SeatgeekLogo from '../svg/SeatgeekLogo';

// stubhub has a field called ticketInfo -> if ticketInfo.totalListings = 0, show some sort of message indicating that fact
export const Card = ({date, time, priceBeforeFees, priceAfterFees, source, name, venueName, venueCity, url, sourceUrl, status, showPricesWithFees}: any) => {
  // const asterisk = isPriceEstimated ? '*' : '';
  const priceBeforeFeesFormatted = priceBeforeFees ? '$'+ priceBeforeFees.toLocaleString(undefined, {minimumFractionDigits: 2}) : '';
  const priceAfterFeesFormatted = priceAfterFees ? '$' + priceAfterFees.toLocaleString(undefined, {minimumFractionDigits: 2}) : 'No prices available';
  const priceBeforeFeesHTML = priceBeforeFees ? <p className="Card_prices-text">Price:<b className="Card_prices-bold">{priceBeforeFeesFormatted}</b></p> : null;
  const priceAfterFeesHTML = priceAfterFees ? <p className="Card_prices-text">Price:<b className="Card_prices-bold">{priceAfterFeesFormatted}</b></p> : <p className="Card_prices-text Card_prices-text--tiny">{priceAfterFeesFormatted}</p>;
  const venueText = venueName ? venueName + ' - ' + venueCity : 'Venue TBD';
  const urlContent = url || sourceUrl;

  const displayTimeText = (dateTimeString: string) => {
    if (dateTimeString) {
      const timeText = time || 'TBD';
      return <div className="Card_time"><p>{timeText}</p></div>
    }
  }
  const renderCardLogo = () => (
    <span className="Card_logo">
      <SourceLogo source={source}/>
    </span>
  );
  // need some logic here for when status = cancelled 
  const renderCardInfo = () => (
    <div className="Card_info">
      <p className="Card_title">{name}</p>
      <p className="Card_location">{venueText}</p>
      {displayTimeText(date)}
    </div>
  );
  const renderCardPrices = () => {
    const cardPrices = (
      <div className="Card_prices">
        {showPricesWithFees ? priceAfterFeesHTML : priceBeforeFeesHTML}
      </div> 
    );
    const eventCancelledMessage = (
      <div className="Card_prices Card_prices-cancelled">
        <p>Cancelled/Postponed Event</p>
      </div> 
    );
    return status !== 'cancelled' ? cardPrices : eventCancelledMessage;
  }
  const renderButton = () => {
    // currently two indicators of a faulty event 
    // one is if the status is cancelled, the other is if the priceAfterFees = null 
    // in either of these cases, return the "View Info" text
    const buttonText = status !== 'cancelled' && priceAfterFees !== null ? 'View Tickets' : 'View Info';
    return (
      <a href={urlContent} target="_blank" rel="noopener noreferrer" className="Card_button margin-tiny">
        <p>{buttonText}</p>
      </a>
    );
  }
  return name ? (
    <div className="Card glow-on-hover">
      {renderCardLogo()}
      <div className="Card_section-1">
        {renderCardInfo()}
      </div>
      <div className="Card_section-2">
        {renderCardPrices()}
      </div>
      <div className="Card_button">
        {renderButton()}
      </div>
    </div>
  ) : null;
}

// title, price, date 
const SourceLogo = ({source}: any) => {
  let logo; 
  switch(source) {
    case 'ticketmaster': 
      logo = <TicketmasterLogo className="ticketmaster-logo"/>;
      break;
    case 'stubhub':
      logo = <StubhubLogo className="stubhub-logo"/>;
      break;
    case 'seatgeek':
      logo = <SeatgeekLogo/>
      break;
    default: 
      logo = null;
  }
  return logo
}


