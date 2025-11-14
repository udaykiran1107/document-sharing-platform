# Deployment Guide

This guide covers various deployment options for the Document Sharing Platform.

## Table of Contents
- [Docker Deployment](#docker-deployment)
- [Manual Deployment](#manual-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Environment Variables](#environment-variables)
- [Production Checklist](#production-checklist)

## Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Quick Start with Docker Compose

1. **Clone the repository**
```bash
git clone <repository-url>
cd document-sharing-platform
```

2. **Configure environment variables**

Edit `.env.production` for backend:
```env
PORT=3000
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800
DATABASE_PATH=./data/database.sqlite
FRONTEND_URL=https://your-domain.com
```

Edit `frontend/.env.production` for frontend:
```env
VITE_API_URL=https://your-api-domain.com
```

3. **Build and start containers**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost
- Backend API: http://localhost:3000

5. **View logs**
```bash
docker-compose logs -f
```

6. **Stop containers**
```bash
docker-compose down
```

### Individual Docker Builds

**Backend:**
```bash
docker build -t docshare-backend .
docker run -p 3000:3000 -v $(pwd)/uploads:/app/uploads -v $(pwd)/data:/app/data docshare-backend
```

**Frontend:**
```bash
cd frontend
docker build -t docshare-frontend .
docker run -p 80:80 docshare-frontend
```

## Manual Deployment

### Backend Deployment

1. **Install Node.js** (v18 or higher)

2. **Install dependencies**
```bash
npm ci --only=production
```

3. **Set environment variables**
```bash
export NODE_ENV=production
export PORT=3000
export UPLOAD_DIR=/var/www/docshare/uploads
export DATABASE_PATH=/var/www/docshare/data/database.sqlite
export MAX_FILE_SIZE=52428800
export FRONTEND_URL=https://your-domain.com
```

4. **Create necessary directories**
```bash
mkdir -p uploads data logs
```

5. **Start the server**
```bash
node src/server.js
```

### Frontend Deployment

1. **Install dependencies**
```bash
cd frontend
npm ci
```

2. **Build for production**
```bash
npm run build
```

3. **Serve static files**

The built files will be in `frontend/dist/`. Serve them using:
- Nginx
- Apache
- Any static file server

**Example Nginx configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/docshare/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Process Manager (PM2)

For production, use PM2 to manage the Node.js process:

1. **Install PM2**
```bash
npm install -g pm2
```

2. **Start application**
```bash
pm2 start ecosystem.config.cjs --env production
```

3. **Useful PM2 commands**
```bash
pm2 status              # Check status
pm2 logs                # View logs
pm2 restart all         # Restart
pm2 stop all            # Stop
pm2 startup             # Enable startup on boot
pm2 save                # Save current process list
```

## Cloud Deployment

### Heroku

1. **Create Heroku app**
```bash
heroku create your-app-name
```

2. **Set environment variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set MAX_FILE_SIZE=52428800
```

3. **Deploy**
```bash
git push heroku main
```

### AWS EC2

1. **Launch EC2 instance** (Ubuntu 22.04 recommended)

2. **SSH into instance**
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Clone and setup application**
```bash
git clone <repository-url>
cd document-sharing-platform
npm install
cd frontend && npm install && npm run build
```

5. **Install and configure Nginx**
```bash
sudo apt-get install nginx
sudo cp nginx.conf /etc/nginx/sites-available/docshare
sudo ln -s /etc/nginx/sites-available/docshare /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Start backend with PM2**
```bash
pm2 start ecosystem.config.cjs --env production
pm2 startup
pm2 save
```

### DigitalOcean

Similar to AWS EC2 deployment. Use a Droplet with Ubuntu 22.04.

### Vercel (Frontend only)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy frontend**
```bash
cd frontend
vercel --prod
```

3. **Configure environment variables** in Vercel dashboard

## Environment Variables

### Backend Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 3000 | No |
| UPLOAD_DIR | Upload directory path | ./uploads | No |
| MAX_FILE_SIZE | Max file size in bytes | 52428800 | No |
| DATABASE_PATH | SQLite database path | ./data/database.sqlite | No |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 | Yes |

### Frontend Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| VITE_API_URL | Backend API URL | http://localhost:3000 | Yes |

## Production Checklist

### Security
- [ ] Use HTTPS for all connections
- [ ] Set secure CORS origins
- [ ] Implement rate limiting
- [ ] Add authentication if needed
- [ ] Regular security updates
- [ ] Secure file storage permissions

### Performance
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure caching headers
- [ ] Optimize database queries
- [ ] Monitor server resources

### Monitoring
- [ ] Set up error logging
- [ ] Configure application monitoring
- [ ] Set up uptime monitoring
- [ ] Configure alerts
- [ ] Regular backups of database

### Maintenance
- [ ] Document deployment process
- [ ] Set up CI/CD pipeline
- [ ] Regular dependency updates
- [ ] Database backup strategy
- [ ] File cleanup strategy

## SSL/TLS Configuration

### Using Let's Encrypt with Certbot

1. **Install Certbot**
```bash
sudo apt-get install certbot python3-certbot-nginx
```

2. **Obtain certificate**
```bash
sudo certbot --nginx -d your-domain.com
```

3. **Auto-renewal**
```bash
sudo certbot renew --dry-run
```

## Backup Strategy

### Database Backup
```bash
# Create backup
cp data/database.sqlite data/backup-$(date +%Y%m%d).sqlite

# Automated daily backup
0 2 * * * cp /path/to/data/database.sqlite /path/to/backups/backup-$(date +\%Y\%m\%d).sqlite
```

### File Storage Backup
```bash
# Backup uploads directory
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz uploads/

# Sync to cloud storage (example with AWS S3)
aws s3 sync uploads/ s3://your-bucket/uploads/
```

## Troubleshooting

### Backend won't start
- Check Node.js version: `node --version`
- Verify environment variables
- Check port availability: `lsof -i :3000`
- Review logs in `logs/` directory

### Frontend not loading
- Verify build completed: check `frontend/dist/`
- Check nginx configuration
- Verify API URL in environment variables
- Check browser console for errors

### File uploads failing
- Check upload directory permissions
- Verify MAX_FILE_SIZE setting
- Check available disk space
- Review backend logs

### Database errors
- Verify database file permissions
- Check database path exists
- Ensure SQLite is installed
- Review database logs

## Support

For issues and questions:
- Check [TESTING.md](TESTING.md) for testing procedures
- Review application logs
- Check GitHub issues
- Contact support team
