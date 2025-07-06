// Music data
const tracks = [
    {
        id: "1",
        title: "Jason Derulo - Swalla (feat. Nicki Minaj & Ty Dolla $ign)",
        embedUrl: "NGLxoKOvzu4", // Changed to just video ID
        artist: "Jason Derulo",
        duration: "3:46"
    },
    {
        id: "2",
        title: "Luis Fonsi - Despacito ft. Daddy Yankee",
        embedUrl: "kJQP7kiw5Fk",
        artist: "Luis Fonsi",
        duration: "4:42"
    },
    {
        id: "3",
        title: "PSY - GANGNAM STYLE",
        embedUrl: "9bZkp7q19f0",
        artist: "PSY",
        duration: "4:13"
    },
    {
        id: "4",
        title: "Ritviz - Liggi",
        embedUrl: "6BYIKEH0RCQ",
        artist: "Ritviz",
        duration: "3:28"
    },
    {
        id: "5",
        title: "Coke Studio Bharat | Khalasi | Aditya Gadhvi x Achint",
        embedUrl: "t7wSjy9Lv-o",
        artist: "Aditya Gadhvi",
        duration: "4:15"
    },
    {
        id: "6",
        title: "Illuminati | Aavesham",
        embedUrl: "tOM-nWPcR4U",
        artist: "Aavesham",
        duration: "3:52"
    },
    {
        id: "7",
        title: "Aasa Kooda – Thejo Bharathwaj",
        embedUrl: "a3Ue-LN5B9U",
        artist: "Thejo Bharathwaj",
        duration: "4:01"
    },
    {
        id: "8",
        title: "Achacho - Aranmanai 4",
        embedUrl: "ijBxe70sd8M",
        artist: "Aranmanai 4",
        duration: "3:33"
    },
    {
        id: "9",
        title: "Chuttamalle - Devara",
        embedUrl: "GWNrPJyRTcA",
        artist: "Devara",
        duration: "4:18"
    },
    {
        id: "10",
        title: "Ed Sheeran - Shape of You",
        embedUrl: "JGwWNGJdvx8",
        artist: "Ed Sheeran",
        duration: "3:53"
    },
    {
        id: "11",
        title: "J Balvin, Willy William - Mi Gente",
        embedUrl: "wnJ6LuUFpMo",
        artist: "J Balvin",
        duration: "3:07"
    },
    {
        id: "12",
        title: "MC Fioti - Bum Bum Tam Tam",
        embedUrl: "_P7S2lKif-A",
        artist: "MC Fioti",
        duration: "2:49"
    },
    {
        id: "13",
        title: "DJ Snake, Lil Jon - Turn Down for What",
        embedUrl: "HMUDVMiITOU",
        artist: "DJ Snake",
        duration: "3:36"
    },
    {
        id: "14",
        title: "Vidya Vox - Be Free (Pallivaalu Bhadravattakam)",
        embedUrl: "eiGdsH1g20k",
        artist: "Vidya Vox",
        duration: "4:25"
    },
    {
        id: "15",
        title: "Manike Mage Hithe – Yohani & Satheeshan",
        embedUrl: "PgCliOxl41o",
        artist: "Yohani",
        duration: "3:41"
    },
    {
        id: "16",
        title: "Dhanda Nyoliwala - Russian Bandana",
        embedUrl: "1OAjeECW90E",
        artist: "Dhanda Nyoliwala",
        duration: "3:15"
    },
    {
        id: "17",
        title: "Excuses – AP Dhillon",
        embedUrl: "vX2cDW8LUWk",
        artist: "AP Dhillon",
        duration: "3:22"
    },
    {
        id: "18",
        title: "Tesher x Jason Derulo - Jalebi Baby",
        embedUrl: "CTmKrwFu7wg",
        artist: "Tesher",
        duration: "2:48"
    },
    {
        id: "19",
        title: "Marshmello x Pritam - BIBA",
        embedUrl: "UhYRlI_bpJQ",
        artist: "Marshmello",
        duration: "3:54"
    },
    {
        id: "20",
        title: "Ed Sheeran - Sapphire",
        embedUrl: "JgDNFQ2RaLQ",
        artist: "Ed Sheeran",
        duration: "4:07"
    },
    {
        id: "21",
        title: "Tum Tum - Enemy (Tamil)",
        embedUrl: "tYSrY4iPX6w",
        artist: "Enemy",
        duration: "3:29"
    }
];

// Global state
let currentTrack = null;
let isPlaying = false;
let isVideoMode = false; // Initial mode is audio
let filteredTracks = [...tracks];
let currentTrackIndex = -1;
let progressInterval = null;

// YouTube Player API variables
let player;
let playerReady = false;

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
const videoPlayerIframe = document.getElementById('videoPlayer'); // Renamed to avoid conflict with player object
const fullscreenTitle = document.getElementById('fullscreenTitle');
const fullscreenArtist = document.getElementById('fullscreenArtist');
const fsPlayBtn = document.getElementById('fsPlayBtn');
const fsPrevBtn = document.getElementById('fsPrevBtn');
const fsNextBtn = document.getElementById('fsNextBtn');
const progressFill = document.getElementById('progressFill');
const progressContainer = document.querySelector('.progress-bar'); // Get the progress bar container
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
const volumeSlider = document.getElementById('volumeSlider');

// Initialize the app
function init() {
    renderPlaylist();
    setupEventListeners();
    updateTrackCount();
    loadYouTubeAPI(); // Load YouTube IFrame API
}

// Load YouTube IFrame Player API
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// This function is called by the YouTube IFrame Player API when the API is ready.
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('videoPlayer', {
        height: '100%',
        width: '100%',
        videoId: '', // Will be set dynamically
        playerVars: {
            'playsinline': 1,
            'autoplay': 0,
            'controls': 1,
            'showinfo': 0,
            'rel': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    playerReady = true;
    // Set initial volume
    player.setVolume(volumeSlider.value);
    if (currentTrack) {
        // If a track is already selected, load it
        player.loadVideoById(currentTrack.embedUrl);
        if (isPlaying) {
            player.playVideo();
        }
    }
}

function onPlayerStateChange(event) {
    // YT.PlayerState.ENDED, YT.PlayerState.PLAYING, YT.PlayerState.PAUSED, YT.PlayerState.BUFFERING, YT.PlayerState.CUED
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        startProgress();
    } else {
        isPlaying = false;
        stopProgress();
    }
    updatePlayButton();
    updateFullscreenPlayButton();

    if (event.data === YT.PlayerState.ENDED) {
        playNext();
    }
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
    isPlaying = true; // Assume playing when a new track is selected

    updateBottomPlayer();
    updateFullscreenPlayer();
    renderPlaylist();
    showBottomPlayer();
    openFullscreen(); // Open fullscreen immediately on track selection

    if (playerReady) {
        // Always load the video, regardless of current mode.
        // Its visibility will be controlled by updateFullscreenPlayer and toggleMode.
        player.loadVideoById(currentTrack.embedUrl);
        // If in video mode, play immediately. Otherwise, it will be cued.
        if (isVideoMode) {
            player.playVideo();
        } else {
            // If in audio mode, ensure video is paused/stopped but loaded
            player.pauseVideo();
        }
    }
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
        totalTimeDisplay.textContent = currentTrack.duration; // Display static duration for now

        if (isVideoMode) {
            videoContainer.style.display = 'block';
            audioVisualizer.style.display = 'none';
        } else {
            videoContainer.style.display = 'none';
            audioVisualizer.style.display = 'block';
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
    // Ensure the player state is correct when opening fullscreen
    if (currentTrack && playerReady) {
        if (isVideoMode) {
            player.playVideo();
        } else {
            player.pauseVideo(); // Keep paused if in audio mode
        }
    }
}

function closeFullscreen() {
    fullscreenPlayer.classList.add('hidden');
    document.body.style.overflow = 'auto';
    if (playerReady) {
        player.stopVideo(); // Stop the video when closing fullscreen
    }
    stopProgress(); // Stop progress update when closing fullscreen
}

// Play/pause functionality
function togglePlayPause() {
    if (!playerReady || !currentTrack) return;

    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
    // isPlaying state will be updated by onPlayerStateChange
}

// Navigation
function playNext() {
    if (filteredTracks.length === 0) return;
    currentTrackIndex = (currentTrackIndex + 1) % filteredTracks.length;
    selectTrack(filteredTracks[currentTrackIndex]);
}

function playPrevious() {
    if (filteredTracks.length === 0) return;
    currentTrackIndex = (currentTrackIndex - 1 + filteredTracks.length) % filteredTracks.length;
    selectTrack(filteredTracks[currentTrackIndex]);
}

// Progress tracking with YouTube API
function startProgress() {
    stopProgress(); // Clear any existing interval
    if (playerReady && player.getDuration) {
        progressInterval = setInterval(() => {
            const duration = player.getDuration();
            const currentTime = player.getCurrentTime();
            if (duration > 0) {
                const progress = (currentTime / duration) * 100;
                progressFill.style.width = progress + '%';
                currentTimeDisplay.textContent = formatTime(currentTime);
                totalTimeDisplay.textContent = formatTime(duration);
            }
        }, 1000); // Update every second
    }
}

function stopProgress() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

// Format time for display (MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Handle progress bar clicks to seek
progressContainer.addEventListener('click', (e) => {
    if (!playerReady || !currentTrack) return;

    const progressBarWidth = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const seekPercentage = (clickX / progressBarWidth);
    const duration = player.getDuration();
    if (duration > 0) {
        const seekTime = duration * seekPercentage;
        player.seekTo(seekTime, true);
    }
});


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
        updateFullscreenPlayer(); // Update display based on new mode
        if (playerReady) {
            if (isVideoMode) {
                player.playVideo(); // If switching to video mode, play the video
            } else {
                player.pauseVideo(); // If switching to audio mode, pause the video
            }
        }
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
        if (playerReady) {
            player.setVolume(e.target.value);
        }
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
