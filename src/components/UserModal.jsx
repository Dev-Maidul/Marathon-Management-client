import React, { useState, useEffect } from "react";

const UserModal = ({ isOpen, onClose, registration, onUpdate }) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    info: "",
  });

  useEffect(() => {
    if (registration) {
      setFormData({
        firstName: registration.firstName || "",
        lastName: registration.lastName || "",
        contact: registration.contact || "",
        info: registration.info || "",
      });
    }
  }, [registration]);

  if (!isOpen) return null; 

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Update Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="font-semibold">Marathon Title (readonly):</label>
            <input
              type="text"
              value={registration.marathonTitle}
              readOnly
              className="w-full border px-2 py-1 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="font-semibold">Marathon Start Date (readonly):</label>
            <input
              type="text"
              value={registration.marathonDate}
              readOnly
              className="w-full border px-2 py-1 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="font-semibold">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Info:</label>
            <textarea
              name="info"
              value={formData.info}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
