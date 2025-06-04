import React, { useEffect, useState } from 'react';
import { MdEdit, MdLogout, MdLock, MdSave, MdCancel } from 'react-icons/md';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';
import { useNavigate } from 'react-router-dom';

const fieldLabels = {
  fullname: 'Full Name',
  username: 'Username',
  email: 'Email',
};

const AccountPage = () => {
  const [userData, setUserData] = useState({
    fullname: '',
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editField, setEditField] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [fieldError, setFieldError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error ${res.status}: ${text}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(`Unexpected response: ${text}`);
        }

        const data = await res.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEditClick = (field) => {
    setEditField(field);
    setInputValue(userData[field] || '');
    setFieldError('');
  };

  const handleSaveClick = async () => {
    setFieldError('');
    if (editField === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        setFieldError('Please enter a valid email address.');
        return;
      }
    }
    if (!inputValue.trim()) {
      setFieldError('Value cannot be empty.');
      return;
    }

    try {
      const updated = { [editField]: inputValue.trim() };
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const text = await res.text();
        setFieldError(text || 'Failed to update profile.');
        return;
      }

      const data = await res.json();
      setUserData((prev) => ({ ...prev, ...data }));
      setEditField(null);
    } catch (err) {
      setFieldError(err.message);
    }
  };

  const handleCancelClick = () => {
    setEditField(null);
    setFieldError('');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error.message);
      navigate('/login'); // redirect even on error
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <NavbarDesktop />
      <NavbarMobile />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <h1 className="text-3xl font-bold text-teal-400 mb-7">
          Account Settings
        </h1>

        <div className="space-y-6">
          {['fullname', 'username', 'email'].map((field) => (
            <div
              key={field}
              className="bg-gray-900 p-5 rounded-xl flex justify-between items-center shadow-md"
            >
              <div>
                <p className="text-sm text-gray-400 capitalize">{fieldLabels[field]}</p>
                {editField === field ? (
                  <>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="bg-gray-800 text-white rounded px-3 py-2 w-64"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveClick();
                        if (e.key === 'Escape') handleCancelClick();
                      }}
                    />
                    {fieldError && (
                      <p className="text-red-400 text-xs mt-1">{fieldError}</p>
                    )}
                  </>
                ) : (
                  <h2 className="text-xl font-semibold">{userData[field]}</h2>
                )}
              </div>

              {editField === field ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveClick}
                    className="text-green-400 hover:bg-green-800 p-2 rounded-full transition"
                    aria-label="Save"
                    disabled={!inputValue.trim()}
                  >
                    <MdSave className="text-xl" />
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="text-red-400 hover:bg-red-800 p-2 rounded-full transition"
                    aria-label="Cancel"
                  >
                    <MdCancel className="text-xl" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditClick(field)}
                  className="text-yellow-400 hover:bg-yellow-800 p-2 rounded-full transition"
                  aria-label={`Edit ${field}`}
                >
                  <MdEdit className="text-xl" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-5 rounded-xl text-sm shadow-md transition"
          >
            <MdLogout className="text-lg" />
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
