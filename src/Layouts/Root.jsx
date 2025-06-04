import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;