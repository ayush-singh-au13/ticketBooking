# Ticket Booking API Server

A Node.js/Express server that consumes the Onward Ticket booking API and provides a convenient REST API interface.

## Features

- ✅ Express.js server with CORS enabled
- ✅ Consumes https://onwardticket.com/api/order/search
- ✅ Input validation for routes, passengers, and options
- ✅ Error handling and logging
- ✅ Health check endpoint
- ✅ Modular and scalable architecture

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the project directory:
```bash
cd /Users/ayushsingh/ticketBooking
```

2. Install dependencies:
```bash
npm install
```

## Configuration

Create a `.env` file in the root directory (optional):
```env
PORT=3000
NODE_ENV=development
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Search Flights
```http
POST /api/search
Content-Type: application/json
```

**Request Body:**
```json
{
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
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Response from external API
  }
}
```

**Error Response:**
```json
{
  "error": "Invalid request",
  "message": "routes array is required and must not be empty"
}
```

## Example Usage

### Using cURL
```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

### Using JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3000/api/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    routes: [
      {
        from: "BLR",
        fromCityName: "Bangalore",
        to: "DEL",
        toCityName: "New Delhi",
        date: "2026-03-24"
      }
    ],
    passengers: [
      {
        type: "ADULT",
        count: 2
      },
      {
        type: "CHILD",
        count: 1
      }
    ],
    options: {
      directFlightsOnly: false
    }
  })
});

const data = await response.json();
console.log(data);
```

## Project Structure

```
ticketBooking/
├── server.js           # Main server file
├── package.json        # Dependencies and scripts
├── .env                # Environment variables (optional)
└── README.md           # This file
```

## Error Handling

The API handles various error scenarios:
- **400 Bad Request**: Invalid input parameters
- **503 Service Unavailable**: External API unreachable
- **500 Internal Server Error**: Server-side errors

## Dependencies

- **express**: Web framework
- **axios**: HTTP client for making requests
- **cors**: Cross-origin resource sharing middleware
- **dotenv**: Environment variable management
- **nodemon**: Auto-reload during development

## Logging

The server logs:
- Request payloads
- External API responses
- Errors and exceptions

## Future Enhancements

- Add database to cache flight results
- Implement rate limiting
- Add authentication/authorization
- Add request/response validation schemas
- Implement pagination for large result sets
- Add booking endpoint
- Add user management

## License

ISC
