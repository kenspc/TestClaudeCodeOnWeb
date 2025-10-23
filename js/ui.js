/**
 * UI Module
 * Handles all user interface interactions and rendering
 */

const UIManager = {

  // DOM element references
  elements: {
    // Search tab
    searchResults: null,
    searchPagination: null,
    loadingSpinner: null,
    searchInput: null,
    searchBtn: null,
    perPageSelect: null,

    // Manual URL
    manualUrlInput: null,
    addUrlBtn: null,

    // Collection tab
    collectionResults: null,
    collectionCount: null,
    emptyCollection: null,

    // Username
    userName: null,
    usernameModal: null,
    usernameInput: null,
    saveUsernameBtn: null,

    // Photo modal
    photoModal: null,
    photoModalImage: null,
    photoModalTitle: null,
    photoModalPhotographer: null,
    downloadPhotoBtn: null,
    savePhotoFromModalBtn: null
  },

  // Current photo being previewed
  currentPreviewPhoto: null,

  /**
   * Initialize UI module
   */
  init() {
    this.cacheElements();
    this.attachEventListeners();
  },

  /**
   * Cache DOM elements
   */
  cacheElements() {
    // Search tab
    this.elements.searchResults = document.getElementById('searchResults');
    this.elements.searchPagination = document.getElementById('searchPagination');
    this.elements.loadingSpinner = document.getElementById('loadingSpinner');
    this.elements.searchInput = document.getElementById('searchInput');
    this.elements.searchBtn = document.getElementById('searchBtn');
    this.elements.perPageSelect = document.getElementById('perPageSelect');

    // Manual URL
    this.elements.manualUrlInput = document.getElementById('manualUrlInput');
    this.elements.addUrlBtn = document.getElementById('addUrlBtn');

    // Collection tab
    this.elements.collectionResults = document.getElementById('collectionResults');
    this.elements.collectionCount = document.getElementById('collectionCount');
    this.elements.emptyCollection = document.getElementById('emptyCollection');

    // Username
    this.elements.userName = document.getElementById('userName');
    this.elements.usernameInput = document.getElementById('usernameInput');
    this.elements.saveUsernameBtn = document.getElementById('saveUsernameBtn');

    // Photo modal
    this.elements.photoModalImage = document.getElementById('photoModalImage');
    this.elements.photoModalTitle = document.getElementById('photoModalTitle');
    this.elements.photoModalPhotographer = document.getElementById('photoModalPhotographer');
    this.elements.downloadPhotoBtn = document.getElementById('downloadPhotoBtn');
    this.elements.savePhotoFromModalBtn = document.getElementById('savePhotoFromModalBtn');

    // Bootstrap modals
    this.elements.usernameModal = new bootstrap.Modal(document.getElementById('usernameModal'));
    this.elements.photoModal = new bootstrap.Modal(document.getElementById('photoModal'));
  },

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Username save button
    if (this.elements.saveUsernameBtn) {
      this.elements.saveUsernameBtn.addEventListener('click', () => this.handleSaveUsername());
    }

    // Username input - Enter key
    if (this.elements.usernameInput) {
      this.elements.usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSaveUsername();
        }
      });
    }

    // Photo modal buttons
    if (this.elements.downloadPhotoBtn) {
      this.elements.downloadPhotoBtn.addEventListener('click', () => this.handleDownloadPhoto());
    }

    if (this.elements.savePhotoFromModalBtn) {
      this.elements.savePhotoFromModalBtn.addEventListener('click', () => this.handleSavePhotoFromModal());
    }
  },

  /**
   * Show/hide loading spinner
   */
  showLoading(show = true) {
    if (this.elements.loadingSpinner) {
      this.elements.loadingSpinner.classList.toggle('d-none', !show);
    }
  },

  /**
   * Render search results
   */
  renderSearchResults(photos) {
    if (!this.elements.searchResults) return;

    if (!photos || photos.length === 0) {
      this.elements.searchResults.innerHTML = `
        <div class="col-12 text-center my-5">
          <i class="bi bi-search display-1 text-muted"></i>
          <h4 class="mt-3 text-muted">No photos found</h4>
          <p class="text-muted">Try a different search term</p>
        </div>
      `;
      return;
    }

    this.elements.searchResults.innerHTML = photos.map(photo => this.createPhotoCard(photo)).join('');
  },

  /**
   * Create photo card HTML
   */
  createPhotoCard(photo) {
    const isSaved = StorageManager.isPhotoSaved(photo.url);

    return `
      <div class="col-md-4 col-sm-6">
        <div class="photo-card" onclick="UIManager.showPhotoPreview(${JSON.stringify(photo).replace(/"/g, '&quot;')})">
          <img src="${photo.thumbUrl || photo.url}" alt="${photo.description}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
          <div class="photo-card-overlay">
            <p class="photo-photographer">
              <i class="bi bi-person-circle"></i> ${photo.photographer}
            </p>
            <div class="photo-card-actions">
              <button class="btn btn-sm ${isSaved ? 'btn-secondary' : 'btn-primary'}"
                      onclick="event.stopPropagation(); UIManager.handleSavePhoto(${JSON.stringify(photo).replace(/"/g, '&quot;')})"
                      ${isSaved ? 'disabled' : ''}>
                <i class="bi bi-heart-fill"></i> ${isSaved ? 'Saved' : 'Save'}
              </button>
              <button class="btn btn-sm btn-success" onclick="event.stopPropagation(); UIManager.handleDownloadPhotoFromCard('${photo.downloadUrl || photo.url}', '${photo.description}')">
                <i class="bi bi-download"></i> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Render collection photos
   */
  renderCollection() {
    const photos = StorageManager.getPhotos();

    if (!this.elements.collectionResults || !this.elements.emptyCollection) return;

    // Update collection count badge
    if (this.elements.collectionCount) {
      this.elements.collectionCount.textContent = photos.length;
    }

    // Show empty state or photos
    if (photos.length === 0) {
      this.elements.emptyCollection.classList.remove('d-none');
      this.elements.collectionResults.classList.add('d-none');
      this.elements.collectionResults.innerHTML = '';
      return;
    }

    this.elements.emptyCollection.classList.add('d-none');
    this.elements.collectionResults.classList.remove('d-none');

    this.elements.collectionResults.innerHTML = photos.map(photo => this.createCollectionCard(photo)).join('');
  },

  /**
   * Create collection photo card HTML
   */
  createCollectionCard(photo) {
    const savedDate = new Date(photo.savedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return `
      <div class="col-md-4 col-sm-6">
        <div class="collection-photo-card">
          <img src="${photo.url}" alt="Saved photo" loading="lazy" onclick="UIManager.showPhotoPreview(${JSON.stringify(photo).replace(/"/g, '&quot;')})" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
          <div class="collection-card-footer">
            <div>
              <small class="collection-date">
                <i class="bi bi-calendar"></i> ${savedDate}
              </small>
            </div>
            <button class="btn btn-sm btn-danger" onclick="UIManager.handleRemovePhoto('${photo.id}')">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Render pagination
   */
  renderPagination(paginationInfo) {
    if (!this.elements.searchPagination) return;

    const { currentPage, totalPages, hasPrevPage, hasNextPage } = paginationInfo;

    if (totalPages <= 1) {
      this.elements.searchPagination.innerHTML = '';
      return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
      <li class="page-item ${!hasPrevPage ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="event.preventDefault(); ${hasPrevPage ? 'App.searchPage(' + (currentPage - 1) + ')' : ''}">
          <i class="bi bi-chevron-left"></i> Previous
        </a>
      </li>
    `;

    // Page numbers (show max 5 pages)
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <li class="page-item ${i === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" onclick="event.preventDefault(); App.searchPage(${i})">${i}</a>
        </li>
      `;
    }

    // Next button
    paginationHTML += `
      <li class="page-item ${!hasNextPage ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="event.preventDefault(); ${hasNextPage ? 'App.searchPage(' + (currentPage + 1) + ')' : ''}">
          Next <i class="bi bi-chevron-right"></i>
        </a>
      </li>
    `;

    this.elements.searchPagination.innerHTML = paginationHTML;
  },

  /**
   * Show username modal
   */
  showUsernameModal() {
    if (this.elements.usernameModal) {
      this.elements.usernameModal.show();
    }
  },

  /**
   * Hide username modal
   */
  hideUsernameModal() {
    if (this.elements.usernameModal) {
      this.elements.usernameModal.hide();
    }
  },

  /**
   * Handle save username
   */
  handleSaveUsername() {
    const username = this.elements.usernameInput?.value.trim();

    if (!username) {
      this.elements.usernameInput?.classList.add('is-invalid');
      return;
    }

    this.elements.usernameInput?.classList.remove('is-invalid');

    if (StorageManager.saveUsername(username)) {
      this.updateUsername(username);
      this.hideUsernameModal();
      this.showToast('Welcome, ' + username + '!', 'success');
    }
  },

  /**
   * Update username display
   */
  updateUsername(username) {
    if (this.elements.userName) {
      this.elements.userName.textContent = username || 'Guest';
    }
  },

  /**
   * Show photo preview modal
   */
  showPhotoPreview(photo) {
    this.currentPreviewPhoto = photo;

    if (this.elements.photoModalImage) {
      this.elements.photoModalImage.src = photo.fullUrl || photo.url;
    }

    if (this.elements.photoModalTitle) {
      this.elements.photoModalTitle.textContent = photo.description || 'Photo Preview';
    }

    if (this.elements.photoModalPhotographer) {
      this.elements.photoModalPhotographer.innerHTML = `
        <i class="bi bi-person-circle"></i> Photo by
        ${photo.photographerUrl ? `<a href="${photo.photographerUrl}" target="_blank" rel="noopener">${photo.photographer}</a>` : photo.photographer}
      `;
    }

    if (this.elements.photoModal) {
      this.elements.photoModal.show();
    }
  },

  /**
   * Handle save photo
   */
  handleSavePhoto(photo) {
    if (StorageManager.savePhoto(photo)) {
      this.showToast('Photo saved to collection!', 'success');
      this.renderCollection();

      // Update the button state in search results
      this.renderSearchResults(window.currentSearchResults || []);
    } else {
      this.showToast('Photo is already in collection', 'warning');
    }
  },

  /**
   * Handle save photo from modal
   */
  handleSavePhotoFromModal() {
    if (this.currentPreviewPhoto) {
      this.handleSavePhoto(this.currentPreviewPhoto);
    }
  },

  /**
   * Handle remove photo
   */
  handleRemovePhoto(photoId) {
    if (confirm('Are you sure you want to remove this photo from your collection?')) {
      if (StorageManager.removePhoto(photoId)) {
        this.showToast('Photo removed from collection', 'success');
        this.renderCollection();
      }
    }
  },

  /**
   * Handle download photo from card
   */
  handleDownloadPhotoFromCard(url, filename) {
    this.downloadPhoto(url, filename);
  },

  /**
   * Handle download photo from modal
   */
  handleDownloadPhoto() {
    if (this.currentPreviewPhoto) {
      this.downloadPhoto(
        this.currentPreviewPhoto.downloadUrl || this.currentPreviewPhoto.url,
        this.currentPreviewPhoto.description || 'photo'
      );
    }
  },

  /**
   * Download photo
   */
  async downloadPhoto(url, filename) {
    try {
      this.showToast('Downloading photo...', 'info');

      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${filename.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);

      this.showToast('Photo downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error downloading photo:', error);
      this.showToast('Failed to download photo. Please try right-click and save.', 'danger');
    }
  },

  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
      toastContainer.style.zIndex = '9999';
      document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toastId = `toast_${Date.now()}`;
    const toastHTML = `
      <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);

    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();

    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }

};

// Make UIManager available globally
window.UIManager = UIManager;
