# 🚀 Ticket Booking App - Deployment Summary

Your application is now ready for free deployment! Here's everything you need to know.

## What We've Done

✅ Updated frontend to use environment variables for API URLs
✅ Created `.env.example` files for reference
✅ Added `.gitignore` files
✅ Created `render.yaml` for backend deployment
✅ Initialized Git repository
✅ Created detailed deployment documentation

## Recommended Free Deployment

### Backend → Render.com (Free Tier)
- No credit card required for free tier
- Auto-deploys from GitHub
- Includes free PostgreSQL if needed
- Free SSL certificates

### Frontend → Vercel (Free Tier)
- Built specifically for React apps
- Automatic deploys from GitHub
- Includes analytics and performance monitoring
- Free custom domain support

## Quick Start - 3 Steps

### Step 1: Push to GitHub (5 minutes)

```bash
cd /Users/ayushsingh/ticketBooking

# Add your GitHub remote
git remote add origin https://github.com/yourusername/ticketBooking.git
git branch -M main
git push -u origin main
```

**Note:** Create a GitHub account if you don't have one: https://github.com/signup

### Step 2: Deploy Backend to Render (5 minutes)

1. Go to https://render.com and sign up with GitHub
2. Click "New +" → "Web Service"
3. Select your ticketBooking repository
4. Fill in the form:
   - **Name:** ticket-booking-api
   - **Root Directory:** backend
   - **Runtime:** Node
   - **Build Command:** npm install
   - **Start Command:** npm start
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `EXTERNAL_API_URL` = `https://onwardticket.com/api/order/search`
   - (Leave CORS_ORIGIN for now, update after frontend deployment)
6. Click "Create Web Service"
7. Wait for deployment (~2-3 minutes)
8. Copy your backend URL (e.g., `https://ticket-booking-api-xxx.onrender.com`)

### Step 3: Deploy Frontend to Vercel (5 minutes)

1. Go to https://vercel.com and sign up with GitHub
2. Click "Add New..." → "Project"
3. Select your ticketBooking repository
4. Fill in the form:
   - **Project Name:** ticket-booking-app
   - **Framework:** React
   - **Root Directory:** frontend
5. Add Environment Variable:
   - `REACT_APP_API_URL` = `https://ticket-booking-api-xxx.onrender.com` (your Render URL)
6. Click "Deploy"
7. Wait for deployment (~3-5 minutes)
8. Copy your frontend URL (e.g., `https://ticket-booking-app.vercel.app`)

## Step 4: Final Configuration (2 minutes)

Update Render backend CORS:
1. Go to Render Dashboard
2. Select "ticket-booking-api"
3. Go to "Environment" section
4. Add/Update:
   - `CORS_ORIGIN` = `https://ticket-booking-app.vercel.app` (your Vercel URL)
5. Service will automatically redeploy

## Verify Deployment

Once deployed, test at:
- **Backend:** https://your-backend.onrender.com/health
- **Frontend:** https://your-frontend.vercel.app

You should see:
- Backend: `{"status":"OK","message":"Server is running"}`
- Frontend: Flight search form with city dropdowns

## Troubleshooting

### Frontend can't connect to API
- Check REACT_APP_API_URL environment variable in Vercel
- Verify Render backend is running
- Check browser console for CORS errors

### Backend not deploying
- Check Render build logs
- Verify package.json has correct scripts
- Ensure all dependencies are in package.json

### CORS errors
- Update backend CORS_ORIGIN environment variable
- Redeploy backend after changes

## Key Files Modified

- `backend/config.js` - Updated for production
- `frontend/src/pages/ApiForm.js` - Uses environment variables
- `frontend/.env.example` - Environment variable reference
- `backend/.env.example` - Environment variable reference
- `DEPLOYMENT.md` - Detailed deployment guide

## Environment Variables Reference

### Backend (Render)
```
NODE_ENV=production
PORT=3000
EXTERNAL_API_URL=https://onwardticket.com/api/order/search
CORS_ORIGIN=https://your-vercel-frontend.vercel.app
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-render-backend.onrender.com
```

## Free Tier Limits

**Render.com:**
- Web service sleeps after 15 mins of inactivity
- First request after sleep takes 30 seconds
- Upgrade for always-on service

**Vercel:**
- 100GB bandwidth per month
- Auto-scales for free
- Perfect for hobby projects

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy to Render.com
3. ✅ Deploy to Vercel
4. ✅ Test the deployed application
5. Optional: Set up custom domain names
6. Optional: Set up continuous monitoring

## Support & Documentation

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **React Deployment:** https://create-react-app.dev/deployment/

---

**Total Setup Time:** ~20 minutes
**Monthly Cost:** FREE ✨

Good luck with your deployment! 🎉
