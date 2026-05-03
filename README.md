# File Explorer App

Simple fullstack file explorer using a monorepo setup.

---

## Tech Stack

* Frontend: Vue 3 + Vite
* Backend: Node.js + Express + Prisma
* Database: MySQL
* Monorepo: npm workspaces

---

## Project Structure

```
apps/
  backend/
  frontend/
```

---

## Requirements

* Node.js >= 22 (recommended 22 LTS)
* MySQL >= 8.0

---

## Getting Started

### 1. Clone repository

```bash
git clone <your-repo-url>
cd file-explorer-app
```

---

### 2. Install dependencies

```bash
npm install
```

---

## Environment Setup

### Backend

Copy `.env.sample` to `.env` in `apps/backend`:

```
PORT=3000

DATABASE_URL="mysql://root@localhost:3306/file_explorer_app"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
DATABASE_USER="root"
DATABASE_PASSWORD=""
DATABASE_NAME="file_explorer_app"
```

---

### Frontend

Copy `.env.sample` to `.env` in `apps/frontend`:

```
VITE_API_URL=http://localhost:3000/api
```

---

## Database Setup

Create database in MySQL:

```sql
CREATE DATABASE file_explorer_app;
```

Run migration:

```bash
npm run db:migrate
```

Seed initial data (optional):

```bash
npm run db:seed
```

---

## Running the App

```bash
npm run dev
```

* Frontend: http://localhost:5173
* Backend: http://localhost:3000

---

## Features

* Folder tree (recursive)
* Create, update, delete folder
* Left panel tree navigation
* Right panel folder view

---

## Available Scripts

### Development

```bash
npm run dev
npm run dev:backend
npm run dev:frontend
```

---

### Database

```bash
npm run db:migrate
npm run db:seed
```

---
