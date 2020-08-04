import * as React from 'react'
// TODO: add a space here for priceBeforeFee and priceAfterFee
// also include logic to do a custom calculation for fees (in case the price after fees is not avaialble)
// stubhub has a field called ticketInfo -> if ticketInfo.totalListings = 0, show some sort of message indicating that fact
export const Card = ({date, priceBeforeFees, priceAfterFees, source, name}: any) => {
  const priceBeforeFeesText = priceBeforeFees ? `Price before fees: $${priceBeforeFees}` : null;
  const priceAfterFeesText = priceAfterFees ? `Price after fees: $${priceAfterFees}` : null;
  return (
    <div className="Card">
      <span className="Card_logo">
        <SourceLogo source={source}/>
      </span>
      <div className="Card_info">
        <p>{name}</p>
        <p>{date}</p>
        <p>{priceBeforeFeesText}</p>
        <p>{priceAfterFeesText}</p>
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


