import React, { use, useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../Components/Spinner";
import Swal from "sweetalert2";
import UserModal from "../../components/UserModal";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BASE_URL = "https://marathon-management-server-flax.vercel.app";  

const MyApplyList = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal related state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState(null);

  // Search keyword state
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(user.accessToken);
  const axiosSecure=useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/registrations/by-email/${user.email}`)
        .then((res) => {
          setRegistrations(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching registrations:", err);
          setLoading(false);
        });
    }
  }, [user?.email,axiosSecure]);

  if (loading) return <Spinner />;

  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter((reg) =>
    reg.marathonTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          .delete(`${BASE_URL}/registrations/${id}`)
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

  const handleUpdateClick = (reg) => {
    setSelectedReg(reg);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = (updatedData) => {
    axiosSecure
      .patch(`${BASE_URL}/registrations/${selectedReg._id}`, updatedData)
      .then((res) => {
        if (res.data.success) {
          Swal.fire("Updated!", res.data.message, "success");
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
  <title>my-apply-list</title>

  <h2 className="text-2xl font-bold mb-4">
    📝 Your apply list = {registrations.length}
  </h2>

  {/* Search Input */}
  <input
    type="text"
    placeholder="Search by marathon title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="mb-4 p-2 border border-gray-400 rounded w-full"
  />

  {filteredRegistrations.length === 0 ? (
    <p className="text-gray-600">
      {searchTerm
        ? "No marathons found matching your search."
        : "You haven't registered for any marathon yet."}
    </p>
  ) : (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Marathon Title</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Contact</th>
              <th className="border border-gray-300 px-4 py-2">Info</th>
              <th className="border border-gray-300 px-4 py-2">Registered On</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((reg, index) => (
              <tr key={reg._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{reg.marathonTitle}</td>
                <td className="border border-gray-300 px-4 py-2">{reg.marathonDate}</td>
                <td className="border border-gray-300 px-4 py-2">{reg.firstName} {reg.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{reg.contact}</td>
                <td className="border border-gray-300 px-4 py-2">{reg.info || "-"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(reg.timestamp).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-y-1 text-left">
                  <button
                    onClick={() => handleUpdateClick(reg)}
                    className="btn btn-sm btn-info mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(reg._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredRegistrations.map((reg, index) => (
          <div
            key={reg._id}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            <h3 className="font-semibold text-lg mb-1">{reg.marathonTitle}</h3>
            <p><span className="font-medium">Date:</span> {reg.marathonDate}</p>
            <p><span className="font-medium">Name:</span> {reg.firstName} {reg.lastName}</p>
            <p><span className="font-medium">Contact:</span> {reg.contact}</p>
            <p><span className="font-medium">Info:</span> {reg.info || "-"}</p>
            <p><span className="font-medium">Registered:</span> {new Date(reg.timestamp).toLocaleString()}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleUpdateClick(reg)}
                className="btn btn-sm btn-info"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(reg._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )}

  {/* Modal */}
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
