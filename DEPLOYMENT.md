# Deployment Guide

This application has two parts: Backend (Node.js API) and Frontend (React).

## Free Deployment Options

### Backend - Deploy to Render.com

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ticketBooking.git
   git push -u origin main
   ```

2. **Sign up at [Render.com](https://render.com)** (free tier available)

3. **Create a new Web Service:**
   - Connect your GitHub repository
   - Select the `backend` directory as the root directory
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables in Render Dashboard:**
   - `NODE_ENV`: `production`
   - `EXTERNAL_API_URL`: `https://onwardticket.com/api/order/search`
   - `CORS_ORIGIN`: (your Vercel frontend URL, e.g., `https://your-app.vercel.app`)

5. **Deploy** - Render will automatically deploy when you push to GitHub

### Frontend - Deploy to Vercel

1. **Sign up at [Vercel.com](https://vercel.com)** (free tier available)

2. **Import your GitHub repository:**
   - Click "New Project"
   - Select your GitHub repository
   - Root Directory: `frontend`

3. **Configure Environment Variables:**
   - Click "Environment Variables"
   - Add: `REACT_APP_API_URL` = `https://your-backend.onrender.com` (your Render backend URL)

4. **Deploy** - Vercel will automatically deploy on every push

## Post-Deployment

After deployment:
1. Update backend's `CORS_ORIGIN` with your Vercel frontend URL
2. Update frontend's `REACT_APP_API_URL` environment variable with your Render backend URL
3. Redeploy both services

## Local Development

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm start
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=production
PORT=3000
EXTERNAL_API_URL=https://onwardticket.com/api/order/search
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### Frontend (.env.local)
```
REACT_APP_API_URL=https://your-backend-api.onrender.com
```
