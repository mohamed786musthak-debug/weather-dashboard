# OpenWeatherMap API Setup Guide

## Getting Your API Key

Follow these steps to get a free API key from OpenWeatherMap:

### Step 1: Visit OpenWeatherMap
1. Go to [OpenWeatherMap Sign Up](https://openweathermap.org/api)
2. Click on "Sign Up" button

### Step 2: Create an Account
1. Fill in your email address
2. Create a password
3. Agree to the terms and conditions
4. Click "Create Account"
5. Verify your email address

### Step 3: Get Your API Key
1. Log in to your account
2. Go to your account settings
3. Click on the "API keys" tab
4. Copy your default API key (you'll see it under "Your API keys")

### Step 4: Add API Key to Weather Dashboard
1. Open `script.js` in a text editor
2. Find this line (around line 2):
   ```javascript
   const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
   ```
3. Replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key:
   ```javascript
   const API_KEY = 'abc123def456ghi789jkl012';
   ```
4. Save the file

### Step 5: Test Your Setup
1. Open `index.html` in your web browser
2. Search for a city (e.g., "London")
3. You should see weather data appear

## API Pricing Plans

### Free Plan (Recommended for this project)
- ✅ Current weather data
- ✅ 5-day forecast
- ✅ 60 API calls per minute
- ✅ 1,000,000 API calls per month
- ❌ Weather alerts
- ❌ Historical data
- Cost: **FREE**

### Professional Plans
- Additional features and higher rate limits
- Visit [OpenWeatherMap Pricing](https://openweathermap.org/price) for details

## Troubleshooting

### Problem: "401 Unauthorized" Error
**Solution:** 
- Check that you've correctly copied your API key
- Make sure there are no extra spaces before or after the key
- Verify the API key is active in your OpenWeatherMap account

### Problem: "429 Too Many Requests" Error
**Solution:**
- You've exceeded the rate limit (60 calls per minute on free plan)
- Wait a few minutes before making new requests
- Reduce the frequency of API calls in your application

### Problem: City search returns "404 Not Found"
**Solution:**
- Try with a more complete city name
- Include the country code (e.g., "Paris, France" instead of just "Paris")
- Check spelling and capitalization

### Problem: API key shows as invalid
**Solution:**
- Newly created API keys can take up to 10 minutes to activate
- Try again in a few minutes
- Regenerate a new API key if the issue persists

## API Endpoints Used

```
Base URL: https://api.openweathermap.org/data/2.5

Current Weather:
GET /weather?q={city}&units=metric&appid={API_KEY}

Forecast:
GET /forecast?q={city}&units=metric&appid={API_KEY}
```

## Rate Limiting

- Free Plan: 60 calls/minute, 1,000,000 calls/month
- Calls reset every minute
- API responses are cached for ~10 minutes

## Best Practices

1. **Never commit API keys** - Use `.gitignore` to exclude sensitive data
2. **Use environment variables** - For production deployments
3. **Implement error handling** - Handle API failures gracefully
4. **Cache responses** - Reduce unnecessary API calls
5. **Monitor usage** - Check your API usage in the dashboard

## Additional Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Current Weather API](https://openweathermap.org/current)
- [Forecast API](https://openweathermap.org/forecast5)
- [API FAQ](https://openweathermap.org/faq)

## Need Help?

- Check your API key is correct
- Verify internet connection
- Check browser console for error messages (F12)
- Visit [OpenWeatherMap Support](https://openweathermap.org/find)
