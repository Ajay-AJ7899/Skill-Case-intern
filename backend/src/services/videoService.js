const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');
const AppError = require('../utils/appError');

const uploadsDirectory = path.join(__dirname, '..', '..', 'uploads');

const normalizeFilePath = (filePath) => {
  if (!filePath) {
    throw new AppError('file_path is required', 400);
  }

  const cleanPath = filePath.replace(/\\/g, '/').trim();
  const relativePath = cleanPath.startsWith('/uploads/')
    ? cleanPath.replace('/uploads/', '')
    : cleanPath;

  if (!relativePath || relativePath.includes('..')) {
    throw new AppError('file_path must point to a file inside uploads', 400);
  }

  const absolutePath = path.join(uploadsDirectory, relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new AppError('Referenced video file was not found in uploads', 400);
  }

  return `/uploads/${relativePath.replace(/^\/+/, '')}`;
};

const ensureVideoExists = async (videoId, client = pool) => {
  const result = await client.query('SELECT * FROM videos WHERE id = $1', [videoId]);

  if (result.rows.length === 0) {
    throw new AppError('Video not found', 404);
  }

  return result.rows[0];
};

const createVideo = async ({ title, description, category, file_path }) => {
  if (!title || !description || !category || !file_path) {
    throw new AppError(
      'title, description, category, and file_path are required',
      400
    );
  }

  const normalizedFilePath = normalizeFilePath(file_path);

  const result = await pool.query(
    `INSERT INTO videos (title, description, category, file_path)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, description, category, file_path, like_count, created_at`,
    [title, description, category, normalizedFilePath]
  );

  return result.rows[0];
};

const getVideos = async (category) => {
  if (category) {
    const result = await pool.query(
      `SELECT id, title, description, category, file_path, like_count, created_at
       FROM videos
       WHERE category = $1
       ORDER BY created_at DESC`,
      [category]
    );

    return result.rows;
  }

  const result = await pool.query(
    `SELECT id, title, description, category, file_path, like_count, created_at
     FROM videos
     ORDER BY created_at DESC`
  );

  return result.rows;
};

const getVideoById = async (videoId) => {
  return ensureVideoExists(videoId);
};

const likeVideo = async (videoId, userId) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await ensureVideoExists(videoId, client);

    const likeResult = await client.query(
      `INSERT INTO likes (user_id, video_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING
       RETURNING user_id`,
      [userId, videoId]
    );

    if (likeResult.rows.length === 0) {
      throw new AppError('Video already liked', 409);
    }

    const updateResult = await client.query(
      `UPDATE videos
       SET like_count = like_count + 1
       WHERE id = $1
       RETURNING id, title, description, category, file_path, like_count, created_at`,
      [videoId]
    );

    await client.query('COMMIT');
    return updateResult.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createVideo,
  getVideos,
  getVideoById,
  likeVideo,
  ensureVideoExists,
};
