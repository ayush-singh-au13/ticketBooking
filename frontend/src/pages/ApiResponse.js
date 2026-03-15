import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ApiResponse.css';

function ApiResponse() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, apiUrl, requestData } = location.state || { data: null, apiUrl: '', requestData: null };

  if (!data) {
    return (
      <div className="response-container">
        <div className="response-card">
          <h1>No Data</h1>
          <p>No response data available.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="response-container">
      <div className="response-card">
        <h1>Flight Search Results</h1>
        
        <div className="api-url-section">
          <h3>Request Endpoint:</h3>
          <p className="api-url">{apiUrl}</p>
        </div>

        {requestData && (
          <div className="request-section">
            <h3>Request Data:</h3>
            <pre className="response-json">
              {JSON.stringify(requestData, null, 2)}
            </pre>
          </div>
        )}

        <div className="response-section">
          <h3>Response Data:</h3>
          <pre className="response-json">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>

        <button onClick={() => navigate('/')} className="back-btn">
          Back to Form
        </button>
      </div>
    </div>
  );
}

export default ApiResponse;
