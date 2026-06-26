CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE videos (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  file_path TEXT NOT NULL,
  like_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE likes (
  user_id BIGINT NOT NULL,
  video_id BIGINT NOT NULL,
  PRIMARY KEY (user_id, video_id),
  CONSTRAINT fk_likes_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_likes_video
    FOREIGN KEY (video_id)
    REFERENCES videos (id)
    ON DELETE CASCADE
);

CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  video_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_comments_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_comments_video
    FOREIGN KEY (video_id)
    REFERENCES videos (id)
    ON DELETE CASCADE
);

CREATE TABLE bookmarks (
  user_id BIGINT NOT NULL,
  video_id BIGINT NOT NULL,
  PRIMARY KEY (user_id, video_id),
  CONSTRAINT fk_bookmarks_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_bookmarks_video
    FOREIGN KEY (video_id)
    REFERENCES videos (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_videos_category ON videos (category);
