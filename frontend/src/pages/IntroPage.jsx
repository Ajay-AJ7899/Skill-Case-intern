import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import '../components/intro-page.css';

const IntroPage = () => {
  return (
    <motion.main
      className="intro-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full-screen Spline 3D background */}
      <Spline scene="https://prod.spline.design/wJzYcMroJ8qOFkOG/scene.splinecode" />

      {/* Overlay UI — sits on top of the 3D scene */}
      <div className="intro-overlay">
        {/* Top-right auth buttons */}
        <motion.nav
          className="intro-nav"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/login" className="intro-btn-login" id="intro-login-btn">
            Log in
          </Link>
          <Link to="/register" className="intro-btn-register" id="intro-register-btn">
            Get Started
          </Link>
        </motion.nav>

        {/* Bottom-left branding */}
        <motion.div
          className="intro-brand"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <span className="intro-brand-logo">S</span>
          <span className="intro-brand-name">Skillcase</span>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default IntroPage;
