import React, { useState } from 'react';
import Slider from '../../components/Slider';
import FAQ from '../../components/FAQ';
import Testimonial from '../../components/Testimonial';
import FeatureMarathon from './FeatureMarathon';
import { useLoaderData } from 'react-router';

const Home = () => {
    const initialMarathon=useLoaderData();
    const [marathons,setMarathons]=useState(initialMarathon);
    // console.log(marathons);
    return (
        <div>
            <Slider></Slider>
            <FeatureMarathon marathons={marathons}></FeatureMarathon>
            <FAQ></FAQ>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;