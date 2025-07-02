import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MarathonCard from "../Marathons/MarathonCard";

const Upcoming = () => {
  const [marathons,setMarathons]=useState([]);
  const axiosSecure=useAxiosSecure();
 useEffect(() => {
  const fetchMarathons = async () => {
    try {
      const response = await axiosSecure.get(`https://marathon-management-server-flax.vercel.app/upcoming-marathons`);
      console.log(response);
      setMarathons(response.data);
    } catch (err) {
      console.error("Error fetching marathons:", err);
    }
  };
  
  fetchMarathons();
}, []);
  // console.log(marathons)
  return (
   <div className="my-16 py-10 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-green-50 px-">
      <title>Marathons</title>
      <h2 className="text-2xl font-semibold sm:text-4xl text-center py-4">
        Get Ready for Upcoming Marathons
      </h2>

      {/* Marathon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
        {marathons.map((marathon) => (
          <MarathonCard marathon={marathon} key={marathon._id} />
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
