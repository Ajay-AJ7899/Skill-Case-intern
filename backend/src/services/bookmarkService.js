const { pool } = require('../config/db');
const AppError = require('../utils/appError');
const { ensureVideoExists } = require('./videoService');

const addBookmark = async ({ videoId, userId }) => {
  await ensureVideoExists(videoId);

  const result = await pool.query(
    `INSERT INTO bookmarks (user_id, video_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING
     RETURNING user_id, video_id`,
    [userId, videoId]
  );

  if (result.rows.length === 0) {
    throw new AppError('Video already bookmarked', 409);
  }

  return result.rows[0];
};

module.exports = {
  addBookmark,
};
