# Skillcase Internship Assessment Backend

Clean MVP backend built with Node.js, Express.js, PostgreSQL (Supabase), JWT, bcrypt, `pg`, and `dotenv`.

## Folder Structure

```text
src/
|-- config/
|-- controllers/
|-- services/
|-- routes/
|-- middlewares/
|-- utils/
`-- server.js
```

## Setup

1. Install dependencies:

```bash
npm install
```
2. Open the Supabase SQL Editor and run the contents of [schema.sql](/D:/Skill%20Case/backend/schema.sql).

3. Start the server:

```bash
npm start
```

## Environment Variables

```env
PORT=5000
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Videos

- `POST /videos`
- `GET /videos`
- `GET /videos/:id`

### Likes

- `POST /videos/:id/like`

### Comments

- `POST /videos/:id/comment`
- `GET /videos/:id/comments`

### Bookmarks

- `POST /videos/:id/bookmark`

## Notes

- The server verifies the Supabase database connection before it starts listening.
- Video files are served from `/uploads` using Express static middleware.
- `POST /videos` expects `file_path` to point to a file inside the local `uploads` folder.
- Files inside `uploads` are ignored by Git and will not be pushed to GitHub.
- Protected routes require `Authorization: Bearer <token>`.

## Example Request Bodies

### Register

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Video

```json
{
  "title": "Intro Video",
  "description": "My first upload",
  "category": "Education",
  "file_path": "intro.mp4"
}
```

### Add Comment

```json
{
  "content": "Great video!"
}
```
