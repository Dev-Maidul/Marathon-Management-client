import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";

const MyMarathonList = () => {
  const { user } = useContext(AuthContext);
  const [myMarathons, setMyMarathons] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/my-marathons?email=${user.email}`)
        .then((res) => {
          setMyMarathons(res.data);
        })
        .catch((err) => {
          console.error('Error fetching user marathons:', err);
        });
    }
  }, [user?.email]);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Created Marathons</h2>
      {myMarathons.length === 0 ? (
        <p className="text-center text-gray-500">You have not created any marathons yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Marathon Name</th>
                <th>Date</th>
                <th>Distance</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myMarathons.map((marathon) => (
                <tr key={marathon._id}>
                  <td>{marathon.title}</td>
                  <td>{new Date(marathon.startDate).toLocaleDateString()}</td>
                  <td>{marathon.distance}</td>
                  <td>{marathon.location}</td>
                  <td>
                    <button className="btn btn-xs btn-info mr-2">Update</button>
                    <button className="btn btn-xs btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyMarathonList;
