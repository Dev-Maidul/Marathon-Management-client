import React, { useState } from "react";
import { useLoaderData } from "react-router";
import MarathonCard from "./MarathonCard";
// Mern2025@
const Marathons = () => {
  const initialMarathon = useLoaderData();
  const [marathons, setMarathons] = useState(initialMarathon);
//   console.log(marathons);
  return (
    <div className="dark:bg-gray-100 dark:text-gray-800 rounded-2xl py-8 mb-8">
      <h2 className="text-2xl font-semibold sm:text-4xl text-center py-4">
        All Marathons
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {
            marathons.map((marathon)=> <MarathonCard marathon={marathon} key={marathon._id}></MarathonCard>)
        }
      </div>
    </div>
  );
};

export default Marathons;
