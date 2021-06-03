import * as React from 'react';
import Carousel, { slidesToShowPlugin, slidesToScrollPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
interface CarouselRowProps {
  imageInfo: ImageInfo[];
}

interface ImageInfo {
  url: string; 
  name: string;
}

const CarouselRow = ({imageInfo}: CarouselRowProps) => {
  return (
  <Carousel
    plugins={
      [
        'arrows', 
        'infinite',
        {
          resolve: slidesToShowPlugin,
          options: {
            numberOfSlides: 3
           }
        },
        {
          resolve: slidesToScrollPlugin,
          options: {
           numberOfSlides: 1
          }
        },
      ]
    }
    itemWidth={500}
    offset={10}
  >
    {
      imageInfo.map(image => 
        <div className="carousel-image_container">
          <p className="carousel-image_text">{image.name}</p>
          <img src={image.url} alt={image.name} className="carousel-image"/>          
        </div>
      )
    }
  </Carousel>
  )
}

export default CarouselRow;