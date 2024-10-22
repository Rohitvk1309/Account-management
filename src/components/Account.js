import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (loggedIn && storedUser) {
      setIsLoggedIn(true);
      setName(storedUser.name);
      setEmail(storedUser.email);
    } else {
      alert('Please log in to view account details.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      email,
      password: JSON.parse(localStorage.getItem('user')).password,
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Account information updated!');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    alert('You have been logged out.');
    navigate('/login');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="mt-5">
      <h2>Account Information</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Save</button>
        <button type="button" className="btn btn-danger mt-3 ml-2" onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
}

export default Account;
