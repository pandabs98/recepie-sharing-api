# Project Title

This is an ready to use Recipe sharing platform api where a user can upload there new unique ideas in this platform where the user can read and cook as per recepie and if they like the recepie they'll give comment and like 
(e.g. "A fast, minimal Library Management REST API built with Express and MongoDB.")

## Features

- Full CRUD operations
- JWT Authentication 
- MongoDB Aggregations 
- Clean folder structure
- Error handling
- Dockerized 
- Deployment Ready

## Tech Stack

- *Backend:* Node.js, Express.js
- *Database:* MongoDB (Mongoose)
- *Other:* Docker, Postman

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /books | Get all books |
| POST | /books | Add a new book |
| GET | /books/:id | Get book by ID |
| PUT | /books/:id | Update book |
| DELETE | /books/:id | Delete book |

## Getting Started

```bash
git clone https://github.com/pandabs98/recepie-sharing-api.git
cd recepie-sharing-api
npm install
npm run dev