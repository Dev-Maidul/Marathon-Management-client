import React from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { IoLocationSharp } from 'react-icons/io5';
import { Link } from 'react-router';

const MarathonCard = ({marathon}) => {
    const {image,title,startRegDate,location}=marathon;
    const dateformat=new Date(startRegDate).toISOString().split('T')[0];
    console.log(dateformat);
    return (
        <div>
            <div className="card bg-base-100 w-full shadow-sm">
  <figure>
    <img
      src={image}
      className='h-[250px]'
      alt="Marathon Banner" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <div className='flex gap-4'>
    <h1 className='text-semibold flex items-center gap-1'><IoLocationSharp size={25}/> {location}</h1>
    <h1 className='text-semibold flex items-center gap-1'><CiCalendarDate size={25} />{dateformat}</h1>
    </div>
    <div className="card-actions justify-end">
      <Link><button className="btn btn-primary">See Details</button></Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default MarathonCard;