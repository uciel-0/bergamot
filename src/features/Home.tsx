import * as React from 'react';
// import Basketball from '../svg/Basketball';
// import Musicicon from '../svg/Musicicon';
// import Map from '../svg/Map';
// import Star from '../svg/Star';
import { SearchComponent } from './SearchComponent';
import CarouselRow from '../components/CarouselRow';

const eventsImages = [
    { url: 'https://ca-times.brightspotcdn.com/dims4/default/9b18739/2147483647/strip/true/crop/4096x2160+0+0/resize/1486x784!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F4a%2F77%2Fcfa7404b402090e70b76bbe6b91b%2Fthe-shell-new-san-diego-symphony-concert-venue.jpg', name: 'Coachella' },
    { url: 'https://www.nme.com/wp-content/uploads/2020/03/bluesfest-2019-credit-festival@2000x1270.jpg', name: 'Imagine' },
    { url: 'https://cloudfront-us-east-1.images.arcpublishing.com/ajc/K3LFSLFJ6RRTJ44J3DK6XYS4LQ.jpg', name: 'Event' },
    { url: 'https://growlermag-media.s3.amazonaws.com/wp-content/uploads/20181029101004/FEATURED-G61-Music-Tom-Petty-Photo-by-Nate-Ryan-06.jpg', name: 'Event' }
]

const artistImages = [
    { url: 'https://wallpaperaccess.com/full/152992.jpg', name: 'Drake' },
    { url: 'https://media.allure.com/photos/5cffabe2edc5e927339daa7c/16:9/w_2560%2Cc_limit/Cardi%252520B.jpg', name: 'Cardi B' },
    { url: 'https://wallpaper.dog/large/17251445.jpg', name: 'Post Malone' },
    { url: 'data:image/jpeg;base64,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', name: 'Justin Beiber' }
]

export const Home = () => (
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
              <div className="headline">
                <h1> Concerts </h1>
                  <CarouselRow
                    imageInfo={eventsImages}
                  />
              </div>
              <div className="headline">
                <h1> Artists </h1>
                  <CarouselRow
                    imageInfo={artistImages}
                  />
              </div>
            </section>
        </div>
        <div>
        </div>
    </div>
)
