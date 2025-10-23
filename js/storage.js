/**
 * Storage Module
 * Handles Cookie and LocalStorage operations for user data and photo collections
 */

const StorageManager = {

  // Cookie configuration
  COOKIE_NAME: 'photoCollectionUser',
  COOKIE_EXPIRY_DAYS: 365,

  // LocalStorage keys
  STORAGE_KEY_PHOTOS: 'photoCollection',

  /**
   * Cookie Operations
   */

  // Set a cookie
  setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
  },

  // Get a cookie value
  getCookie(name) {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  },

  // Delete a cookie
  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  },

  /**
   * User Management
   */

  // Save username to cookie
  saveUsername(username) {
    if (!username || username.trim() === '') {
      console.error('Username cannot be empty');
      return false;
    }
    this.setCookie(this.COOKIE_NAME, username.trim(), this.COOKIE_EXPIRY_DAYS);
    return true;
  },

  // Get username from cookie
  getUsername() {
    const username = this.getCookie(this.COOKIE_NAME);
    return username || null;
  },

  // Check if user exists
  hasUser() {
    return this.getUsername() !== null;
  },

  // Clear username (logout)
  clearUsername() {
    this.deleteCookie(this.COOKIE_NAME);
  },

  /**
   * LocalStorage Operations
   */

  // Save data to localStorage
  setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Get data from localStorage
  getLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  // Remove data from localStorage
  removeLocalStorage(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Clear all localStorage data
  clearLocalStorage() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  /**
   * Photo Collection Management
   */

  // Get all saved photos
  getPhotos() {
    const photos = this.getLocalStorage(this.STORAGE_KEY_PHOTOS);
    return photos || [];
  },

  // Save a photo to collection
  savePhoto(photoData) {
    if (!photoData || !photoData.url) {
      console.error('Invalid photo data');
      return false;
    }

    const photos = this.getPhotos();

    // Check if photo already exists
    const exists = photos.some(photo => photo.url === photoData.url);
    if (exists) {
      console.warn('Photo already exists in collection');
      return false;
    }

    // Add photo with metadata
    const newPhoto = {
      id: this.generateId(),
      url: photoData.url,
      photographer: photoData.photographer || 'Unknown',
      photographerUrl: photoData.photographerUrl || '',
      downloadUrl: photoData.downloadUrl || photoData.url,
      savedAt: new Date().toISOString()
    };

    photos.push(newPhoto);
    return this.setLocalStorage(this.STORAGE_KEY_PHOTOS, photos);
  },

  // Remove a photo from collection
  removePhoto(photoId) {
    const photos = this.getPhotos();
    const filteredPhotos = photos.filter(photo => photo.id !== photoId);

    if (filteredPhotos.length === photos.length) {
      console.warn('Photo not found in collection');
      return false;
    }

    return this.setLocalStorage(this.STORAGE_KEY_PHOTOS, filteredPhotos);
  },

  // Check if photo is saved
  isPhotoSaved(photoUrl) {
    const photos = this.getPhotos();
    return photos.some(photo => photo.url === photoUrl);
  },

  // Get photo count
  getPhotoCount() {
    return this.getPhotos().length;
  },

  // Clear all photos
  clearPhotos() {
    return this.setLocalStorage(this.STORAGE_KEY_PHOTOS, []);
  },

  /**
   * Utility Functions
   */

  // Generate unique ID
  generateId() {
    return `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Get storage usage info
  getStorageInfo() {
    const photos = this.getPhotos();
    const photosSize = new Blob([JSON.stringify(photos)]).size;
    const photosSizeKB = (photosSize / 1024).toFixed(2);

    return {
      photoCount: photos.length,
      storageSizeKB: photosSizeKB,
      storageSizeMB: (photosSize / 1024 / 1024).toFixed(2)
    };
  },

  // Export collection data
  exportCollection() {
    return {
      username: this.getUsername(),
      photos: this.getPhotos(),
      exportedAt: new Date().toISOString()
    };
  },

  // Import collection data
  importCollection(data) {
    if (!data || !Array.isArray(data.photos)) {
      console.error('Invalid import data');
      return false;
    }

    if (data.username) {
      this.saveUsername(data.username);
    }

    return this.setLocalStorage(this.STORAGE_KEY_PHOTOS, data.photos);
  }

};

// Make StorageManager available globally
window.StorageManager = StorageManager;
