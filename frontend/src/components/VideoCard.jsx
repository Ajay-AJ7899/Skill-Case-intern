import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { likeVideo, bookmarkVideo } from '../api/videoApi';
import CommentSheet from './CommentSheet';
import { useAuth } from '../hooks/useAuth';
import './video-card.css';

const getVideoSource = (filePath) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  return `${baseUrl}${filePath}`;
};

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const { token } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(video.like_count || 0);
  const [liked, setLiked] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [feedback, setFeedback] = useState('');

  const videoSource = useMemo(() => getVideoSource(video.file_path), [video.file_path]);

  useEffect(() => {
    const element = videoRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.7);
      },
      { threshold: [0.35, 0.7, 1] }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = videoRef.current;

    if (!element) {
      return;
    }

    if (isVisible) {
      element.play().catch(() => {});
    } else {
      element.pause();
    }
  }, [isVisible]);

  const handleLike = async () => {
    if (liked) {
      return;
    }

    setLiked(true);
    setLikes((current) => current + 1);
    setFeedback('');

    try {
      await likeVideo(video.id);
    } catch (error) {
      setLiked(false);
      setLikes((current) => Math.max(current - 1, 0));
      setFeedback(error.response?.data?.message || 'Could not like this video');
    }
  };

  const handleBookmark = async () => {
    if (bookmarked || bookmarking) {
      return;
    }

    setBookmarking(true);
    setFeedback('');

    try {
      await bookmarkVideo(video.id);
      setBookmarked(true);
    } catch (error) {
      setFeedback(error.response?.data?.message || 'Could not bookmark this video');
    } finally {
      setBookmarking(false);
    }
  };

  return (
    <>
      <section className="video-panel">
        <div className="video-surface">
          <video
            ref={videoRef}
            className="video-player"
            src={videoSource}
            loop
            muted
            playsInline
            controls={false}
          />

          <div className="video-overlay" />

          <div className="video-meta">
            <span className="video-category">{video.category}</span>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            {feedback ? <span className="video-feedback">{feedback}</span> : null}
          </div>

          <div className="video-actions">
            <motion.button
              className={`video-action ${liked ? 'active' : ''}`}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              disabled={liked}
              type="button"
            >
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M12 21s-6.716-4.35-9.428-8.159C.97 10.6 1.32 7.33 3.6 5.6c2.06-1.562 4.967-1.098 6.727 1.072L12 8.64l1.673-1.968c1.76-2.17 4.667-2.634 6.727-1.072 2.281 1.73 2.63 5 .028 7.241C18.716 16.65 12 21 12 21Z" />
                </svg>
              </span>
              <strong>{likes}</strong>
            </motion.button>

            <motion.button
              className="video-action"
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowComments(true)}
              type="button"
            >
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2h9A3.5 3.5 0 0 1 20 5.5v7A3.5 3.5 0 0 1 16.5 16H11l-4.714 4.243A.75.75 0 0 1 5 19.686V16.2A3.5 3.5 0 0 1 4 12.5v-7Z" />
                </svg>
              </span>
              <strong>Open</strong>
            </motion.button>

            <motion.button
              className={`video-action ${bookmarked ? 'active' : ''}`}
              whileTap={{ scale: 0.9 }}
              onClick={handleBookmark}
              disabled={bookmarked || bookmarking}
              type="button"
            >
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M7 3.5A2.5 2.5 0 0 0 4.5 6v14.25c0 .596.672.944 1.158.6L12 16.4l6.342 4.45c.486.344 1.158-.004 1.158-.6V6A2.5 2.5 0 0 0 17 3.5H7Z" />
                </svg>
              </span>
              <strong>{bookmarked ? 'Saved' : 'Save'}</strong>
            </motion.button>
          </div>
        </div>
      </section>

      <CommentSheet
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        videoId={video.id}
        isAuthenticated={Boolean(token)}
      />
    </>
  );
};

export default VideoCard;
