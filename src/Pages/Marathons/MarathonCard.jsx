import React from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { IoLocationSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

const MarathonCard = ({ marathon }) => {
  const { image, title, location, _id, startDate } = marathon;
  const dateFormat = new Date(startDate).toISOString().split('T')[0];

  return (
    <Fade direction="up" triggerOnce>
      <div className="card bg-white w-full shadow-lg border border-gray-200 rounded-xl overflow-hidden h-full flex flex-col transition-transform hover:scale-[1.02] duration-300">
        {/* Image Section */}
        <figure className="h-[200px] overflow-hidden">
          <img
            src={image}
            alt="Marathon Poster"
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body flex flex-col justify-between flex-grow px-5">
          <div>
            <h2 className="card-title text-xl font-semibold text-gray-800">{title}</h2>
            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <IoLocationSharp size={18} /> {location}
              </span>
              <span className="flex items-center gap-1">
                <CiCalendarDate size={18} /> {dateFormat}
              </span>
            </div>
          </div>

          {/* Gradient Button with Bubble Animation */}
          <div className="card-actions mt-6">
            <Link to={`/marathon-details/${_id}`} className="w-full relative group">
              <div className="bubble-button w-full text-center">
                <span className="text-white font-semibold z-10 relative">See Details</span>
                <span className="bubble" />
                <span className="bubble delay-200" />
                <span className="bubble delay-400" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default MarathonCard;