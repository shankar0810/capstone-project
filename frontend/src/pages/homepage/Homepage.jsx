import React, { useEffect } from 'react';
import Head from '../../components/Header/Head';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import hero from '../../assests/hero.png';
import './homepage.css';
import InformativeArticles from './InformativeArticles';
import Footer from '../../components/Footer/Footer';

function Homepage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div>
      <Head />
      <div className="main-content">
        <section className="flex items-center">
          <div className="mx-auto flex flex-col md:flex-row items-center">
            {/* First Flexbox: Text and Input Form with Framer Motion */}
            <motion.div
              className="lg:text-left md:w-1/2 mb-8 md:mb-0 p-8 rounded-lg"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl justify-start md:justify-start font-bold mb-4">Discover Your Wellness Using Our HealthHub</h2>
              <p className="text-lg justify-start md:justify-start mb-4">Explore a holistic approach to a healthier lifestyle</p>
              <Link to="/signup" className="flex justify-start md:justify-start">
                <motion.button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  whileHover={{ scale: 1.3, background: 'linear-gradient(90deg, #3A8EF6, #6F3AFA)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>

            {/* Second Flexbox: Hero Image with Framer Motion */}
            <motion.div
              className="md:w-1/2 flex justify-center md:justify-end"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={hero}
                alt="HealthHub"
                className="max-w-full h-auto"
              />
            </motion.div>
          </div>
        </section>
        <section id="informative-articles">
          <InformativeArticles />
        </section>
        <section id="footer">
          <Footer />
        </section>
      </div>
    </div>
  );
}

export default Homepage;
