# 📋 Deployment Checklist

## Pre-Deployment (Do These Now)

- [ ] GitHub Account created
- [ ] Render.com Account created  
- [ ] Vercel Account created
- [ ] Code pushed to GitHub (see instructions below)

## Deployment Steps

### Push to GitHub
```bash
cd /Users/ayushsingh/ticketBooking
git remote add origin https://github.com/YOUR-USERNAME/ticketBooking.git
git branch -M main
git push -u origin main
```

### Deploy Backend to Render.com

- [ ] Visit https://render.com
- [ ] Connect GitHub repository
- [ ] Create Web Service with these settings:
  - [ ] Repository: ticketBooking
  - [ ] Branch: main
  - [ ] Root Directory: `backend`
  - [ ] Runtime: Node
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
- [ ] Add Environment Variables:
  - [ ] `NODE_ENV` = `production`
  - [ ] `EXTERNAL_API_URL` = `https://onwardticket.com/api/order/search`
  - [ ] Keep `CORS_ORIGIN` for now (update after frontend deployment)
- [ ] Click "Create Web Service"
- [ ] Wait for successful deployment (status: "Live")
- [ ] Copy backend URL from dashboard

### Deploy Frontend to Vercel

- [ ] Visit https://vercel.com
- [ ] Import your GitHub repository
- [ ] Create project with these settings:
  - [ ] Project Name: `ticket-booking-app`
  - [ ] Framework: React
  - [ ] Root Directory: `frontend`
- [ ] Add Environment Variable:
  - [ ] `REACT_APP_API_URL` = (paste your Render backend URL)
- [ ] Click "Deploy"
- [ ] Wait for successful deployment
- [ ] Copy frontend URL from dashboard

### Update Backend CORS (Final Step)

- [ ] Go to Render dashboard
- [ ] Select "ticket-booking-api" project
- [ ] Go to "Environment" section
- [ ] Update `CORS_ORIGIN` = (paste your Vercel frontend URL)
- [ ] Render will auto-redeploy
- [ ] Wait for redeployment

## Post-Deployment Testing

- [ ] Test backend health: `https://your-backend.onrender.com/health`
  - Should see: `{"status":"OK","message":"Server is running"}`
- [ ] Visit frontend: `https://your-frontend.vercel.app`
  - Should see: Flight search form
  - City dropdowns should be populated
- [ ] Try submitting a search:
  - Select different "From" and "To" cities
  - Should work without errors

## Production URLs

After deployment, your URLs will be:
- **Backend API:** `https://your-backend-name.onrender.com`
- **Frontend App:** `https://your-app-name.vercel.app`

## If Something Goes Wrong

1. **Check Render Logs:**
   - Render Dashboard → Your Service → Logs

2. **Check Vercel Logs:**
   - Vercel Dashboard → Your Project → Deployments → View Logs

3. **Common Issues:**
   - CORS error: Update backend CORS_ORIGIN
   - API not found: Check REACT_APP_API_URL
   - Build failed: Check Node/npm version compatibility

## Maintenance

### To Update Code
```bash
git add .
git commit -m "Your message"
git push origin main
```
Both services will automatically redeploy!

### Free Tier Limits
- **Render:** Services sleep after 15 mins, wake on first request (~30 sec)
- **Vercel:** 100GB bandwidth/month
- Upgrade anytime if needed

---

✅ You're all set! Follow these steps and your app will be live in ~20 minutes!
