# Portfolio Website with Journaling Feature

A modern full-stack portfolio website with user authentication and journaling capabilities built with React, TypeScript, Node.js, Express, and Supabase.

## 🚀 Features

### Portfolio Features
- **Responsive Design**: Modern, mobile-first design with styled-components
- **Project Showcase**: Display your projects with descriptions, tech stack, and links
- **Contact Form**: Functional contact form with backend integration
- **About Section**: Personal information and skills showcase

### Authentication & Journaling
- **User Authentication**: Secure login/registration with Supabase Auth
- **Journal Entries**: Create, read, update, and delete personal journal entries
- **Mood Tracking**: Track your emotional state with each entry
- **Tagging System**: Organize entries with custom tags
- **Privacy Controls**: Mark entries as private or public
- **Search & Filter**: Find entries by title, content, or tags

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Styled Components** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Font Awesome** for icons
- **Google Fonts** (Inter)

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **CORS** for cross-origin requests
- **Helmet** for security
- **Morgan** for logging

### Database & Auth
- **Supabase** (PostgreSQL + Auth)
- **Real-time subscriptions** for live updates


## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Portfolio25-26
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 5. Start the Development Servers

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```
The backend will run on http://localhost:5001

#### Terminal 2 - Frontend Client
```bash
cd client
npm start
```
The frontend will run on http://localhost:3000

## 📁 Project Structure

```
Portfolio25-26/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── auth/       # Authentication components
│   │   │   └── journal/    # Journal-related components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   │   ├── auth/       # Auth pages
│   │   │   └── journal/    # Journal pages
│   │   ├── services/       # API services
│   │   ├── styles/         # Styled-components theme
│   │   └── types/          # TypeScript type definitions
│   └── public/             # Static assets
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   └── routes/         # API routes
│   └── config.env          # Environment variables
└── package.json            # Root package.json
```

## 🔗 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)

### Health Check
- `GET /api/health` - Server health status

## 🎯 Usage

### Portfolio Features
1. **Home**: Landing page with hero section
2. **About**: Personal information and skills
3. **Projects**: Showcase of your work
4. **Contact**: Contact form for inquiries

### Journaling Features
1. **Register/Login**: Create an account or sign in
2. **Journal List**: View all your journal entries
3. **Create Entry**: Write new journal entries with mood and tags
4. **Edit Entry**: Modify existing entries
5. **View Entry**: Read full journal entries
6. **Delete Entry**: Remove entries you no longer want

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables in your hosting platform

### Backend (Heroku/Railway)
1. Set up your backend hosting service
2. Configure environment variables
3. Deploy the server code


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

