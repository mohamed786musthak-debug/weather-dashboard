// Weather Dashboard App
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key from openweathermap.org
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

let currentWeatherData = null;
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
let units = 'metric'; // 'metric' for Celsius, 'imperial' for Fahrenheit

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const suggestionsDiv = document.getElementById('suggestions');
const currentWeatherContent = document.getElementById('currentWeatherContent');
const forecastContainer = document.getElementById('forecastContainer');
const favoritesContainer = document.getElementById('favoritesContainer');

// Event Listeners
searchBtn.addEventListener('click', () => searchWeather());
searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && searchWeather());
searchInput.addEventListener('input', handleSearchInput);
locationBtn.addEventListener('click', getUserLocation);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    // Load default city
    fetchWeatherByCity('London');
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (e.target !== searchInput) {
        suggestionsDiv.classList.remove('active');
    }
});

/**
 * Search weather by city name
 */
function searchWeather() {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
        searchInput.value = '';
        suggestionsDiv.classList.remove('active');
    }
}

/**
 * Handle search input for suggestions
 */
function handleSearchInput(e) {
    const value = e.target.value.trim();
    
    if (value.length < 2) {
        suggestionsDiv.classList.remove('active');
        return;
    }

    // Simulate suggestions (in a real app, you'd fetch from an API)
    const commonCities = [
        'London', 'New York', 'Paris', 'Tokyo', 'Sydney',
        'Dubai', 'Singapore', 'Bangkok', 'Mumbai', 'Beijing',
        'Los Angeles', 'Chicago', 'Houston', 'Toronto', 'Mexico City'
    ];

    const filtered = commonCities.filter(city => 
        city.toLowerCase().startsWith(value.toLowerCase())
    );

    if (filtered.length > 0) {
        suggestionsDiv.innerHTML = filtered.map(city => 
            `<div class="suggestion-item" onclick="selectSuggestion('${city}')">${city}</div>`
        ).join('');
        suggestionsDiv.classList.add('active');
    } else {
        suggestionsDiv.classList.remove('active');
    }
}

/**
 * Select a suggestion
 */
function selectSuggestion(city) {
    searchInput.value = city;
    searchWeather();
}

/**
 * Get user's current location
 */
function getUserLocation() {
    if (navigator.geolocation) {
        locationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoordinates(latitude, longitude);
                locationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
            },
            (error) => {
                console.error('Error getting location:', error);
                showError('Unable to get your location. Please enable location services.');
                locationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

/**
 * Fetch weather by city name
 */
function fetchWeatherByCity(city) {
    if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
        showError('Please set your OpenWeatherMap API key in script.js');
        return;
    }

    showLoading();
    
    const urls = [
        `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`,
        `${BASE_URL}/forecast?q=${city}&units=${units}&appid=${API_KEY}`
    ];

    Promise.all(urls.map(url => fetch(url).then(r => r.json())))
        .then(([weatherData, forecastData]) => {
            if (weatherData.cod !== 200) {
                showError(weatherData.message || 'City not found');
                return;
            }
            currentWeatherData = weatherData;
            displayCurrentWeather(weatherData);
            displayForecast(forecastData);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            showError('Failed to fetch weather data. Please try again.');
        });
}

/**
 * Fetch weather by coordinates
 */
function fetchWeatherByCoordinates(lat, lon) {
    if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
        showError('Please set your OpenWeatherMap API key in script.js');
        return;
    }

    showLoading();
    
    const urls = [
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`,
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    ];

    Promise.all(urls.map(url => fetch(url).then(r => r.json())))
        .then(([weatherData, forecastData]) => {
            currentWeatherData = weatherData;
            displayCurrentWeather(weatherData);
            displayForecast(forecastData);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            showError('Failed to fetch weather data. Please try again.');
        });
}

/**
 * Display current weather
 */
function displayCurrentWeather(data) {
    const { name, sys, main, weather, wind, visibility, clouds } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    const tempUnit = units === 'metric' ? '°C' : '°F';
    const speedUnit = units === 'metric' ? 'm/s' : 'mph';

    const html = `
        <div class="weather-icon">
            <img src="${iconUrl}" alt="${weather[0].description}" style="max-width: 150px;">
        </div>
        <div class="weather-info">
            <h2>${Math.round(main.temp)}${tempUnit}</h2>
            <div class="location">${name}, ${sys.country}</div>
            <div class="description">${weather[0].description}</div>
            <div class="temp-details">
                <div class="temp-item">
                    <i class="fas fa-arrow-up"></i>
                    <span>High: ${Math.round(main.temp_max)}${tempUnit}</span>
                </div>
                <div class="temp-item">
                    <i class="fas fa-arrow-down"></i>
                    <span>Low: ${Math.round(main.temp_min)}${tempUnit}</span>
                </div>
            </div>
        </div>
    `;

    currentWeatherContent.innerHTML = html;

    // Update details section
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${wind.speed.toFixed(1)} ${speedUnit}`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('pressure').textContent = `${main.pressure} mb`;
    document.getElementById('feelsLike').textContent = `${Math.round(main.feels_like)}${tempUnit}`;
    document.getElementById('precipitation').textContent = `${clouds.all}%`;
}

/**
 * Display 5-day forecast
 */
function displayForecast(data) {
    // Group forecast by day (one per day at noon)
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toLocaleDateString();
        
        // Get forecast around noon for each day
        if (date.getHours() >= 11 && date.getHours() <= 13) {
            if (!dailyForecasts[dateKey]) {
                dailyForecasts[dateKey] = item;
            }
        }
    });

    // If we don't have noon forecasts, just take every 8th item (24-hour intervals)
    if (Object.keys(dailyForecasts).length < 5) {
        dailyForecasts = {};
        for (let i = 0; i < data.list.length; i += 8) {
            const item = data.list[i];
            const date = new Date(item.dt * 1000);
            dailyForecasts[date.toLocaleDateString()] = item;
        }
    }

    const tempUnit = units === 'metric' ? '°C' : '°F';
    const forecastHTML = Object.values(dailyForecasts).slice(0, 5).map(item => {
        const date = new Date(item.dt * 1000);
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        
        return `
            <div class="forecast-card">
                <div class="forecast-date">${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                <img src="${iconUrl}" alt="${item.weather[0].description}" class="forecast-icon">
                <div class="forecast-temp">${Math.round(item.main.temp)}${tempUnit}</div>
                <div class="forecast-temp-range">
                    ${Math.round(item.main.temp_max)}° / ${Math.round(item.main.temp_min)}°
                </div>
                <div class="forecast-description">${item.weather[0].main}</div>
            </div>
        `;
    }).join('');

    forecastContainer.innerHTML = forecastHTML;
}

/**
 * Show loading state
 */
function showLoading() {
    currentWeatherContent.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading weather data...</p>
        </div>
    `;
    forecastContainer.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
    `;
}

/**
 * Show error message
 */
function showError(message) {
    currentWeatherContent.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
}

/**
 * Add to favorites
 */
function addToFavorites(city) {
    if (currentWeatherData && !favorites.includes(city)) {
        favorites.push(city);
        saveFavorites();
        loadFavorites();
    }
}

/**
 * Remove from favorites
 */
function removeFromFavorites(city) {
    favorites = favorites.filter(c => c !== city);
    saveFavorites();
    loadFavorites();
}

/**
 * Save favorites to localStorage
 */
function saveFavorites() {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
}

/**
 * Load and display favorites
 */
function loadFavorites() {
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1;">No favorites yet. Search for a city to add it!</p>';
        return;
    }

    favoritesContainer.innerHTML = favorites.map(city => `
        <div class="favorite-card" onclick="fetchWeatherByCity('${city}')">
            <button class="remove-favorite" onclick="event.stopPropagation(); removeFromFavorites('${city}')">
                <i class="fas fa-times"></i>
            </button>
            <div class="favorite-city">${city}</div>
            <div class="favorite-temp">--</div>
        </div>
    `).join('');
}

/**
 * Utility: Format temperature
 */
function formatTemp(temp) {
    return Math.round(temp);
}

/**
 * Utility: Format time
 */
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}