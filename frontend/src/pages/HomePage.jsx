import { motion } from 'framer-motion';
import HomeHeader from '../components/HomeHeader';
import ReelFeed from '../components/ReelFeed';
import '../components/home-page.css';

const HomePage = () => {
  return (
    <motion.main
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HomeHeader />
      <ReelFeed />
    </motion.main>
  );
};

export default HomePage;
