/**
 * Search Module
 * Handles photo search via Unsplash API and manual URL input
 */

const SearchManager = {

  // Unsplash API configuration
  // Get your free API key at: https://unsplash.com/developers
  UNSPLASH_API_KEY: 'YOUR_UNSPLASH_ACCESS_KEY',
  UNSPLASH_API_URL: 'https://api.unsplash.com',

  // Search state
  currentQuery: '',
  currentPage: 1,
  perPage: 12,
  totalPages: 0,
  totalResults: 0,

  /**
   * Initialize search module
   */
  init() {
    // Check if API key is configured
    if (this.UNSPLASH_API_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
      console.warn('⚠️ Unsplash API key not configured. Please add your API key in js/search.js');
      console.info('Get your free API key at: https://unsplash.com/developers');
    }
  },

  /**
   * Search photos using Unsplash API
   */
  async searchPhotos(query, page = 1, perPage = 12) {
    // Validate API key
    if (this.UNSPLASH_API_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
      throw new Error('Please configure your Unsplash API key in js/search.js');
    }

    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty');
    }

    // Unsplash API limits per_page to maximum 30
    perPage = Math.min(Math.max(perPage, 1), 30);

    this.currentQuery = query.trim();
    this.currentPage = page;
    this.perPage = perPage;

    const url = `${this.UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;

    console.log(`📡 API Request: ${url}`);

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Client-ID ${this.UNSPLASH_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      this.totalResults = data.total;
      this.totalPages = data.total_pages;

      console.log(`📊 API Response: ${data.results.length} photos returned (requested ${perPage})`);

      return {
        results: this.formatSearchResults(data.results),
        total: data.total,
        totalPages: data.total_pages,
        currentPage: page
      };

    } catch (error) {
      console.error('Error searching photos:', error);
      throw error;
    }
  },

  /**
   * Format search results to standardized format
   */
  formatSearchResults(results) {
    return results.map(photo => ({
      id: photo.id,
      url: photo.urls.regular,
      thumbUrl: photo.urls.small,
      fullUrl: photo.urls.full,
      downloadUrl: photo.links.download,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      description: photo.description || photo.alt_description || 'Untitled',
      likes: photo.likes,
      color: photo.color
    }));
  },

  /**
   * Get random photos (for initial page load or suggestions)
   */
  async getRandomPhotos(count = 12) {
    if (this.UNSPLASH_API_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
      // Return demo photos if API key not configured
      return this.getDemoPhotos();
    }

    // Unsplash API limits count to maximum 30
    count = Math.min(Math.max(count, 1), 30);

    const url = `${this.UNSPLASH_API_URL}/photos/random?count=${count}`;

    console.log(`📡 Random Photos Request: ${url}`);

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Client-ID ${this.UNSPLASH_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.formatSearchResults(data);

    } catch (error) {
      console.error('Error fetching random photos:', error);
      return this.getDemoPhotos();
    }
  },

  /**
   * Validate photo URL
   */
  isValidPhotoUrl(url) {
    if (!url || typeof url !== 'string') {
      return false;
    }

    // Check if URL is valid
    try {
      new URL(url);
    } catch (error) {
      return false;
    }

    // Check if URL points to an image
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
    const lowerUrl = url.toLowerCase();

    return imageExtensions.some(ext => lowerUrl.includes(ext)) ||
           lowerUrl.includes('unsplash.com') ||
           lowerUrl.includes('pexels.com') ||
           lowerUrl.includes('pixabay.com');
  },

  /**
   * Add photo manually by URL
   */
  addPhotoByUrl(url) {
    if (!this.isValidPhotoUrl(url)) {
      throw new Error('Invalid photo URL. Please provide a valid image URL.');
    }

    return {
      id: `manual_${Date.now()}`,
      url: url,
      thumbUrl: url,
      fullUrl: url,
      downloadUrl: url,
      photographer: 'Manual Upload',
      photographerUrl: '',
      description: 'Manually added photo',
      likes: 0,
      color: '#CCCCCC'
    };
  },

  /**
   * Get demo photos (fallback when API key not configured)
   */
  getDemoPhotos() {
    return [
      {
        id: 'demo_1',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        thumbUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        fullUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
        downloadUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
        photographer: 'Demo Photo',
        photographerUrl: 'https://unsplash.com',
        description: 'Beautiful mountain landscape',
        likes: 0,
        color: '#6B8E9F'
      },
      {
        id: 'demo_2',
        url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
        thumbUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
        fullUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920',
        downloadUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920',
        photographer: 'Demo Photo',
        photographerUrl: 'https://unsplash.com',
        description: 'Sunset over the ocean',
        likes: 0,
        color: '#F4A261'
      },
      {
        id: 'demo_3',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        thumbUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
        fullUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920',
        downloadUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920',
        photographer: 'Demo Photo',
        photographerUrl: 'https://unsplash.com',
        description: 'Forest path in nature',
        likes: 0,
        color: '#2D6A4F'
      }
    ];
  },

  /**
   * Calculate pagination info
   */
  getPaginationInfo() {
    return {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      totalResults: this.totalResults,
      perPage: this.perPage,
      hasNextPage: this.currentPage < this.totalPages,
      hasPrevPage: this.currentPage > 1
    };
  },

  /**
   * Reset search state
   */
  reset() {
    this.currentQuery = '';
    this.currentPage = 1;
    this.totalPages = 0;
    this.totalResults = 0;
  }

};

// Initialize search module
SearchManager.init();

// Make SearchManager available globally
window.SearchManager = SearchManager;
