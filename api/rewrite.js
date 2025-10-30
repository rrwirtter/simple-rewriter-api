/**
 * Simple Re-Writer API - Main Endpoint
 * 
 * This API rewrites text to make it simpler and easier to understand
 * 
 * Usage:
 * POST /api/rewrite
 * Body: { "text": "Your text here", "apiKey": "your-gemini-api-key" }
 */

const axios = require('axios');

// Word dictionary for simple replacements
const WORD_DICTIONARY = {
  // A
  "acquire": "get",
  "assistance": "help",
  "ancient": "very old",
  
  // B
  "beneficial": "good",
  "business": "work",
  
  // C
  "collaborate": "work together",
  "construct": "build",
  "comprehensive": "complete",
  
  // D
  "demonstrate": "show",
  "discover": "find",
  "delicious": "tasty",
  
  // E
  "enormous": "very big",
  "establish": "set up",
  
  // F
  "facilitate": "help",
  "fragile": "breaks easily",
  
  // G
  "generate": "make",
  
  // I
  "implement": "do",
  
  // M
  "modify": "change",
  
  // O
  "obtain": "get",
  
  // R
  "rapid": "very fast",
  "respond": "answer",
  
  // S
  "significant": "important",
  "strategy": "plan",
  
  // T
  "tiny": "very small",
  "transfer": "move",
  
  // U
  "utilize": "use",
  
  // V
  "verify": "check"
};

/**
 * Apply dictionary replacements to text
 */
function applyDictionaryReplacements(text) {
  let result = text;
  
  for (const [hardWord, simpleWord] of Object.entries(WORD_DICTIONARY)) {
    // Replace whole words only (case-insensitive)
    const regex = new RegExp(`\\b${hardWord}\\b`, 'gi');
    result = result.replace(regex, (match) => {
      // Preserve capitalization
      if (match[0] === match[0].toUpperCase()) {
        return simpleWord.charAt(0).toUpperCase() + simpleWord.slice(1);
      }
      return simpleWord;
    });
  }
  
  return result;
}

/**
 * Rewrite text using Gemini API
 */
async function rewriteWithGemini(text, apiKey) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
  
  const prompt = `You are a professional content writer. Rewrite the following text to make it simpler and easier to understand. Use simple words that a 5th grader can understand. Keep the same meaning but make it clearer.

IMPORTANT RULES:
1. Use simple, everyday words
2. Keep sentences short and clear
3. Maintain the original meaning
4. Make it sound natural and human
5. Do NOT add any introductory text like "Here's the rewritten version"
6. Start directly with the rewritten content

Text to rewrite:
${text}`;

  try {
    const response = await axios.post(
      `${url}?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return response.data.candidates[0].content.parts[0].text.trim();
    }
    
    throw new Error('Invalid response from Gemini API');
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    throw error;
  }
}

/**
 * Main API handler
 */
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Please use POST request.'
    });
  }

  try {
    const { text, apiKey, useDictionary = true, useAI = false } = req.body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Please provide text to rewrite'
      });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Text is too long. Maximum 10,000 characters allowed.'
      });
    }

    let rewrittenText = text;
    let method = 'none';

    // Apply dictionary replacements
    if (useDictionary) {
      rewrittenText = applyDictionaryReplacements(rewrittenText);
      method = 'dictionary';
    }

    // Apply AI rewriting if requested and API key provided
    if (useAI && apiKey) {
      try {
        rewrittenText = await rewriteWithGemini(rewrittenText, apiKey);
        method = useDictionary ? 'dictionary+ai' : 'ai';
      } catch (error) {
        // If AI fails, return dictionary result
        console.error('AI rewriting failed:', error.message);
        if (!useDictionary) {
          return res.status(500).json({
            success: false,
            error: 'AI rewriting failed. Please check your API key or try again later.'
          });
        }
      }
    }

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        original: text,
        rewritten: rewrittenText,
        method: method,
        originalLength: text.length,
        rewrittenLength: rewrittenText.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
};