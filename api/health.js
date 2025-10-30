/**
 * Health Check Endpoint
 * 
 * This endpoint checks if the API is running properly
 * 
 * Usage:
 * GET /api/health
 */

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Return health status
  return res.status(200).json({
    success: true,
    status: 'healthy',
    service: 'Simple Re-Writer API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      rewrite: '/api/rewrite (POST)',
      health: '/api/health (GET)'
    }
  });
};