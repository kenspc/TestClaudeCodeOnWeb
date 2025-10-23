# API Setup Guide

This guide will help you configure the Unsplash API for the Photo Collection app.

## Getting Your Unsplash API Key

### Step 1: Create an Unsplash Developer Account

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Click on **"Register as a developer"** or **"Sign up"** if you don't have an account
3. Fill in your details and create an account

### Step 2: Create a New Application

1. Once logged in, go to [Your Apps](https://unsplash.com/oauth/applications)
2. Click on **"New Application"**
3. Accept the API Terms and Guidelines
4. Fill in the application details:
   - **Application name**: Photo Collection App (or any name you prefer)
   - **Description**: A personal photo search and collection web app
5. Click **"Create Application"**

### Step 3: Get Your Access Key

1. After creating the application, you'll be redirected to your app's page
2. You'll see two keys:
   - **Access Key** (this is what you need)
   - **Secret Key** (not needed for this app)
3. Copy your **Access Key**

### Step 4: Configure the App

1. Open the file `js/search.js` in your text editor
2. Find this line near the top of the file:
   ```javascript
   UNSPLASH_API_KEY: 'YOUR_UNSPLASH_ACCESS_KEY',
   ```
3. Replace `YOUR_UNSPLASH_ACCESS_KEY` with your actual Access Key:
   ```javascript
   UNSPLASH_API_KEY: 'your_actual_access_key_here',
   ```
4. Save the file

### Step 5: Test the App

1. Open `index.html` in your browser
2. Try searching for photos (e.g., "sunset", "nature", "city")
3. If configured correctly, you should see search results from Unsplash

## Usage Limits (Free Tier)

The Unsplash API free tier provides:
- **50 requests per hour**
- **5,000 requests per month**

This is more than enough for personal use and testing.

## Important Notes

### Security Warning

⚠️ **For Production Use**:
- Never commit your API key to public repositories
- Consider using environment variables or backend proxy
- This setup is for educational/personal use only

### Demo Mode

If you don't configure an API key:
- The app will show a few demo photos
- Manual URL input will still work
- Collection features will work normally

## Alternative Free Photo APIs

If you prefer other services, here are some alternatives:

### Pexels API
- Website: https://www.pexels.com/api/
- Free tier: 200 requests per hour
- Easy setup, similar to Unsplash

### Pixabay API
- Website: https://pixabay.com/api/docs/
- Free tier: 5,000 requests per hour
- Requires registration

## Troubleshooting

### Error: "API key not configured"
- Make sure you replaced `YOUR_UNSPLASH_ACCESS_KEY` with your actual key
- Check that there are no extra spaces or quotes
- Refresh the page after saving changes

### Error: "401 Unauthorized"
- Your API key might be incorrect
- Make sure you copied the Access Key (not Secret Key)
- Check if your Unsplash app is still active

### Error: "403 Forbidden"
- You might have exceeded the rate limit
- Wait for an hour and try again
- Check your API usage on the Unsplash dashboard

### Photos not loading
- Check your browser console for errors (F12)
- Make sure you have an internet connection
- Try using demo photos or manual URL input

## Support

For more information:
- [Unsplash API Documentation](https://unsplash.com/documentation)
- [API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines)

## Attribution

When using Unsplash photos, proper attribution is recommended:
- Photo by [Photographer Name] on Unsplash
- This app automatically includes photographer credits
