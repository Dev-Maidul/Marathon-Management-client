import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

const UpdateModal = ({ marathon, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: marathon.title || "",
    distance: marathon.distance || "25k",
    startDate: marathon.startDate || null,
    startRegDate: marathon.startRegDate || null,
    endRegDate: marathon.endRegDate || null,
    location: marathon.location || "",
    description: marathon.description || "",
    image: marathon.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date ? date.toISOString() : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `https://marathon-management-server-flax.vercel.app/marathons/${marathon._id}`,
        formData
      );
      if (res.data.success) {
        Swal.fire("Updated!", res.data.message, "success");
        onUpdated();
        onClose();
      } else {
        Swal.fire("Error", res.data.message || "Update failed", "error");
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "Failed to update marathon", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Update Marathon</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Marathon Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm mb-1">Start Registration Date</label>
              <DatePicker
                selected={formData.startRegDate ? new Date(formData.startRegDate) : null}
                onChange={(date) => handleDateChange("startRegDate", date)}
                className="input input-bordered w-full"
                placeholderText="Select start date"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm mb-1">End Registration Date</label>
              <DatePicker
                selected={formData.endRegDate ? new Date(formData.endRegDate) : null}
                onChange={(date) => handleDateChange("endRegDate", date)}
                className="input input-bordered w-full"
                placeholderText="Select end date"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm mb-1">Marathon Start Date</label>
              <DatePicker
                selected={formData.startDate ? new Date(formData.startDate) : null}
                onChange={(date) => handleDateChange("startDate", date)}
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
            value={formData.location}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <div>
            <label className="block text-sm mb-1">Running Distance</label>
            <select
              name="distance"
              value={formData.distance}
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
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
          />

          <input
            type="url"
            name="image"
            placeholder="Marathon Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline w-1/2"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary w-1/2">
              Update Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
