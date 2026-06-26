const { pool } = require('../config/db');
const AppError = require('../utils/appError');
const { ensureVideoExists } = require('./videoService');

const addComment = async ({ videoId, userId, content }) => {
  if (!content) {
    throw new AppError('content is required', 400);
  }

  await ensureVideoExists(videoId);

  const result = await pool.query(
    `INSERT INTO comments (user_id, video_id, content)
     VALUES ($1, $2, $3)
     RETURNING id, user_id, video_id, content, created_at`,
    [userId, videoId, content]
  );

  return result.rows[0];
};

const getCommentsByVideoId = async (videoId) => {
  await ensureVideoExists(videoId);

  const result = await pool.query(
    `SELECT c.id, c.user_id, u.name AS user_name, c.video_id, c.content, c.created_at
     FROM comments c
     INNER JOIN users u ON u.id = c.user_id
     WHERE c.video_id = $1
     ORDER BY c.created_at ASC`,
    [videoId]
  );

  return result.rows;
};

module.exports = {
  addComment,
  getCommentsByVideoId,
};
