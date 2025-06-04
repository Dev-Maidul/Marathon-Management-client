import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddMarathon = () => {
  const [marathon, setMarathon] = useState({
    title: '',
    startRegDate: null,
    endRegDate: null,
    startDate: null,
    location: '',
    distance: '10k',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarathon({ ...marathon, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMarathon = {
      ...marathon,
      createdAt: new Date(),
      totalRegistrationCount: 0,
    };

    try {
      const res = await axios.post('https://your-api.com/marathons', newMarathon);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Marathon Added!',
          text: 'Your marathon has been successfully added.',
          timer: 2000,
          showConfirmButton: false,
        });
        // Reset form
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
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Marathon</h2>
      <form className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Marathon Title"
          value={marathon.title}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-sm">Start Registration Date</label>
            <DatePicker
              selected={marathon.startRegDate}
              onChange={(date) => setMarathon({ ...marathon, startRegDate: date })}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm">End Registration Date</label>
            <DatePicker
              selected={marathon.endRegDate}
              onChange={(date) => setMarathon({ ...marathon, endRegDate: date })}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm">Marathon Start Date</label>
            <DatePicker
              selected={marathon.startDate}
              onChange={(date) => setMarathon({ ...marathon, startDate: date })}
              className="input input-bordered w-full"
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
  );
};

export default AddMarathon;
