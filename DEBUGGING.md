# Debugging Guide

## Issue: Per-page selection not working properly

If you're experiencing issues where the per-page selection doesn't change the number of results displayed, follow these debugging steps:

### Step 1: Open Browser Console

1. Open your browser's Developer Tools:
   - **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - **Firefox**: Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
   - **Safari**: Enable Developer menu in Preferences, then press `Cmd+Option+C`

2. Click on the **Console** tab

### Step 2: Perform a Search

1. Select a per-page option (10, 15, 20, or 30)
2. Enter a search term (e.g., "nature")
3. Click the Search button
4. Watch the console for debug messages

### Step 3: Check Console Output

You should see messages like:
```
🔍 Searching for "nature" (page 1, 15 per page)...
📋 Selected perPage value: 15
📡 API Request: https://api.unsplash.com/search/photos?query=nature&page=1&per_page=15
📊 API Response: 15 photos returned (requested 15)
```

### Common Issues and Solutions

#### Issue 1: API Key Not Configured
**Symptoms:**
- Only 3 photos are shown regardless of selection
- Console shows: "⚠️ Unsplash API key not configured"

**Solution:**
1. Follow [API_SETUP.md](API_SETUP.md) to get and configure your Unsplash API key
2. Without an API key, the app runs in demo mode with only 3 sample photos

#### Issue 2: API Returns Fewer Photos Than Requested
**Symptoms:**
- Console shows: "📊 API Response: 8 photos returned (requested 15)"
- You get fewer photos than selected

**Possible Causes:**
1. **Search query has limited results** - Some search terms have fewer available photos
2. **Last page of results** - If you're on the last page, there might be fewer photos remaining

**Solution:**
- Try a more common search term (e.g., "sunset", "nature", "city")
- Check if you're on the last page of results

#### Issue 3: Unsplash API Rate Limit
**Symptoms:**
- Error message: "403 Forbidden" or rate limit exceeded
- No photos are returned

**Solution:**
- Free tier allows 50 requests per hour
- Wait for the rate limit to reset (check your Unsplash dashboard)
- Consider reducing search frequency

#### Issue 4: Selection Not Applied
**Symptoms:**
- Console shows different value than you selected
- Per-page dropdown doesn't change anything

**Solution:**
1. Make sure JavaScript is enabled in your browser
2. Check if there are any JavaScript errors in the console
3. Try refreshing the page (F5)
4. Clear browser cache (Ctrl+Shift+Delete)

### Step 4: Verify Unsplash API Limits

Unsplash API has the following limits:
- **Minimum per_page**: 1
- **Maximum per_page**: 30
- **Default per_page**: 10

If you request more than 30, the API automatically limits it to 30.

### Step 5: Test with Different Searches

Try these test searches to verify the functionality:

1. **Popular search term** (should return full results):
   - Search: "nature"
   - Per page: 20
   - Expected: 20 photos

2. **Specific search term** (might return fewer):
   - Search: "purple butterfly macro photography"
   - Per page: 20
   - Expected: Fewer than 20 photos (limited availability)

3. **Very common term** (should return full results):
   - Search: "city"
   - Per page: 30
   - Expected: 30 photos

### Additional Debugging

#### Check Network Request

1. In Developer Tools, go to the **Network** tab
2. Perform a search
3. Look for a request to `api.unsplash.com`
4. Click on the request to see details
5. Check the **Query String Parameters** section:
   - Verify `per_page` parameter value
   - Verify `page` parameter value

#### Check Response

1. In the same Network request details
2. Go to the **Response** tab
3. Look at the JSON response
4. Check the `results` array length
5. Compare with the `total` value

### Still Having Issues?

If you've followed all steps and still experiencing issues:

1. **Take screenshots** of:
   - The console output
   - The Network tab showing the API request
   - The actual page with the selection dropdown

2. **Provide information**:
   - Browser name and version
   - Operating system
   - Selected per-page value
   - Search term used
   - Number of photos actually displayed

3. **Check known limitations**:
   - Unsplash API free tier: 50 requests/hour
   - Some search terms have limited photos
   - Maximum 30 photos per request (API limitation)

## Quick Checklist

- [ ] Browser Developer Tools opened
- [ ] Console tab visible
- [ ] API key configured (check console for warnings)
- [ ] Selected per-page value from dropdown
- [ ] Performed search with common term (e.g., "nature")
- [ ] Checked console output for debug messages
- [ ] Verified API request in Network tab
- [ ] Confirmed no JavaScript errors in console
- [ ] Not hitting API rate limit
- [ ] Using a search term with enough available photos

## Understanding the Results

Remember:
- **Total photos for query** might be less than requested per page
- **Last page** will show remaining photos (could be less than per page)
- **API limitation**: Maximum 30 per page
- **Demo mode**: Only 3 photos (no API key configured)

## Contact Information

For more help:
- Check [API_SETUP.md](API_SETUP.md) for API configuration
- Review [README.md](README.md) for general information
- Visit [Unsplash API Documentation](https://unsplash.com/documentation)
