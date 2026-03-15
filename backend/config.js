1/**
 * Configuration file for managing development and staging environments
 */

const dotenv = require('dotenv');
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

// Environment-specific configurations
const configs = {
  development: {
    port: 3001,
    nodeEnv: 'development',
    externalApiUrl: 'https://onwardticket.com/api/order/search',
    apiTimeout: 30000,
    logLevel: 'debug',
    corsOrigins: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
    db: {
      // Add database config for development if needed
    }
  },
  staging: {
    port: process.env.PORT || 3001,
    nodeEnv: 'staging',
    externalApiUrl: process.env.EXTERNAL_API_URL || 'https://onwardticket.com/api/order/search',
    apiTimeout: 45000,
    logLevel: 'info',
    corsOrigins: [
      'https://staging-app.example.com',
      'https://staging-api.example.com'
    ],
    db: {
      // Add database config for staging if needed
    }
  },
  production: {
    port: process.env.PORT || 3000,
    nodeEnv: 'production',
    externalApiUrl: process.env.EXTERNAL_API_URL || 'https://onwardticket.com/api/order/search',
    apiTimeout: 60000,
    logLevel: 'warn',
    corsOrigins: [
      process.env.CORS_ORIGIN || 'https://ticketbooking-ym0o.onrender.com',
      'https://your-frontend.vercel.app' // Add your actual frontend URL
    ],
    db: {
      // Add database config for production if needed
    }
  }
};

// Get current environment config
const config = {
  ...configs[NODE_ENV],
  environment: NODE_ENV
};

// Validate required env variables for non-development environments
if (NODE_ENV !== 'development') {
  if (!process.env.EXTERNAL_API_URL) {
    console.warn(`Warning: EXTERNAL_API_URL not set for ${NODE_ENV} environment`);
  }
}

module.exports = config;
