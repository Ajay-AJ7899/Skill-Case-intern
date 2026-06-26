import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getComments, postComment } from '../api/videoApi';
import './comment-sheet.css';

const CommentSheet = ({ isOpen, onClose, videoId, isAuthenticated }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadComments = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getComments(videoId);
      setComments(response.data.data || []);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || 'Unable to load comments right now'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen, videoId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      setError('Login to post a comment');
      return;
    }

    if (!content.trim() || submitting) {
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await postComment(videoId, { content: content.trim() });
      setContent('');
      await loadComments();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            className="sheet-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
          />

          <motion.aside
            className="comment-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            <div className="sheet-header">
              <div>
                <span>Discussion</span>
                <h3>Comments</h3>
              </div>
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>

            <div className="sheet-body">
              {loading ? <p className="sheet-status">Loading comments...</p> : null}
              {error ? <p className="sheet-error">{error}</p> : null}
              {!loading && !error && comments.length === 0 ? (
                <p className="sheet-status">No comments yet. Start the conversation.</p>
              ) : null}

              <div className="comment-list">
                {comments.map((comment) => (
                  <article key={comment.id} className="comment-item">
                    <div className="comment-avatar">
                      {(comment.user_name || 'U').slice(0, 1).toUpperCase()}
                    </div>
                    <div className="comment-content">
                      <strong>{comment.user_name || 'User'}</strong>
                      <p>{comment.content}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <form className="comment-form" onSubmit={handleSubmit}>
              {!isAuthenticated ? (
                <div className="comment-login-hint">
                  <span>Want to join the conversation?</span>
                  <Link to="/login" onClick={onClose}>
                    Login
                  </Link>
                </div>
              ) : null}
              <input
                type="text"
                placeholder="Write a comment..."
                value={content}
                onChange={(event) => setContent(event.target.value)}
                disabled={!isAuthenticated}
              />
              <button
                type="submit"
                disabled={!isAuthenticated || submitting || !content.trim()}
              >
                {submitting ? 'Posting...' : 'Post'}
              </button>
            </form>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default CommentSheet;
