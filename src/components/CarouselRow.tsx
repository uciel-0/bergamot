import * as React from 'react';
import Carousel from "react-multi-carousel";
import { Image } from "semantic-ui-react";

interface CarouselRowProps {
  imageInfo: ImageInfo[];
}

interface ImageInfo {
  url: string; 
  name: string;
}

const CarouselRow = ({imageInfo}: CarouselRowProps) => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          paritialVisibilityGutter: 60
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          paritialVisibilityGutter: 50
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          paritialVisibilityGutter: 30
        }
    };

    return (
    <Carousel
      ssr
      partialVisbile
      itemClass="image-item"   
      responsive={responsive}
    >
   {imageInfo.map(image => {
        return (
        <div className="carousel-image">
          <p className="carousel-image_text">{image.name}</p>
          <Image
            draggable={false}
            style={{
              resizeMode: "center",
              borderRadius: "1em", 
              tintColor: "white",
              width: "100%", 
              height: "200px"}}
            src={image.url}
          />
         
        </div>
        );
    })}
    </Carousel>
    )
}

export default CarouselRow;