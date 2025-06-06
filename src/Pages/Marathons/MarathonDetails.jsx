import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { FaMapMarkerAlt } from "react-icons/fa";

const MarathonDetails = () => {
  const { id } = useParams();
  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/marathons/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMarathon(data);
        
        // Calculate registration availability after data loads
        if (data.startRegDate && data.endRegDate) {
          const now = new Date();
          const startDate = new Date(data.startRegDate);
          const endDate = new Date(data.endRegDate);
          setIsRegisterEnabled(now >= startDate && now <= endDate);
        }
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching marathon data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!marathon) {
    return <div>Marathon not found!</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid date";
    }
  };

  const startRegDate = formatDate(marathon.startRegDate);
  const endRegDate = formatDate(marathon.endRegDate);
  const startDate = formatDate(marathon.startDate);

  return (
    <div className="p-4 shadow-md dark:bg-gray-50 dark:text-gray-800 w-full">
      <div className="flex justify-between pb-4 border-bottom">
        <div className="flex items-center">
          {/* Optional category link can go here */}
        </div>
        
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <img
            src={marathon.image}
            alt={marathon.title}
            className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold dark:text-violet-600">
            {marathon.title}
          </h3>
          <p className="leading-snug dark:text-gray-600">
            {marathon.description}
          </p>
         
          <h1 className="flex gap-1 items-center">
            <FaMapMarkerAlt size={25}/>{marathon.location}
          </h1>
          
          <button className="btn btn-dash btn-secondary">
            Distance: {marathon.distance}
          </button>
          
          <div className="stat-value">
            Total Registrations Count: {marathon.totalRegistrationCount || 0}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="btn btn-outline btn-primary">
              Registration Start: {startRegDate}
            </button>
            <button className="btn btn-outline btn-warning">
              Registration End: {endRegDate}
            </button>
            <button className="btn btn-outline btn-success">
              Marathon Start: {startDate}
            </button>
          </div>
          <Link to={`/registration/${id}`}>
          <button 
            className={`btn ${isRegisterEnabled ? 'btn-success' : 'btn-disabled'} text-center w-full`}
            disabled={!isRegisterEnabled}
          >
            {isRegisterEnabled ? 'Register Now' : 'Registration Closed'}
          </button>
        </Link>
          {!isRegisterEnabled && (
            <div className="alert alert-warning mt-4">
              Registration is only available between {startRegDate} and {endRegDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarathonDetails;