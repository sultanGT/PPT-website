import React, { useState } from 'react';
import { ImageSlides } from './ImageSlides'; //edited
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'; 
import { BsCircle } from 'react-icons/bs'; //self coded

// Reused code from Youtube tutorials - https://www.youtube.com/watch?v=l1MYfu5YWHc&t=1175s , https://github.com/briancodex/react-image-slider-carousel/blob/main/src/components/ImageSlider.js
// function and variable declarations
const ImageCarousel = ({ slides }) => {
const [slideImage, setSlideImage] = useState(0);
const length = slides.length;
  
//function to move to the next slide in the carousel 
  const nextSlide = () => {
    setSlideImage(
      slideImage === -1 
      ? length - 1 : slideImage - 1 
      || slideImage === -2 
      ? 0 : slideImage - 1 
      || slideImage === 0 
      ? 0 : slideImage - 1);
  };

//function to move to the next slide in the carousel 
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

// Reused edited
  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  //Return function for full sized carousel on homepage - selfcoded
  return (
  <div>
    <div className='row carousel'>
    {/* Reused edited */}
    <FiChevronLeft className='left-arrow arrowbox' onClick={previousImage} />
    {/* Reused edited */}
    <FiChevronRight className='right-arrow arrowbox' onClick={nextImage} />

        {/* Reused edited */}
    {ImageSlides.map((carousel_picture, c) => {
    return (

    //self coded
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
