import * as React from 'react';
import EventsGrid, { EventObject } from '../../components/EventsGrid';
import { SearchResultsContext } from '../../store/searchResults/Context';
import { setLastQuery } from '../../store/searchResults/Actions';

const nfl: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/608/ad100b89-b729-4822-8165-5b626c21a608_1325251_RETINA_PORTRAIT_16_9.jpg", name: 'Las Vegas Raiders' },
    { url: "https://s1.ticketm.net/dam/a/a1c/6b5bfe16-4a07-4d42-a817-b94243f9aa1c_1325381_RETINA_PORTRAIT_16_9.jpg", name: 'Tampa Bay Buccaneers' },
    { url: "https://s1.ticketm.net/dam/a/95c/0173c6d8-736f-487e-8146-794d0313095c_1325301_RETINA_PORTRAIT_16_9.jpg", name: 'New England Patriots' },
    { url: "https://s1.ticketm.net/dam/a/bd0/e2cf0fbc-7e18-45ee-b651-60f99f94dbd0_1325431_RETINA_PORTRAIT_16_9.jpg", name: 'Los Angeles Chargers' },
    { url: "https://s1.ticketm.net/dam/a/7e4/6f79c7fd-ac9a-4dba-97a6-1a6be82407e4_1325121_RETINA_PORTRAIT_16_9.jpg", name: 'Dallas Cowboys' },
    { url: "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RETINA_PORTRAIT_16_9.jpg", name: "Los Angeles Rams" },
    { url: "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_RETINA_PORTRAIT_16_9.jpg", name: 'San Francisco 49ers' },
    { url: "https://s1.ticketm.net/dam/a/0d8/35dc7659-f6e9-4ebf-af1c-d6c2f663e0d8_1325241_RETINA_PORTRAIT_16_9.jpg", name: 'Kansas City Chiefs'}
];

const ncaaFootball: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/43b/6d0c499b-e713-4fbc-901f-16934c19343b_1256581_RETINA_PORTRAIT_16_9.jpg", name: 'University of Michigan Wolverines Football' },
    { url: "https://s1.ticketm.net/dam/a/471/b5e9aaa3-6d32-4698-b471-fb933ce94471_1259731_RETINA_PORTRAIT_16_9.jpg", name: 'Alabama Crimson Tide Football' },
    { url: "https://s1.ticketm.net/dam/a/0f8/e5062198-00d5-472f-82d8-adc61d4e80f8_1260331_RETINA_PORTRAIT_16_9.jpg", name: 'Texas A&M Aggies Football' },
    { url: "https://s1.ticketm.net/dam/a/84c/6427e38d-e509-40cc-9f87-e02d1581984c_1257251_RETINA_PORTRAIT_16_9.jpg", name: 'Notre Dame Fighting Irish Football' },
    { url: "https://s1.ticketm.net/dam/a/b2b/7a16dff8-795d-4f04-b6ad-f35024a46b2b_1255581_RETINA_PORTRAIT_16_9.jpg", name: 'Ole Miss Rebels Football' },
    { url: "https://s1.ticketm.net/dam/a/e5f/23974d15-332a-436e-8fba-8e8ed1826e5f_1254651_RETINA_PORTRAIT_16_9.jpg", name: 'Florida State Seminoles Football' },
    { url: "https://s1.ticketm.net/dam/a/ba7/010c5fe9-5c49-4992-a954-d326346a9ba7_1255841_RETINA_PORTRAIT_16_9.jpg", name: 'Virginia Tech Hokies Football' },
    { url: "https://s1.ticketm.net/dam/a/228/dc09a8f6-c282-4373-b01e-b2f082f44228_1258851_RETINA_PORTRAIT_16_9.jpg", name: 'Purdue Boilermakers Football' },
];

const nba: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/94e/ec74f677-ac36-4f43-9eda-df3fec87e94e_1490311_RETINA_PORTRAIT_16_9.jpg", name: 'Philadelphia 76ers'},
    { url: "https://s1.ticketm.net/dam/a/c90/965833d9-2f76-4e79-bd87-f2bc61282c90_1339931_RETINA_PORTRAIT_16_9.jpg", name: 'Los Angeles Lakers'},
    { url: "https://s1.ticketm.net/dam/a/172/074c3535-bfcf-49e2-a0f9-03d947862172_1340171_RETINA_PORTRAIT_16_9.jpg", name: 'Chicago Bulls'},
    { url: "https://s1.ticketm.net/dam/a/120/d05753bc-fa2b-4253-9a38-4b4d41a04120_1339611_RETINA_PORTRAIT_16_9.jpg", name: 'Washington Wizards'},
    { url: "https://s1.ticketm.net/dam/a/158/e8147ef7-aaf2-4be3-be49-815e08d32158_1340101_RETINA_PORTRAIT_16_9.jpg", name: 'Boston Celtics'},
    { url: "https://s1.ticketm.net/dam/a/512/fb748312-e0a4-455f-95e1-6fda0c1c1512_1339851_RETINA_PORTRAIT_16_9.jpg", name: 'Orlando Magic'},
    { url: "https://s1.ticketm.net/dam/a/518/971b3e12-b253-4f8a-9896-874192c51518_1340071_RETINA_PORTRAIT_16_9.jpg", name: 'LA Clippers'},
    { url: "https://s1.ticketm.net/dam/a/403/fb1379e0-0c54-4550-a940-81a175dbd403_1339871_RETINA_PORTRAIT_16_9.jpg", name: 'New York Knicks'},
];

const nhl: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/f5d/a102b982-759b-4cd4-aeb6-ed66453daf5d_1254801_RETINA_PORTRAIT_16_9.jpg", name: 'Vegas Golden Knights'},
    { url: "https://s1.ticketm.net/dam/a/591/6d5a8797-3670-404e-9b27-7ba5b4bcc591_1277201_RETINA_PORTRAIT_16_9.jpg", name: 'Dallas Stars'},
    { url: "https://s1.ticketm.net/dam/a/d4a/f60ad2df-553d-4158-9109-0d713be71d4a_1254751_RETINA_PORTRAIT_16_9.jpg", name: 'Philadelphia Flyers'},
    { url: "https://s1.ticketm.net/dam/a/f47/8f8aec97-1ab2-499f-8c43-598fa76c6f47_1511011_RETINA_PORTRAIT_16_9.jpg", name: 'Montreal Canadiens'},
    { url: "https://s1.ticketm.net/dam/a/2d9/2f921db0-3766-4ceb-b1a8-597b8cc672d9_1277181_RETINA_PORTRAIT_16_9.jpg", name: 'Toronto Maple Leafs'},
    { url: "https://s1.ticketm.net/dam/a/086/700ab6d7-af21-4012-a38d-51f876a9b086_1277281_RETINA_PORTRAIT_16_9.jpg", name: 'Chicago Blackhawks'},
    { url: "https://s1.ticketm.net/dam/a/0bb/4a437357-2478-48e0-b33b-2527f62c40bb_1277331_RETINA_PORTRAIT_16_9.jpg", name: 'Minnesota Wild'},
    { url: "https://s1.ticketm.net/dam/a/015/c6fbf2ff-8115-4f25-aeae-c61bed8d2015_1277431_RETINA_PORTRAIT_16_9.jpg", name: 'Detroit Red Wings'},
];

const ncaaBasketball: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/3b7/99f2b4dd-41e9-44bf-8450-41fcd71793b7_1254481_RETINA_PORTRAIT_16_9.jpg", name: 'Michigan State Spartans Basketball'},
    { url: "https://s1.ticketm.net/dam/a/a6c/ba6b8813-3ccc-4dcd-94d0-fc2c8be5fa6c_1257981_RETINA_PORTRAIT_16_9.jpg", name: 'Illinois Fighting Illini Basketball'},
    { url: "https://s1.ticketm.net/dam/a/2fc/e646696a-f3c7-4cee-9fd0-732d31bae2fc_1256711_RETINA_PORTRAIT_16_9.jpg", name: 'Michigan Wolverines Basketball'},
    { url: "https://s1.ticketm.net/dam/a/568/5873432d-6f76-4bce-ab07-a99155185568_1257201_RETINA_PORTRAIT_16_9.jpg", name: 'Arkansas Razorbacks Basketball'},
    { url: "https://s1.ticketm.net/dam/a/c2d/0de26c23-afd8-4fea-abd7-d7c97cafdc2d_1531431_RETINA_PORTRAIT_16_9.jpg", name: 'Seton Hall Pirates Basketball'},
    { url: "https://s1.ticketm.net/dam/a/346/d9510abd-dabb-4aac-b3c3-14917566a346_796101_RETINA_PORTRAIT_16_9.jpg", name: 'Champions Classic'},
    { url: "https://s1.ticketm.net/dam/a/991/e22334ac-a504-4581-a796-d563b858c991_1256901_RETINA_PORTRAIT_16_9.jpg", name: 'North Carolina Tar Heels Basketball'},
    { url: "https://s1.ticketm.net/dam/a/850/ab69fa64-df61-4dc3-bf23-b6fedb6cf850_1256531_RETINA_PORTRAIT_16_9.jpg", name: 'Maryland Terrapins Basketball'},
];

const mlb: EventObject[] = [
    { url: "https://s1.ticketm.net/dam/a/880/2c96bb81-1225-423b-9ce3-86a3c2565880_1344381_RETINA_PORTRAIT_16_9.jpg", name: 'Atlanta Braves'},
    { url: "https://s1.ticketm.net/dam/a/645/f53abc7c-c1d5-4e8e-9513-0b407888c645_1343821_RETINA_PORTRAIT_16_9.jpg", name: 'Houston Astros'},
    { url: "https://s1.ticketm.net/dam/a/2f4/5f8bca36-3127-4f87-b573-3dd6485642f4_1344231_RETINA_PORTRAIT_16_9.jpg", name: 'Los Angeles Dodgers'},
    { url: "https://s1.ticketm.net/dam/a/eef/8d86cdb2-b3aa-44db-9088-f8e598f45eef_1343381_RETINA_PORTRAIT_16_9.jpg", name: 'Boston Red Sox'},
    { url: "https://s1.ticketm.net/dam/a/b94/2fd30063-94c2-4b49-ac2c-be074ff93b94_1344481_RETINA_PORTRAIT_16_9.jpg", name: 'Arizona Diamondbacks'},
    { url: "https://s1.ticketm.net/dam/a/4af/0f77afd9-acc2-4347-aa81-66aa7004f4af_1343881_RETINA_PORTRAIT_16_9.jpg", name: 'New York Yankees'},
    { url: "https://s1.ticketm.net/dam/a/890/45fcf8da-fe3d-4b9b-8eeb-6052cef64890_1343261_RETINA_PORTRAIT_16_9.jpg", name: 'San Diego Padres'},
    { url: "https://s1.ticketm.net/dam/a/7ad/4e6ba9a2-ac8c-41e3-8394-ad20a4fb47ad_1343401_RETINA_PORTRAIT_16_9.jpg", name: 'Chicago Cubs'},
];

const more: EventObject[] = [
    { url: "https://variety.com/wp-content/uploads/2017/03/mls-logo.png?w=620&h=350&crop=1", name: 'MLS'},
    { url: "https://i0.wp.com/www.trucolor.net/wp-content/uploads/WNBA_BNR0101a_2019-9999_SOLCOA_SRGB.png?resize=750%2C450&ssl=1", name: 'WNBA'},
    { url: "https://s1.ticketm.net/dam/a/3b3/e00e8717-4f6f-49bc-98dc-3687d30863b3_1531661_RETINA_PORTRAIT_16_9.jpg", name: 'WWE'},
    { url: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg", name: 'Premier League', backgroundColor: 'white'},
    { url: "https://1000logos.net/wp-content/uploads/2018/10/Spanish-La-Liga-logo-500x281.png", name: 'LaLiga', backgroundColor: 'white'},
    { url: "https://1000logos.net/wp-content/uploads/2021/06/F1-logo-500x281.png", name: 'Formula 1', backgroundColor: 'white'},
    { url: "https://upload.wikimedia.org/wikipedia/commons/9/92/UFC_Logo.svg", name: 'UFC', backgroundColor: 'white'},
    { url: "https://1000logos.net/wp-content/uploads/2017/03/Nascar-Logo-500x313.png", name: 'NASCAR', backgroundColor: 'white'},
];

export const Sports = () => {
    const { searchResultsDispatch } = React.useContext(SearchResultsContext);

    React.useEffect(() => {
        searchResultsDispatch(setLastQuery('Sports'));
    }, []);
    
    return (
        <section className="category_container">
            <div className="category_content">
                <EventsGrid title={'NFL'} items={nfl}/>
                <EventsGrid title={'NCAA Football'} items={ncaaFootball}/>
                <EventsGrid title={'NBA'} items={nba}/>
                <EventsGrid title={'NHL'} items={nhl}/>
                <EventsGrid title={'NCAA Basketball'} items={ncaaBasketball}/>
                <EventsGrid title={'MLB'} items={mlb}/>
                <EventsGrid title={'More'} items={more}/>
            </div>
        </section>
    )
}