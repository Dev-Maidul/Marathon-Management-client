import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import UpdateModal from "../../components/UpdateModal";
import Spinner from '../../components/Spinner';
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyMarathonList = () => {
  const { user,loading,setLoading } = useContext(AuthContext);
  const [myMarathons, setMyMarathons] = useState([]);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const axiosSecure=useAxiosSecure();     
if(loading) return <Spinner></Spinner>
  const fetchMarathons = () => {
    axiosSecure
      .get(`https://marathon-management-server-flax.vercel.app/my-marathons?email=${user.email}`)
      .then((res) => {
        setMyMarathons(res.data)
        setLoading(false);
        
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`https://marathon-management-server-flax.vercel.app/marathons/${id}`)
          .then((res) => {
            if (res.data.success || res.data.deletedCount) {
              Swal.fire("Deleted!", res.data.message, "success");
              setMyMarathons((prev) => prev.filter((m) => m._id !== id));
            } else {
              Swal.fire("Failed!", res.data.message, "error");
            }
          })
          .catch((err) => {
            console.error("Delete error:", err);
            Swal.fire("Error!", "Delete failed.", "error");
          });
      }
    });
  };

  useEffect(() => {
    if (user?.email) fetchMarathons();
  }, [user?.email]);

  return (
    <div className="p-4">
  <title>my-marathons-list</title>
  <h2 className="text-2xl font-bold mb-4 text-center">Your Created Marathons</h2>
  {myMarathons.length === 0 ? (
    <p className="text-center text-gray-500">You have not created any marathons yet.</p>
  ) : (
    <div className="hidden md:block overflow-x-auto">
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
                <button
                  className="btn btn-xs btn-info mr-2"
                  onClick={() => setSelectedMarathon(marathon)}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(marathon._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Mobile View */}
  <div className="md:hidden space-y-4">
    {myMarathons.map((marathon) => (
      <div
        key={marathon._id}
        className="border p-4 rounded-lg shadow-md bg-white"
      >
        <h3 className="text-lg font-semibold">{marathon.title}</h3>
        <p><span className="font-medium">Date:</span> {new Date(marathon.startDate).toLocaleDateString()}</p>
        <p><span className="font-medium">Distance:</span> {marathon.distance}</p>
        <p><span className="font-medium">Location:</span> {marathon.location}</p>
        <div className="mt-2 space-x-2">
          <button
            className="btn btn-sm btn-info"
            onClick={() => setSelectedMarathon(marathon)}
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(marathon._id)}
            className="btn btn-sm btn-error"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Modal */}
  {selectedMarathon && (
    <UpdateModal
      marathon={selectedMarathon}
      onClose={() => setSelectedMarathon(null)}
      onUpdated={fetchMarathons}
    />
  )}
</div>

  );
};

export default MyMarathonList;
