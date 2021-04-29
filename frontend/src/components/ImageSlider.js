import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { BsCircle } from 'react-icons/bs';



const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === -1 ? length - 1 : current - 1 || current === -2 ? 0 : current - 1 || current === 0 ? 0 : current - 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 2 : current + 1 || current === 0 ? length - 2 : current + 1);
  };

  const midSlide = () => {
    setCurrent(current === -2 ? length - 1 : current - 1 || current === -2 ? length - 1 : current + 1 );
  };
  

  const nextSlideArrow = () => {
    setCurrent(current === 0 ? length - 2 : current - 1 || current === 0 ? length - 1 : current + 1 );
  };

  const prevSlideArrow = () => {
    setCurrent(current === -1 ? length - 1 : current - 1 || current === 0 ? length - 1 : current + 1 );
  };




  // if (!Array.isArray(slides) || slides.length <= 0) {
  //   return null;
  // }

  

  return (
    <div>
    <div className='row slider'>
      <FiChevronLeft className='left-arrow arrowbox' onClick={prevSlideArrow} />
      <FiChevronRight className='right-arrow arrowbox' onClick={nextSlideArrow} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <div>
              <img src={slide.image} alt='travel' className='sliderImage' />
              <div className='row center'>
              {index === current && (
                <BsCircle className='row center carousel-pointers' onClick={midSlide}></BsCircle> //index === length -2 && knees
              )}
              {index === current &&  (
                <BsCircle className='row center carousel-pointers' onClick={nextSlide}>Middle</BsCircle> //index === length 0 palms
              )}
              {index === current && (
                <BsCircle className='row center carousel-pointers' onClick={prevSlide}>Right</BsCircle> //index === length -1 && many
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

export default ImageSlider;
