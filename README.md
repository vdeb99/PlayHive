# PlayHive Backend

Backend API for PlayHive - A comprehensive video streaming and content platform built with Node.js, Express, and MongoDB.

## Features

### User Management
- 🔐 **Authentication & Authorization** - JWT-based secure authentication
- 👤 **User Registration & Login** - Email/password authentication
- 🔑 **Password Management** - Secure password hashing with bcrypt
- 📧 **Email Verification** - Account verification system
- 🔄 **Password Reset** - Forgot password functionality
- 👥 **User Profiles** - Profile management and customization

### Video Management
- 📹 **Video Upload** - Upload videos with metadata
- 🎬 **Video CRUD Operations** - Create, read, update, delete videos
- 🖼️ **Thumbnail Management** - Upload and manage video thumbnails
- 📊 **Video Statistics** - Track views, likes, and engagement
- 🔍 **Video Search** - Search videos by title, tags, and description
- 📝 **Video Categories** - Organize videos by categories

### Channel Management
- 📺 **Create Channels** - Users can create and manage channels
- ✏️ **Channel Customization** - Update channel info and branding
- 👥 **Subscriptions** - Subscribe/unsubscribe to channels
- 🔔 **Subscriber Notifications** - Notify subscribers of new content

### Engagement Features
- 👍 **Like/Dislike System** - React to videos
- 💬 **Comments** - Comment on videos with nested replies
- 📋 **Playlists** - Create and manage video playlists
- 📖 **Watch History** - Track user viewing history
- ⭐ **Favorites** - Save favorite videos

### Content Delivery
- 🎥 **Video Streaming** - Efficient video streaming with chunking
- 🔄 **Adaptive Streaming** - Support for multiple video qualities
- 🚀 **CDN Integration** - Fast content delivery

## Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Express Validator** - Request validation
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Cloud storage account (Cloudinary)

### Installation

1. Clone the repository

```bash
git clone https://github.com/vdeb99/PlayHive.git
cd PlayHive/backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/playhive
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Cloudinary Configuration (or AWS S3)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Node Environment
NODE_ENV=development
```

4. Start MongoDB (if running locally)

```bash
mongod
```

5. Start the development server

```bash
npm run dev
```

The server will start on `http://localhost:8000`

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite
- `npm run lint` - Run ESLint

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── db.js        # Database connection
│   │   └── cloudinary.js # Cloud storage config
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── videoController.js
│   │   ├── channelController.js
│   │   ├── commentController.js
│   │   └── playlistController.js
│   ├── models/          # Mongoose models
│   │   ├── User.js
│   │   ├── Video.js
│   │   ├── Channel.js
│   │   ├── Comment.js
│   │   ├── Playlist.js
│   │   └── Subscription.js
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── videoRoutes.js
│   │   ├── channelRoutes.js
│   │   ├── commentRoutes.js
│   │   └── playlistRoutes.js
│   ├── middleware/      # Custom middleware
│   │   ├── auth.js     # Authentication middleware
│   │   ├── errorHandler.js
│   │   ├── upload.js   # File upload middleware
│   │   └── validation.js
│   ├── utils/           # Helper functions
│   │   ├── sendEmail.js
│   │   ├── generateToken.js
│   │   └── cloudinary.js
│   └── app.js          # Express app setup
├── .env                # Environment variables
├── .gitignore
├── package.json
└── server.js           # Server entry point
```

## API Documentation

### Authentication Endpoints

```
POST /api/auth/register          # Register new user
POST /api/auth/login             # Login user
POST /api/auth/logout            # Logout user
GET  /api/auth/me                # Get current user
POST /api/auth/forgot-password   # Request password reset
PUT  /api/auth/reset-password    # Reset password
```

### User Endpoints

```
GET    /api/users/:id            # Get user profile
PUT    /api/users/:id            # Update user profile
DELETE /api/users/:id            # Delete user account
GET    /api/users/:id/videos     # Get user's videos
GET    /api/users/:id/playlists  # Get user's playlists
```

### Video Endpoints

```
GET    /api/videos               # Get all videos
POST   /api/videos               # Upload new video
GET    /api/videos/:id           # Get video by ID
PUT    /api/videos/:id           # Update video
DELETE /api/videos/:id           # Delete video
POST   /api/videos/:id/like      # Like video
POST   /api/videos/:id/dislike   # Dislike video
POST   /api/videos/:id/view      # Increment view count
GET    /api/videos/search        # Search videos
```

### Channel Endpoints

```
GET    /api/channels             # Get all channels
POST   /api/channels             # Create channel
GET    /api/channels/:id         # Get channel by ID
PUT    /api/channels/:id         # Update channel
DELETE /api/channels/:id         # Delete channel
POST   /api/channels/:id/subscribe    # Subscribe to channel
DELETE /api/channels/:id/subscribe    # Unsubscribe from channel
GET    /api/channels/:id/subscribers  # Get subscribers
```

### Comment Endpoints

```
GET    /api/videos/:id/comments  # Get video comments
POST   /api/videos/:id/comments  # Add comment
PUT    /api/comments/:id         # Update comment
DELETE /api/comments/:id         # Delete comment
POST   /api/comments/:id/like    # Like comment
POST   /api/comments/:id/reply   # Reply to comment
```

### Playlist Endpoints

```
GET    /api/playlists            # Get user's playlists
POST   /api/playlists            # Create playlist
GET    /api/playlists/:id        # Get playlist by ID
PUT    /api/playlists/:id        # Update playlist
DELETE /api/playlists/:id        # Delete playlist
POST   /api/playlists/:id/videos # Add video to playlist
DELETE /api/playlists/:id/videos/:videoId # Remove video
```

## Database Schema

### User Model

```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  avatar: String (URL),
  coverImage: String (URL),
  fullName: String,
  bio: String,
  isVerified: Boolean,
  role: String (enum: 'user', 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Video Model

```javascript
{
  title: String (required),
  description: String,
  videoUrl: String (required),
  thumbnailUrl: String,
  duration: Number,
  views: Number,
  likes: [ObjectId],
  dislikes: [ObjectId],
  category: String,
  tags: [String],
  owner: ObjectId (ref: User),
  channel: ObjectId (ref: Channel),
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Channel Model

```javascript
{
  name: String (required),
  description: String,
  owner: ObjectId (ref: User),
  avatar: String (URL),
  banner: String (URL),
  subscribers: [ObjectId],
  subscriberCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication

JWT-based authentication is implemented:

1. User registers/logs in
2. Server generates JWT token
3. Token is sent in response
4. Client stores token (localStorage/cookies)
5. Token is sent in Authorization header for protected routes
6. Server verifies token using middleware

**Protected Route Example:**

```javascript
router.get('/profile', authMiddleware, getUserProfile);
```

## File Upload

Multer is used for handling file uploads:

- **Videos** - Uploaded to cloud storage (Cloudinary)
- **Images** - Thumbnails and profile pictures
- **File validation** - Size limits and file type checking
- **Automatic optimization** - Images are compressed and optimized

## Error Handling

Centralized error handling middleware:

```javascript
{
  success: false,
  message: "Error message",
  statusCode: 400,
  stack: "..." // Only in development
}
```

## Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Express validator for all inputs
- **CORS Configuration** - Controlled cross-origin requests
- **MongoDB Injection Prevention** - Query sanitization

## Environment Variables

Required environment variables:

```
PORT                    # Server port (default: 8000)
MONGODB_URI            # MongoDB connection string
JWT_SECRET             # Secret key for JWT
JWT_EXPIRE             # Token expiration time
CLOUDINARY_CLOUD_NAME  # Cloudinary cloud name
CLOUDINARY_API_KEY     # Cloudinary API key
CLOUDINARY_API_SECRET  # Cloudinary API secret
NODE_ENV               # Environment (development/production)
```

## Testing

```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

## Deployment

### Production Build

1. Set environment variables in production
2. Update MongoDB URI to production database
3. Configure cloud storage credentials
4. Set NODE_ENV to 'production'





## Performance Optimization

- Database indexing for faster queries
- Pagination for large datasets
- Caching with Redis (optional)
- Lazy loading for related data
- Query optimization with Mongoose lean()
- Connection pooling for MongoDB

## Monitoring and Logging

- Morgan for HTTP request logging
- Winston for application logging
- Error tracking with Sentry (optional)
- Performance monitoring with New Relic (optional)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Guidelines

- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update API documentation
- Follow RESTful API conventions

## Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Verify MongoDB is running
- Check connection string in .env
- Ensure network access in MongoDB Atlas

**File Upload Fails:**
- Check Cloudinary credentials
- Verify file size limits
- Ensure proper file permissions

**JWT Authentication Error:**
- Verify JWT_SECRET is set
- Check token expiration time
- Ensure token is sent in headers

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues:
- Open an issue on GitHub
- Check API documentation
- Review error logs

## Learn More

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [JWT Documentation](https://jwt.io/introduction)

---

Made with ❤️ by [vdeb99](https://github.com/vdeb99)