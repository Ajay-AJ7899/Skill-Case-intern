import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getVideos } from '../api/videoApi';
import VideoCard from './VideoCard';
import Loader from './Loader';
import './reel-feed.css';

const ReelFeed = () => {
  const [videos, setVideos] = useState([]);
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const feedRef = useRef(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const response = await getVideos();
        const loadedVideos = response.data.data || [];
        setVideos(loadedVideos);
        setFeedItems(loadedVideos);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message || 'Unable to load videos right now'
        );
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  useEffect(() => {
    const element = feedRef.current;

    if (!element || videos.length === 0) {
      return undefined;
    }

    const handleScroll = () => {
      const nearBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 200;

      if (nearBottom) {
        setFeedItems((current) => [...current, ...videos]);
      }
    };

    element.addEventListener('scroll', handleScroll);

    return () => element.removeEventListener('scroll', handleScroll);
  }, [videos]);

  if (loading) {
    return <Loader fullscreen label="Loading videos" />;
  }

  if (error) {
    return (
      <div className="feed-state">
        <h2>Feed unavailable</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="feed-state">
        <h2>No videos yet</h2>
        <p>Add videos from the backend first to see the reel feed here.</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={feedRef}
      className="reel-feed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {feedItems.map((video, index) => (
        <VideoCard key={`${video.id}-${index}`} video={video} />
      ))}
    </motion.div>
  );
};

export default ReelFeed;
