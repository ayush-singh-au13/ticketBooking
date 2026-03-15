import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ApiForm.css';

function ApiForm() {
  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  const [apiUrl, setApiUrl] = useState(`${apiBaseUrl}/api/book_ticket`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cities, setCities] = useState({});
  const [citiesLoading, setCitiesLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch city codes on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/city_codes`);
        if (!response.ok) {
          throw new Error('Failed to fetch city codes');
        }
        const data = await response.json();
        if (data.success) {
          setCities(data.data);
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
        setError('Failed to load cities. Please refresh the page.');
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCities();
  }, []);

  const [formData, setFormData] = useState({
    routes: [
      {
        fromCityName: 'Bangalore',
        toCityName: 'New Delhi',
        date: '2026-03-24'
      }
    ],
    passengers: [
      { type: 'ADULT', count: 2 },
      { type: 'CHILD', count: 0}
    ],
    options: {
      directFlightsOnly: false
    }
  });

  const handleRouteChange = (index, field, value) => {
    const newRoutes = [...formData.routes];
    newRoutes[index] = { ...newRoutes[index], [field]: value };
    setFormData({ ...formData, routes: newRoutes });

    // Check if from and to cities are the same
    if (newRoutes[index].fromCityName && newRoutes[index].toCityName && 
        newRoutes[index].fromCityName === newRoutes[index].toCityName) {
      setError('From and To cities cannot be the same');
    } else {
      setError('');
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...formData.passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: field === 'count' ? parseInt(value) : value };
    setFormData({ ...formData, passengers: newPassengers });
  };

  const handleOptionsChange = (field, value) => {
    setFormData({
      ...formData,
      options: { ...formData.options, [field]: value }
    });
  };

  const getCityCode = (cityName) => {
    for (const [code, name] of Object.entries(cities)) {
      if (name === cityName) {
        return code;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!apiUrl.trim()) {
      setError('Please enter a valid API URL');
      setLoading(false);
      return;
    }

    // Validate that from and to cities are not the same
    for (let route of formData.routes) {
      if (route.fromCityName === route.toCityName) {
        setError('From and To cities cannot be the same');
        setLoading(false);
        return;
      }
    }

    try {
      // Build payload with city codes
      const payload = {
        routes: formData.routes.map(route => ({
          from: getCityCode(route.fromCityName),
          fromCityName: route.fromCityName,
          to: getCityCode(route.toCityName),
          toCityName: route.toCityName,
          date: route.date
        })),
        passengers: formData.passengers.filter(passenger => passenger.count > 0),
        options: formData.options
      };

      if(payload.passengers.length === 0) {
        setError('Please add at least one passenger');
        setLoading(false);
        return;
      }
      if(payload.routes.length === 0) {
        setError('Please add at least one route');
        setLoading(false);
        return;
      }
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Navigate to response page with data
      navigate('/response', { state: { data, apiUrl, requestData: payload } });
    } catch (err) {
      setError(err.message || 'Failed to fetch from API');
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Flight Search</h1>
        <form onSubmit={handleSubmit}>
          
          {/* Routes Section */}
          <div className="section-header">Routes</div>
          {formData.routes.map((route, idx) => (
            <div key={idx} className="section-group">
              <div className="form-row">
                <div className="form-group half">
                  <label>From (City Name):</label>
                  <select
                    value={route.fromCityName}
                    onChange={(e) => handleRouteChange(idx, 'fromCityName', e.target.value)}
                    disabled={loading || citiesLoading}
                  >
                    <option value="">Select a city</option>
                    {Object.entries(cities).map(([code, cityName]) => (
                      <option key={code} value={cityName}>
                        {cityName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group half">
                  <label>To (City Name):</label>
                  <select
                    value={route.toCityName}
                    onChange={(e) => handleRouteChange(idx, 'toCityName', e.target.value)}
                    disabled={loading || citiesLoading}
                  >
                    <option value="">Select a city</option>
                    {Object.entries(cities).map(([code, cityName]) => (
                      <option key={code} value={cityName}>
                        {cityName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Travel Date:</label>
                <input
                  type="date"
                  value={route.date}
                  onChange={(e) => handleRouteChange(idx, 'date', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          ))}

          {/* Passengers Section */}
          <div className="section-header">Passengers</div>
          {formData.passengers.map((passenger, idx) => (
            <div key={idx} className="section-group">
              <div className="form-row">
                <div className="form-group half">
                  <label>Type:</label>
                  <select
                    value={passenger.type}
                    onChange={(e) => handlePassengerChange(idx, 'type', e.target.value)}
                    disabled={loading}
                  >
                    <option value="ADULT">Adult</option>
                    <option value="CHILD">Child</option>
                    <option value="INFANT">Infant</option>
                  </select>
                </div>
                <div className="form-group half">
                  <label>Count:</label>
                  <input
                    type="number"
                    max="9"
                    value={passenger.count}
                    onChange={(e) => handlePassengerChange(idx, 'count', e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Options Section */}
          <div className="section-header">Options</div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={formData.options.directFlightsOnly}
                onChange={(e) => handleOptionsChange('directFlightsOnly', e.target.checked)}
                disabled={loading}
              />
              Direct Flights Only
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </form>

        {loading && <div className="loading-spinner"></div>}
      </div>
    </div>
  );
}

export default ApiForm;
