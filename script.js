// Video data (renamed from tracks for clarity)
const videos = [
    {
        id: "1",
        title: "Jason Derulo - Swalla (feat. Nicki Minaj & Ty Dolla $ign)",
        youtubeId: "NGLxoKOvzu4", // YouTube video ID
        artist: "Jason Derulo",
        duration: "3:46"
    },
    {
        id: "2",
        title: "Luis Fonsi - Despacito ft. Daddy Yankee",
        youtubeId: "kJQP7kiw5Fk",
        artist: "Luis Fonsi",
        duration: "4:42"
    },
    {
        id: "3",
        title: "PSY - GANGNAM STYLE",
        youtubeId: "9bZkp7q19f0",
        artist: "PSY",
        duration: "4:13"
    },
    {
        id: "4",
        title: "Ritviz - Liggi",
        youtubeId: "6BYIKEH0RCQ",
        artist: "Ritviz",
        duration: "3:28"
    },
    {
        id: "5",
        title: "Coke Studio Bharat | Khalasi | Aditya Gadhvi x Achint",
        youtubeId: "t7wSjy9Lv-o",
        artist: "Aditya Gadhvi",
        duration: "4:15"
    },
    {
        id: "6",
        title: "Illuminati | Aavesham",
        youtubeId: "tOM-nWPcR4U",
        artist: "Aavesham",
        duration: "3:52"
    },
    {
        id: "7",
        title: "Aasa Kooda – Thejo Bharathwaj",
        youtubeId: "a3Ue-LN5B9U",
        artist: "Thejo Bharathwaj",
        duration: "4:01"
    },
    {
        id: "8",
        title: "Achacho - Aranmanai 4",
        youtubeId: "ijBxe70sd8M",
        artist: "Aranmanai 4",
        duration: "3:33"
    },
    {
        id: "9",
        title: "Chuttamalle - Devara",
        youtubeId: "GWNrPJyRTcA",
        artist: "Devara",
        duration: "4:18"
    },
    {
        id: "10",
        title: "Ed Sheeran - Shape of You",
        youtubeId: "JGwWNGJdvx8",
        artist: "Ed Sheeran",
        duration: "3:53"
    },
    {
        id: "11",
        title: "J Balvin, Willy William - Mi Gente",
        youtubeId: "wnJ6LuUFpMo",
        artist: "J Balvin",
        duration: "3:07"
    },
    {
        id: "12",
        title: "MC Fioti - Bum Bum Tam Tam",
        youtubeId: "_P7S2lKif-A",
        artist: "MC Fioti",
        duration: "2:49"
    },
    {
        id: "13",
        title: "DJ Snake, Lil Jon - Turn Down for What",
        youtubeId: "HMUDVMiITOU",
        artist: "DJ Snake",
        duration: "3:36"
    },
    {
        id: "14",
        title: "Vidya Vox - Be Free (Pallivaalu Bhadravattakam)",
        youtubeId: "eiGdsH1g20k",
        artist: "Vidya Vox",
        duration: "4:25"
    },
    {
        id: "15",
        title: "Manike Mage Hithe – Yohani & Satheeshan",
        youtubeId: "PgCliOxl41o",
        artist: "Yohani",
        duration: "3:41"
    },
    {
        id: "16",
        title: "Dhanda Nyoliwala - Russian Bandana",
        youtubeId: "1OAjeECW90E",
        artist: "Dhanda Nyoliwala",
        duration: "3:15"
    },
    {
        id: "17",
        title: "Excuses – AP Dhillon",
        youtubeId: "vX2cDW8LUWk",
        artist: "AP Dhillon",
        duration: "3:22"
    },
    {
        id: "18",
        title: "Tesher x Jason Derulo - Jalebi Baby",
        youtubeId: "CTmKrwFu7wg",
        artist: "Tesher",
        duration: "2:48"
    },
    {
        id: "19",
        title: "Marshmello x Pritam - BIBA",
        youtubeId: "UhYRlI_bpJQ",
        artist: "Marshmello",
        duration: "3:54"
    },
    {
        id: "20",
        title: "Ed Sheeran - Sapphire",
        youtubeId: "JgDNFQ2RaLQ",
        artist: "Ed Sheeran",
        duration: "4:07"
    },
    {
        id: "21",
        title: "Tum Tum - Enemy (Tamil)",
        youtubeId: "tYSrY4iPX6w",
        artist: "Enemy",
        duration: "3:29"
    }
];

// Global state
let currentVideo = null;
let isPlaying = false;
let filteredVideos = [...videos];
let currentVideoIndex = -1;
let progressUpdateInterval = null; // Renamed for clarity
let player; // YouTube Player object

// DOM elements
const playlist = document.getElementById('playlist');
const searchInput = document.getElementById('searchInput');
const bottomPlayer = document.getElementById('bottomPlayer');
const fullscreenPlayer = document.getElementById('fullscreenPlayer');
const trackCount = document.getElementById('trackCount'); // Renamed to videoCount in HTML, but keeping for now

// Bottom player elements
const currentTitle = document.getElementById('currentTitle');
const currentArtist = document.getElementById('currentArtist');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Fullscreen player elements
const closeBtn = document.getElementById('closeBtn');
const youtubePlayerDiv = document.getElementById('youtubePlayer'); // The div where YouTube player will be embedded
const fullscreenTitle = document.getElementById('fullscreenTitle');
const fullscreenArtist = document.getElementById('fullscreenArtist');
const fsPlayBtn = document.getElementById('fsPlayBtn');
const fsPrevBtn = document.getElementById('fsPrevBtn');
const fsNextBtn = document.getElementById('fsNextBtn');
const progressFill = document.getElementById('progressFill');
const currentTimeElement = document.getElementById('currentTime'); // Renamed to avoid conflict
const totalTimeElement = document.getElementById('totalTime'); // Renamed to avoid conflict
const volumeSlider = document.getElementById('volumeSlider');

// This function will be called by the YouTube IFrame Player API when it's ready
function onYouTubeIframeAPIReady() {
    // Initialize the app after the YouTube API is ready
    init();
}

// Initialize the app
function init() {
    renderPlaylist();
    setupEventListeners();
    updateTrackCount(); // Still using trackCount for now
}

// Render playlist
function renderPlaylist() {
    playlist.innerHTML = '';
    
    filteredVideos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = `track-item ${currentVideo?.id === video.id ? 'active' : ''}`;
        videoElement.innerHTML = `
            <div class="track-thumbnail">
                <!-- Video icon for thumbnail -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
            </div>
            <div class="track-info">
                <div class="track-title">${video.title}</div>
                <div class="track-artist">${video.artist}</div>
            </div>
            <div class="track-duration">${video.duration}</div>
        `;
        
        videoElement.addEventListener('click', () => selectVideo(video));
        playlist.appendChild(videoElement);
    });
}

// Select and play video
function selectVideo(video) {
    currentVideo = video;
    currentVideoIndex = filteredVideos.findIndex(v => v.id === video.id);
    isPlaying = true; // Assume playing when selected

    updateBottomPlayer();
    updateFullscreenPlayer();
    renderPlaylist();
    showBottomPlayer();
    openFullscreen();
    
    // Load the video into the YouTube player
    if (player) {
        player.loadVideoById(currentVideo.youtubeId);
    } else {
        // Create the YouTube player if it doesn't exist
        player = new YT.Player('youtubePlayer', {
            videoId: currentVideo.youtubeId,
            playerVars: {
                autoplay: 1, // Autoplay the video
                controls: 1, // Show player controls
                modestbranding: 1, // Hide YouTube logo
                rel: 0 // Do not show related videos
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

// YouTube Player ready event
function onPlayerReady(event) {
    event.target.playVideo();
    updatePlayButton();
    updateFullscreenPlayButton();
    startProgressUpdate();
    setVolume(volumeSlider.value); // Set initial volume
}

// YouTube Player state change event
function onPlayerStateChange(event) {
    // YT.PlayerState.ENDED, YT.PlayerState.PLAYING, YT.PlayerState.PAUSED, YT.PlayerState.BUFFERING, YT.PlayerState.CUED
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        updatePlayButton();
        updateFullscreenPlayButton();
        startProgressUpdate();
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        updatePlayButton();
        updateFullscreenPlayButton();
        stopProgressUpdate();
    } else if (event.data === YT.PlayerState.ENDED) {
        isPlaying = false;
        updatePlayButton();
        updateFullscreenPlayButton();
        stopProgressUpdate();
        playNext(); // Play next video when current one ends
    } else if (event.data === YT.PlayerState.BUFFERING) {
        // Handle buffering state if needed
    }
    // Note: Ad handling is managed by YouTube. We cannot directly control or detect ads within the iframe.
    // The video will play directly after any pre-roll ads (if present) are finished by YouTube.
}

// Update bottom player
function updateBottomPlayer() {
    if (currentVideo) {
        currentTitle.textContent = currentVideo.title;
        currentArtist.textContent = currentVideo.artist;
        updatePlayButton();
    }
}

// Update fullscreen player
function updateFullscreenPlayer() {
    if (currentVideo) {
        fullscreenTitle.textContent = currentVideo.title;
        fullscreenArtist.textContent = currentVideo.artist;
        totalTimeElement.textContent = currentVideo.duration; // Display total duration from data
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
    // Ensure the player is playing when fullscreen is opened
    if (player && !isPlaying) {
        player.playVideo();
    }
}

function closeFullscreen() {
    fullscreenPlayer.classList.add('hidden');
    document.body.style.overflow = 'auto';
    if (player) {
        player.stopVideo(); // Stop video when closing fullscreen
    }
    isPlaying = false;
    updatePlayButton();
    updateFullscreenPlayButton();
    stopProgressUpdate();
    // Reset progress bar
    progressFill.style.width = '0%';
    currentTimeElement.textContent = '0:00';
}

// Play/pause functionality
function togglePlayPause() {
    if (!currentVideo) return; // Do nothing if no video is selected

    if (player) {
        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }
    // State will be updated by onPlayerStateChange
}

// Navigation
function playNext() {
    if (currentVideoIndex < filteredVideos.length - 1) {
        selectVideo(filteredVideos[currentVideoIndex + 1]);
    } else {
        // Optionally loop back to the first video or stop
        selectVideo(filteredVideos[0]); // Loop back to the first video
    }
}

function playPrevious() {
    if (currentVideoIndex > 0) {
        selectVideo(filteredVideos[currentVideoIndex - 1]);
    } else {
        // Optionally loop to the last video or stop
        selectVideo(filteredVideos[filteredVideos.length - 1]); // Loop to the last video
    }
}

// Progress update from YouTube Player
function startProgressUpdate() {
    stopProgressUpdate(); // Clear any existing interval
    progressUpdateInterval = setInterval(() => {
        if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            const duration = player.getDuration();
            const currentTime = player.getCurrentTime();
            const progress = (currentTime / duration) * 100;
            progressFill.style.width = progress + '%';
            
            currentTimeElement.textContent = formatTime(currentTime);
            totalTimeElement.textContent = formatTime(duration);
        }
    }, 1000); // Update every second
}

function stopProgressUpdate() {
    if (progressUpdateInterval) {
        clearInterval(progressUpdateInterval);
        progressUpdateInterval = null;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Volume control
function setVolume(volume) {
    if (player) {
        player.setVolume(volume);
    }
}

// Search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.artist.toLowerCase().includes(query)
    );
    renderPlaylist();
    updateTrackCount();
}

// Update track count (renamed to video count in HTML, but keeping for now)
function updateTrackCount() {
    trackCount.textContent = `${filteredVideos.length} videos`;
}

// Setup event listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', handleSearch);
    
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
        setVolume(e.target.value);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && currentVideo) {
            e.preventDefault();
            togglePlayPause();
        } else if (e.code === 'Escape') {
            closeFullscreen();
        } else if (e.code === 'ArrowRight' && currentVideo) {
            playNext();
        } else if (e.code === 'ArrowLeft' && currentVideo) {
            playPrevious();
        }
    });
    
    // Close fullscreen when clicking outside
    fullscreenPlayer.addEventListener('click', (e) => {
        // Check if the click target is the fullscreen player itself, not its children
        if (e.target === fullscreenPlayer) {
            closeFullscreen();
        }
    });
}

// The init function is now called by onYouTubeIframeAPIReady
// document.addEventListener('DOMContentLoaded', init); // Removed as YouTube API handles init
