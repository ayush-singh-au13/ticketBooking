#!/bin/bash

# Deployment Setup Script
echo "🚀 Ticket Booking App - Deployment Setup"
echo "=========================================="

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
fi

# Add files
echo "Adding files to Git..."
git add .

# Create initial commit if not exists
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
    git commit -m "Initial commit - Ready for deployment"
fi

echo ""
echo "✅ Git setup complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Add your GitHub remote:"
echo "   git remote add origin https://github.com/yourusername/ticketBooking.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "2. Deploy Backend to Render.com:"
echo "   - Go to https://render.com"
echo "   - Create New Web Service"
echo "   - Connect your GitHub repo"
echo "   - Root Directory: backend"
echo "   - Build: npm install"
echo "   - Start: npm start"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repo"
echo "   - Root Directory: frontend"
echo "   - Add REACT_APP_API_URL env var with your Render backend URL"
echo ""
echo "4. Update environment variables:"
echo "   - Backend CORS_ORIGIN → your Vercel URL"
echo "   - Frontend REACT_APP_API_URL → your Render URL"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
