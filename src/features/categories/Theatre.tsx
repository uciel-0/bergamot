import * as React from 'react';
import EventsGrid, { EventObject } from '../../components/EventsGrid';
import { SearchResultsContext } from '../../store/searchResults/Context';
import { setLastQuery } from '../../store/searchResults/Actions';

const musicals: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/531/59676cb1-c1f4-4c8b-8f2f-a517d695b531_1431261_RETINA_PORTRAIT_16_9.jpg", name: "The Lion King"},
    { url: "https://s1.ticketm.net/dam/a/300/88bcb3d0-aa78-428d-ad10-52514ea72300_570131_RETINA_PORTRAIT_16_9.jpg", name: "Hamilton"},
    { url: "https://s1.ticketm.net/dam/a/859/44bf9516-a238-4676-bd8c-a1c72e489859_91111_RETINA_PORTRAIT_16_9.jpg", name: "Wicked"},
    { url: "https://s1.ticketm.net/dam/a/344/847a4071-e17a-4771-bc28-03dc33ad6344_1026321_RETINA_PORTRAIT_16_9.jpg", name: "Radio City Christmas"},
    { url: "https://s1.ticketm.net/dam/a/3e9/2527a208-8c58-41a0-8e1d-aea730c513e9_1498181_RETINA_PORTRAIT_16_9.jpg", name: "Moulin Rouge"},
    { url: "https://s1.ticketm.net/dam/a/94c/f37ea489-3102-491b-ad52-7a1393e5794c_404501_RETINA_PORTRAIT_16_9.jpg", name: "Aladdin - The Musical"},
    { url: "https://s1.ticketm.net/dam/c/393/b74d3ddc-a5f3-4e09-a801-89c36b774393_106071_RETINA_PORTRAIT_16_9.jpg", name: "Mrs. Doubtfire"},
    { url: "https://s1.ticketm.net/dam/c/07d/fda8c807-42eb-4b81-9f16-f3a8367e107d_106371_RETINA_PORTRAIT_16_9.jpg", name: "Chicago the Musical"},
];

const plays: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/c/07d/fda8c807-42eb-4b81-9f16-f3a8367e107d_106371_RETINA_PORTRAIT_16_9.jpg", name: "To Kill a Mockingbird"},
    { url: "https://s1.ticketm.net/dam/a/7cc/cd68f255-1ec6-4751-a4e0-a5ccf5bfd7cc_1147491_RETINA_PORTRAIT_16_9.jpg", name: "Harry Potter and the Cursed Child"},
    { url: "https://s1.ticketm.net/dam/a/b98/d5e30a85-6795-4f65-83ba-eb5531f7bb98_216351_RETINA_PORTRAIT_16_9.jpg", name: "Macbeth"},
    { url: "https://s1.ticketm.net/dam/a/5b5/37036c55-080d-4df2-b0d5-bb35e371f5b5_1156001_RETINA_PORTRAIT_16_9.jpg", name: "The Lehman Trilogy"},
    { url: "https://s1.ticketm.net/dam/c/07d/fda8c807-42eb-4b81-9f16-f3a8367e107d_106371_RETINA_PORTRAIT_16_9.jpg", name: "Plaza Suite"},
    { url: "https://s1.ticketm.net/dam/a/2e6/8ed1a668-f5b4-4732-9b4f-1f20944a82e6_42301_RETINA_PORTRAIT_16_9.jpg", name: "A Charlie Brown Christmas"},
    { url: "https://s1.ticketm.net/dam/a/e57/3d4e5f34-718f-4e84-9767-4d63a6edce57_1335011_RETINA_PORTRAIT_16_9.jpg", name: "Hadestown "},
    { url: "https://s1.ticketm.net/dam/c/393/b74d3ddc-a5f3-4e09-a801-89c36b774393_106071_RETINA_PORTRAIT_16_9.jpg", name: "Dana H."}
];

const comedy: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/f11/506e6172-576c-49a1-aaa4-4eb2be015f11_1235551_RETINA_PORTRAIT_16_9.jpg", name: "Michelle Wolf"},
    { url: "https://s1.ticketm.net/dam/a/750/d7c99169-a115-4924-a020-baa488624750_249061_RETINA_PORTRAIT_16_9.jpg", name:"Marc Maron"},
    { url: "https://s1.ticketm.net/dam/a/fe9/71e41852-bbf0-4b32-b0ee-93706d4c2fe9_1302931_RETINA_PORTRAIT_16_9.jpg", name: "Jeff Dunham"},
    { url: "https://s1.ticketm.net/dam/a/93b/aa39c6d4-9b0b-4bd5-98aa-1ed529bf293b_1524541_RETINA_PORTRAIT_16_9.jpg", name: "Bill Burr"},
    { url: "https://s1.ticketm.net/dam/a/75b/c342165a-8430-440a-ae6e-fb15f2cac75b_1485451_RETINA_PORTRAIT_16_9.jpg", name: "Dave Chappelle"},
    { url: "https://s1.ticketm.net/dam/a/777/403b9f09-a483-47c7-a978-b425d436f777_682361_RETINA_PORTRAIT_16_9.jpg", name: "Daniel Tosh"},
    { url: "https://s1.ticketm.net/dam/a/8b1/498a95e0-5d8f-4261-bd54-d7622776d8b1_1121561_RETINA_PORTRAIT_16_9.jpg", name: "Jerry Seinfeld"},
    { url: "https://s1.ticketm.net/dam/a/af9/0938789f-3245-4175-959e-ff8a0c4abaf9_1480621_RETINA_PORTRAIT_16_9.jpg", name: "Trevor Noah"}
];

const family: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/c2f/6bd97efe-e423-4878-9553-6630b2fb1c2f_1365981_RETINA_PORTRAIT_16_9.jpg", name: "Disney On Ice"},
    { url: "https://s1.ticketm.net/dam/a/261/09b7848a-eda4-471e-8f55-9ac5e38f1261_74551_RETINA_PORTRAIT_16_9.jpg", name: "Gazillion Bubble Show"},
    { url: "https://s1.ticketm.net/dam/a/57e/d9883750-a15a-44aa-97bb-9149ae20557e_850631_RETINA_PORTRAIT_16_9.jpg", name: "Justin Willman"},
    { url: "https://s1.ticketm.net/dam/a/17d/dfd9bbfd-cab0-46e3-b812-49b92720c17d_626881_RETINA_PORTRAIT_16_9.jpg", name: "Illusionist Rick Thomas"},
    { url: "https://s1.ticketm.net/dam/a/241/941e4b5a-5117-4186-882f-ef96ae19b241_952621_RETINA_PORTRAIT_16_9.jpg", name: "The Wild Kratts Live!"},
    { url: "https://s1.ticketm.net/dam/a/53e/44424087-e41b-4b19-908f-3019045aa53e_1166261_RETINA_PORTRAIT_16_9.jpg", name: "Paddington Gets in a Jam"},
    { url: "https://s1.ticketm.net/dam/c/ab4/6367448e-7474-4650-bd2d-02a8f7166ab4_106161_RETINA_PORTRAIT_16_9.jpg", name: "Holiday Express"},
    { url: "https://s1.ticketm.net/dam/a/47b/72d40522-e99b-4a4a-89c3-18b30feca47b_1070091_RETINA_PORTRAIT_16_9.jpg", name: "Sesame Street Live! Let's Party!"}
];


export const Theatre = () => {
    const { searchResultsDispatch, searchResultsState } = React.useContext(SearchResultsContext);

    React.useEffect(() => {
        if (searchResultsState.lastQuery !== 'Theatre') {
            searchResultsDispatch(setLastQuery('Theatre'));
        }
    }, []);
    
    return (
        <section className="category_container">
            <div className="category_content">
                <EventsGrid title={'Musicals'} items={musicals}/>
                <EventsGrid title={'Plays'} items={plays}/>
                <EventsGrid title={'Comedy'} items={comedy}/>
                <EventsGrid title={'Family'} items={family}/>
            </div>
        </section>
    )
}