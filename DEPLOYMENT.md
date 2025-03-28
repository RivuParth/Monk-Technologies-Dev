# Monk Technologies Deployment Guide

This guide provides step-by-step instructions for deploying the Monk Technologies application on an AWS EC2 instance.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [AWS EC2 Setup](#aws-ec2-setup)
3. [Server Configuration](#server-configuration)
4. [Application Deployment](#application-deployment)
5. [SSL Configuration](#ssl-configuration)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)
7. [Backup Strategy](#backup-strategy)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting the deployment process, ensure you have:
- AWS Account with EC2 access
- Domain name (optional, but recommended)
- SSH client installed on your local machine
- Git installed on your local machine
- Node.js and npm installed on your local machine

## AWS EC2 Setup

### 1. Launch EC2 Instance
1. Log into AWS Console
2. Navigate to EC2 Dashboard
3. Click "Launch Instance"
4. Configure the instance:
   - Name: `monk-technologies`
   - OS: Ubuntu Server 22.04 LTS
   - Instance Type: t2.micro (free tier)
   - Key Pair: Create new and download
   - Network Settings: Create new security group

### 2. Configure Security Group
Add the following inbound rules:
```
HTTP (80)    -> 0.0.0.0/0
HTTPS (443)  -> 0.0.0.0/0
SSH (22)     -> Your IP
Custom TCP (5000) -> 0.0.0.0/0
```

### 3. Connect to EC2 Instance
```bash
# Set correct permissions for key file
chmod 400 your-key-pair.pem

# Connect to instance
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip
```

## Server Configuration

### 1. System Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y
```

### 2. Install Required Software
```bash
# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install -y nginx

# Install PM2 globally
sudo npm install -y pm2 -g
```

### 3. Clone Repository
```bash
# Install Git
sudo apt install -y git

# Clone repository
git clone https://github.com/your-username/Monk-Technologies-Dev.git
cd Monk-Technologies-Dev
```

### 4. Configure Environment Variables
```bash
# Navigate to backend directory
cd backend

# Create .env file
nano .env
```

Add the following environment variables:
```env
MONGODB_URI=mongodb://localhost:27017/monk-technologies
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin-email@gmail.com
NODE_ENV=production
```

## Application Deployment

### 1. Build Frontend
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies and build
npm install
npm run build
```

### 2. Configure Nginx
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/monk-technologies
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /home/ubuntu/Monk-Technologies-Dev/frontend/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads directory
    location /uploads {
        alias /home/ubuntu/Monk-Technologies-Dev/backend/uploads;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/monk-technologies /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Start Backend
```bash
# Navigate to backend directory
cd /home/ubuntu/Monk-Technologies-Dev/backend

# Install dependencies
npm install

# Start with PM2
pm2 start server.js --name "monk-backend"
pm2 save
pm2 startup
```

## SSL Configuration

### 1. Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Get SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com
```

## Monitoring and Maintenance

### 1. Application Logs
```bash
# View backend logs
pm2 logs monk-backend

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 2. System Monitoring
```bash
# Monitor system resources
htop

# Monitor disk usage
df -h

# Monitor memory usage
free -m
```

## Backup Strategy

### 1. Create Backup Script
```bash
nano /home/ubuntu/backup.sh
```

Add the following content:
```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump --out $BACKUP_DIR/mongodb_$DATE

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /home/ubuntu/Monk-Technologies-Dev/backend/uploads

# Keep only last 7 days of backups
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;
find $BACKUP_DIR -type f -mtime +7 -exec rm -f {} \;
```

Make it executable:
```bash
chmod +x /home/ubuntu/backup.sh
```

### 2. Schedule Backups
```bash
# Edit crontab
crontab -e

# Add daily backup at midnight
0 0 * * * /home/ubuntu/backup.sh
```

## Troubleshooting

### Common Issues and Solutions

1. **Application Not Starting**
   - Check PM2 logs: `pm2 logs monk-backend`
   - Verify environment variables
   - Check MongoDB connection

2. **Nginx 502 Bad Gateway**
   - Check if backend is running: `pm2 status`
   - Verify Nginx configuration: `sudo nginx -t`
   - Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

3. **MongoDB Connection Issues**
   - Check MongoDB status: `sudo systemctl status mongod`
   - Verify MongoDB is running: `sudo systemctl start mongod`
   - Check MongoDB logs: `sudo tail -f /var/log/mongodb/mongod.log`

4. **SSL Certificate Issues**
   - Verify domain DNS settings
   - Check Certbot logs: `sudo certbot --nginx -d your-domain.com --debug`
   - Ensure ports 80 and 443 are open in security group

### Maintenance Commands

```bash
# Restart application
pm2 restart monk-backend

# Restart Nginx
sudo systemctl restart nginx

# Restart MongoDB
sudo systemctl restart mongod

# Update application
cd /home/ubuntu/Monk-Technologies-Dev
git pull
cd frontend && npm install && npm run build
cd ../backend && npm install
pm2 restart monk-backend
```

## Security Considerations

1. **Regular Updates**
   - Update system packages regularly
   - Keep Node.js and npm up to date
   - Monitor security advisories for dependencies

2. **File Permissions**
   - Ensure uploads directory has correct permissions
   - Keep sensitive files secure
   - Use appropriate file ownership

3. **Environment Variables**
   - Keep .env file secure
   - Use strong passwords
   - Rotate credentials regularly

## Support

For additional support or questions, please contact:
- Email: support@monktechnologies.com
- GitHub Issues: [Repository Issues](https://github.com/your-username/Monk-Technologies-Dev/issues) 