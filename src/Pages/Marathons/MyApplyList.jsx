import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import axios from 'axios';

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:3000/registrations/by-email/${user.email}`)
        .then(res => {
          setRegistrations(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching registrations:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📝 Your registered marathons list</h2>
      {
        registrations.length === 0 ? (
          <p className="text-gray-600">You haven't registered for any marathon yet.</p>
        ) : (
          <ul className="space-y-4">
            {
              registrations.map((reg, index) => (
                <li key={reg._id} className="border p-4 rounded shadow">
                  <h3 className="text-xl font-semibold">{index + 1}. {reg.marathonTitle}</h3>
                  <p><strong>Start Date:</strong> {reg.marathonDate}</p>
                  <p><strong>Name:</strong> {reg.firstName} {reg.lastName}</p>
                  <p><strong>Contact:</strong> {reg.contact}</p>
                  {reg.info && <p><strong>Info:</strong> {reg.info}</p>}
                  <p className="text-sm text-gray-500">Registered on: {new Date(reg.timestamp).toLocaleString()}</p>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

export default MyApplyList;
