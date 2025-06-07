import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import UpdateModal from "../../components/UpdateModal";
import Spinner from '../../components/Spinner';
import { Helmet } from "react-helmet";

const MyMarathonList = () => {
  const { user,loading,setLoading } = useContext(AuthContext);
  const [myMarathons, setMyMarathons] = useState([]);
  const [selectedMarathon, setSelectedMarathon] = useState(null);

if(loading) return <Spinner></Spinner>
console.log(loading)
  const fetchMarathons = () => {
    axios
      .get(`http://localhost:3000/my-marathons?email=${user.email}`)
      .then((res) => {
        setMyMarathons(res.data)
        setLoading(false);
        console.log(loading)
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
        axios
          .delete(`http://localhost:3000/marathons/${id}`)
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
      <Helmet><title>my-marathons</title></Helmet>
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
