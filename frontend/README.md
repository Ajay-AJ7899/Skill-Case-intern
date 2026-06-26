# Skillcase Frontend

React frontend for the Skillcase Internship Assessment, built as a separate Vite app and connected to the existing backend API.

## Tech Stack

- React
- Vite
- React Router
- Redux Toolkit
- Axios
- Framer Motion

## Folder Structure

```text
src/
|-- pages/
|-- components/
|-- redux/
|-- api/
`-- hooks/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Make sure the backend is already running.

3. Start the frontend:

```bash
npm run dev
```

## Environment Variable

```env
VITE_API_BASE_URL=
```

- Leave `VITE_API_BASE_URL` empty for local development with Vite proxy.
- Set it only when pointing the frontend to a deployed backend URL.

## Features

- Register and login flow connected to `/auth/register` and `/auth/login`
- Auth persistence with Redux Toolkit and `localStorage`
- Protected home route using `/auth/me`
- Vertical short-video feed with autoplay based on viewport visibility
- Optimistic likes with automatic rollback on failure
- Slide-up comment sheet with fetch and post support
- Bookmark action with duplicate submission prevention
- Centralized Axios instance with automatic JWT header attachment

## Routes

- `/login`
- `/register`
- `/`
