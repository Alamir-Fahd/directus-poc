# Decoupled Full-Stack Integration: Next.js & Directus CMS

A modern, full-stack proof-of-concept demonstrating a completely decoupled web architecture. This project utilizes **Next.js (App Router)** on the frontend to dynamically fetch data and manage assets served by a containerized **Directus Headless CMS** instance running locally via **Docker**.

## 🏗️ Architecture Summary
* **Frontend:** Next.js, TypeScript, Tailwind CSS, Directus JavaScript SDK.
* **Backend:** Directus CMS (v10.13.0) running inside a Docker container.
* **Database:** SQLite3 embedded persistent storage volume.

---

## 🚀 Local Setup Instructions

Follow these exact steps to run the complete, data-driven system locally.

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Node.js (v18 or higher)](https://nodejs.org/)

---

### 2. Spin Up the Backend (Directus & Database)
Navigate to the root directory where the `docker-compose.yml` file is located and start the container environment:

```bash
# Start Directus in the background
docker compose up -d
