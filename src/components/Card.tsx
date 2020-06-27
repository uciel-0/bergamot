import * as React from 'react'

// title, price, date 

export const Card = (props: any) => {
  const formattedDate = new Date(props.date).toDateString();
  const price = props.price ? `From $${props.price}` : null;
  return (
    <div className="Card">
      <p>{props.name}</p>
      <p>{formattedDate}</p>
      <p>{price}</p>
    </div>
  )
}