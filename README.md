
# Messenger App

A simple messaging application built with a React frontend and an Express + GraphQL backend. It uses Apollo Client for GraphQL queries, mutations and subscriptions, and MongoDB for data storage.

## About

This project is a basic messaging application where users can send and receive messages in real-time. The frontend is built with React, Vite, and Tailwind CSS, providing a modern and responsive user interface. The backend is powered by Express, GraphQL, and Apollo Server, with MongoDB as the database.

## Installation

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js
- npm or yarn
- MongoDB

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/xeen0/messenger-app.git
cd messenger-app/backend
```

2. Install the backend dependencies:

```bash
npm install
# or
yarn install
```

3. Start the backend server:

```bash
npm start
# or
yarn
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install the frontend dependencies:

```bash
npm install
# or
yarn install
```

3. Start the frontend development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173/:sender_id/:receiver_id` ex: `http://localhost:5173/chat/66b50c332d5d45e2be0a0acf/66b50c552d5d45e2be0a0ad0` to view the application.
   
