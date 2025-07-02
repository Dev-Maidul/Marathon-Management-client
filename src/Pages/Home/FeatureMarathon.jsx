import React from "react";
import MarathonCard from "../Marathons/MarathonCard";
import { Fade } from "react-awesome-reveal";

const FeatureMarathon = ({ marathons }) => {
  return (
    <Fade direction="up" triggerOnce cascade damping={0.15}>
      <div className="my-16 py-10 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-green-50 px-4">
        <h2 className="text-2xl font-semibold sm:text-4xl text-center py-4">
          Featured Marathons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
          {marathons?.map((marathon) => (
            <MarathonCard marathon={marathon} key={marathon._id} />
          ))}
        </div>
      </div>
    </Fade>
  );
};

export default FeatureMarathon;