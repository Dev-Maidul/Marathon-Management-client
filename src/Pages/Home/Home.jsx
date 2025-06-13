import React, { useEffect, useState } from 'react';
import Slider from '../../components/Slider';
import FAQ from '../../components/FAQ';
import Testimonial from '../../components/Testimonial';
import FeatureMarathon from './FeatureMarathon';
import { useLoaderData } from 'react-router';
import Upcoming from './Upcoming';


const Home = () => {
    const initialMarathon=useLoaderData();
    const [marathons,setMarathons]=useState(initialMarathon);
    useEffect(() => {
  // Scroll to the top when the component mounts
  window.scrollTo(0, 0);
}, []);
    // console.log(marathons);
    return (
        <div>
            <title>Home</title>
            <Slider></Slider>
            <FeatureMarathon marathons={marathons}></FeatureMarathon>
            <Upcoming></Upcoming>
            <FAQ></FAQ>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;