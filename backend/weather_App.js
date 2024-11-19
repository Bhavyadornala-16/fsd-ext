// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [recentSearches, setRecentSearches] = useState([]);

    // Fetch recent searches on mount
    useEffect(() => {
        fetchRecentSearches();
    }, []);

    const fetchRecentSearches = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recent-searches`);
            setRecentSearches(response.data);
        } catch (error) {
            console.error('Error fetching recent searches:', error);
        }
    };

    const fetchWeather = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/weather`, { city });
            setWeatherData(response.data);
            fetchRecentSearches();
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="App">
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}

            <h2>Recent Searches</h2>
            <ul>
                {recentSearches.map((search, index) => (
                    <li key={index}>{search.city} - {new Date(search.date).toLocaleString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
