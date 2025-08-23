# NAASS - Lead Generation Platform

A modern, beautiful single-page lead generation website built with the MERN stack.

## Features

- 🎨 Beautiful gradient design with smooth animations
- 📱 Fully responsive layout
- ⚡ Fast performance with React and TypeScript
- 📊 Lead capture and management system
- 🔒 Secure backend with rate limiting
- 📧 Email notifications for new leads
- 🎯 Service showcase for multiple sectors
- 💫 Interactive testimonials carousel
- 🌟 Floating elements and scroll indicators

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Icons for iconography
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js with Express
- MongoDB for database
- Mongoose ODM
- Nodemailer for emails
- Express Rate Limit for security
- Helmet for security headers

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. Clone the repository:
```bash
cd /Users/adityapachauri/Desktop/naass
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

4. Start the application:
```bash
# From the root directory
./start.sh
```

Or manually:
```bash
# Terminal 1 - Start backend
cd backend
npm start

# Terminal 2 - Start frontend
cd frontend
npm start
```

## Access

- Frontend: http://localhost:3007
- Backend API: http://localhost:5007
- Health Check: http://localhost:5007/api/health

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/leads` - Get all leads
- `GET /api/leads/stats` - Get lead statistics
- `PUT /api/leads/:id` - Update lead status
- `GET /api/health` - Health check

## Services Offered

- ECO 4 Lead Generation
- Housing Disrepair Leads
- Life Insurance Leads
- Google PPC Management
- Social Media Advertising
- Native & Programmatic Advertising
- Custom Campaign Development

## Project Structure

```
naass/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## Development

- Frontend runs on port 3007
- Backend runs on port 5007
- MongoDB default port 27017

## Production Deployment

1. Build frontend:
```bash
cd frontend
npm run build
```

2. Set NODE_ENV to production
3. Configure production MongoDB URI
4. Set up proper email credentials
5. Deploy to hosting service (Heroku, AWS, etc.)

## License

All rights reserved - NAASS © 2024