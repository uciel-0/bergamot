import * as React from 'react';

export interface EventObject {
    name: string;
    url: string;
}

interface EventGridItemProps {
    event: EventObject;
}

const EventGridItem = ({event}: EventGridItemProps) => {
    return (
        <div className="events-grid_item">
            <p className="events-grid_item-name">{event.name}</p>
            <img src={event.url} alt={event.name + ' image'}/>
        </div>
    )
}

const EventsGrid = ({title, items}: any) => {
    return (
        <div className="events-grid">
            <h1 className="events-grid_title">{title}</h1>
            <div className="events-grid_container">
                {items.map((item: EventObject) => <EventGridItem event={item}/>)}
            </div>
        </div>
    )
}

export default EventsGrid;