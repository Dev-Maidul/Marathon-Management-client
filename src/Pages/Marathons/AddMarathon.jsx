import React, { use, useState } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router';

const formatDate = (date) => {
  if (!date) return null;
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const AddMarathon = () => {
  const { user } = use(AuthContext);
 const navigate=useNavigate();
  const [marathon, setMarathon] = useState({
    title: '',
    startRegDate: null,
    endRegDate: null,
    startDate: null,
    createdAt: null,
    location: '',
    distance: '10k',
    description: '',
    image: '',
    email: user?.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarathon({ ...marathon, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMarathon = {
      ...marathon,
      createdAt: formatDate(new Date()),
      startRegDate: formatDate(marathon.startRegDate),
      endRegDate: formatDate(marathon.endRegDate),
      startDate: formatDate(marathon.startDate),
      totalRegistrationCount: 0,
    };

    try {
      const res = await axios.post('http://localhost:3000/add-marathon', newMarathon);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Marathon Added!',
          text: 'Your marathon has been successfully added.',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/dashboard/my-marathons');

        setMarathon({
          title: '',
          startRegDate: null,
          endRegDate: null,
          startDate: null,
          location: '',
          distance: '10k',
          description: '',
          image: '',
        });
      }
    } catch (err) {
      console.error('Submission Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add marathon. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 overflow-x-hidden">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Add New Marathon</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Marathon Title"
            value={marathon.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm mb-1">Start Registration Date</label>
              <DatePicker
                selected={marathon.startRegDate}
                onChange={(date) => setMarathon({ ...marathon, startRegDate: date })}
                className="input input-bordered w-full"
                placeholderText="Select start date"
                showIcon
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm mb-1">End Registration Date</label>
              <DatePicker
                selected={marathon.endRegDate}
                onChange={(date) => setMarathon({ ...marathon, endRegDate: date })}
                className="input input-bordered w-full"
                placeholderText="Select end date"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm mb-1">Marathon Start Date</label>
              <DatePicker
                selected={marathon.startDate}
                onChange={(date) => setMarathon({ ...marathon, startDate: date })}
                className="input input-bordered w-full"
                placeholderText="Select marathon date"
                required
              />
            </div>
          </div>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={marathon.location}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <div>
            <label className="block text-sm mb-1">Running Distance</label>
            <select
              name="distance"
              value={marathon.distance}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="25k">25k</option>
              <option value="10k">10k</option>
              <option value="3k">3k</option>
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Marathon Description"
            value={marathon.description}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
          />

          <input
            type="url"
            name="image"
            placeholder="Marathon Image URL"
            value={marathon.image}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <button type="submit" className="btn btn-primary w-full">
            Submit Marathon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMarathon;
