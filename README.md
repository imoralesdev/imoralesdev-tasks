# Task Manager

The app is a task manager built using Next.js and Turso as the database backend. It provides a simple CRUD (Create, Read, Update, Delete) interface for managing tasks. Key features include:

### 1. Task Management:
- Users can create tasks with a title and mark them as completed or not.
- Tasks can be updated or deleted.

### 2. Database Operations:
- The app uses Turso, a distributed SQLite database, to store task data.
- Tables are created dynamically if they don't already exist.

### 3. API Endpoints:
- The app includes RESTful API routes for managing tasks (`GET`, `POST`, `PUT`, and `DELETE`).

### 4. Next.js Serverless Functions:
- Each API operation is handled via Next.js serverless functions.

### 5. Focus on Scalability:
- Built with modern tools to ensure scalability and simplicity.

The application provides a clean and efficient way to manage tasks, leveraging the speed and flexibility of Next.js and Turso.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.