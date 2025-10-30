#!/bin/bash

# Simple Re-Writer API - Push to GitHub
# Run this script in Git Bash

echo "═══════════════════════════════════════════════════════════════"
echo "           Pushing API Changes to GitHub"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Navigate to the correct directory
cd "$(dirname "$0")"

echo "📁 Current directory: $(pwd)"
echo ""

# Add all changes
echo "📦 Adding files..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Fixed API structure - moved files to api folder for Vercel deployment"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "           ✅ SUCCESS! Changes pushed to GitHub"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "🎯 Next Steps:"
echo "   1. Go to: https://vercel.com"
echo "   2. Import your repository: simple-rewriter-api"
echo "   3. Click Deploy"
echo "   4. Your API will be live in 1-2 minutes!"
echo ""
echo "🌐 Your API URL will be:"
echo "   https://simple-rewriter-api.vercel.app"
echo ""
echo "═══════════════════════════════════════════════════════════════"