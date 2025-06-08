import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import MarathonCard from "./MarathonCard";
import axios from "axios";

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest"); 

  useEffect(() => {
    axios
      .get(`http://localhost:3000/marathons?sort=${sortOrder}`)
      .then((res) => {
        setMarathons(res.data);
      })
      .catch((err) => {
        console.error("Error fetching marathons:", err);
      });
  }, [sortOrder]);  

  return (
    <div className="dark:bg-gray-100 dark:text-gray-800 rounded-2xl py-8 mb-8">
      <Helmet><title>Marathons</title></Helmet>
      <h2 className="text-2xl font-semibold sm:text-4xl text-center py-4">
        All Marathons
      </h2>

      {/* Sorting Dropdown */}
      <div className="flex justify-end px-8 mb-4">
        
        <select
          className="select select-bordered w-full max-w-xs"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Marathon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {marathons.map((marathon) => (
          <MarathonCard marathon={marathon} key={marathon._id} />
        ))}
      </div>
    </div>
  );
};

export default Marathons;
