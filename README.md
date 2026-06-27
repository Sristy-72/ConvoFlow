# ConvoFlow - MERN Real-Time Chat App

ConvoFlow is a full-stack real-time chat application built with the MERN stack. It supports user authentication, one-to-one chats, group chats, real-time messaging, typing indicators, and user search in a clean responsive interface.

## Project Links

- Frontend URL: http://localhost:3000
- Backend URL: http://localhost:5000
- Backend Deployment: https://convoflow-api.onrender.com
- Frontend Deployment: https://convo-flow-gamma.vercel.app/

## Features

- Secure user registration and login with JWT authentication
- Real-time messaging using Socket.IO
- One-to-one chat support
- Group chat creation, rename, add user, and remove user features
- User search for starting conversations
- Typing indicators for active chats
- Profile picture upload support
- Protected API routes
- Responsive UI built with Chakra UI

## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakraui&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Socket.IO Client](https://img.shields.io/badge/Socket.IO_Client-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-004488?style=for-the-badge)

## Folder Structure

```text
mern-chat-app/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   `-- server.js
|-- frontend/
|   |-- public/
|   `-- src/
|       |-- components/
|       |-- config/
|       |-- Context/
|       `-- Pages/
|-- package.json
`-- render.yaml
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account or local MongoDB setup

### Installation

Clone the repository and install dependencies:

```bash
npm install
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URLS=http://localhost:3000
```

For the frontend, create `frontend/.env` if you are using a separate backend URL:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_ENDPOINT=http://localhost:5000
```

## Run Locally

Start the backend server:

```bash
npm run server
```

Start the frontend app in another terminal:

```bash
cd frontend
npm start
```

Open the app:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

## API Routes

### User Routes

```text
POST /api/user          Register a new user
POST /api/user/login    Login user
GET  /api/user          Search users
```

### Chat Routes

```text
POST /api/chat              Access or create one-to-one chat
GET  /api/chat              Fetch user chats
POST /api/chat/group        Create group chat
PUT  /api/chat/rename       Rename group chat
PUT  /api/chat/groupadd     Add user to group
PUT  /api/chat/groupremove  Remove user from group
```

### Message Routes

```text
POST /api/message           Send message
GET  /api/message/:chatId   Fetch all messages for a chat
```

## Deployment

The backend is configured for Render using `render.yaml`. Required production environment variables:

```text
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URLS=your_frontend_production_url
```

For frontend deployment, set:

```text
REACT_APP_API_URL=your_backend_production_url
REACT_APP_SOCKET_ENDPOINT=your_backend_production_url
```

## About

This project demonstrates full-stack development skills with authentication, protected REST APIs, database modeling, real-time communication, and a responsive React user interface.

Developed by Sristy.

- LinkedIn: https://www.linkedin.com/in/sristy-720158266/
