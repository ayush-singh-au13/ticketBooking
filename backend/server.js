const config = require('./config');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigins,
  credentials: true
}));
app.use(express.json());

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const sampleRequest = {
    "routes": [
        {
            "from": "BLR",
            "fromCityName": "Bangalore",
            "to": "DEL",
            "toCityName": "New Delhi",
            "date": "2026-03-24"
        }
    ],
    "passengers": [
        {
            "type": "ADULT",
            "count": 2
        },
        {
            "type": "CHILD",
            "count": 1
        }
    ],
    "options": {
        "directFlightsOnly": false
    }
}

// city code API dropdown
app.get('/api/city_codes', (req, res) => {
  try {
      const cityCodeMapping = {
        "DEL": "Delhi",
        "BLR": "Bangalore",
        "MUM": "Mumbai",
        "HYD": "Hyderabad",
        "CCU": "Kolkata",
        "MAA": "Chennai",
        "PNQ": "Pune",
        "GOI": "Goa",
        "AMD": "Ahmedabad",
        "LKO": "Lucknow"
      }
  res.json({success : true, data : cityCodeMapping});

  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }

});

app.post('/api/book_ticket', async (req, res) => {
  try {
    const { routes, passengers, options } = req.body;
    console.log('Received booking request:', { routes, passengers, options });

    // Validate required fields
    if (!routes || !Array.isArray(routes) || routes.length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'routes array is required and must not be empty'
      });
    }

    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'passengers array is required and must not be empty'
      });
    }

    // Prepare request payload
    const payload = {
      routes,
      passengers,
      options: options || { directFlightsOnly: false }
    };

    // Call external API
    const response = await axios.post(config.externalApiUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: config.apiTimeout
    });

    // Return the response to client
    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Error calling external API:', error.message);

    // Handle different types of errors
    if (error.response) {
      // External API returned an error
      return res.status(error.response.status).json({
        error: 'External API error',
        message: error.response.data?.message || error.message,
        details: error.response.data
      });
    } else if (error.request) {
      // Request made but no response
      return res.status(503).json({
        error: 'Service unavailable',
        message: 'Could not reach external API'
      });
    } else {
      // Error in request setup
      return res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
});

/**
 * Get flight details by ID (optional endpoint)
 */
app.get('/api/flights/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // This would call a different endpoint or search results
    res.json({
      success: true,
      message: 'Flight details endpoint - implement based on external API',
      flightId: id
    });

  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Ticket Booking API server listening on port ${config.port}`);
  console.log(`Environment: ${config.environment}`);
});
