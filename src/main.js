// State management
let animeList = [];
let page = 1;
let isFetching = false;
let hasNextPage = true;
let selectedGenres = [];
let selectedType = '';
let selectedStatus = '';
let selectedSort = 'score';
let selectedSortOrder = 'desc'; 
let searchQuery = '';
let yearMin = 1960;
let yearMax = new Date().getFullYear();
let ratingMin = 0;
let ratingMax = 10;
let viewMode = 'grid';
let genres = [];
let isFilterPanelActive = false;
let isDarkTheme = localStorage.getItem('darkTheme') === 'true';
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

// DOM Elements
const body = document.body;
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');
const filterPanel = document.getElementById('filterPanel');
const filterToggle = document.getElementById('filterToggle');
const closeFilters = document.getElementById('closeFilters');
const genreSelect = document.getElementById('genreSelect');
const genreOptions = document.getElementById('genreOptions');
const selectedGenresContainer = document.getElementById('selectedGenres');
const typeSelect = document.getElementById('typeSelect');
const statusSelect = document.getElementById('statusSelect');
const sortSelect = document.getElementById('sortSelect');
const sortOrderSelect = document.getElementById('sortOrderSelect');
const yearMinInput = document.getElementById('yearMinInput');
const yearMaxInput = document.getElementById('yearMaxInput');
const yearMinDisplay = document.getElementById('yearMin');
const yearMaxDisplay = document.getElementById('yearMax');
const ratingMinInput = document.getElementById('ratingMinInput');
const ratingMaxInput = document.getElementById('ratingMaxInput');
const ratingMinDisplay = document.getElementById('ratingMin');
const ratingMaxDisplay = document.getElementById('ratingMax');
const resetFilters = document.getElementById('resetFilters');
const applyFilters = document.getElementById('applyFilters');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const activeFilters = document.getElementById('activeFilters');
const activeFiltersScroll = document.querySelector('.active-filters-scroll');
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');
const resultsCount = document.getElementById('resultsCount');
const animeGrid = document.getElementById('animeGrid');
const loadingContainer = document.getElementById('loadingContainer');
const noResults = document.getElementById('noResults');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const toTopButton = document.getElementById('toTopButton');
const themeToggle = document.getElementById('themeToggle');

// Modal elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalTitleJp = document.getElementById('modalTitleJp');
const modalImage = document.getElementById('modalImage');
const modalSynopsis = document.getElementById('modalSynopsis');
const modalType = document.getElementById('modalType');
const modalScore = document.getElementById('modalScore');
const modalStatus = document.getElementById('modalStatus');
const modalEpisodes = document.getElementById('modalEpisodes');
const modalSeason = document.getElementById('modalSeason');
const modalYear = document.getElementById('modalYear');
const modalStudios = document.getElementById('modalStudios');
const modalSource = document.getElementById('modalSource');
const modalRating = document.getElementById('modalRating');
const modalDuration = document.getElementById('modalDuration');
const modalGenres = document.getElementById('modalGenres');
const modalCharacters = document.getElementById('modalCharacters');
const modalStaff = document.getElementById('modalStaff');
const modalExternalLink = document.getElementById('modalExternalLink');
const modalAddToFavorites = document.getElementById('modalAddToFavorites');
const closeModal = document.getElementById('closeModal');
const tabButtons = document.querySelectorAll('.tab-button');

// Initialize theme
if (isDarkTheme) {
  body.classList.add('dark-theme');
}

// Initialize view mode
if (localStorage.getItem('viewMode') === 'list') {
  viewMode = 'list';
  animeGrid.classList.add('list-view');
  gridView.classList.remove('active');
  listView.classList.add('active');
}

// Initialize particles
initParticles();

// Event Listeners
window.addEventListener('load', init);
window.addEventListener('scroll', handleScroll);
window.addEventListener('mousemove', updateCursor);
document.addEventListener('click', handleClick);

// Filter panel events
filterToggle.addEventListener('click', toggleFilterPanel);
closeFilters.addEventListener('click', closeFilterPanel);
applyFilters.addEventListener('click', applyFilterChanges);
resetFilters.addEventListener('click', resetAllFilters);
clearFiltersBtn.addEventListener('click', resetAllFilters);

// Range slider events
yearMinInput.addEventListener('input', updateYearRange);
yearMaxInput.addEventListener('input', updateYearRange);
ratingMinInput.addEventListener('input', updateRatingRange);
ratingMaxInput.addEventListener('input', updateRatingRange);

// Search events
searchInput.addEventListener('input', debounce(handleSearch, 500));
searchClear.addEventListener('click', clearSearch);

// View mode events
gridView.addEventListener('click', () => setViewMode('grid'));
listView.addEventListener('click', () => setViewMode('list'));

// Modal events
closeModal.addEventListener('click', hideModal);
modal.querySelector('.modal-backdrop').addEventListener('click', hideModal);
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    setActiveTab(tab);
  });
});
modalAddToFavorites.addEventListener('click', toggleFavorite);

// To top button events
toTopButton.addEventListener('click', scrollToTop);
window.addEventListener('scroll', toggleToTopButton);

// Theme toggle event
themeToggle.addEventListener('click', toggleTheme);

// Initialize the app
async function init() {
  await fetchGenres();
  initializeFilters();
  updateActiveFilters();
  await fetchAnime();

  // Add keyboard event listener for Escape key to close modal and filter panel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!modal.classList.contains('hidden')) {
        hideModal();
      } else if (isFilterPanelActive) {
        closeFilterPanel();
      }
    }
  });
}

// Initialize particles background
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Create particles
  function createParticles() {
    particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: isDarkTheme ? `hsla(${Math.random() * 60 + 240}, 70%, 70%, ${Math.random() * 0.3 + 0.1})` 
                           : `hsla(${Math.random() * 60 + 240}, 80%, 60%, ${Math.random() * 0.3 + 0.1})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        directionChangeTime: Math.random() * 200 + 50
      });
    }
  }
  
  createParticles();
  
  // Animate particles
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
      }
      
      // Randomly change direction
      if (Math.random() * 1000 < particle.directionChangeTime) {
        particle.speedX = Math.random() * 0.5 - 0.25;
        particle.speedY = Math.random() * 0.5 - 0.25;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    
    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = isDarkTheme 
            ? `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})` 
            : `rgba(0, 0, 0, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
}

// Custom cursor
function updateCursor(e) {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  
  cursorBlur.style.left = `${e.clientX}px`;
  cursorBlur.style.top = `${e.clientY}px`;
  
  // Add clickable class to interactive elements
  const target = e.target;
  const isClickable = target.tagName === 'BUTTON' || 
                      target.tagName === 'A' || 
                      target.tagName === 'INPUT' || 
                      target.tagName === 'SELECT' ||
                      target.closest('.anime-card') ||
                      target.closest('.option-item') ||
                      target.closest('.filter-tag') ||
                      target.closest('.genre-tag');
  
  if (isClickable) {
    cursor.classList.add('clickable');
    cursorBlur.classList.add('clickable');
  } else {
    cursor.classList.remove('clickable');
    cursorBlur.classList.remove('clickable');
  }
}

// Handle click events
function handleClick(e) {
  // Add ripple effect
  const target = e.target;
  
  if (target.classList.contains('button') || 
      target.classList.contains('icon-button') || 
      target.classList.contains('view-button')) {
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    target.appendChild(ripple);
    
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    
    ripple.classList.add('active');
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Handle genre select
  if (target.closest('#genreSelect') || target.closest('#genreOptions')) {
    if (target.closest('#genreSelect')) {
      genreOptions.classList.toggle('active');
      genreSelect.classList.toggle('active');
    }
    
    if (target.closest('.option-item')) {
      const genreId = target.closest('.option-item').dataset.value;
      toggleGenre(genreId);
    }
  } else {
    genreOptions.classList.remove('active');
    genreSelect.classList.remove('active');
  }
}

// Initialize filters
function initializeFilters() {
  // Set range inputs
  yearMinInput.value = yearMin;
  yearMaxInput.value = yearMax;
  yearMinDisplay.textContent = yearMin;
  yearMaxDisplay.textContent = yearMax;
  
  ratingMinInput.value = ratingMin;
  ratingMaxInput.value = ratingMax;
  ratingMinDisplay.textContent = ratingMin;
  ratingMaxDisplay.textContent = ratingMax;
  
  updateRangeSliders();

  updateGenreSelection();
}

// Update year range
function updateYearRange() {
  yearMin = parseInt(yearMinInput.value);
  yearMax = parseInt(yearMaxInput.value);
  
  // Ensure min doesn't exceed max
  if (yearMin > yearMax) {
    if (this === yearMinInput) {
      yearMin = yearMax;
      yearMinInput.value = yearMin;
    } else {
      yearMax = yearMin;
      yearMaxInput.value = yearMax;
    }
  }
  
  yearMinDisplay.textContent = yearMin;
  yearMaxDisplay.textContent = yearMax;
  
  updateRangeSliders();
}

// Update rating range
function updateRatingRange() {
  ratingMin = parseFloat(ratingMinInput.value);
  ratingMax = parseFloat(ratingMaxInput.value);
  
  // Ensure min doesn't exceed max
  if (ratingMin > ratingMax) {
    if (this === ratingMinInput) {
      ratingMin = ratingMax;
      ratingMinInput.value = ratingMin;
    } else {
      ratingMax = ratingMin;
      ratingMaxInput.value = ratingMax;
    }
  }
  
  ratingMinDisplay.textContent = ratingMin;
  ratingMaxDisplay.textContent = ratingMax;
  
  updateRangeSliders();
}

// Update range sliders visual
function updateRangeSliders() {
  // Year range
  const yearRange = document.querySelector('#yearMinInput')
  .closest('.range-slider')
  .querySelector('.range-progress');
  const yearMinPercent = ((yearMin - 1960) / (new Date().getFullYear() - 1960)) * 100;
  const yearMaxPercent = ((yearMax - 1960) / (new Date().getFullYear() - 1960)) * 100;
  yearRange.style.left = `${yearMinPercent}%`;
  yearRange.style.width = `${yearMaxPercent - yearMinPercent}%`;
  
  // Rating range
  const ratingRange = document.querySelector('#ratingMinInput')
  .closest('.range-slider')
  .querySelector('.range-progress');
  const ratingMinPercent = (ratingMin / 10) * 100;
  const ratingMaxPercent = (ratingMax / 10) * 100;
  ratingRange.style.left = `${ratingMinPercent}%`;
  ratingRange.style.width = `${ratingMaxPercent - ratingMinPercent}%`;
}

// Toggle genre selection
function toggleGenre(genreId) {
  const index = selectedGenres.indexOf(genreId);
  
  if (index === -1) {
    selectedGenres.push(genreId);
  } else {
    selectedGenres.splice(index, 1);
  }
  
  updateGenreSelection();
}

// Update genre selection UI
function updateGenreSelection() {
  // Update option items
  const optionItems = genreOptions.querySelectorAll('.option-item');
  optionItems.forEach(item => {
    const genreId = item.dataset.value;
    if (selectedGenres.includes(genreId)) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });
  
  // Update selected genres display
  selectedGenresContainer.innerHTML = '';
  
  if (selectedGenres.length === 0) {
    const placeholder = document.createElement('span');
    placeholder.textContent = 'Выберите жанры';
    placeholder.classList.add('placeholder');
    selectedGenresContainer.appendChild(placeholder);
  } else {
    selectedGenres.forEach(genreId => {
      const genre = genres.find(g => g.mal_id.toString() === genreId);
      if (genre) {
        const selectedOption = document.createElement('div');
        selectedOption.classList.add('selected-option');
        selectedOption.innerHTML = `
          ${genre.name}
          <button class="remove-option" data-genre-id="${genreId}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        `;
        selectedGenresContainer.appendChild(selectedOption);
        
        // Add event listener to remove button
        const removeButton = selectedOption.querySelector('.remove-option');
        removeButton.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleGenre(genreId);
        });
      }
    });
  }
}

// Toggle filter panel
function toggleFilterPanel() {
  isFilterPanelActive = !isFilterPanelActive;
  filterPanel.classList.toggle('active', isFilterPanelActive);
  document.body.style.overflow = isFilterPanelActive ? 'hidden' : '';
}

// Close filter panel
function closeFilterPanel() {
  isFilterPanelActive = false;
  filterPanel.classList.remove('active');
  document.body.style.overflow = '';
}

// Apply filter changes
function applyFilterChanges() {
  selectedType = typeSelect.value;
  selectedStatus = statusSelect.value;
  selectedSort = sortSelect.value;
  selectedSortOrder = sortOrderSelect.value;
  
  closeFilterPanel();
  updateActiveFilters();
  resetAndFetch();
}

// Update active filters display
function updateActiveFilters() {
  activeFiltersScroll.innerHTML = '';
  let hasActiveFilters = false;
  
  // Add search filter
  if (searchQuery) {
    addFilterTag('Поиск', searchQuery);
    hasActiveFilters = true;
  }
  
  // Add genre filters
  if (selectedGenres.length > 0) {
    selectedGenres.forEach(genreId => {
      const genre = genres.find(g => g.mal_id.toString() === genreId);
      if (genre) {
        addFilterTag('Жанр', genre.name, genreId);
        hasActiveFilters = true;
      }
    });
  }
  
  // Add type filter
  if (selectedType) {
    addFilterTag('Тип', typeSelect.options[typeSelect.selectedIndex].text, 'type');
    hasActiveFilters = true;
  }
  
  // Add status filter
  if (selectedStatus) {
    addFilterTag('Статус', statusSelect.options[statusSelect.selectedIndex].text, 'status');
    hasActiveFilters = true;
  }
  
  // Add year range filter
  if (yearMin > 1960 || yearMax < new Date().getFullYear()) {
    addFilterTag('Год', `${yearMin} - ${yearMax}`, 'year');
    hasActiveFilters = true;
  }
  
  // Add rating range filter
  if (ratingMin > 0 || ratingMax < 10) {
    addFilterTag('Рейтинг', `${ratingMin} - ${ratingMax}`, 'rating');
    hasActiveFilters = true;
  }
  
  // Add sort filter
  if (selectedSort !== 'score' || selectedSortOrder !== 'desc') {
    const sortText = sortSelect.options[sortSelect.selectedIndex].text; 
    const orderText = selectedSortOrder === 'desc' ? '↓' : '↑';
    addFilterTag('Сортировка', `${sortText} ${orderText}`, 'sort');
    hasActiveFilters = true;
  }
  
  // Show/hide active filters container
  activeFilters.style.display = hasActiveFilters ? 'block' : 'none';
}

// Add filter tag
function addFilterTag(label, value, id) {
  const filterTag = document.createElement('div');
  filterTag.classList.add('filter-tag');
  filterTag.innerHTML = `
    <span class="filter-tag-label">${label}:</span>
    <span class="filter-tag-value">${value}</span>
    <button class="filter-tag-remove" data-filter-id="${id}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;
  activeFiltersScroll.appendChild(filterTag);
  
  // Add event listener to remove button
  const removeButton = filterTag.querySelector('.filter-tag-remove');
  removeButton.addEventListener('click', () => {
    removeFilter(id);
  });
}

// Remove filter
function removeFilter(id) {
  if (id === 'type') {
    selectedType = '';
    typeSelect.value = '';
  } else if (id === 'status') {
    selectedStatus = '';
    statusSelect.value = '';
  } else if (id === 'year') {
    yearMin = 1960;
    yearMax = new Date().getFullYear();
    yearMinInput.value = yearMin;
    yearMaxInput.value = yearMax;
    yearMinDisplay.textContent = yearMin;
    yearMaxDisplay.textContent = yearMax;
    updateRangeSliders();
  } else if (id === 'rating') {
    ratingMin = 0;
    ratingMax = 10;
    ratingMinInput.value = ratingMin;
    ratingMaxInput.value = ratingMax;
    ratingMinDisplay.textContent = ratingMin;
    ratingMaxDisplay.textContent = ratingMax;
    updateRangeSliders();
  } else if (id === 'sort') {
    selectedSort = 'score';
    selectedSortOrder = 'desc';
    sortSelect.value = selectedSort;
    sortOrderSelect.value = selectedSortOrder;
  } else if (typeof id === 'string' && id.match(/^\d+$/)) {
    // Remove genre
    const index = selectedGenres.indexOf(id);
    if (index !== -1) {
      selectedGenres.splice(index, 1);
      updateGenreSelection();
    }
  }
  
  updateActiveFilters();
  resetAndFetch();
}

// Reset all filters
function resetAllFilters() {
  selectedGenres = [];
  selectedType = '';
  selectedStatus = '';
  selectedSort = 'score';
  selectedSortOrder = 'desc';
  yearMin = 1960;
  yearMax = new Date().getFullYear();
  ratingMin = 0;
  ratingMax = 10;
  searchQuery = '';
  
  // Reset UI
  typeSelect.value = '';
  statusSelect.value = '';
  sortSelect.value = selectedSort;
  sortOrderSelect.value = selectedSortOrder;
  yearMinInput.value = yearMin;
  yearMaxInput.value = yearMax;
  yearMinDisplay.textContent = yearMin;
  yearMaxDisplay.textContent = yearMax;
  ratingMinInput.value = ratingMin;
  ratingMaxInput.value = ratingMax;
  ratingMinDisplay.textContent = ratingMin;
  ratingMaxDisplay.textContent = ratingMax;
  searchInput.value = '';
  
  updateRangeSliders();
  updateGenreSelection();
  updateActiveFilters();
  closeFilterPanel();
  resetAndFetch();
}

// Handle search
function handleSearch() {
  searchQuery = searchInput.value.trim();
  updateActiveFilters();
  resetAndFetch();
}

// Clear search
function clearSearch() {
  searchInput.value = '';
  searchQuery = '';
  updateActiveFilters();
  resetAndFetch();
}

// Set view mode
function setViewMode(mode) {
  viewMode = mode;
  localStorage.setItem('viewMode', mode);
  
  if (mode === 'grid') {
    animeGrid.classList.remove('list-view');
    gridView.classList.add('active');
    listView.classList.remove('active');
  } else {
    animeGrid.classList.add('list-view');
    gridView.classList.remove('active');
    listView.classList.add('active');
  }
}

// Reset and fetch new data
function resetAndFetch() {
  animeList = [];
  animeGrid.innerHTML = '';
  page = 1;
  hasNextPage = true;
  fetchAnime();
}

// Handle scroll for infinite loading
function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isFetching && hasNextPage) {
    page++;
    fetchAnime();
  }
}

// Toggle to top button visibility
function toggleToTopButton() {
  if (window.scrollY > 500) {
    toTopButton.classList.add('visible');
  } else {
    toTopButton.classList.remove('visible');
  }
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Toggle theme
function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  body.classList.toggle('dark-theme', isDarkTheme);
  localStorage.setItem('darkTheme', isDarkTheme);
  
  // Recreate particles for new theme
  initParticles();
}

// Fetch genres from API
async function fetchGenres() {
  try {
    const res = await fetch('https://api.jikan.moe/v4/genres/anime');
    const data = await res.json();
    genres = data.data;
    
    // Populate genre options
    genreOptions.innerHTML = '';
    genres.forEach((genre) => {
      const option = document.createElement('div');
      option.classList.add('option-item');
      option.dataset.value = genre.mal_id;
      option.innerHTML = `
        <div class="option-checkbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="option-label">${genre.name}</div>
      `;
      genreOptions.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
    showErrorMessage('Не удалось загрузить жанры. Пожалуйста, попробуйте позже.');
  }
}

// Fetch anime from API
async function fetchAnime() {
  if (isFetching) return;
  
  isFetching = true;
  showLoading();
  
  try {
    const url = new URL('https://api.jikan.moe/v4/anime');
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', '24');
    url.searchParams.set('order_by', selectedSort);
    url.searchParams.set('sort', selectedSortOrder);
    
    if (selectedGenres.length > 0) url.searchParams.set('genres', selectedGenres.join(','));
    if (selectedType) url.searchParams.set('type', selectedType);
    if (selectedStatus) url.searchParams.set('status', selectedStatus);
    if (searchQuery) url.searchParams.set('q', searchQuery);
    
    // Year range
    if (yearMin > 1960) url.searchParams.set('start_date', `${yearMin}-01-01`);
    if (yearMax < new Date().getFullYear()) url.searchParams.set('end_date', `${yearMax}-12-31`);
    
    // Rating range (min_score parameter only available in API)
    if (ratingMin > 0) url.searchParams.set('min_score', ratingMin.toString());
    if (ratingMin < 10) url.searchParams.set('max_score', ratingMax.toString());
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Filter by max rating (not available in API)
    let filteredData = data.data;
    if (ratingMax < 10) {
      filteredData = filteredData.filter(anime => !anime.score || anime.score <= ratingMax);
    }
    
    if (filteredData.length === 0) {
      hasNextPage = false;
      if (page === 1) {
        showNoResults();
      }
    } else {
      renderAnimeCards(filteredData);
      hasNextPage = data.pagination.has_next_page;
      
      // Update results count
      const totalCount = data.pagination.items.total;
      resultsCount.querySelector('span').textContent = totalCount;
    }
  } catch (error) {
    console.error('Error fetching anime:', error);
    showErrorMessage('Не удалось загрузить аниме. Пожалуйста, попробуйте позже.');
  } finally {
    isFetching = false;
    hideLoading();
  }
}

// Render anime cards
function renderAnimeCards(animeData) {
  noResults.classList.add('hidden');
  
  animeData.forEach((anime, index) => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.style.animationDelay = `${0.05 * (index % 12)}s`;
    
    // Get year from aired date if available
    const year = anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 'N/A';
    
    // Create different card layout based on view mode
    if (viewMode === 'list') {
      card.innerHTML = `
        <div class="card-image">
          <img src="${anime.images.jpg.large_image_url || anime.images.jpg.image_url}" alt="${anime.title}" loading="lazy" />
        </div>
        <div class="card-content">
          <h3 class="card-title">${anime.title}</h3>
          <div class="card-info">
            <div class="card-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
              </svg>
              ${anime.type || 'N/A'}
            </div>
            <div class="card-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${year}
            </div>
            ${anime.score ? `
              <div class="card-info-item card-score">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${anime.score}
              </div>
            ` : ''}
            <div class="card-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${anime.episodes ? `${anime.episodes} эп.` : 'N/A'}
            </div>
          </div>
          <p class="card-synopsis">${anime.synopsis || 'Описание отсутствует'}</p>
          <div class="card-genres">
            ${anime.genres?.slice(0, 3).map(genre => `<span class="card-genre">${genre.name}</span>`).join('') || ''}
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="card-image">
          <img src="${anime.images.jpg.large_image_url || anime.images.jpg.image_url}" alt="${anime.title}" loading="lazy" />
          <div class="card-overlay"></div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${anime.title}</h3>
          <div class="card-info">
            <div class="card-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
              </svg>
              ${anime.type || 'N/A'}
            </div>
            <div class="card-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${year}
            </div>
            ${anime.score ? `
              <div class="card-info-item card-score">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${anime.score}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }
    
    card.addEventListener('click', () => showAnimeDetail(anime));
    animeGrid.appendChild(card);
  });
  
  animeList = [...animeList, ...animeData];
}

// Show anime detail in modal
function showAnimeDetail(anime) {
  // Set modal content
  modalTitle.textContent = anime.title;
  modalTitleJp.textContent = anime.title_japanese || '';
  modalImage.src = anime.images.jpg.large_image_url || anime.images.jpg.image_url;
  modalImage.alt = anime.title;
  modalSynopsis.textContent = anime.synopsis || 'Описание отсутствует';
  modalType.textContent = anime.type || 'N/A';
  modalScore.textContent = anime.score ? anime.score.toFixed(2) : 'N/A';
  modalStatus.textContent = anime.status || 'N/A';
  modalEpisodes.textContent = anime.episodes || 'N/A';
  
  // Season and year
  const year = anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 'N/A';
  modalYear.textContent = year;
  modalSeason.textContent = anime.season ? `${capitalizeFirstLetter(anime.season)} ${year}` : 'N/A';
  
  // Studios
  modalStudios.textContent = anime.studios?.length > 0 
    ? anime.studios.map(studio => studio.name).join(', ') 
    : 'N/A';
  
  // Source and rating
  modalSource.textContent = anime.source || 'N/A';
  modalRating.textContent = anime.rating || 'N/A';
  
  // Duration
  modalDuration.textContent = anime.duration || 'N/A';
  
  // Genres
  modalGenres.innerHTML = '';
  if (anime.genres?.length > 0) {
    anime.genres.forEach(genre => {
      const genreTag = document.createElement('span');
      genreTag.className = 'genre-tag';
      genreTag.textContent = genre.name;
      modalGenres.appendChild(genreTag);
    });
  } else {
    modalGenres.textContent = 'Жанры не указаны';
  }
  
  // External link
  modalExternalLink.href = anime.url || '#';
  
  // Favorites button
  const isFavorite = favorites.some(fav => fav.mal_id === anime.mal_id);
  modalAddToFavorites.innerHTML = isFavorite ? `
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
    Удалить из избранного
  ` : `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
    Добавить в избранное
  `;
  modalAddToFavorites.dataset.animeId = anime.mal_id;
  
  // Reset tabs
  setActiveTab('info');
  
  // Fetch characters and staff
  fetchCharacters(anime.mal_id);
  fetchStaff(anime.mal_id);
  
  // Show modal with animation
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  
  // Focus on close button for accessibility
  setTimeout(() => {
    closeModal.focus();
  }, 100);
}

// Fetch characters
async function fetchCharacters(animeId) {
  modalCharacters.innerHTML = `
    <div class="loading-placeholder">
      <div class="loading-circle small"></div>
      <p>Загрузка персонажей...</p>
    </div>
  `;
  
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
    const data = await res.json();
    
    if (data.data.length === 0) {
      modalCharacters.innerHTML = '<p class="no-data">Информация о персонажах отсутствует</p>';
      return;
    }
    
    modalCharacters.innerHTML = '';
    
    // Limit to top 12 characters
    const characters = data.data.slice(0, 12);
    
    characters.forEach(char => {
      const characterCard = document.createElement('div');
      characterCard.className = 'character-card';
      characterCard.innerHTML = `
        <div class="character-image">
          <img src="${char.character.images.jpg.image_url}" alt="${char.character.name}" loading="lazy" />
        </div>
        <div class="character-info">
          <div class="character-name">${char.character.name}</div>
          <div class="character-role">${char.role}</div>
        </div>
      `;
      modalCharacters.appendChild(characterCard);
    });
  } catch (error) {
    console.error('Error fetching characters:', error);
    modalCharacters.innerHTML = '<p class="no-data">Не удалось загрузить персонажей</p>';
  }
}

// Fetch staff
async function fetchStaff(animeId) {
  modalStaff.innerHTML = `
    <div class="loading-placeholder">
      <div class="loading-circle small"></div>
      <p>Загрузка информации о создателях...</p>
    </div>
  `;
  
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/staff`);
    const data = await res.json();
    
    if (data.data.length === 0) {
      modalStaff.innerHTML = '<p class="no-data">Информация о создателях отсутствует</p>';
      return;
    }
    
    modalStaff.innerHTML = '';
    
    // Limit to top 12 staff members
    const staff = data.data.slice(0, 12);
    
    staff.forEach(person => {
      const staffCard = document.createElement('div');
      staffCard.className = 'staff-card';
      staffCard.innerHTML = `
        <div class="staff-image">
          <img src="${person.person.images.jpg.image_url}" alt="${person.person.name}" loading="lazy" />
        </div>
        <div class="staff-info">
          <div class="staff-name">${person.person.name}</div>
          <div class="staff-role">${person.positions.join(', ')}</div>
        </div>
      `;
      modalStaff.appendChild(staffCard);
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    modalStaff.innerHTML = '<p class="no-data">Не удалось загрузить информацию о создателях</p>';
  }
}

// Set active tab
function setActiveTab(tabId) {
  // Update tab buttons
  tabButtons.forEach(button => {
    if (button.dataset.tab === tabId) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Update tab panes
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabPanes.forEach(pane => {
    if (pane.id === `${tabId}-tab`) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });
}

// Toggle favorite
function toggleFavorite() {
  const animeId = parseInt(modalAddToFavorites.dataset.animeId);
  const anime = animeList.find(a => a.mal_id === animeId);
  
  if (!anime) return;
  
  const isFavorite = favorites.some(fav => fav.mal_id === animeId);
  
  if (isFavorite) {
    // Remove from favorites
    favorites = favorites.filter(fav => fav.mal_id !== animeId);
    modalAddToFavorites.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      Добавить в избранное
    `;
  } else {
    // Add to favorites
    const favoriteAnime = {
      mal_id: anime.mal_id,
      title: anime.title,
      image_url: anime.images.jpg.image_url,
      type: anime.type,
      score: anime.score
    };
    favorites.push(favoriteAnime);
    modalAddToFavorites.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      Удалить из избранного
    `;
  }
  
  // Save to localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Hide modal
function hideModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = ''; // Restore scrolling
}

// Show loading state
function showLoading() {
  loadingContainer.style.display = 'flex';
  noResults.classList.add('hidden');
}

// Hide loading state
function hideLoading() {
  loadingContainer.style.display = 'none';
}

// Show no results
function showNoResults() {
  noResults.classList.remove('hidden');
  animeGrid.innerHTML = '';
}

// Show error message
function showErrorMessage(message) {
  loadingContainer.style.display = 'flex';
  loadingContainer.innerHTML = `
    <div class="error-message">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>${message}</p>
      <button id="retryButton" class="button secondary">Попробовать снова</button>
    </div>
  `;
  
  // Add event listener to retry button
  const retryButton = document.getElementById('retryButton');
  if (retryButton) {
    retryButton.addEventListener('click', resetAndFetch);
  }
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Debounce function for search input
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}