// Music data
const tracks = [
    {
        id: "1",
        title: "Jason Derulo - Swalla (feat. Nicki Minaj & Ty Dolla $ign)",
        embedUrl: "https://www.youtube.com/embed/NGLxoKOvzu4",
        artist: "Jason Derulo",
        duration: "3:46"
    },
    {
        id: "2",
        title: "Luis Fonsi - Despacito ft. Daddy Yankee",
        embedUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk",
        artist: "Luis Fonsi",
        duration: "4:42"
    },
    {
        id: "3",
        title: "PSY - GANGNAM STYLE",
        embedUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
        artist: "PSY",
        duration: "4:13"
    },
    {
        id: "4",
        title: "Ritviz - Liggi",
        embedUrl: "https://www.youtube.com/embed/6BYIKEH0RCQ",
        artist: "Ritviz",
        duration: "3:28"
    },
    {
        id: "5",
        title: "Coke Studio Bharat | Khalasi | Aditya Gadhvi x Achint",
        embedUrl: "https://www.youtube.com/embed/t7wSjy9Lv-o",
        artist: "Aditya Gadhvi",
        duration: "4:15"
    },
    {
        id: "6",
        title: "Illuminati | Aavesham",
        embedUrl: "https://www.youtube.com/embed/tOM-nWPcR4U",
        artist: "Aavesham",
        duration: "3:52"
    },
    {
        id: "7",
        title: "Aasa Kooda – Thejo Bharathwaj",
        embedUrl: "https://www.youtube.com/embed/a3Ue-LN5B9U",
        artist: "Thejo Bharathwaj",
        duration: "4:01"
    },
    {
        id: "8",
        title: "Achacho - Aranmanai 4",
        embedUrl: "https://www.youtube.com/embed/ijBxe70sd8M",
        artist: "Aranmanai 4",
        duration: "3:33"
    },
    {
        id: "9",
        title: "Chuttamalle - Devara",
        embedUrl: "https://www.youtube.com/embed/GWNrPJyRTcA",
        artist: "Devara",
        duration: "4:18"
    },
    {
        id: "10",
        title: "Ed Sheeran - Shape of You",
        embedUrl: "https://www.youtube.com/embed/JGwWNGJdvx8",
        artist: "Ed Sheeran",
        duration: "3:53"
    },
    {
        id: "11",
        title: "J Balvin, Willy William - Mi Gente",
        embedUrl: "https://www.youtube.com/embed/wnJ6LuUFpMo",
        artist: "J Balvin",
        duration: "3:07"
    },
    {
        id: "12",
        title: "MC Fioti - Bum Bum Tam Tam",
        embedUrl: "https://www.youtube.com/embed/_P7S2lKif-A",
        artist: "MC Fioti",
        duration: "2:49"
    },
    {
        id: "13",
        title: "DJ Snake, Lil Jon - Turn Down for What",
        embedUrl: "https://www.youtube.com/embed/HMUDVMiITOU",
        artist: "DJ Snake",
        duration: "3:36"
    },
    {
        id: "14",
        title: "Vidya Vox - Be Free (Pallivaalu Bhadravattakam)",
        embedUrl: "https://www.youtube.com/embed/eiGdsH1g20k",
        artist: "Vidya Vox",
        duration: "4:25"
    },
    {
        id: "15",
        title: "Manike Mage Hithe – Yohani & Satheeshan",
        embedUrl: "https://www.youtube.com/embed/PgCliOxl41o",
        artist: "Yohani",
        duration: "3:41"
    },
    {
        id: "16",
        title: "Dhanda Nyoliwala - Russian Bandana",
        embedUrl: "https://www.youtube.com/embed/1OAjeECW90E",
        artist: "Dhanda Nyoliwala",
        duration: "3:15"
    },
    {
        id: "17",
        title: "Excuses – AP Dhillon",
        embedUrl: "https://www.youtube.com/embed/vX2cDW8LUWk",
        artist: "AP Dhillon",
        duration: "3:22"
    },
    {
        id: "18",
        title: "Tesher x Jason Derulo - Jalebi Baby",
        embedUrl: "https://www.youtube.com/embed/CTmKrwFu7wg",
        artist: "Tesher",
        duration: "2:48"
    },
    {
        id: "19",
        title: "Marshmello x Pritam - BIBA",
        embedUrl: "https://www.youtube.com/embed/UhYRlI_bpJQ",
        artist: "Marshmello",
        duration: "3:54"
    },
    {
        id: "20",
        title: "Ed Sheeran - Sapphire",
        embedUrl: "https://www.youtube.com/embed/JgDNFQ2RaLQ",
        artist: "Ed Sheeran",
        duration: "4:07"
    },
    {
        id: "21",
        title: "Tum Tum - Enemy (Tamil)",
        embedUrl: "https://www.youtube.com/embed/tYSrY4iPX6w",
        artist: "Enemy",
        duration: "3:29"
    }
];

// Global state
let currentTrack = null;
let isPlaying = false;
let isVideoMode = false;
let filteredTracks = [...tracks];
let currentTrackIndex = -1;
let progressInterval = null;
let currentProgress = 0;

// DOM elements
const playlist = document.getElementById('playlist');
const searchInput = document.getElementById('searchInput');
const modeToggle = document.getElementById('modeToggle');
const bottomPlayer = document.getElementById('bottomPlayer');
const fullscreenPlayer = document.getElementById('fullscreenPlayer');
const trackCount = document.getElementById('trackCount');

// Bottom player elements
const currentTitle = document.getElementById('currentTitle');
const currentArtist = document.getElementById('currentArtist');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Fullscreen player elements
const closeBtn = document.getElementById('closeBtn');
const videoContainer = document.getElementById('videoContainer');
const audioVisualizer = document.getElementById('audioVisualizer');
const videoPlayer = document.getElementById('videoPlayer');
const fullscreenTitle = document.getElementById('fullscreenTitle');
const fullscreenArtist = document.getElementById('fullscreenArtist');
const fsPlayBtn = document.getElementById('fsPlayBtn');
const fsPrevBtn = document.getElementById('fsPrevBtn');
const fsNextBtn = document.getElementById('fsNextBtn');
const progressFill = document.getElementById('progressFill');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeSlider = document.getElementById('volumeSlider');

// Initialize the app
function init() {
    renderPlaylist();
    setupEventListeners();
    updateTrackCount();
}

// Render playlist
function renderPlaylist() {
    playlist.innerHTML = '';
    
    filteredTracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.className = `track-item ${currentTrack?.id === track.id ? 'active' : ''}`;
        trackElement.innerHTML = `
            <div class="track-thumbnail">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                </svg>
            </div>
            <div class="track-info">
                <div class="track-title">${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <div class="track-duration">${track.duration}</div>
        `;
        
        trackElement.addEventListener('click', () => selectTrack(track));
        playlist.appendChild(trackElement);
    });
}

// Select and play track
function selectTrack(track) {
    currentTrack = track;
    currentTrackIndex = filteredTracks.findIndex(t => t.id === track.id);
    isPlaying = true;
    
    updateBottomPlayer();
    updateFullscreenPlayer();
    renderPlaylist();
    showBottomPlayer();
    openFullscreen();
    startProgress();
}

// Update bottom player
function updateBottomPlayer() {
    if (currentTrack) {
        currentTitle.textContent = currentTrack.title;
        currentArtist.textContent = currentTrack.artist;
        updatePlayButton();
    }
}

// Update fullscreen player
function updateFullscreenPlayer() {
    if (currentTrack) {
        fullscreenTitle.textContent = currentTrack.title;
        fullscreenArtist.textContent = currentTrack.artist;
        totalTime.textContent = currentTrack.duration;
        
        if (isVideoMode) {
            videoContainer.style.display = 'block';
            audioVisualizer.style.display = 'none';
            videoPlayer.src = currentTrack.embedUrl + '?autoplay=1&controls=1';
        } else {
            videoContainer.style.display = 'none';
            audioVisualizer.style.display = 'block';
            videoPlayer.src = '';
        }
        
        updateFullscreenPlayButton();
    }
}

// Update play buttons
function updatePlayButton() {
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');
    
    if (isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
}

function updateFullscreenPlayButton() {
    const playIcon = fsPlayBtn.querySelector('.play-icon');
    const pauseIcon = fsPlayBtn.querySelector('.pause-icon');
    
    if (isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
}

// Show/hide bottom player
function showBottomPlayer() {
    bottomPlayer.classList.add('active');
}

function hideBottomPlayer() {
    bottomPlayer.classList.remove('active');
}

// Open/close fullscreen
function openFullscreen() {
    fullscreenPlayer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
    fullscreenPlayer.classList.add('hidden');
    document.body.style.overflow = 'auto';
    videoPlayer.src = '';
}

// Play/pause functionality
function togglePlayPause() {
    isPlaying = !isPlaying;
    updatePlayButton();
    updateFullscreenPlayButton();
    
    if (isPlaying) {
        startProgress();
    } else {
        stopProgress();
    }
}

// Navigation
function playNext() {
    if (currentTrackIndex < filteredTracks.length - 1) {
        selectTrack(filteredTracks[currentTrackIndex + 1]);
    }
}

function playPrevious() {
    if (currentTrackIndex > 0) {
        selectTrack(filteredTracks[currentTrackIndex - 1]);
    }
}

// Progress simulation
function startProgress() {
    stopProgress();
    progressInterval = setInterval(() => {
        currentProgress += 1;
        if (currentProgress >= 100) {
            currentProgress = 0;
            playNext();
        }
        updateProgressBar();
        updateCurrentTime();
    }, 1000);
}

function stopProgress() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function updateProgressBar() {
    progressFill.style.width = currentProgress + '%';
}

function updateCurrentTime() {
    const minutes = Math.floor((currentProgress * 3.5) / 60);
    const seconds = Math.floor((currentProgress * 3.5) % 60);
    currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    filteredTracks = tracks.filter(track =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query)
    );
    renderPlaylist();
    updateTrackCount();
}

// Mode toggle
function toggleMode() {
    isVideoMode = !isVideoMode;
    const modeIcon = modeToggle.querySelector('.mode-icon');
    const modeText = modeToggle.querySelector('.mode-text');
    
    if (isVideoMode) {
        modeToggle.classList.add('video-mode');
        modeIcon.innerHTML = `
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
        `;
        modeText.textContent = 'Video Mode';
    } else {
        modeToggle.classList.remove('video-mode');
        modeIcon.innerHTML = `
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
        `;
        modeText.textContent = 'Audio Mode';
    }
    
    if (currentTrack) {
        updateFullscreenPlayer();
    }
}

// Update track count
function updateTrackCount() {
    trackCount.textContent = `${filteredTracks.length} tracks`;
}

// Setup event listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', handleSearch);
    
    // Mode toggle
    modeToggle.addEventListener('click', toggleMode);
    
    // Bottom player controls
    playBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);
    fullscreenBtn.addEventListener('click', openFullscreen);
    
    // Fullscreen player controls
    closeBtn.addEventListener('click', closeFullscreen);
    fsPlayBtn.addEventListener('click', togglePlayPause);
    fsPrevBtn.addEventListener('click', playPrevious);
    fsNextBtn.addEventListener('click', playNext);
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        // Volume control would be implemented here
        console.log('Volume:', e.target.value);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && currentTrack) {
            e.preventDefault();
            togglePlayPause();
        } else if (e.code === 'Escape') {
            closeFullscreen();
        } else if (e.code === 'ArrowRight' && currentTrack) {
            playNext();
        } else if (e.code === 'ArrowLeft' && currentTrack) {
            playPrevious();
        }
    });
    
    // Close fullscreen when clicking outside
    fullscreenPlayer.addEventListener('click', (e) => {
        if (e.target === fullscreenPlayer) {
            closeFullscreen();
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);