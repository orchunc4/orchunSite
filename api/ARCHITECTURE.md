# Backend Architecture (API)

This directory contains the Node.js/Express server logic.

## Core Files

### `index.js` (The Server)
-   **Framework**: Express.js.
-   **Middleware**: CORS (Cross-Origin Resource Sharing), JSON Parsing.
-   **Uploads**: Uses `multer` + `multer-storage-cloudinary` to handle file uploads directly to Cloudinary.

### `db.js` (The Database)
-   **Technology**: SQLite3 (local `database.sqlite` file).
-   **Initialization**: Automatically creates tables if they don't exist (`initializeTables`).
-   **Tables**:
    -   `renders`: Portfolio images.
    -   `models`: 3D GLB files + Thumbnails.
    -   `messages`: Contact form submissions.

## API Endpoints

### Data Retrieval
-   `GET /api/renders`: Fetch all portfolio images (ordered).
-   `GET /api/models`: Fetch all 3D models.
-   `GET /api`: Health check.

### Authentication
-   `POST /api/login`: Validates password against `ADMIN_PASSWORD` env var.

### Uploads (Protected Logic)
-   `POST /api/upload/render`: Uploads image to Cloudinary -> Saves URL to SQLite.
-   `POST /api/upload/model`: Uploads GLB + Thumbnail -> Saves URLs to SQLite.
    -   *Logic*: Checks file types and sizes (Max 10MB).

### Deletion
-   `DELETE /api/delete/render/:id`: Deletes from DB and Cloudinary.
-   `DELETE /api/delete/model/:id`: Deletes Model + Thumbnail from DB and Cloudinary.

### Contact
-   `POST /api/contact`: Receives `{name, email, message}` and saves to `messages` table.

## Migration Note
For Vercel deployment, this SQLite setup must be migrated to **MongoDB** because Vercel/Serverless Functions are read-only and cannot write to `database.sqlite`.
