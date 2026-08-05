# PlayHive -- Full-Stack Video Streaming Platform

> A MERN-stack video sharing platform inspired by YouTube that enables
> creators to upload and manage videos while allowing users to discover,
> watch, interact with, and organize content.

------------------------------------------------------------------------

# Table of Contents

1.  Project Goal
2.  Core Features
3.  Technology Stack
4.  System Architecture
5.  Project Structure
6.  Database Design
7.  Authentication Flow
8.  Application Workflow
9.  Backend Architecture
10. Frontend Architecture
11. REST API Modules
12. Libraries Used
13. Security
14. Performance Optimizations
15. Design Decisions
16. Future Improvements
17. Learning Outcomes

------------------------------------------------------------------------

# 1. Project Goal

The goal of PlayHive is to build a production-style video streaming full-stack web
application demonstrating modern software engineering practices using
the MERN stack.

The platform allows users to:

-   Register and log in securely
-   Upload and manage videos
-   Watch videos
-   Like videos
-   Comment on videos
-   Subscribe to creators
-   Create playlists
-   Maintain watch history
-   Search content
-   Manage creator dashboard
-   Edit profile and account settings

------------------------------------------------------------------------

# 2. Core Features

## Authentication

-   User Registration
-   Login / Logout
-   JWT Authentication
-   HTTP-only Cookies
-   Protected Routes
-   Password Change
-   Profile Update

## Video Management

-   Upload videos
-   Upload thumbnails
-   Cloudinary media storage
-   Edit/Delete videos
-   Publish/Private toggle
-   Search
-   Pagination
-   Related videos

## Social Features

-   Likes
-   Comments
-   Subscriptions
-   Playlists
-   Watch History
-   Tweets

## Creator Features

-   Dashboard
-   Analytics
-   Video Management

------------------------------------------------------------------------

# 3. Technology Stack

## Frontend

-   React.js
-   React Router DOM
-   Redux Toolkit
-   Axios
-   Tailwind CSS
-   Lucide React
-   React Hot Toast
-   Vite

## Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

## Authentication

-   JWT
-   bcrypt
-   Cookie Parser

## Cloud

-   Cloudinary

------------------------------------------------------------------------

# 4. System Architecture

``` text
                React Frontend
                      │
                  Axios APIs
                      │
              Express REST Server
                      │
      ┌───────────────┴───────────────┐
      │                               │
 Controllers                     Middlewares
      │                               │
      └───────────────┬───────────────┘
                      │
                 Mongoose Models
                      │
                  MongoDB Atlas

Cloudinary ← Images & Videos
```

------------------------------------------------------------------------

# 5. Project Structure

## Frontend

``` text
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── hooks/
 ├── redux/
 ├── routes/
 ├── layouts/
 └── assets/
```

## Backend

``` text
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── utils/
 ├── db/
 └── app.js
```

------------------------------------------------------------------------

# 6. Database Collections

-   Users
-   Videos
-   Comments
-   Likes
-   Playlists
-   Subscriptions
-   Tweets

Relationships

-   User → Videos
-   User → Playlists
-   User → Subscriptions
-   Video → Comments
-   Video → Likes

------------------------------------------------------------------------

# 7. Authentication Workflow

``` text
User Login
      │
Password Verification
      │
Generate Access & Refresh Tokens
      │
Store Refresh Token
      │
Set HTTP-only Cookies
      │
Protected API Requests
      │
verifyJwt Middleware
      │
Controller
```

------------------------------------------------------------------------

# 8. Application Workflow

## Upload

``` text
Upload Form
      │
Multer
      │
Cloudinary
      │
Store URLs
      │
MongoDB
```

## Watch

``` text
Home
 │
Video Card
 │
Watch Page
 │
Like
Comment
Subscribe
Playlist
History
Related Videos
```

## Dashboard

``` text
Creator
 │
Statistics
 │
Manage Videos
 │
Edit
Delete
Publish
```

------------------------------------------------------------------------

# 9. Backend Architecture

MVC Pattern

-   Routes
-   Controllers
-   Models
-   Middleware
-   Utilities

Responsibilities

Routes → endpoint mapping

Controllers → business logic

Models → database interaction

Middleware → authentication & validation

Utilities → Cloudinary, API responses, async handler

------------------------------------------------------------------------

# 10. Frontend Architecture

Pages

-   Home
-   Watch
-   Search
-   Upload
-   Dashboard
-   Profile
-   Channel
-   Playlist
-   History
-   Subscriptions
-   Settings

Reusable Components

-   Navbar
-   Sidebar
-   VideoCard
-   VideoGrid
-   VideoPlayer
-   VideoInfo
-   VideoActions
-   ProfileHeader
-   DashboardStats
-   DashboardVideoTable

Redux

-   Authentication state
-   Current user
-   Protected routing

------------------------------------------------------------------------

# 11. REST API Modules

-   Authentication
-   Users
-   Videos
-   Comments
-   Likes
-   Playlists
-   Subscriptions
-   Tweets
-   Dashboard
-   History

------------------------------------------------------------------------

# 12. Libraries Used

Frontend

-   react
-   react-router-dom
-   redux-toolkit
-   axios
-   tailwindcss
-   lucide-react
-   react-hot-toast

Backend

-   express
-   mongoose
-   bcrypt
-   jsonwebtoken
-   multer
-   cloudinary
-   cookie-parser
-   cors

------------------------------------------------------------------------

# 13. Security

-   Password hashing using bcrypt
-   JWT authentication
-   HTTP-only cookies
-   Protected routes
-   Authorization middleware
-   Input validation

------------------------------------------------------------------------

# 14. Performance Optimizations

-   MongoDB aggregation pipelines
-   Pagination
-   Regex search
-   Population
-   Projection
-   Reusable React components
-   Cloudinary CDN

------------------------------------------------------------------------

# 15. Design Decisions

-   MERN stack for full-stack JavaScript
-   MVC architecture for maintainability
-   Redux for global auth state
-   REST APIs for frontend/backend communication
-   Cloudinary instead of local file storage

------------------------------------------------------------------------

# 16. Future Improvements

-   Live streaming
-   Notifications
-   Recommendation engine
-   OAuth login
-   Email verification
-   Admin dashboard
-   Real-time chat

------------------------------------------------------------------------

# 17. Learning Outcomes

This project demonstrates:

-   Full-stack MERN development
-   REST API development
-   Authentication & authorization
-   MongoDB schema design
-   Cloudinary integration
-   File uploads
-   CRUD operations
-   Responsive UI development
-   State management with Redux
-   Component-driven architecture
-   Production-style project organization

------------------------------------------------------------------------

# Resume Summary

PlayHive is a production-style video streaming MERN application that demonstrates
end-to-end software engineering, including secure authentication, media
uploads, creator dashboards, subscriptions, playlists, comments, likes,
watch history, search, profile management, and scalable REST API
development.
