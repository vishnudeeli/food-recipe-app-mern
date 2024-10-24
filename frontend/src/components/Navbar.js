import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css'; // Import CSS

const Navbar = ({ token, logout, username }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkUserRole = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get('http://localhost:5000/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAdmin(response.data.isAdmin); 
    }
  };

  useEffect(() => {
    checkUserRole();
  }, []);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {token && (
          <>
            <li>
              <Link to="/recipes">Recipes {isAdmin}</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/admins">Admins</Link>
              </li>
            )}
            <li>
          <Link to="/favorites"> Favourites</Link>
        </li>
          </>
        )}
        
      </ul>

      {token ? (
        <div className="profile-section">
          <span className="profile-icon">{username}</span>
          <div className="profile-dropdown">
            <Link to="/profile">Edit Profile</Link>
            <Link to="/change-password">Password Change</Link>
            <center><button onClick={() => { logout(); navigate('/'); }}>Logout</button>
            </center>
          </div>
        </div>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login/Signup</Link>
          </li>
          {/* <li>
            <Link to="/register">Sign Up</Link>
          </li> */}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
