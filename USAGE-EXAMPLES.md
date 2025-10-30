# 📖 API Usage Examples

## 🌐 Your API URL

Replace `YOUR-API-URL` with your actual Vercel URL:
```
https://simple-rewriter-api.vercel.app
```

---

## 🔥 Example 1: Simple Dictionary Rewriting

### Using cURL (Command Line)

```bash
curl -X POST https://YOUR-API-URL.vercel.app/api/rewrite \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I need to acquire some assistance with this enormous task."
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "I need to acquire some assistance with this enormous task.",
    "rewritten": "I need to get some help with this very big task.",
    "method": "dictionary",
    "originalLength": 58,
    "rewrittenLength": 48
  }
}
```

---

## 🤖 Example 2: AI-Powered Rewriting

```bash
curl -X POST https://YOUR-API-URL.vercel.app/api/rewrite \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The comprehensive analysis demonstrates significant improvements.",
    "apiKey": "YOUR_GEMINI_API_KEY",
    "useDictionary": true,
    "useAI": true
  }'
```


---

## 💻 JavaScript / Node.js

```javascript
// Using fetch (works in browser and Node.js 18+)
async function rewriteText(text) {
  const response = await fetch('https://YOUR-API-URL.vercel.app/api/rewrite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text,
      useDictionary: true
    })
  });
  
  const data = await response.json();
  
  if (data.success) {
    console.log('Original:', data.data.original);
    console.log('Rewritten:', data.data.rewritten);
    return data.data.rewritten;
  } else {
    console.error('Error:', data.error);
    return null;
  }
}

// Usage
rewriteText('I need to acquire some assistance with this enormous task.');
```

### Using axios

```javascript
const axios = require('axios');

async function rewriteText(text) {
  try {
    const response = await axios.post(
      'https://YOUR-API-URL.vercel.app/api/rewrite',
      {
        text: text,
        useDictionary: true
      }
    );
    
    console.log('Rewritten:', response.data.data.rewritten);
    return response.data.data.rewritten;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// Usage
rewriteText('I need to acquire some assistance with this enormous task.');
```

---

## 🐍 Python

```python
import requests
import json

def rewrite_text(text, api_key=None, use_ai=False):
    url = 'https://YOUR-API-URL.vercel.app/api/rewrite'
    
    payload = {
        'text': text,
        'useDictionary': True,
        'useAI': use_ai
    }
    
    if api_key:
        payload['apiKey'] = api_key
    
    response = requests.post(url, json=payload)
    data = response.json()
    
    if data['success']:
        print('Original:', data['data']['original'])
        print('Rewritten:', data['data']['rewritten'])
        return data['data']['rewritten']
    else:
        print('Error:', data['error'])
        return None

# Usage - Dictionary only
rewrite_text('I need to acquire some assistance with this enormous task.')

# Usage - With AI
rewrite_text(
    'I need to acquire some assistance with this enormous task.',
    api_key='YOUR__API_KEY',
    use_ai=True
)
```

---

## 🔴 PHP

```php
<?php

function rewriteText($text, $apiKey = null, $useAI = false) {
    $url = 'https://YOUR-API-URL.vercel.app/api/rewrite';
    
    $data = [
        'text' => $text,
        'useDictionary' => true,
        'useAI' => $useAI
    ];
    
    if ($apiKey) {
        $data['apiKey'] = $apiKey;
    }
    
    $options = [
        'http' => [
            'header'  => "Content-Type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result, true);
    
    if ($response['success']) {
        echo "Original: " . $response['data']['original'] . "\n";
        echo "Rewritten: " . $response['data']['rewritten'] . "\n";
        return $response['data']['rewritten'];
    } else {
        echo "Error: " . $response['error'] . "\n";
        return null;
    }
}

// Usage
rewriteText('I need to acquire some assistance with this enormous task.');
?>
```

---

## 🌐 WordPress Plugin Integration

```php
<?php
// Add this to your WordPress plugin

function srw_rewrite_via_api($text) {
    $api_url = 'https://YOUR-API-URL.vercel.app/api/rewrite';
    
    $response = wp_remote_post($api_url, [
        'headers' => ['Content-Type' => 'application/json'],
        'body' => json_encode([
            'text' => $text,
            'useDictionary' => true
        ]),
        'timeout' => 30
    ]);
    
    if (is_wp_error($response)) {
        return $text; // Return original on error
    }
    
    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body, true);
    
    if ($data['success']) {
        return $data['data']['rewritten'];
    }
    
    return $text; // Return original on error
}

// Usage in your plugin
$original_text = 'I need to acquire some assistance with this enormous task.';
$rewritten_text = srw_rewrite_via_api($original_text);
echo $rewritten_text;
?>
```

---

## 🎨 HTML + JavaScript (Frontend)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Text Rewriter</title>
</head>
<body>
    <h1>Text Rewriter</h1>
    
    <textarea id="inputText" rows="5" cols="50">
I need to acquire some assistance with this enormous task.
    </textarea>
    <br><br>
    
    <button onclick="rewriteText()">Rewrite Text</button>
    
    <h2>Result:</h2>
    <div id="result"></div>
    
    <script>
        async function rewriteText() {
            const text = document.getElementById('inputText').value;
            const resultDiv = document.getElementById('result');
            
            resultDiv.innerHTML = 'Rewriting...';
            
            try {
                const response = await fetch('https://YOUR-API-URL.vercel.app/api/rewrite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: text,
                        useDictionary: true
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = `
                        <strong>Original:</strong><br>
                        ${data.data.original}<br><br>
                        <strong>Rewritten:</strong><br>
                        ${data.data.rewritten}
                    `;
                } else {
                    resultDiv.innerHTML = `<strong>Error:</strong> ${data.error}`;
                }
            } catch (error) {
                resultDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
            }
        }
    </script>
</body>
</html>
```

---

## 🔍 Check API Health

```bash
curl https://YOUR-API-URL.vercel.app/api/health
```

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "service": "Simple Re-Writer API",
  "version": "1.0.0",
  "endpoints": {
    "rewrite": "/api/rewrite (POST)",
    "health": "/api/health (GET)"
  }
}
```

---

## 📊 API Response Format

### Success Response

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

### Error Response

```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## 🎯 Tips for Best Results

1. **Dictionary Only** (Fast, Free)
   - Set `useDictionary: true`
   - Don't set `useAI` or set it to `false`
   - No API key needed

2. **AI + Dictionary** (Best Quality)
   - Set both `useDictionary: true` and `useAI: true`
   - Provide API key
   - Slower but much better results

3. **AI Only** (Advanced)
   - Set `useDictionary: false` and `useAI: true`
   - Provide API key
   - Uses only AI rewriting

---


---

## 💡 Rate Limits

**Vercel Free Tier:**
- ✅ 100 GB bandwidth/month
- ✅ 100 hours serverless function execution/month
- ✅ Unlimited requests (fair use)

** API Free Tier:**
- ✅ 60 requests per minute
- ✅ 1,500 requests per day

---

## 🆘 Common Errors

### "Method not allowed"
- Make sure you're using **POST** for `/api/rewrite`
- Use **GET** only for `/api/health`

### "Please provide text to rewrite"
- Make sure you're sending `text` in the request body
- Check that `Content-Type` is `application/json`

### "AI rewriting failed"
- Check your Gemini API key is correct
- Make sure you have quota remaining
- Try with `useDictionary: true` only

---

**Happy Coding! 🚀**
