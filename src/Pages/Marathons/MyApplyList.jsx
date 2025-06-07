import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import Spinner from "../../Components/Spinner";
import Swal from "sweetalert2";
import UserModal from "../../components/UserModal";


const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal related state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/registrations/by-email/${user.email}`)
        .then((res) => {
          setRegistrations(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching registrations:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) return <Spinner></Spinner>;

  // Delete function same as before
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
          .delete(`http://localhost:3000/registrations/${id}`)
          .then((res) => {
            if (res.data.success || res.data.deletedCount) {
              Swal.fire("Deleted!", res.data.message, "success");
              setRegistrations((prev) => prev.filter((m) => m._id !== id));
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

  // When update button is clicked
  const handleUpdateClick = (reg) => {
    setSelectedReg(reg);
    setIsModalOpen(true);
  };

  // Modal 
  const handleUpdateSubmit = (updatedData) => {
    axios
      .patch(`http://localhost:3000/registrations/${selectedReg._id}`, updatedData)
      .then((res) => {
        if (res.data.success) {
          Swal.fire("Updated!", res.data.message, "success");
          // Update local state
          setRegistrations((prev) =>
            prev.map((reg) =>
              reg._id === selectedReg._id ? { ...reg, ...updatedData } : reg
            )
          );
          setIsModalOpen(false);
        } else {
          Swal.fire("Failed!", res.data.message, "error");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        Swal.fire("Error!", "Update failed.", "error");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        📝 Your registered marathons list= {registrations.length}
      </h2>
      {registrations.length === 0 ? (
        <p className="text-gray-600">
          You haven't registered for any marathon yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {registrations.map((reg, index) => (
            <li key={reg._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">
                {index + 1}. {reg.marathonTitle}
              </h3>
              <p>
                <strong>Start Date:</strong> {reg.marathonDate}
              </p>
              <p>
                <strong>Name:</strong> {reg.firstName} {reg.lastName}
              </p>
              <p>
                <strong>Contact:</strong> {reg.contact}
              </p>
              {reg.info && (
                <p>
                  <strong>Info:</strong> {reg.info}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Registered on: {new Date(reg.timestamp).toLocaleString()}
              </p>
              <button
                onClick={() => handleUpdateClick(reg)}
                className="btn btn-xs btn-info mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(reg._id)}
                className="btn btn-xs btn-error"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        registration={selectedReg}
        onUpdate={handleUpdateSubmit}
      />
    </div>
  );
};

export default MyApplyList;
