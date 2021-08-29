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

export const Home = () => {
  return (
    <div className="home_container">
        <div className="home_grid">
            <section className="home_banner">
                <img className="" alt="main banner" src="\bop.jpg" />
                <div className="home_search-container">
                  <p className="home_white-text">
                    Compare ticket <br/>
                    prices across your <br/>
                    favorite vendors!
                  </p>
                  <SearchComponent />
                </div>
            </section>
            <section className="home_main">
              <EventsGrid title={'Concerts'} items={concerts}/>
            </section>
        </div>
        <div>
        </div>
    </div>
)
}
