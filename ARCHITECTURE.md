# Portfolio Architecture Overview

This document explains the complete architecture of your full-stack portfolio website.

## 🏗️ Overall Architecture

```
┌─────────────────┐    HTTP Requests    ┌─────────────────┐
│                 │ ◄─────────────────► │                 │
│   React Client  │                     │  Express Server │
│   (Port 3000)   │                     │   (Port 5001)   │
│                 │                     │                 │
└─────────────────┘                     └─────────────────┘
         │                                       │
         │                                       │
         ▼                                       ▼
┌─────────────────┐                     ┌─────────────────┐
│  Static Assets  │                     │   Mock Data     │
│  (HTML/CSS/JS)  │                     │  (In Memory)    │
└─────────────────┘                     └─────────────────┘
```

## 📁 Project Structure

### Root Level
- `package.json` - Root package manager with scripts to run both frontend and backend
- `README.md` - Main documentation
- `ARCHITECTURE.md` - This file explaining the architecture

### Client (Frontend) - `/client`
React TypeScript application with modern styling and routing.

### Server (Backend) - `/server`
Express TypeScript API server with RESTful endpoints.

## 🔄 Data Flow

1. **User visits** `http://localhost:3000`
2. **React app loads** and renders components
3. **Components make API calls** to `http://localhost:5001/api/*`
4. **Express server processes** requests and returns JSON
5. **React components update** with new data

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS styling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger

## 🚀 Development Workflow

1. **Start both servers**: `npm run dev`
2. **Frontend development**: Edit files in `/client/src`
3. **Backend development**: Edit files in `/server/src`
4. **API testing**: Use curl or Postman to test endpoints
5. **Build for production**: `npm run build`

## 📡 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact
- `POST /api/contact` - Send contact message

### Health
- `GET /api/health` - Server status check

## 🔧 Key Features

### Frontend Features
- Responsive design for all screen sizes
- Client-side routing between pages
- API integration with loading states
- Form validation and error handling
- Modern UI with styled-components

### Backend Features
- RESTful API design
- Error handling middleware
- CORS configuration for frontend access
- Security headers with Helmet
- Request logging for debugging

## 🎯 Next Steps

1. **Customize Content**: Update personal information and projects
2. **Add Features**: Blog, skills showcase, resume download
3. **Database Integration**: Replace mock data with real database
4. **Authentication**: Add user login/admin panel
5. **Deployment**: Deploy to production servers

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Styled Components](https://styled-components.com/)
- [Axios Documentation](https://axios-http.com/docs/intro)
