import * as React from 'react'
// stubhub has a field called ticketInfo -> if ticketInfo.totalListings = 0, show some sort of message indicating that fact
export const Card = ({date, time, priceBeforeFees, priceAfterFees, isPriceEstimated, source, name, venue, url}: any) => {
  const priceBeforeFeesText = "Price before fees: ";
  const priceAfterFeesText = "Price after fees: ";
  const priceDisclaimerText = "*Estimated fees based on the average amount from source website. Prices may vary.";
  const priceBeforeFeesFormatted = priceBeforeFees ? '$'+ priceBeforeFees.toFixed(2) : 'N/A';
  const priceAfterFeesFormatted = priceAfterFees ? '$' + priceAfterFees.toFixed(2) : 'This vendor is not currently listing prices for this event. Please visit link for additional details.';
  const priceBeforeFeesHTML = priceBeforeFees ? <p className="Card_prices-text">{priceBeforeFeesText}<b className="Card_prices-soft">{priceBeforeFeesFormatted}</b></p> :  <p className="Card_prices-text">{priceBeforeFeesText}<b className="Card_prices-soft">{priceBeforeFeesFormatted}</b></p>;
  const priceAfterFeesHTML = priceAfterFees ? <p className="Card_prices-text">{priceAfterFeesText}<b className="Card_prices-bold">{priceAfterFeesFormatted}</b></p> : <p className="Card_prices-text Card_prices-text--tiny">{priceAfterFeesFormatted}</p>;
  const priceDisclaimer = isPriceEstimated ? <p className="Card_prices-text Card_prices-text--tiny">{priceDisclaimerText}</p> : null;
  const dayText = date.slice(0,3);
  const dateText = date.slice(5);
  const dateTimeText = dayText + " - " + time
  return (
    <div className="Card">
      <div className="Card_content">
        <span className="Card_logo">
          <SourceLogo source={source}/>
        </span>
        <div className="Card_info">
          <p>{name}</p>
          <p>{venue}</p>
          <p>{dateText}</p>
          <p>{dateTimeText}</p>
        </div>
        <div className="Card_prices">
          {priceBeforeFeesHTML}
          {priceAfterFeesHTML}
          {priceDisclaimer}
        </div>
      </div>
      <div className="Card_button-row">
        <a href={url} target="_blank" rel="noopener noreferrer" className="Card_button margin-tiny">
          <p>View Tickets</p>
        </a>
      </div>
    </div>
  )
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


