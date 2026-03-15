# 🎯 Ticket Booking App - Deployment Quick Start

## 📊 Architecture Overview

```
Your Local Machine
        ↓
   GitHub Repo
    ↙        ↘
Render.com   Vercel
 (Backend)   (Frontend)
    ↓          ↓
API Server   React App
```

## 🚀 Three Services You'll Use (All Free)

| Service | Purpose | Free Tier | Sign Up |
|---------|---------|-----------|---------|
| **GitHub** | Code repository | Unlimited | https://github.com/signup |
| **Render** | Backend hosting | 750 hours/month | https://render.com |
| **Vercel** | Frontend hosting | 100GB bandwidth | https://vercel.com |

---

## 📝 Step-by-Step Instructions

### Step 1️⃣: Create GitHub Account & Push Code (5 min)

```bash
# If you don't have GitHub, create account at https://github.com/signup

# Push your code
cd /Users/ayushsingh/ticketBooking
git remote add origin https://github.com/YOUR-USERNAME/ticketBooking.git
git branch -M main
git push -u origin main
```

**✅ After this:** Your code is on GitHub visible at `https://github.com/YOUR-USERNAME/ticketBooking`

---

### Step 2️⃣: Deploy Backend to Render.com (5 min)

1. Go to https://render.com
2. Click "Sign up" → "Continue with GitHub"
3. Click "Create" → "Web Service"
4. Choose your `ticketBooking` repository
5. Fill form:
   ```
   Name: ticket-booking-api
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```
6. Under "Advanced" → "Add Environment Variable":
   - `NODE_ENV` = `production`
   - `EXTERNAL_API_URL` = `https://onwardticket.com/api/order/search`
7. Click "Create Web Service"
8. Wait for "Live" status ✅
9. **Copy your backend URL** (looks like: `https://ticket-booking-api-xxx.onrender.com`)

**✅ After this:** Your backend API is live! Test it at `https://your-backend.onrender.com/health`

---

### Step 3️⃣: Deploy Frontend to Vercel (5 min)

1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Click "Add New" → "Project"
4. Select your `ticketBooking` repository
5. Fill form:
   ```
   Project Name: ticket-booking-app
   Framework: React
   Root Directory: frontend
   ```
6. Under "Environment Variables" → "Add":
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.onrender.com` (paste your Render URL)
7. Click "Deploy"
8. Wait for deployment complete ✅
9. **Copy your frontend URL** (looks like: `https://ticket-booking-app.vercel.app`)

**✅ After this:** Your frontend is live! Visit `https://your-frontend.vercel.app`

---

### Step 4️⃣: Final Configuration (2 min)

Go back to Render and update backend CORS:

1. Visit Render Dashboard
2. Select "ticket-booking-api"
3. Go to "Environment"
4. Update:
   - `CORS_ORIGIN` = `https://your-frontend-url.vercel.app` (paste your Vercel URL)
5. Render auto-redeploys ✅

---

## 🧪 Test Your Deployment

### Test Backend
Visit: `https://your-backend.onrender.com/health`

Should show:
```json
{"status":"OK","message":"Server is running"}
```

### Test Frontend
Visit: `https://your-frontend.vercel.app`

You should see:
- ✅ Flight search form
- ✅ City dropdowns populated
- ✅ "From" and "To" city selections
- ✅ Travel date picker
- ✅ Passenger info
- ✅ Direct flights option

### Test Full Flow
1. Select a "From" city
2. Select a different "To" city
3. Try selecting same city twice (should show error)
4. Click "Search Flights"
5. Should connect to backend and show response

---

## 📱 Your Deployed URLs

After completion, you'll have:

- **Frontend:** `https://ticket-booking-app.vercel.app`
- **Backend:** `https://ticket-booking-api.onrender.com`
- **GitHub:** `https://github.com/YOUR-USERNAME/ticketBooking`

Share the frontend URL with anyone!

---

## 🔄 How Updates Work

After first deployment, updates are automatic:

```bash
# Make code changes locally
# Then just:
git add .
git commit -m "Update message"
git push origin main

# Both services auto-redeploy! ✨
```

---

## ⚙️ Environment Variables Set

### What We Configured

**Backend (Render):**
- `NODE_ENV=production`
- `EXTERNAL_API_URL=https://onwardticket.com/api/order/search`
- `CORS_ORIGIN=your-vercel-url`

**Frontend (Vercel):**
- `REACT_APP_API_URL=your-render-url`

**Code Updates:**
- Frontend now reads API URL from environment variable
- Backend configured for production

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| API not reachable | Check Render service status and logs |
| CORS error | Update backend `CORS_ORIGIN` environment variable |
| Cities not loading | Check frontend `REACT_APP_API_URL` is correct |
| Build failed on Vercel | Check Node.js version compatibility |
| Build failed on Render | Check all dependencies in package.json |

Check service logs:
- **Render:** Dashboard → Your Service → Logs
- **Vercel:** Dashboard → Your Project → Deployments

---

## 💰 Cost: FREE ✨

**Render.com Free Tier:**
- 750 hours/month (plenty for hobby projects)
- Services sleep after 15 min inactivity
- First request wakes them (adds ~30 sec delay)

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments
- Auto-scales to handle traffic

**GitHub Free Tier:**
- Unlimited public repositories
- Perfect for learning and hobby projects

---

## 📚 Files Created for Deployment

- `DEPLOYMENT_GUIDE.md` - Detailed guide
- `DEPLOYMENT.md` - Technical setup details
- `CHECKLIST.md` - Step-by-step checklist
- `backend/render.yaml` - Render config
- `backend/.env.example` - Backend env vars reference
- `frontend/.env.example` - Frontend env vars reference
- `deploy.sh` - Setup script

---

## ✅ You're All Set!

**Time to deploy:** ~20 minutes
**Monthly cost:** $0
**Difficulty:** Easy 🎉

Follow the 4 steps above and you'll have a live application!

Need help? Check the detailed guides in the repo:
- Read `DEPLOYMENT_GUIDE.md` for detailed instructions
- Use `CHECKLIST.md` to track your progress
- Check `DEPLOYMENT.md` for technical details

---

**Happy Deploying! 🚀**
