import * as React from 'react';
import { SearchComponent } from './SearchComponent';
import EventsGrid, { EventObject } from '../components/EventsGrid';

const concerts: EventObject[] = [
  { url: "https://s1.ticketm.net/dam/a/3e7/dc88d812-ab5d-416d-96a4-0d41e3e5c3e7_1400451_RETINA_PORTRAIT_16_9.jpg", name: 'The Weeknd' },
  { url: "https://s1.ticketm.net/dam/a/2a7/41eeb608-22da-4625-9d3f-04cf325732a7_1408431_RETINA_PORTRAIT_16_9.jpg", name: "Maroon 5" },
  { url: "https://s1.ticketm.net/dam/a/987/76ff7a29-6b21-4ac5-bdf3-d7268760e987_1206471_RETINA_PORTRAIT_16_9.jpg", name: "Harry Styles" },
  { url: "https://s1.ticketm.net/dam/a/58c/c023b7ce-e8fb-4bb0-8996-7ff4b4be258c_858341_RETINA_PORTRAIT_16_9.jpg", name: "Elton John" },
  { url: "https://s1.ticketm.net/dam/a/77e/676b43c4-579d-4349-a973-90693ee4e77e_1458621_RETINA_PORTRAIT_16_9.jpg", name: "Guns N' Roses" },
  { url: "https://s1.ticketm.net/dam/a/17f/38c470b2-aef5-4e11-b3ed-1eaa4600b17f_1495721_RETINA_PORTRAIT_16_9.jpg", name: "Luke Combs" },
  { url: "https://s1.ticketm.net/dam/a/eb6/27e4ab6a-4fdf-4add-bf7f-e6651045eeb6_1294581_RETINA_PORTRAIT_16_9.jpg", name: "Korn" },
  { url: "https://s1.ticketm.net/dam/a/c40/e0f4dedd-b435-4b8b-8fd0-e73e47e93c40_851341_RETINA_PORTRAIT_16_9.jpg", name: "Eagles" },
];

const sports: EventObject[] = [
  { url: "https://s1.ticketm.net/dam/a/4af/0f77afd9-acc2-4347-aa81-66aa7004f4af_1343881_RETINA_PORTRAIT_16_9.jpg", name: 'New York Yankees' },
  { url: "https://s1.ticketm.net/dam/a/2f4/5f8bca36-3127-4f87-b573-3dd6485642f4_1344231_RETINA_PORTRAIT_16_9.jpg", name: 'Los Angeles Dodgers' },
  { url: "https://s1.ticketm.net/dam/a/7e4/6f79c7fd-ac9a-4dba-97a6-1a6be82407e4_1325121_RETINA_PORTRAIT_16_9.jpg", name: 'Dallas Cowboys' },
  { url: "https://s1.ticketm.net/dam/a/0b3/b24190d1-e7d1-4435-81b4-f45b5943b0b3_1339891_RETINA_PORTRAIT_16_9.jpg", name: 'Milwaukee Bucks' },
  { url: "https://s1.ticketm.net/dam/a/eef/8d86cdb2-b3aa-44db-9088-f8e598f45eef_1343381_RETINA_PORTRAIT_16_9.jpg", name: 'Boston Red Sox' },
  { url: "https://s1.ticketm.net/dam/a/c90/965833d9-2f76-4e79-bd87-f2bc61282c90_1339931_RETINA_PORTRAIT_16_9.jpg", name: 'Los Angeles Lakers' },
  { url: "https://s1.ticketm.net/dam/a/403/fb1379e0-0c54-4550-a940-81a175dbd403_1339871_RETINA_PORTRAIT_16_9.jpg", name: 'New York Knicks' },
  { url: "https://s1.ticketm.net/dam/a/599/f9331497-7667-4f9d-9d26-d144cb25a599_1339911_RETINA_PORTRAIT_16_9.jpg", name: 'Miami Heat' }
];

const festivals: EventObject[] = [
  { url: "https://s1.ticketm.net/dam/a/c63/98b72144-ea0b-4727-a4b1-4da7329b0c63_1252111_RETINA_PORTRAIT_16_9.jpg", name: 'Coachella' },
  { url: "https://s1.ticketm.net/dam/a/658/debbdf71-d738-4e83-b98b-10380da96658_1353681_RETINA_PORTRAIT_16_9.jpg", name: 'EDC Vegas' },
  { url: "https://s1.ticketm.net/dam/a/e96/7dc2a9c1-87f0-4586-82a2-cb37bde55e96_1305751_RETINA_PORTRAIT_16_9.jpg", name: 'Lollapalooza' },
  { url: "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_PORTRAIT_16_9.jpg", name: 'SXSW' },
  { url: "https://s1.ticketm.net/dam/c/ab4/6367448e-7474-4650-bd2d-02a8f7166ab4_106161_RETINA_PORTRAIT_16_9.jpg", name: 'Pitchfork Music Festival' },
  { url: "https://s1.ticketm.net/dam/a/8ca/751ea942-6511-4617-b5fd-102b993a98ca_13761_RETINA_PORTRAIT_16_9.jpg", name: 'Austin City Limits' },
  { url: "https://s1.ticketm.net/dam/c/ab4/6367448e-7474-4650-bd2d-02a8f7166ab4_106161_RETINA_PORTRAIT_16_9.jpg", name: 'Ultra Music Festival' },
  { url: "https://s1.ticketm.net/dam/a/565/c5efbbd3-ee5c-4c00-a956-42bf4adce565_1421541_RETINA_PORTRAIT_16_9.jpg", name: 'Governers Ball Music Festivals' }
]

const theatre: EventObject[] = [
  { url: "https://s1.ticketm.net/dam/a/f2f/1472d1e1-0f76-42d0-b1d6-54e4a0275f2f_12481_RETINA_PORTRAIT_16_9.jpg", name: 'Joe Rogan' },
  { url: "https://s1.ticketm.net/dam/a/344/847a4071-e17a-4771-bc28-03dc33ad6344_1026321_RETINA_PORTRAIT_16_9.jpg", name: 'Christmas Spectacular' },
  { url: "https://s1.ticketm.net/dam/a/bba/269547f1-126e-4ee8-96cb-b8d6b5238bba_1417221_RETINA_PORTRAIT_16_9.jpg", name: 'Bill Burr' },
  { url: "https://s1.ticketm.net/dam/a/7d6/29a7761b-3930-4e5b-84e3-2b7af0b377d6_1436091_RETINA_PORTRAIT_16_9.jpg", name: 'Sebastian Maniscalco' },
  { url: "https://s1.ticketm.net/dam/a/b40/448fdefe-de0b-43ac-8c14-3b93bbb92b40_1447881_RETINA_PORTRAIT_16_9.jpg", name: 'John Mulaney' },
  { url: "https://s1.ticketm.net/dam/a/8e6/f5a59548-b78a-49f2-9bb3-401297f568e6_570111_RETINA_PORTRAIT_16_9.jpg", name: 'Hamilton' },
  { url: "https://s1.ticketm.net/dam/a/75b/c342165a-8430-440a-ae6e-fb15f2cac75b_1485451_RETINA_PORTRAIT_16_9.jpg", name: 'Dave Chapelle' },
  { url: "https://s1.ticketm.net/dam/a/7ec/736f7015-9c34-46bf-8f98-8502ffa5d7ec_1239481_RETINA_PORTRAIT_16_9.jpg", name: 'Impractical Jokers' }
]

export const Home = () => {
  return (
    <div className="home_container">
      <div className="home_grid">
        <section className="home_banner">
          <img className="" alt="main banner" src="\bop.jpg" />
          <div className="home_search-container">
            <p className="home_white-text">
              Compare ticket
              prices <br /> across your
              favorite vendors!
            </p>
            <SearchComponent />
          </div>
        </section>
        <section className="home_main">
          <div className="home_content">
            <EventsGrid title={'Concerts'} items={concerts} />
            <EventsGrid title={'Sports'} items={sports} />
            <EventsGrid title={'Festivals'} items={festivals} />
            <EventsGrid title={'Theatre'} items={theatre} />
          </div>
        </section>
      </div>
      <div>
      </div>
    </div>
  )
}
