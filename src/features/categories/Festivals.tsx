import * as React from 'react';
import EventsGrid, { EventObject } from '../../components/EventsGrid';
import { SearchResultsContext } from '../../store/searchResults/Context';
import { setLastQuery } from '../../store/searchResults/Actions';

const festivals: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/a14/504ebc67-251e-4f69-b8b1-5c079d0fda14_1532591_RETINA_PORTRAIT_16_9.jpg", name: "iHeartRadio ALTer Ego"},
    { url: "https://s1.ticketm.net/dam/c/ab4/6367448e-7474-4650-bd2d-02a8f7166ab4_106161_RETINA_PORTRAIT_16_9.jpg", name: "Once Upon a Time in LA"},
    { url: "https://s1.ticketm.net/dam/a/d14/03e3aa98-f9d5-4913-9fb0-2145ddec7d14_1522871_RETINA_PORTRAIT_16_9.jpg", name: "iHeartRadio Jingle Ball"},
    { url: "https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_PORTRAIT_16_9.jpg", name: "Cruel World Festival"},
    { url: "https://s1.ticketm.net/dam/c/ab4/6367448e-7474-4650-bd2d-02a8f7166ab4_106161_RETINA_PORTRAIT_16_9.jpg", name: "Primavera Sound"},
    { url: "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_PORTRAIT_16_9.jpg", name: "Calibash"},
    { url: "https://s1.ticketm.net/dam/a/94b/b9952f5d-cf31-41d0-bd1f-7ed01bee094b_589291_RETINA_PORTRAIT_16_9.jpg", name: "Happy Together Tour"},
    { url: "https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_PORTRAIT_16_9.jpg", name: "Just Like Heaven Festival"},
];

export const Festivals = () => {
    const { searchResultsDispatch } = React.useContext(SearchResultsContext);

    React.useEffect(() => {
        searchResultsDispatch(setLastQuery('Sports'));
    }, []);
    
    return (
        <section className="category_container">
            <div className="category_content">
                <EventsGrid title={'Festivals'} items={festivals}/>
            </div>
        </section>
    )
}