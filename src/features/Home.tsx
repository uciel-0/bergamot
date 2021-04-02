import * as React from 'react';
import Basketball from '../svg/Basketball';
import Musicicon from '../svg/Musicicon';
import Map from '../svg/Map';
import Star from '../svg/Star';

export const Home = () => (
    <div className="home-content">
        <nav className="sidebar">
            <ul className="side-nav">
                <li className="side-nav__item side-nav__item--active">
                    <a href="/" className="side-nav__link">
                        <Musicicon className={"side-nav__icon"} />
                        <span>Concerts</span>
                    </a>
                </li>
                <li className="side-nav__item">
                    <a href="/" className="side-nav__link">
                        <Basketball className={"side-nav__icon"} />
                        <span>Sports</span>
                    </a>
                </li>
                <li className="side-nav__item">
                    <a href="/" className="side-nav__link">
                        <Star className={"side-nav__icon"} />
                        <span>Festivals</span>
                    </a>
                </li>
                <li className="side-nav__item">
                    <a href="/" className="side-nav__link">
                        <Map className={"side-nav__icon"} />
                        <span>Theatres</span>
                    </a>
                </li>
            </ul>
        </nav>
        <main className="hotel-view">
            <div className="gallery" >
                <figure className="gallery-item" data-effect="blur">
                    <img className="gallery__photo" alt="inflatable_astronaut_backdrop" src="\bop-photo-1.png" />
                </figure>
                <figure className="gallery-item">
                    <img className="gallery__photo" alt="bluish_green_concert_stage" src="\bop-photo-2.png" />
                </figure>
                <figure className="gallery-item">
                    <img className="gallery__photo" alt="generic_concert_photo" src="\bop-photo-3.png" />
                </figure>
            </div>
        </main>

        {/* <div className="overview">
                <h1 className="overview__heading">
                    Hotel Las Palmas
            </h1> */}
        {/* <div className="overview__stars">
                    <Star className={"overview__icon-star"} />
                    <Star className={"overview__icon-star"} />
                    <Star className={"overview__icon-star"} />
                    <Star className={"overview__icon-star"} />
                    <Star className={"overview__icon-star"} />
                </div> */}
        {/* <div className="overview__location">
                    <LocationPin className={"overview__icon-location"} />
                    <button className="btn-inline">Albufeira, Portugal</button>
                </div> */}

        {/* <div className="overview__rating">
                    <div className="overview__rating-average">8.6</div>
                    <div className="overview__rating-count">429 votes</div>
                </div> */}
        {/* </div> */}
        <section className="wrapper">
            <div>
            <div className="card1" data-effect="color">
                    <figure className="card1__image">
                        <img src="https://wallpaperaccess.com/full/152992.jpg" alt="Short description"></img>
                    </figure>
                    <div className="card1__header"> 
                    <h3 className="card1__name">Drake</h3>
                        {/* <figure className="card1__profile">
                            <img src="https://wallpaper.dog/large/964085.jpg" alt="Short description"></img>
                        </figure> */}
                    </div>
                    <div className="card1__body">
                       
                        <p className="card1__job">Walter Stadium</p>
                        {/* <p className="card1__bio"> American astronaut, engineer, and the first person to walk on the Moon.</p> */}
                    </div>
                    <div className="card1__footer">
                        <p className="card1__date">Dates From: 7/11/2021</p>
                        <button className="btn-three" type="button">From 1175$</button>
                    </div>
                </div>

                <div className="card1" data-effect="color">
                    <figure className="card1__image">
                        <img src="https://media.vanityfair.com/photos/5aba6a14a5d5615ee64a5293/3:2/w_1542,h_1028,c_limit/Cardi-B-Album-Drop.jpg" alt="Short description"></img>
                    </figure>
                    <div className="card1__header"> 
                    <h3 className="card1__name">Cardi B</h3>
                        {/* <figure className="card1__profile">
                            <img src="https://wallpaper.dog/large/964085.jpg" alt="Short description"></img>
                        </figure> */}
                    </div>
                    <div className="card1__body">
                       
                        <p className="card1__job">Center Stadium</p>
                        {/* <p className="card1__bio"> American astronaut, engineer, and the first person to walk on the Moon.</p> */}
                    </div>
                    <div className="card1__footer">
                        <p className="card1__date">Dates From: 7/27/2021</p>
                        <button className="btn-three" type="button">From 475$</button>
                    </div>
                </div>
                
                <div className="card1" data-effect="color">
                    <figure className="card1__image">
                        <img src="https://wallpaper.dog/large/17251445.jpg" alt="Short description"></img>
                    </figure>
                    <div className="card1__header"> 
                    <h3 className="card1__name">Post Malone</h3>
                        {/* <figure className="card1__profile">
                            <img src="https://wallpaper.dog/large/964085.jpg" alt="Short description"></img>
                        </figure> */}
                    </div>
                    <div className="card1__body">
                       
                        <p className="card1__job">Urban Battleground</p>
                        {/* <p className="card1__bio"> American astronaut, engineer, and the first person to walk on the Moon.</p> */}
                    </div>
                    <div className="card1__footer">
                        <p className="card1__date">Dates From: 9/19/2021</p>
                        <button className="btn-three" type="button">From 775$</button>
                    </div>
                </div>

                <div className="card1" data-effect="color">
                    <figure className="card1__image">
                        <img src="https://wallpapercave.com/wp/wp2692662.jpg" alt="Short description"></img>
                    </figure>
                    <div className="card1__header"> 
                    <h3 className="card1__name">Justin Bieber</h3>
                        {/* <figure className="card1__profile">
                            <img src="https://wallpaper.dog/large/964085.jpg" alt="Short description"></img>
                        </figure> */}
                    </div>
                    <div className="card1__body">
                       
                        <p className="card1__job">The Fermamant</p>
                        {/* <p className="card1__bio"> American astronaut, engineer, and the first person to walk on the Moon.</p> */}
                    </div>
                    <div className="card1__footer">
                        <p className="card1__date">Dates From: 10/09/2021</p>
                        <button className="btn-three" type="button">From 375$</button>
                    </div>
                </div>


                {/* <div className="grid">
                            <div className="grid__item">
                                <div className="card">
                                    <img className="card__img" src="https://www.gannett-cdn.com/presto/2018/10/09/PPHX/f001f059-8fb2-4130-b6fa-e858ad9e9097-Drake.rf.100818.001.JPG?crop=1999,1134,x0,y0&width=660&height=372&format=pjpg&auto=webp"></img>
                                    <div className="card__content">
                                        <h1 className="card__header"> Drake</h1>
                                        <p className="card__text"> Javits Center</p>
                                        <button className="card__btn">From 110$</button>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="grid__item">
                                <div className="card">
                                    <img className="card__img" src="https://variety.com/wp-content/uploads/2018/06/post-malone.jpg?w=999" alt="Snowy Mountains"></img>
                                    <div className="card__content">
                                        <h1 className="card__header"> Post Malone</h1>
                                        <p className="card__text"> New Hide Staduim</p>
                                        <button className="card__btn">From 76$</button>
                                    </div>
                                </div>
                            </div> */}

                {/* <div className="grid__item">
                                <div className="card">
                                    <img className="card__img" src="https://www.mercurynews.com/wp-content/uploads/2018/07/GettyImages-514592336.jpg"></img>
                                    <div className="card__content">
                                        <h1 className="card__header"> Justin Beiber</h1>
                                        <p className="card__text"> Madison Square Park</p>
                                        <button className="card__btn">From 67$</button>
                                    </div>
                                </div>
                            </div> */}
                {/* </div> */}


                {/* <ul className="list">
                        <li className="list__item">Close to the beach</li>
                        <li className="list__item">Breakfast included</li>
                        <li className="list__item">Free airport shuttle</li>
                        <li className="list__item">Free wifi in all rooms</li>
                        <li className="list__item">Air conditioning and heating</li>
                        <li className="list__item">Pets allowed</li>
                        <li className="list__item">We speak all languages</li>
                        <li className="list__item">Perfect for families</li>
                    </ul>  */}
                {/* <div className="recommend">
                        {/* <p className="recommend__count">
                            Lucy and 3 other friends recommend this hotel
                        </p>
                {/* <div className="recommend__friends">
                            <img src="\user-3.jpg" alt="Friend 1" className="recommend__photo" />
                            <img src="\user-4.jpg" alt="Friend 2" className="recommend__photo" />
                            <img src="\user-5.jpg" alt="Friend 3" className="recommend__photo" />
                            <img src="\user-6.jpg" alt="Friend 4" className="recommend__photo" />
                        </div>
                    </div> */}

                {/* </div> */}

                <div className="user-reviews">
                    <figure className="review">
                        <blockquote className="review__text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga doloremque architecto dicta animi, totam, itaque officia ex.
                  </blockquote>
                        <figcaption className="review__user">
                            <img src="\user-1.jpg" alt="User 1" className="review__photo" />
                            <div className="review__user-box">
                                <p className="review__user-name">Nick Smith</p>
                                <p className="review__user-date">Feb 23rd, 2017</p>
                            </div>
                            <div className="review__rating">7.0</div>
                        </figcaption>
                    </figure>

                    <figure className="review">
                        <blockquote className="review__text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga doloremque architecto dicta animi, totam, itaque officia ex.
                  </blockquote>
                        <figcaption className="review__user">
                            <img src="\user-2.jpg" alt="User 2" className="review__photo" />
                            <div className="review__user-box">
                                <p className="review__user-name">Mary Thomas</p>
                                <p className="review__user-date">Sept 13rd, 2017</p>
                            </div>
                            <div className="review__rating">9.3</div>
                        </figcaption>
                    </figure>

                    <button className="btn-inline">Show all <span>&rarr;</span></button>
                </div>
            </div>
        </section>




        {/* <div className="cta">
            <h2 className="cta__book-now">
                Good news! We have 4 free rooms for your selected dates! 
            </h2>
            <button className="btn">
                <span className="btn__visible">Book now</span>
                <span className="btn__invisible">Only 4 rooms left</span>
            </button>
        </div> */}



    </div>

)
