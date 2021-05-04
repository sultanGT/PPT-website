import React, { useState } from 'react';
import { ImageSlides } from './ImageSlides';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { BsCircle } from 'react-icons/bs';

// function and variable declarations
const ImageCarousel = ({ slides }) => {
const [slideImage, setSlideImage] = useState(0);
const length = slides.length;
  
// function for right carousel indicatior on click to the next carousel_picture - selfcoded
  const nextSlide = () => {
    setSlideImage(
      slideImage === -1 
      ? length - 1 : slideImage - 1 
      || slideImage === -2 
      ? 0 : slideImage - 1 
      || slideImage === 0 
      ? 0 : slideImage - 1);
  };

// function for left carousel indicatior on click to the previous carousel_picture - selfcoded
  const previousSlide = () => {
    setSlideImage(
      slideImage === 0 
      ? length - 2 : slideImage + 1 
      || slideImage === 0 
      ? length - 2 : slideImage + 1);
  };

// function for middle carousel indicatior on click to the middle carousel_picture - selfcoded
  const midSlide = () => 
  {
    setSlideImage(
      slideImage === -2 
      ? length - 1 : slideImage - 1 
      || slideImage === -2 
      ? length - 1 : slideImage + 1 );
  };

// function for right arrow carousel on click to the next carousel_picture - selfcoded
  const nextImage = () => 
  {
      setSlideImage(
        slideImage === length - 1 
        ? 0 : slideImage + 1);
  };

// function for left arrow carousel on click to the previous carousel_picture - selfcoded
  const previousImage = () => {
      setSlideImage(
        slideImage === 0 
        ? length - 1 : slideImage 
        - 1);
  };

//
  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  //Return function for full sized carousel on homepage - selfcoded
  return (
  <div>
    <div className='row carousel'>
      
    <FiChevronLeft className='left-arrow arrowbox' onClick={previousImage} />
    <FiChevronRight className='right-arrow arrowbox' onClick={nextImage} />
    {ImageSlides.map((carousel_picture, c) => {
    return (
    <div className={c === slideImage ? 'carousel_picture active' : 'carousel_picture'} key={c}>
    {c === slideImage && ( 
        <div>
        <img src={carousel_picture.picture} alt='Peak Performance Taekwondo' className='carousel-picture' />
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
);})}
    </div>
  </div>
  );
};
export default ImageCarousel;
