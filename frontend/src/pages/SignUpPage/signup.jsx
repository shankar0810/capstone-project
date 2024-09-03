import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from '../../components/Header/Head';
import Footer from '../../components/Footer/Footer';
import './signup.css';
import { v4 as uuidv4 } from 'uuid';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  
  const navigate = useNavigate(); 

  const validateForm = () => {
    if (!username) {
      toast.error("Username is required");
      return false;
    }
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const uniqueId = uuidv4();
      
      const response = await fetch('http://localhost:9999/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: uniqueId,
          username: username,
          email: email,
          password: password,
        }), 
      });
      
      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        const result = await response.json();
        toast.error(result.message || "Signup failed. Please try again.");
      }
      
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup">
      <Head />
      <ToastContainer />
      <div className='signup-container'>
        <div className="main-content3">
          <section className="signup-section">
            <div className="signup-wrapper">
              <motion.div
                className="signup-text"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2>Sign Up to become fit and healthy</h2>
                <p>If you already have an account you can<br/><Link to="/signin">Login here!</Link></p>
              </motion.div>

              <motion.div
                className="signup-form"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h3>Welcome User</h3>
                <form onSubmit={handleSignup}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="signup-input"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="signup-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="signup-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="register-button">
                    Register
                  </button>
                </form>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
      <section className="footer">
        <Footer />
      </section>
    </div>
  );
}

export default Signup;
