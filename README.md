# 🚀 Simple Re-Writer API

A FREE, easy-to-use API that rewrites text to make it simpler and easier to understand.

## ✨ Features

- ✅ **Dictionary-based rewriting** - Replaces hard words with simple ones
- ✅ **AI-powered rewriting** - Uses Gemini AI for advanced rewriting (optional)
- ✅ **100% FREE** - Hosted on Vercel forever
- ✅ **Easy to use** - Simple REST API
- ✅ **Fast** - Global CDN delivery
- ✅ **All files in one folder** - No subfolders, easy to upload!

## 📦 Files in This Folder

All files are in ONE folder (no subfolders):

- `rewrite.js` - Main API endpoint
- `health.js` - Health check endpoint
- `package.json` - Project configuration
- `vercel.json` - Deployment settings
- `.gitignore` - Git ignore rules
- `test-api.html` - Test page
- `README.md` - This file
- `QUICK-START.md` - Quick deployment guide
- `USAGE-EXAMPLES.md` - Code examples

## 🚀 Quick Deployment (3 Steps)

### Step 1: Upload to GitHub

1. Go to https://github.com
2. Create new repository: `simple-rewriter-api`
3. Click "uploading an existing file"
4. **SELECT ALL FILES** from this folder
5. **DRAG ALL FILES** to GitHub
6. Click "Commit changes"

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub (free)
3. Click "Add New" → "Project"
4. Select `simple-rewriter-api`
5. Click "Deploy"
6. Wait 1-2 minutes ⏳

### Step 3: Test Your API

Your API URL: `https://simple-rewriter-api.vercel.app`

Test in browser:
```
https://simple-rewriter-api.vercel.app/api/health
```

You should see:
```json
{
  "success": true,
  "status": "healthy"
}
```

## 🔥 How to Use Your API

### Test with the Test Page

1. Open `test-api.html` in your browser
2. Enter your API URL
3. Type some text
4. Click "Rewrite Text"
5. See the magic! ✨

### Using cURL

```bash
curl -X POST https://your-api-url.vercel.app/api/rewrite \
  -H "Content-Type: application/json" \
  -d '{"text": "I need to acquire some assistance with this enormous task."}'
```

### Using JavaScript

```javascript
fetch('https://your-api-url.vercel.app/api/rewrite', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    text: 'I need to acquire some assistance with this enormous task.',
    useDictionary: true
  })
})
.then(response => response.json())
.then(data => console.log(data.data.rewritten));
```

### Using Python

```python
import requests

response = requests.post(
    'https://your-api-url.vercel.app/api/rewrite',
    json={
        'text': 'I need to acquire some assistance with this enormous task.',
        'useDictionary': True
    }
)

print(response.json()['data']['rewritten'])
```

## 📝 API Documentation

### POST /api/rewrite

Rewrites text to make it simpler.

**Request Body:**
```json
{
  "text": "Text to rewrite (required)",
  "apiKey": "Your Gemini API key (optional)",
  "useDictionary": true,
  "useAI": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "Original text",
    "rewritten": "Rewritten text",
    "method": "dictionary",
    "originalLength": 100,
    "rewrittenLength": 95,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/health

Check if API is running.

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "service": "Simple Re-Writer API",
  "version": "1.0.0"
}
```

## 🔑 Optional: Get Gemini API Key

For AI-powered rewriting:

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key
4. Use it in the `apiKey` field

**Free Tier:**
- 60 requests per minute
- 1,500 requests per day

## 💰 Cost

**100% FREE!**

- ✅ Vercel hosting: FREE forever
- ✅ No credit card needed
- ✅ No hidden costs
- ✅ Unlimited requests (fair use)
- ✅ Global CDN included

## 🆘 Troubleshooting

### "404 Not Found"
Make sure you uploaded ALL files to GitHub.

### "Method Not Allowed"
Use POST request for `/api/rewrite`, not GET.

### "Deployment Failed"
Check Vercel logs in your dashboard.

## 📚 More Information

- **Quick Start:** QUICK-START.md
- **Code Examples:** USAGE-EXAMPLES.md
- **Upload Instructions:** 📖 UPLOAD-INSTRUCTIONS.txt

## 📧 Credits

**Created by:** MD RONI MIA  
**Website:** https://ronibook.com  
**Plugin:** Simple Re-Writer

---

**Ready to deploy? Just upload ALL files to GitHub and deploy to Vercel! 🚀**