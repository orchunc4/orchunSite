# Backend Architecture (API)

This directory contains the Node.js/Express server logic.

## Core Files

### `index.js` (The Server)

| Feature | Technology |
|---------|------------|
| Framework | Express.js |
| Middleware | CORS, JSON Parsing |
| Uploads | `multer` + `multer-storage-cloudinary` |
| File Types | Images (JPG, PNG), 3D Models (GLB) |

### `db.js` (The Database)

| Feature | Details |
|---------|---------|
| Technology | SQLite3 (local `database.sqlite` file) |
| Initialization | Auto-creates tables if missing |
| Tables | `renders`, `models`, `messages` |

## Database Schema

### `renders` Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| imageUrl | TEXT | Cloudinary URL |
| title | TEXT | Display title |
| subtitle | TEXT | Description |
| sortOrder | INTEGER | Display order |

### `models` Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| modelUrl | TEXT | GLB file URL |
| thumbnailUrl | TEXT | Preview image URL |
| title | TEXT | Model name |

### `messages` Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | Sender name |
| email | TEXT | Sender email |
| message | TEXT | Message content |
| created_at | DATETIME | Timestamp |

## API Endpoints

### Data Retrieval
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api` | GET | Health check |
| `/api/renders` | GET | Fetch all portfolio images |
| `/api/models` | GET | Fetch all 3D models |

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/login` | POST | Validates password against `ADMIN_PASSWORD` env var |

### Uploads (Admin)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload/render` | POST | Upload image to Cloudinary |
| `/api/upload/model` | POST | Upload GLB + Thumbnail |

### Deletion (Admin)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/delete/render/:id` | DELETE | Delete render from DB & Cloudinary |
| `/api/delete/model/:id` | DELETE | Delete model from DB & Cloudinary |

### Contact
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Save contact form submission |

## Vercel Deployment

The API is deployed as Vercel Serverless Functions:

```json
// vercel.json
{
    "functions": {
        "api/index.js": {
            "maxDuration": 60
        }
    },
    "rewrites": [
        {
            "source": "/api/:path*",
            "destination": "/api/index.js"
        }
    ]
}
```

## Environment Variables

```env
ADMIN_PASSWORD=your_secure_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Migration Note

For Vercel deployment, SQLite is replaced with MongoDB since Vercel Serverless Functions are read-only and cannot write to local files.
