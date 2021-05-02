import React, { useState } from 'react';
import { ImageSlides } from './ImageSlides';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { BsCircle } from 'react-icons/bs';

//
const ImageCarousel = ({ slides }) => {
  const [slideImage, setSlideImage] = useState(0);
  const length = slides.length;
  

  //
  const nextSlide = () => {
    setSlideImage(slideImage === -1 ? length - 1 : slideImage - 1 || slideImage === -2 ? 0 : slideImage - 1 || slideImage === 0 ? 0 : slideImage - 1);
  };
  const previousSlide = () => {
    setSlideImage(slideImage === 0 ? length - 2 : slideImage + 1 || slideImage === 0 ? length - 2 : slideImage + 1);
  };
  const midSlide = () => {
    setSlideImage(slideImage === -2 ? length - 1 : slideImage - 1 || slideImage === -2 ? length - 1 : slideImage + 1 );
  };
  
  const nextSlideArrow = () => {
    setSlideImage(slideImage === 0 ? length - 2 : slideImage - 1 || slideImage === 0 ? length - 1 : slideImage + 1 );
  };
  const prevSlideArrow = () => {
    setSlideImage(slideImage === -1 ? length - 1 : slideImage - 1 || slideImage === 0 ? length - 1 : slideImage + 1 );
  };

//
  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  //
  return (
    <div>
    <div className='row slider'>
      <FiChevronLeft className='left-arrow arrowbox' onClick={prevSlideArrow} />
      <FiChevronRight className='right-arrow arrowbox' onClick={nextSlideArrow} />
      {ImageSlides.map((slide, c) => {
        return (
          <div
            className={c === slideImage ? 'slide active' : 'slide'}
            key={c}
          >
            {c === slideImage && (
              <div>
              <img src={slide.image} alt='travel' className='sliderImage' />
              <div className='row center'>
              {c === slideImage && (
                <BsCircle className='row center carousel-pointers' onClick={midSlide}></BsCircle> //c === length -2 && knees
              )}
              {c === slideImage &&  (
                <BsCircle className='row center carousel-pointers' onClick={nextSlide}>Middle</BsCircle> //c === length 0 palms
              )}
              {c === slideImage && (
                <BsCircle className='row center carousel-pointers' onClick={previousSlide}>Right</BsCircle> //c === length -1 && many
              )}
              </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default ImageCarousel;
