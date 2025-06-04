import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const dateFromQuery = queryParams.get('date') || '';
  const idFromQuery = queryParams.get('id') || '';

  const [recordData, setRecordData] = useState({
    date: '',
    fastingTest: '',
    fastingTime: '',
    afterLunchTest: '',
    afterLunchTime: '',
  });

  const [recordId, setRecordId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        if (idFromQuery) {
          setLoading(true);
          const res = await fetch(`https://sweet-track-api.onrender.com/api/report/${idFromQuery}`, {
            method: 'GET',
            credentials: 'include',
          });

          if (!res.ok) throw new Error('Failed to fetch record');

          const data = await res.json();
          console.log('Fetched data:', data); // ✅ Debug

          setRecordId(data._id);
          setRecordData({
            date: data.date ? data.date.slice(0, 10) : '',
            fastingTest: data.fastingTest !== undefined ? String(data.fastingTest) : '',
            fastingTime: data.fastingTime || '',
            afterLunchTest: data.afterLunchTest !== undefined ? String(data.afterLunchTest) : '',
            afterLunchTime: data.afterLunchTime || '',
          });
        } else if (dateFromQuery) {
          const formattedDate = dateFromQuery.length > 10 ? dateFromQuery.slice(0, 10) : dateFromQuery;
          setRecordData((prev) => ({ ...prev, date: formattedDate }));
        }
      } catch (err) {
        console.error('Error fetching record:', err);
        alert('Failed to load record data.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [idFromQuery, dateFromQuery]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, fastingTest, fastingTime, afterLunchTest, afterLunchTime } = recordData;

    if (!date.trim()) {
      alert('Please select a date.');
      return;
    }

    const payload = { date };
    if (fastingTest.trim() !== '') payload.fastingTest = Number(fastingTest);
    if (fastingTime.trim() !== '') payload.fastingTime = fastingTime;
    if (afterLunchTest.trim() !== '') payload.afterLunchTest = Number(afterLunchTest);
    if (afterLunchTime.trim() !== '') payload.afterLunchTime = afterLunchTime;

    try {
      setLoading(true);

      const response = await fetch(
        recordId
          ? `https://sweet-track-api.onrender.com/api/report/${recordId}`
          : 'https://sweet-track-api.onrender.com/api/report/create',
        {
          method: recordId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Unknown error occurred');
      }

      setSuccess(true);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMore = () => {
    setRecordData({
      date: '',
      fastingTest: '',
      fastingTime: '',
      afterLunchTest: '',
      afterLunchTime: '',
    });
    setRecordId(null);
    setSuccess(false);
  };

  if (loading && !success) {
    return <p className="text-center text-teal-400 mt-10">Loading record...</p>;
  }

  return (
    <section className="p-4 mt-6 bg-black rounded-lg shadow-lg max-w-md mx-auto text-white">
      <h1 className="text-3xl font-bold text-teal-400 text-center">
        {recordId ? 'Update Glucose Record' : 'Add Glucose Record'}
      </h1>

      {!success ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Date</label>
            <input
              type="date"
              name="date"
              value={recordData.date}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-teal-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
              disabled={!!recordId}
            />
          </div>

          {/* Fasting Test */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Fasting Glucose (mg/dL)</label>
            <input
              type="number"
              name="fastingTest"
              value={recordData.fastingTest}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-orange-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. 95"
              min="0"
            />
          </div>

          {/* Fasting Time */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Fasting Time</label>
            <input
              type="time"
              name="fastingTime"
              value={recordData.fastingTime}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-cyan-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* After Lunch Test */}
          <div>
            <label className="block text-sm font-medium text-gray-300">After Lunch Glucose (mg/dL)</label>
            <input
              type="number"
              name="afterLunchTest"
              value={recordData.afterLunchTest}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-lime-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="e.g. 145"
              min="0"
            />
          </div>

          {/* After Lunch Time */}
          <div>
            <label className="block text-sm font-medium text-gray-300">After Lunch Time</label>
            <input
              type="time"
              name="afterLunchTime"
              value={recordData.afterLunchTime}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-teal-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-colors duration-200 ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {recordId ? 'Update Record' : 'Save Record'}
          </button>
        </form>
      ) : (
        <div className="mt-8 text-center space-y-4">
          <p className="text-teal-400 text-xl font-semibold">Record saved successfully!</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleAddMore}
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg font-semibold transition"
            >
              Add More
            </button>
            <button
              onClick={() => navigate('/record')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition"
            >
              All Records
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddRecord;
