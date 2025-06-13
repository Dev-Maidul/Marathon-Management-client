import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Spinner from "../../Components/Spinner";

const MarathonRegistration = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);
    const navigate=useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/marathons/${id}`)
      .then((res) => {
        setMarathon(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching marathon:", err);
        setLoading(false);
      });
  }, [id]);

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const registrationData = {
      email: user.email,
      marathonId: marathon._id,
      marathonTitle: marathon.title,
      marathonDate: marathon.startDate,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contact: form.contact.value,
      info: form.info.value,
      timestamp: new Date(),
    };

    try {
      // Save registration
      await axios.post("http://localhost:3000/registrations", registrationData);

      // Update registration count
      await axios.patch(`http://localhost:3000/marathons/${marathon._id}`, {
        totalRegistrationCount: (marathon.totalRegistrationCount || 0) + 1,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your registration has been done successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/dashboard/my-applies')
      form.reset();
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Something went wrong!");
    }
  };

  if (loading) return <Spinner></Spinner>;
  if (!marathon) return <div>Marathon not found</div>;

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded bg-white">
      <Helmet><title>Registration</title></Helmet>
      <h2 className="text-xl font-bold mb-4">Register for {marathon.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={marathon.title}
          readOnly
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={marathon.startDate}
          readOnly
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="contact"
          placeholder="Contact Number"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="info"
          placeholder="Additional Info"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Submit Register
        </button>
      </form>
    </div>
  );
};

export default MarathonRegistration;
