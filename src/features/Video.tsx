import * as React from 'react';

export const VideoBanner = () => 
    <video className="home-container_video"
        loop
        muted
        autoPlay
        preload="auto">
        <source src="concert.mp4" type="video/mp4"></source>
           Not supported
    </video> 