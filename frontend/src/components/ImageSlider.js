import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  

  return (
    <div>
    <div className='row slider'>
      <FiChevronLeft className='left-arrow arrowbox' onClick={prevSlide} />
      <FiChevronRight className='right-arrow arrowbox' onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt='travel' className='sliderImage' />
            )}
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default ImageSlider;
