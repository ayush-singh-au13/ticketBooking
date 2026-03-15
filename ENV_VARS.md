# 🔐 Environment Variables Setup Guide

## Overview

Environment variables allow your app to behave differently in different environments (local, staging, production) without changing code.

---

## Backend Environment Variables

### Location: `backend/.env` (local development)

For local development, create `backend/.env`:
```env
NODE_ENV=development
PORT=3001
EXTERNAL_API_URL=https://onwardticket.com/api/order/search
CORS_ORIGIN=http://localhost:3000
```

### Location: Render Dashboard (production)

In Render.com, set these in your Web Service Environment Variables:

| Variable | Value | Purpose |
|----------|-------|---------|
| `NODE_ENV` | `production` | Tells Node.js to run in production mode |
| `PORT` | `3000` | Render assigns port automatically, but defaults to 3000 |
| `EXTERNAL_API_URL` | `https://onwardticket.com/api/order/search` | The external API your backend calls |
| `CORS_ORIGIN` | `https://your-vercel-app.vercel.app` | Allows frontend to make requests to backend |

**How to set in Render:**
1. Go to your Web Service dashboard
2. Click "Environment" tab
3. Click "Add Environment Variable"
4. Enter Key and Value
5. Click "Add"
6. Service will auto-redeploy

---

## Frontend Environment Variables

### Location: `frontend/.env.local` (local development)

For local development, create `frontend/.env.local`:
```env
REACT_APP_API_URL=http://localhost:3001
```

### Location: Vercel Dashboard (production)

In Vercel, set this in your project Environment Variables:

| Variable | Value | Purpose |
|----------|-------|---------|
| `REACT_APP_API_URL` | `https://your-render-backend.onrender.com` | Base URL for all API calls |

**How to set in Vercel:**
1. Go to your Project settings
2. Click "Environment Variables"
3. Add:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend.onrender.com`
4. Select "Production" environment
5. Click "Save"
6. Project will auto-redeploy

---

## How Environment Variables Work in Code

### Backend (`config.js`)
```javascript
const configs = {
  production: {
    port: process.env.PORT || 3000,  // Reads from env var
    corsOrigins: [
      process.env.CORS_ORIGIN || 'https://app.example.com'
    ]
  }
};
```

### Frontend (`ApiForm.js`)
```javascript
function ApiForm() {
  // Reads from REACT_APP_API_URL env var, defaults to localhost
  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  
  // Uses it for API calls
  fetch(`${apiBaseUrl}/api/city_codes`);
}
```

---

## Environment Variables by Stage

### 🏠 Local Development
```
Backend:
  NODE_ENV=development
  PORT=3001
  CORS_ORIGIN=http://localhost:3000

Frontend:
  REACT_APP_API_URL=http://localhost:3001
```

### 🌐 Production (Render + Vercel)
```
Backend:
  NODE_ENV=production
  PORT=3000
  CORS_ORIGIN=https://your-app.vercel.app
  EXTERNAL_API_URL=https://onwardticket.com/api/order/search

Frontend:
  REACT_APP_API_URL=https://your-api.onrender.com
```

---

## 🔑 Where to Get Values

### `CORS_ORIGIN` (Backend)
- Get this from Vercel dashboard after frontend deployment
- Example: `https://ticket-booking-app-abc123.vercel.app`
- This allows frontend to communicate with backend

### `REACT_APP_API_URL` (Frontend)
- Get this from Render dashboard after backend deployment
- Example: `https://ticket-booking-api-xyz789.onrender.com`
- This is where frontend sends API requests to

### `PORT`
- Render provides this automatically
- Default is usually `3000`
- Don't override unless you have a specific reason

### `EXTERNAL_API_URL`
- This stays the same: `https://onwardticket.com/api/order/search`
- This is the flight booking API your backend calls

---

## ✅ Setup Checklist

### Before Deployment

- [ ] `backend/.env` created with local values
- [ ] `frontend/.env.local` created with local values
- [ ] Both work locally when running `npm start` and `npm run dev`

### During Deployment

**Step 1: Deploy Backend to Render**
- [ ] Set these env vars in Render:
  - `NODE_ENV=production`
  - `EXTERNAL_API_URL=https://onwardticket.com/api/order/search`
- [ ] Note down your Render URL

**Step 2: Deploy Frontend to Vercel**
- [ ] Set this env var in Vercel:
  - `REACT_APP_API_URL=(your Render URL)`
- [ ] Note down your Vercel URL

**Step 3: Update Backend CORS**
- [ ] Go back to Render
- [ ] Update `CORS_ORIGIN=(your Vercel URL)`
- [ ] Wait for auto-redeploy

---

## 🧪 Testing Environment Variables

### Backend
```bash
# Visit health endpoint
curl https://your-backend.onrender.com/health

# Should return:
# {"status":"OK","message":"Server is running"}
```

### Frontend
```bash
# In browser console, check:
console.log(process.env.REACT_APP_API_URL);
// Should print your backend URL
```

---

## 🚨 Common Mistakes

### ❌ Wrong
```env
# Frontend - without REACT_APP_ prefix won't work in frontend
API_URL=https://api.example.com  # WON'T be available in React
```

### ✅ Correct
```env
# Frontend - must have REACT_APP_ prefix
REACT_APP_API_URL=https://api.example.com  # Will be available in React
```

### ❌ Wrong
```javascript
// Frontend - trying to use backend env var
const url = process.env.EXTERNAL_API_URL;  // Undefined!
```

### ✅ Correct
```javascript
// Frontend - only REACT_APP_* vars available
const url = process.env.REACT_APP_API_URL;  // Works!
```

---

## 🔄 Updating Environment Variables

### After Deployment

If you need to change environment variables:

**On Render (Backend):**
1. Go to Web Service dashboard
2. Click "Environment"
3. Update the variable
4. Render auto-redeploys

**On Vercel (Frontend):**
1. Go to Project Settings
2. Click "Environment Variables"
3. Edit the variable
4. Vercel auto-redeploys

---

## 📚 Reference Documentation

- [Render Environment Variables](https://render.com/docs/configure-environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Node.js process.env](https://nodejs.org/docs/latest/api/process.html#process_process_env)

---

## 🎯 Summary

**3 Key Rules:**
1. Backend vars set in Render dashboard
2. Frontend vars start with `REACT_APP_` prefix
3. Update `CORS_ORIGIN` after frontend deployment

You're good to go! 🚀
