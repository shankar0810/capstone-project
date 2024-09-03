import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Head from '../../components/Header/Head';
import Footer from '../../components/Footer/Footer';
import { useAuth } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.css';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  useEffect(() => {
    // Clear any existing session when the SignIn component mounts
    logout();
  }, [logout]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9999/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        
        // Update the context
        login({ token: data.token, userId: data.userId });
        
        toast.success('Login successful! Redirecting...');
        
        // Redirect after a short delay
        setTimeout(() => {
          const lastPath = localStorage.getItem('lastPath') || '/dashboard';
          navigate(lastPath);
        }, 1000); // Adjust the timeout as needed
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signin">
      <Head />
      <div className='signin-container'>
        <div className="main-content2">
          <section className="signin-section">
            <div className="signin-wrapper">
              <motion.div
                className="signin-text"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2>Sign In to become fit and healthy</h2>
                <p>If you don't have an account, you can<br/><Link to="/signup">Register here!</Link></p>
              </motion.div>

              <motion.div
                className="signin-form"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h3>Welcome Back</h3>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="signin-input"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="signin-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="login-button">
                    Login
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
      <ToastContainer />
    </div>
  );
}

export default SignIn;
