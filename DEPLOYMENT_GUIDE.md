# 🚀 EduConnect Deployment Guide

## ✅ Frontend Deployment (COMPLETED)
**Live URL**: https://educonnect-school-directory.windsurf.build

## 🔧 Backend Deployment Instructions

### Quick Deploy to Railway (Recommended)

#### Step 1: Setup Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub account
3. Verify your account

#### Step 2: Deploy Backend
1. Click "New Project" → "Deploy from GitHub repo"
2. Connect your GitHub repository
3. Select the `educonnect` folder (Spring Boot backend)
4. Railway will automatically detect it's a Java project

#### Step 3: Add PostgreSQL Database
1. In your Railway project dashboard, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will create a database and provide connection URL automatically

#### Step 4: Configure Environment Variables
In Railway dashboard, go to your service → Variables tab and add:

```
SPRING_PROFILES_ACTIVE=prod
FRONTEND_URL=https://educonnect-school-directory.windsurf.build
PORT=8080
```

Note: `DATABASE_URL` is automatically provided by Railway PostgreSQL service.

#### Step 5: Deploy
Railway will automatically build and deploy your application.
You'll get a URL like: `https://your-app-name.railway.app`

### Alternative: Deploy to Render

#### Step 1: Setup Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account

#### Step 2: Create Web Service
1. Click "New" → "Web Service"
2. Connect GitHub repository
3. Select `educonnect` folder
4. Configure:
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -Dserver.port=$PORT -jar target/educonnect-1.0.0.war`

#### Step 3: Add PostgreSQL Database
1. Click "New" → "PostgreSQL"
2. Create database and note the connection details

#### Step 4: Environment Variables
Add these in Render dashboard:
```
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=<your-postgres-connection-string>
FRONTEND_URL=https://educonnect-school-directory.windsurf.build
PORT=8080
```

## 🔄 After Backend Deployment

Once your backend is live, send me the backend URL and I'll:
1. Update frontend configuration to connect to live backend
2. Redeploy frontend with updated API endpoint
3. Test the complete application

## 📋 Pre-configured Files (Already Created)

✅ `railway.toml` - Railway deployment configuration
✅ `application-prod.properties` - Production settings
✅ Updated CORS configuration for frontend
✅ Built Spring Boot WAR file
✅ PostgreSQL driver included in dependencies

## 🎯 Expected Result

After deployment, you'll have:
- **Frontend**: https://educonnect-school-directory.windsurf.build
- **Backend**: https://your-backend-url.railway.app (or render.com)
- **Database**: PostgreSQL hosted on Railway/Render
- **Full Features**: Registration, login, school management, AI chatbot

## 🆘 Need Help?

If you encounter any issues during deployment, share the error message and I'll help troubleshoot!
