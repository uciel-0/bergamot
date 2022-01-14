import * as React from 'react';
import EventsGrid, { EventObject } from '../../components/EventsGrid';
import { SearchResultsContext } from '../../store/searchResults/Context';
import { setLastQuery } from '../../store/searchResults/Actions';

const pop: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/987/76ff7a29-6b21-4ac5-bdf3-d7268760e987_1206471_RETINA_PORTRAIT_16_9.jpg", name: 'Harry Styles' },
    { url: "https://s1.ticketm.net/dam/a/15e/d2959961-cc88-4697-8aca-3911aeb8e15e_1553921_RETINA_PORTRAIT_16_9.jpg", name: 'Justin Bieber' },
    { url: "https://s1.ticketm.net/dam/a/e6d/492d04da-7c74-4a70-9f87-709d96282e6d_1517701_RETINA_PORTRAIT_16_9.jpg", name: 'Pentatonix' },
    { url: "https://s1.ticketm.net/dam/a/fbd/971606a2-480c-4aaa-accf-ee4f6630afbd_1479371_RETINA_PORTRAIT_16_9.jpg", name: 'Big Time Rush' },
    { url: "https://s1.ticketm.net/dam/a/d45/1efd1cee-aaf5-4c1d-b579-b12ca301ad45_1426221_RETINA_PORTRAIT_16_9.jpg", name: 'Bruno Mars' },
    { url: "https://s1.ticketm.net/dam/a/384/2dbd2c80-4042-4429-b5fe-563f7227b384_1477701_RETINA_PORTRAIT_16_9.jpg", name: 'John Mayer' },
    { url: "https://s1.ticketm.net/dam/a/ca4/61331bb7-8ffb-4afa-9496-8d4bc7a3eca4_1498031_RETINA_PORTRAIT_16_9.jpg", name: 'WILLOW' },
    { url: "https://s1.ticketm.net/dam/a/29d/209fd13b-6314-4ee8-bb43-b0820eedc29d_1507911_RETINA_PORTRAIT_16_9.jpg", name: 'Dua Lipa'}
];

const rock: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/58c/c023b7ce-e8fb-4bb0-8996-7ff4b4be258c_858341_RETINA_PORTRAIT_16_9.jpg", name: 'Elton John' },
    { url: "https://s1.ticketm.net/dam/a/d7d/7e3c2312-1268-4243-b6ee-9ef09d039d7d_1505061_RETINA_PORTRAIT_16_9.jpg", name: 'The Rolling Stones' },
    { url: "https://s1.ticketm.net/dam/a/742/52406a76-80d9-47a9-8c95-fabaa7a9d742_1531071_RETINA_PORTRAIT_16_9.jpg", name: 'Coldplay' },
    { url: "https://s1.ticketm.net/dam/a/bc3/48a3747f-f6e1-403f-bca8-658c20b98bc3_1544981_RETINA_PORTRAIT_16_9.jpg", name: 'Billy Joel' },
    { url: "https://s1.ticketm.net/dam/a/d1d/9ff2c038-6ae7-4aca-a97f-4f472d92ed1d_1517601_RETINA_PORTRAIT_16_9.jpg", name: 'Tool' },
    { url: "https://s1.ticketm.net/dam/a/9f8/763a98e2-a371-414e-80ff-03215d4bf9f8_1525991_RETINA_PORTRAIT_16_9.jpg", name: 'Red Hot Chili Peppers' },
    { url: "https://s1.ticketm.net/dam/a/603/dcb759cf-92ec-41cb-8320-d6785ee97603_1524531_RETINA_PORTRAIT_16_9.jpg", name: 'Joan Jett & the Blackhearts' },
    { url: "https://s1.ticketm.net/dam/a/1b8/2aa88988-94a0-48d0-a4d1-19eb4b9571b8_1331031_RETINA_PORTRAIT_16_9.jpg", name: 'Mötley Crüe'}
];

const country: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/d3f/1438af54-d4e3-41c3-9615-61237dfe5d3f_1433081_RETINA_PORTRAIT_16_9.jpg", name: 'Dan + Shay' },
    { url: "https://s1.ticketm.net/dam/a/b70/bbb22ed9-520a-48c4-86ab-d0cf17684b70_1250811_RETINA_PORTRAIT_16_9.jpg", name: 'Kenny Chesney' },
    { url: "https://s1.ticketm.net/dam/a/78d/394b6b72-4a98-4742-afb2-bac783bca78d_438551_RETINA_PORTRAIT_16_9.jpg", name: 'Garth Brooks' },    
    { url: "https://s1.ticketm.net/dam/a/9a7/9dad98f0-a497-4d0e-9de2-88302c2389a7_1498901_RETINA_PORTRAIT_16_9.jpg", name: 'Kacey Musgraves' },
    { url: "https://s1.ticketm.net/dam/a/17f/38c470b2-aef5-4e11-b3ed-1eaa4600b17f_1495721_RETINA_PORTRAIT_16_9.jpg", name: 'Luke Combs' },
    { url: "https://s1.ticketm.net/dam/a/244/e01c0060-3cb0-43f2-bb72-2779eef76244_1263051_RETINA_PORTRAIT_16_9.jpg", name: 'Old Dominion' },
    { url: "https://s1.ticketm.net/dam/a/13f/791c12e4-5781-4e3f-bcb3-840f193d313f_1436071_RETINA_PORTRAIT_16_9.jpg", name: 'Ashley McBryde' },
    { url: "https://s1.ticketm.net/dam/a/754/de44f735-7be1-41f8-81b8-60ff37181754_1283701_RETINA_PORTRAIT_16_9.jpg", name: 'Chris Stapleton' }
];

const hipHop: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/3e7/dc88d812-ab5d-416d-96a4-0d41e3e5c3e7_1400451_RETINA_PORTRAIT_16_9.jpg", name: 'The Weeknd' },
    { url: "https://s1.ticketm.net/dam/a/08f/a4fb5112-7503-4149-82ab-0ecc8c76d08f_1158801_RETINA_PORTRAIT_16_9.jpg", name: 'Snoop Dogg' },
    { url: "https://s1.ticketm.net/dam/a/010/aa178e43-b5e8-44aa-bc2b-8c5975412010_1419701_RETINA_PORTRAIT_16_9.jpg", name: 'Bad Bunny' },
    { url: "https://s1.ticketm.net/dam/a/2df/96ff94c5-c081-4a51-9be2-1eef7e27b2df_529691_RETINA_PORTRAIT_16_9.jpg", name: 'Kendrick Lamar' },
    { url: "https://s1.ticketm.net/dam/a/80e/bd176f5b-ad46-49cd-92a9-b056fb0dd80e_616721_RETINA_PORTRAIT_16_9.jpg", name: 'Eminem' },
    { url: "https://s1.ticketm.net/dam/c/48b/2352e3b5-8496-496b-97a3-e605177e848b_105851_RETINA_PORTRAIT_16_9.jpg", name: 'Joji' },
    { url: "https://s1.ticketm.net/dam/a/e5c/547e7088-2532-4909-a225-f76f3a46be5c_1450971_RETINA_PORTRAIT_16_9.jpg", name: 'D-Nice' },
    { url: "https://s1.ticketm.net/dam/a/b04/454f06e4-82dc-4804-952e-dfb6764f0b04_1485851_RETINA_PORTRAIT_16_9.jpg", name: 'Tyler, The Creator' },
];

const rhythmAndBlues: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/8d1/c941c0bf-6b68-4739-8324-85b8edbe18d1_1435671_RETINA_PORTRAIT_16_9.jpg", name: 'Alicia Keys' },
    { url: "https://s1.ticketm.net/dam/a/40b/53fd48de-f40b-445e-b8e0-20825778b40b_789431_RETINA_PORTRAIT_16_9.jpg", name: 'Tierra' },
    { url: "https://s1.ticketm.net/dam/c/48b/2352e3b5-8496-496b-97a3-e605177e848b_105851_RETINA_PORTRAIT_16_9.jpg", name: 'Jagged Edge' },
    { url: "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_PORTRAIT_16_9.jpg", name: 'The Soul Rebels' },
    { url: "https://s1.ticketm.net/dam/a/bcd/171d3b96-6ea7-4c6f-8c97-bb08bee96bcd_432461_RETINA_PORTRAIT_16_9.jpg", name: 'Jon B.' },
    { url: "https://s1.ticketm.net/dam/a/b23/7741f1d9-23e9-4516-8064-ecd78c96bb23_1508881_RETINA_PORTRAIT_16_9.jpg", name: 'Queen Naija' },
    { url: "https://s1.ticketm.net/dam/a/96b/494689f0-48e7-43e2-ad66-c52f7c0d496b_1497291_RETINA_PORTRAIT_16_9.jpg", name: 'Grace Weber' },
    { url: "https://s1.ticketm.net/dam/c/48b/2352e3b5-8496-496b-97a3-e605177e848b_105851_RETINA_PORTRAIT_16_9.jpg", name: 'Pablo Cruise' },
];

// const template: EventObject[] = [
//     { url: "", name: '' },
//     { url: "", name: '' },
//     { url: "", name: '' },
//     { url: "", name: '' },
//     { url: "", name: '' },
//     { url: "", name: '' },
//     { url: "", name: '' },
//     { url: "", name: '' },
// ];

export const Concerts = () => {
    const { searchResultsDispatch, searchResultsState } = React.useContext(SearchResultsContext);

    React.useEffect(() => {
        if (searchResultsState.lastQuery !== 'Concerts') {
            searchResultsDispatch(setLastQuery('Concerts'));
        }
    }, []);
    
    return (
        <section className="category_container">
            <div className="category_content">
                <EventsGrid title={'Pop'} items={pop}/>
                <EventsGrid title={'Rock'} items={rock}/>
                <EventsGrid title={'Country'} items={country}/>
                <EventsGrid title={'Hip-Hop'} items={hipHop}/>
                <EventsGrid title={'R&B'} items={rhythmAndBlues}/>
            </div>
        </section>
    )
}