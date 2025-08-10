import React from 'react';
import { Fade } from 'react-awesome-reveal';import React from 'react';
import { Fade } from 'react-awesome-reveal';

const Slider = () => {
  return (
    <Fade direction="up" triggerOnce={true} duration={800}>
      <div className='py-4'>
        <div className="carousel w-full rounded-2xl">
          <div id="item1" className="carousel-item w-full">
            <img
              src="https://i.ibb.co/1t2yLC1j/2.png"
              className="w-full h-[400px] object-cover"
              alt="Slide 1"
            />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img
              src="https://i.ibb.co/YF5YdyNN/Brown-and-Black-Modern-Basketball-Tournament-Banner.png"
              className="w-full h-[400px] object-cover"
              alt="Slide 2"
            />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img
              src="https://i.ibb.co/wNjHch14/Green-Modern-Sport-Update-Linked-In-Banner.jpg"
              className="w-full h-[400px] object-cover"
              alt="Slide 3"
            />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img
              src="https://i.ibb.co/YF5YdyNN/Brown-and-Black-Modern-Basketball-Tournament-Banner.png"
              className="w-full h-[400px] object-cover"
              alt="Slide 4"
            />
          </div>
        </div>

        <div className="flex w-full justify-center gap-2 py-2">
          <a href="#item1" className="btn btn-xs">1</a>
          <a href="#item2" className="btn btn-xs">2</a>
          <a href="#item3" className="btn btn-xs">3</a>
          <a href="#item4" className="btn btn-xs">4</a>
        </div>
      </div>
    </Fade>
  );
};

export default Slider;
