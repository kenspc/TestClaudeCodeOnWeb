/**
 * Main Application Module
 * Coordinates all modules and handles application logic
 */

const App = {

  // Application state
  currentSearchResults: [],
  isSearching: false,

  /**
   * Initialize application
   */
  init() {
    console.log('🚀 Photo Collection App initializing...');

    // Initialize modules
    UIManager.init();

    // Check if user exists
    this.checkUser();

    // Load collection
    this.loadCollection();

    // Attach event listeners
    this.attachEventListeners();

    // Load random photos on startup (if API configured)
    this.loadRandomPhotos();

    console.log('✅ Photo Collection App initialized successfully!');
  },

  /**
   * Check if user exists, show username modal if not
   */
  checkUser() {
    const username = StorageManager.getUsername();

    if (username) {
      UIManager.updateUsername(username);
      console.log(`👋 Welcome back, ${username}!`);
    } else {
      console.log('👤 New user detected, showing username modal...');
      // Show username modal after a short delay
      setTimeout(() => {
        UIManager.showUsernameModal();
      }, 500);
    }
  },

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.handleSearch());
    }

    // Search input - Enter key
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSearch();
        }
      });
    }

    // Per page select
    const perPageSelect = document.getElementById('perPageSelect');
    if (perPageSelect) {
      perPageSelect.addEventListener('change', () => {
        if (SearchManager.currentQuery) {
          this.handleSearch();
        }
      });
    }

    // Manual URL add button
    const addUrlBtn = document.getElementById('addUrlBtn');
    if (addUrlBtn) {
      addUrlBtn.addEventListener('click', () => this.handleAddManualUrl());
    }

    // Manual URL input - Enter key
    const manualUrlInput = document.getElementById('manualUrlInput');
    if (manualUrlInput) {
      manualUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleAddManualUrl();
        }
      });
    }

    // Collection tab - reload collection when tab is shown
    const collectionTab = document.getElementById('collection-tab');
    if (collectionTab) {
      collectionTab.addEventListener('shown.bs.tab', () => {
        this.loadCollection();
      });
    }

    console.log('✅ Event listeners attached');
  },

  /**
   * Handle search
   */
  async handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const perPageSelect = document.getElementById('perPageSelect');

    if (!searchInput) return;

    const query = searchInput.value.trim();

    if (!query) {
      UIManager.showToast('Please enter a search term', 'warning');
      return;
    }

    const perPage = parseInt(perPageSelect?.value || '12');

    this.performSearch(query, 1, perPage);
  },

  /**
   * Perform search
   */
  async performSearch(query, page = 1, perPage = 12) {
    if (this.isSearching) {
      console.log('⏳ Search already in progress...');
      return;
    }

    this.isSearching = true;
    UIManager.showLoading(true);

    console.log(`🔍 Searching for "${query}" (page ${page}, ${perPage} per page)...`);
    console.log(`📋 Selected perPage value: ${perPage}`);

    try {

      const results = await SearchManager.searchPhotos(query, page, perPage);

      this.currentSearchResults = results.results;
      window.currentSearchResults = results.results; // Make available globally for re-rendering

      UIManager.renderSearchResults(results.results);
      UIManager.renderPagination(SearchManager.getPaginationInfo());

      console.log(`✅ Found ${results.total} photos`);

      if (results.results.length > 0) {
        UIManager.showToast(`Found ${results.total} photos`, 'success');
      } else {
        UIManager.showToast('No photos found. Try a different search term.', 'info');
      }

    } catch (error) {
      console.error('❌ Search error:', error);

      // Check if it's an API key error
      if (error.message.includes('API key')) {
        UIManager.showToast('⚠️ Unsplash API key not configured. Please add your API key in js/search.js', 'danger');

        // Show demo photos instead
        this.showDemoPhotos();
      } else {
        UIManager.showToast('Failed to search photos. Please try again.', 'danger');
      }
    } finally {
      this.isSearching = false;
      UIManager.showLoading(false);
    }
  },

  /**
   * Search specific page
   */
  searchPage(page) {
    const perPageSelect = document.getElementById('perPageSelect');
    const perPage = parseInt(perPageSelect?.value || '12');

    this.performSearch(SearchManager.currentQuery, page, perPage);

    // Scroll to top of results
    document.getElementById('searchResults')?.scrollIntoView({ behavior: 'smooth' });
  },

  /**
   * Load random photos
   */
  async loadRandomPhotos() {
    try {
      console.log('🎲 Loading random photos...');

      const photos = await SearchManager.getRandomPhotos(12);
      this.currentSearchResults = photos;
      window.currentSearchResults = photos;

      UIManager.renderSearchResults(photos);
      UIManager.renderPagination({ currentPage: 1, totalPages: 1, hasPrevPage: false, hasNextPage: false });

      console.log('✅ Random photos loaded');

    } catch (error) {
      console.error('❌ Error loading random photos:', error);
    }
  },

  /**
   * Show demo photos
   */
  showDemoPhotos() {
    const demoPhotos = SearchManager.getDemoPhotos();
    this.currentSearchResults = demoPhotos;
    window.currentSearchResults = demoPhotos;

    UIManager.renderSearchResults(demoPhotos);
    UIManager.renderPagination({ currentPage: 1, totalPages: 1, hasPrevPage: false, hasNextPage: false });

    console.log('ℹ️ Showing demo photos');
  },

  /**
   * Handle add photo by manual URL
   */
  handleAddManualUrl() {
    const manualUrlInput = document.getElementById('manualUrlInput');

    if (!manualUrlInput) return;

    const url = manualUrlInput.value.trim();

    if (!url) {
      UIManager.showToast('Please enter a photo URL', 'warning');
      return;
    }

    try {
      const photo = SearchManager.addPhotoByUrl(url);

      // Save the photo directly to collection
      if (StorageManager.savePhoto(photo)) {
        UIManager.showToast('Photo added to collection!', 'success');
        manualUrlInput.value = '';

        // Reload collection
        this.loadCollection();

        // Show preview
        UIManager.showPhotoPreview(photo);
      } else {
        UIManager.showToast('Photo already exists in collection', 'warning');
      }

    } catch (error) {
      console.error('Error adding manual URL:', error);
      UIManager.showToast(error.message, 'danger');
    }
  },

  /**
   * Load and display collection
   */
  loadCollection() {
    console.log('📚 Loading collection...');
    UIManager.renderCollection();

    const count = StorageManager.getPhotoCount();
    console.log(`✅ Collection loaded (${count} photos)`);
  },

  /**
   * Get storage information
   */
  getStorageInfo() {
    const info = StorageManager.getStorageInfo();
    console.log('💾 Storage Info:', info);
    return info;
  },

  /**
   * Export collection
   */
  exportCollection() {
    const data = StorageManager.exportCollection();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `photo_collection_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

    UIManager.showToast('Collection exported successfully!', 'success');
    console.log('✅ Collection exported');
  },

  /**
   * Import collection
   */
  importCollection(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (StorageManager.importCollection(data)) {
          UIManager.showToast('Collection imported successfully!', 'success');
          this.loadCollection();

          if (data.username) {
            UIManager.updateUsername(data.username);
          }

          console.log('✅ Collection imported');
        } else {
          UIManager.showToast('Failed to import collection', 'danger');
        }

      } catch (error) {
        console.error('Error importing collection:', error);
        UIManager.showToast('Invalid collection file', 'danger');
      }
    };

    reader.readAsText(file);
  },

  /**
   * Clear all data (for testing/debugging)
   */
  clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      StorageManager.clearPhotos();
      StorageManager.clearUsername();

      UIManager.updateUsername('Guest');
      this.loadCollection();
      UIManager.showUsernameModal();

      UIManager.showToast('All data cleared', 'info');
      console.log('🗑️ All data cleared');
    }
  }

};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// Make App available globally for debugging
window.App = App;

// Console welcome message
console.log(`
%c📸 Photo Collection App
%cVersion 1.0.0
%cMade with ❤️ by Claude Code

Available commands:
- App.getStorageInfo()     - View storage usage
- App.exportCollection()   - Export collection as JSON
- App.clearAllData()       - Clear all data (requires confirmation)
`,
'font-size: 20px; font-weight: bold; color: #FFB347',
'font-size: 12px; color: #666',
'font-size: 12px; color: #999'
);
