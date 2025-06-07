import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const MyMarathonList = () => {
  const { user } = useContext(AuthContext);
  const [myMarathons, setMyMarathons] = useState([]);
  // handle delete 
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
        // Perform delete action
        fetch(`http://localhost:3000/marathons/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Marathon has been deleted.",
                icon: "success",
              });

              // Remove the deleted group from the state
              setMyMarathons(myMarathons.filter((marathon) => marathon._id !== id));
            }
          })
          .catch((err) => {
            console.error("Error deleting group:", err);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the marathon.",
              icon: "error",
            });
          });
      }
    });
  };
  
 
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
                    <button onClick={()=>handleDelete(marathon._id)} className="btn btn-xs btn-error">Delete</button>
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
