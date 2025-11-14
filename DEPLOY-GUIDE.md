# Quick Deployment Guide

## Deploy to Vercel + Render (Free)

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Render account (sign up at render.com)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/document-sharing-platform.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Settings:
   - **Name**: `docshare-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Plan**: Free
5. Environment Variables:
   ```
   PORT=3000
   FRONTEND_URL=https://your-app.vercel.app
   MAX_FILE_SIZE=52428800
   UPLOAD_DIR=./uploads
   DATABASE_PATH=./data/database.sqlite
   ```
6. Click "Create Web Service"
7. **Save your backend URL**: `https://docshare-backend-xxxx.onrender.com`

### Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Environment Variable:
   ```
   VITE_API_URL=https://docshare-backend-xxxx.onrender.com
   ```
6. Click "Deploy"
7. **Save your frontend URL**: `https://your-app.vercel.app`

### Step 4: Update Backend CORS

Go back to Render dashboard:
1. Find your backend service
2. Update `FRONTEND_URL` environment variable with your Vercel URL
3. Click "Save Changes" (will auto-redeploy)

### Step 5: Test Your Deployment

1. Open your Vercel URL in a browser
2. Upload a test file
3. Copy the share link
4. Open the link in another browser/device
5. Verify you can view and download the file

## Access from Multiple Laptops

Once deployed, anyone can access your app at:
- **Upload files**: `https://your-app.vercel.app`
- **View shared files**: `https://your-app.vercel.app/share/SHARE-ID`

Share the main URL with anyone who needs to upload or view documents!

## Important Notes

### Free Tier Limitations

**Render Free Tier:**
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- 750 hours/month free (enough for one service)

**Vercel Free Tier:**
- Unlimited bandwidth
- 100GB bandwidth/month
- Perfect for frontend hosting

### Keeping Backend Awake (Optional)

To prevent backend from sleeping, use a service like:
- UptimeRobot (free) - pings your backend every 5 minutes
- Cron-job.org (free) - scheduled pings

### Upgrading Storage

For production use with many files:
- Consider upgrading to Render paid plan ($7/month)
- Or use cloud storage (AWS S3, Cloudflare R2)

## Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
- Check both URLs use `https://` (not `http://`)

### Backend Not Responding
- Check Render logs for errors
- Verify environment variables are set correctly
- Backend may be sleeping (wait 30 seconds for first request)

### Files Not Uploading
- Check file size (max 50MB)
- Verify file type is supported
- Check browser console for errors

## Alternative: Deploy Everything to Railway

If you want simpler deployment:

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway auto-detects and deploys both services
5. Add environment variables in Railway dashboard
6. Get your URLs from Railway dashboard

Railway free tier: $5 credit/month (usually enough for testing)
