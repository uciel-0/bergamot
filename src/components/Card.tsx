import * as React from 'react'

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

export const Card = ({date, price, source, name}: any) => {
  const priceFormatted = price ? `From $${price}` : null;
  return (
    <div className="Card">
      <span className="Card_logo">
        <SourceLogo source={source}/>
      </span>
      <div className="Card_info">
        <p>{name}</p>
        <p>{date}</p>
        <p>{priceFormatted}</p>
      </div>
    </div>
  )
}

export const CardGroup = () => {
  
}