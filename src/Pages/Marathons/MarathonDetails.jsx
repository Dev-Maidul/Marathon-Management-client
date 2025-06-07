import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const MarathonDetails = () => {
  const { id } = useParams();
  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/marathons/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMarathon(data);

        // Calculate registration availability
        if (data.startRegDate && data.endRegDate) {
          const now = new Date();
          const startDate = new Date(data.startRegDate);
          const endDate = new Date(data.endRegDate);
          setIsRegisterEnabled(now >= startDate && now <= endDate);
        }

        // Calculate remaining time until marathon start in seconds
        if (data.startDate) {
          const now = new Date();
          const marathonStart = new Date(data.startDate);
          const diff = Math.floor((marathonStart - now) / 1000);
          setRemainingTimeSeconds(diff > 0 ? diff : 0);
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

  // Helper function for countdown timer display
  const renderTime = (dimension, time) => {
    return (
      <div className="text-center">
        <div className="text-4xl font-bold">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  return (
    <div className="p-4 shadow-md dark:bg-gray-50 dark:text-gray-800 w-full">
      <Helmet>
        <title>Marathon Details</title>
      </Helmet>

      <div className="flex justify-between pb-4 border-b">
        {/* Add any header content here */}
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
            <FaMapMarkerAlt size={25} />
            {marathon.location}
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
          <h1 className="text-center text-3xl text-red-300 font-bold py-2">Time left to start Marathon</h1>
          {/* Countdown Timer */}
          {remainingTimeSeconds > 0 ? (
            <div className="flex gap-6 justify-center mt-4">
              {/* Days */}
              <CountdownCircleTimer
                isPlaying
                duration={remainingTimeSeconds}
                initialRemainingTime={remainingTimeSeconds}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                size={100}
                strokeWidth={8}
                onComplete={() => ({ shouldRepeat: false })}
              >
                {({ elapsedTime }) =>
                  renderTime(
                    "Days",
                    Math.floor((remainingTimeSeconds - elapsedTime) / 86400)
                  )
                }
              </CountdownCircleTimer>

              {/* Hours */}
              <CountdownCircleTimer
                isPlaying
                duration={86400}
                initialRemainingTime={remainingTimeSeconds % 86400}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                size={100}
                strokeWidth={8}
                onComplete={() => ({ shouldRepeat: true })}
              >
                {({ elapsedTime }) =>
                  renderTime(
                    "Hours",
                    Math.floor(
                      ((remainingTimeSeconds - elapsedTime) % 86400) / 3600
                    )
                  )
                }
              </CountdownCircleTimer>

              {/* Minutes */}
              <CountdownCircleTimer
                isPlaying
                duration={3600}
                initialRemainingTime={remainingTimeSeconds % 3600}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                size={100}
                strokeWidth={8}
                onComplete={() => ({ shouldRepeat: true })}
              >
                {({ elapsedTime }) =>
                  renderTime(
                    "Minutes",
                    Math.floor(((remainingTimeSeconds - elapsedTime) % 3600) / 60)
                  )
                }
              </CountdownCircleTimer>

              {/* Seconds */}
              <CountdownCircleTimer
                isPlaying
                duration={60}
                initialRemainingTime={remainingTimeSeconds % 60}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                size={100}
                strokeWidth={8}
                onComplete={() => ({ shouldRepeat: true })}
              >
                {({ elapsedTime }) =>
                  renderTime("Seconds", 60 - Math.floor(elapsedTime))
                }
              </CountdownCircleTimer>
            </div>
          ) : (
            <div className="text-center mt-4 font-semibold text-red-600">
              Marathon Started or Date Invalid
            </div>
          )}

          <Link to={`/registration/${id}`}>
            <button
              className={`btn ${
                isRegisterEnabled ? "btn-success" : "btn-disabled"
              } text-center w-full mt-4`}
              disabled={!isRegisterEnabled}
            >
              {isRegisterEnabled ? "Register Now" : "Registration Closed"}
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
