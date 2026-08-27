# Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API. Get current weather conditions, 5-day forecasts, and detailed weather information for any location worldwide.

## Features

✨ **Core Features:**
- 🌍 Real-time weather data for any city
- 📍 Geolocation support (get weather for current location)
- 📅 5-day weather forecast
- 🔍 City search with autocomplete suggestions
- ❤️ Save favorite locations
- 📊 Detailed weather metrics (humidity, wind speed, visibility, pressure, etc.)
- 🎨 Beautiful gradient UI with smooth animations
- 📱 Fully responsive design (mobile, tablet, desktop)
- 💾 Local storage for favorites
- 🌡️ Support for both Celsius and Fahrenheit

## Screenshots

### Current Weather View
- Large temperature display
- Weather icon and description
- High/Low temperatures
- Location information

### 5-Day Forecast
- Daily weather cards
- Temperature ranges
- Weather conditions
- Weather icons

### Additional Details
- Humidity percentage
- Wind speed
- Visibility distance
- Atmospheric pressure
- Feels like temperature
- Cloud coverage

### Favorite Locations
- Quick access to saved cities
- One-click weather updates
- Easy removal of favorites

## Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Get an API key:**
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key from your account dashboard

3. **Add your API key:**
   - Open `script.js` in your text editor
   - Find the line: `const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';`
   - Replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key

4. **Open the application:**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (if you have http-server installed)
     http-server
     ```
   - Then navigate to `http://localhost:8000`

## Usage

### Search for a City
1. Type a city name in the search box
2. See autocomplete suggestions appear
3. Click a suggestion or press Enter to search
4. Weather data will update immediately

### Use Your Current Location
1. Click the location icon button
2. Allow the browser to access your location
3. Weather for your current location will load

### Add to Favorites
1. After searching for a city, click the heart icon (in the details area)
2. The city will appear in the "Favorite Locations" section
3. Click a favorite to quickly view its weather

### Remove Favorites
1. Hover over a favorite card
2. Click the "×" button that appears
3. The city will be removed from your favorites

## Project Structure

```
weather-dashboard/
├── index.html          # Main HTML file
├── styles.css          # Styling and layout
├── script.js           # JavaScript functionality
├── README.md           # Documentation
└── .gitignore          # Git ignore file
```

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients, flexbox, and grid
- **JavaScript (ES6+)** - Dynamic functionality and API integration
- **OpenWeatherMap API** - Real-time weather data
- **Font Awesome** - Weather and UI icons
- **LocalStorage API** - Persistent favorites storage
- **Geolocation API** - User location detection

## API Reference

### OpenWeatherMap Endpoints Used:

1. **Current Weather**
   ```
   GET /weather?q={city}&units={units}&appid={API_KEY}
   ```

2. **5-Day Forecast**
   ```
   GET /forecast?q={city}&units={units}&appid={API_KEY}
   ```

### Parameters:
- `q` - City name or coordinates
- `units` - `metric` (Celsius) or `imperial` (Fahrenheit)
- `appid` - Your OpenWeatherMap API key

For more details, visit [OpenWeatherMap API Documentation](https://openweathermap.org/api)

## Features Coming Soon

- [ ] Weather alerts and warnings
- [ ] Hourly weather breakdown
- [ ] Air quality index (AQI)
- [ ] UV index information
- [ ] Sunrise/sunset times
- [ ] Weather history
- [ ] Multiple unit toggles (km/h vs mph, etc.)
- [ ] Dark/Light theme toggle
- [ ] Weather maps
- [ ] Social sharing

## Troubleshooting

### "Please set your OpenWeatherMap API key"
- **Solution:** Make sure you've replaced `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key in `script.js`

### "City not found"
- **Solution:** Try searching with a more specific city name, including the country code (e.g., "London, UK")

### Geolocation not working
- **Solution:** 
  - Check if you've allowed location access in your browser settings
  - HTTPS is required for secure geolocation (http works on localhost)
  - Check browser console for error messages

### API rate limit exceeded
- **Solution:** The free OpenWeatherMap plan has rate limits. Wait a few minutes before making more requests.

## API Free Tier Limitations

- Limited to 60 API calls per minute
- Weather data updates every 10 minutes
- Up to 5-day forecast
- Weather history not available on free plan

## Browser Compatibility

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE 11 (limited support)

## Performance Tips

1. **Cache favorites** - Favorites are stored locally to reduce API calls
2. **Geolocation** - First search caches the location
3. **Forecast data** - Only fetches when needed

## Security Notes

- API keys should never be exposed in production code
- Consider using a backend proxy for production deployments
- Never commit your API key to version control

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [OpenWeatherMap API Documentation](https://openweathermap.org/api)
3. Open an issue on GitHub

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather data API
- [Font Awesome](https://fontawesome.com/) for beautiful icons
- Weather icons from [OpenWeatherMap Icon Set](https://openweathermap.org/weather-conditions)

## Author

Weather Dashboard © 2024 | Built with ❤️

---

**Ready to use?** Don't forget to add your OpenWeatherMap API key to `script.js` before running the application!
