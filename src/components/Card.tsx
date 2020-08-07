import * as React from 'react'
// TODO: add a space here for priceBeforeFee and priceAfterFee
// also include logic to do a custom calculation for fees (in case the price after fees is not avaialble)
// stubhub has a field called ticketInfo -> if ticketInfo.totalListings = 0, show some sort of message indicating that fact
export const Card = ({date, priceBeforeFees, priceAfterFees, source, name}: any) => {
  const priceBeforeFeesText = "Price before fees: ";
  const priceAfterFeesText = "Price after fees: ";
  const priceBeforeFeesFormatted = priceBeforeFees ? '$'+ priceBeforeFees + '.00' : '';
  const priceAfterFeesFormatted = priceAfterFees ? '$' + priceAfterFees + '.00' : '';
  const priceBeforeFeesHTML = priceBeforeFees ? <p className="Card_prices-text">{priceBeforeFeesText}<b className="Card_prices-soft">{priceBeforeFeesFormatted}</b></p> : null;
  const priceAfterFeesHTML = priceAfterFees ?  <p className="Card_prices-text">{priceAfterFeesText}<b className="Card_prices-bold">{priceAfterFeesFormatted}</b></p> : null;
  return (
    <div className="Card">
      <div className="Card_content">
        <span className="Card_logo">
          <SourceLogo source={source}/>
        </span>
        <div className="Card_info">
          <p>{name}</p>
          <p>{date}</p>
        </div>
        <div className="Card_prices">
          {priceBeforeFeesHTML}
          {priceAfterFeesHTML}
        </div>
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


