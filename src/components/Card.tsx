import * as React from 'react'
// stubhub has a field called ticketInfo -> if ticketInfo.totalListings = 0, show some sort of message indicating that fact
export const Card = ({date, time, priceBeforeFees, priceAfterFees, isPriceEstimated, source, name, venueName, venueCity, url, sourceUrl, status}: any) => {
  const asterisk = isPriceEstimated ? '*' : '';
  const priceBeforeFeesText = "Price before fees: ";
  const priceAfterFeesText = "Price after fees: ";
  const priceDisclaimerText = "*Estimated fees based on the average amount from source website. Prices may vary.";
  const priceBeforeFeesFormatted = priceBeforeFees ? '$'+ priceBeforeFees.toLocaleString(undefined, {minimumFractionDigits: 2}) : '';
  const priceAfterFeesFormatted = priceAfterFees ? '$' + priceAfterFees.toLocaleString(undefined, {minimumFractionDigits: 2}) + asterisk : 'This vendor is not currently listing prices for this event. Please visit link for additional details.';
  const priceBeforeFeesHTML = priceBeforeFees ? <p className="Card_prices-text">{priceBeforeFeesText}<b className="Card_prices-soft">{priceBeforeFeesFormatted}</b></p> : null;
  const priceAfterFeesHTML = priceAfterFees ? <p className="Card_prices-text">{priceAfterFeesText}<b className="Card_prices-bold">{priceAfterFeesFormatted}</b></p> : <p className="Card_prices-text Card_prices-text--tiny">{priceAfterFeesFormatted}</p>;
  const priceDisclaimer = isPriceEstimated ? <p className="Card_prices-text Card_prices-text--tiny">{priceDisclaimerText}</p> : null;
  const venueText = venueName ? venueName + ' - ' + venueCity : 'Venue TBD';
  const urlContent = url || sourceUrl;
  const displayDateText = (date: string) => {
    if (date) {
      const dayText = date.slice(0,3);
      const dateText = date.slice(5);
      const timeText = time || "TBD";
      const dateTimeText = dayText + " - " + timeText;
      return <div className="Card_date"><p>{dateText}</p><p>{dateTimeText}</p></div>
    } else {
      return <div className="Card_date Card_date--tbd"><p>Date: TBD</p></div>
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
      {displayDateText(date)}
    </div>
  );
  const renderCardPrices = () => {
    const cardPrices = (
      <div className="Card_prices">
        {priceBeforeFeesHTML}
        {priceAfterFeesHTML}
        {priceDisclaimer}
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
    <div className="Card">
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

const StubhubLogo = () => <b>StubHub</b>

const TicketmasterLogo = () => <b>TicketMaster</b>

const SeatGeekLogo = () => <b>SeatGeek</b>
// title, price, date 
const SourceLogo = ({source}: any) => {
  let logo; 
  switch(source) {
    case 'ticketmaster': 
      logo = <TicketmasterLogo/>;
      break;
    case 'stubhub':
      logo = <StubhubLogo/>;
      break;
    case 'seatgeek':
      logo = <SeatGeekLogo/>
      break;
    default: 
      logo = null;
  }
  return logo
}


