const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    playlistSongs = document.getElementById("playlist-songs"),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        id: 1,
        path: 'assets/1.mp3',
        displayName: 'Đừng Làm Trái Tim Anh Đau',
        cover: 'assets/1.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        id: 2,
        path: 'assets/2.mp3',
        displayName: 'Giá Như',
        cover: 'assets/2.jpg',
        artist: 'SOOBIN',
    },
    {
        id: 3,
        path: 'assets/3.mp3',
        displayName: 'Âm Thầm Bên Em',
        cover: 'assets/3.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        id: 4,
        path: 'assets/4.mp3',
        displayName: 'Muộn Rồi Mà Sao Còn',
        cover: 'assets/4.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        id: 5,
        path: 'assets/5.mp3',
        displayName: 'Chúng Ta Rồi Sẽ Hạnh Phúc',
        cover: 'assets/5.jpg',
        artist: 'Jack - J97',
    },
    {
        id: 6,
        path: 'assets/6.mp3',
        displayName: 'Cuối Cùng Thì',
        cover: 'assets/6.jpg',
        artist: 'Jack - J97',
    },
    {
        id: 7,
        path: 'assets/7.mp3',
        displayName: 'Sao Em Vô Tình',
        cover: 'assets/7.jpg',
        artist: 'ICM',
    }
];

let userData = {
    songs: [...songs],
    currentSong: null
}
let musicIndex = 0;
let isPlaying = false;

const renderSongs = (array) => {
    const songsHTML = array.map((song) => {
        return `
             <li class="playlist-song" id="song-${song.id}">
                <img src="${song.cover}" class="song-cover">
                <button class="playlist-song-info" onclick="playsong(${song.id})">
                    <span class="playlist-song-title">${song.displayName}</span>
                    <span class="playlist-song-artist">${song.artist}</span>
                </button>
                <button class="playlist-song-delete" aria-label="Delete ${song.displayName}" onclick="deleteSong(${song.id})">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
                </button>
            </li>
        `;
    })
    .join("");

    playlistSongs.innerHTML = songsHTML;
};

function playsong(id) {
    const song = userData?.songs.find((song) => song.id === id);
    userData.currentSong = song;
    
    musicIndex = userData?.songs.findIndex((song) => song.id === id);

    loadMusic(userData.currentSong);
    playMusic();
    highlightCurrentSong(userData.currentSong.id);
}

function deleteSong(id) {

    //Xóa bài hát khỏi mảng
    const songIndex = userData?.songs.find((song) => song.id === id);
    if (songIndex !== -1) {
        userData.songs.splice(songIndex, 1);

        // Update giao diện khi xóa bài hát
        const songEl = document.getElementById(`song-${id}`);
        if (songEl) {
            songEl.remove();
        }
        
        // Nếu xóa bài hát đang phát thì chuyển bài hát tiếp theo hoặc pause.
        if (userData.currentSong?.id === id) {
            if (userData.songs.length > 0) {
                const nextSongIndex = (songIndex.id) % userData.songs.length;
                console.log(nextSongIndex);
                const nextSong = userData.songs[nextSongIndex];
                playsong(nextSong.id);
            } else {
                music.pause();
                userData.currentSong = null;
                // Thay đổi giao diện nếu cần
                playBtn.classList.replace('fa-pause', 'fa-play');
                playBtn.setAttribute('title', 'Play');
            }
        }
    }
}

function highlightCurrentSong(id) {
    const playlistSongElements = document.querySelectorAll(".playlist-song");
    const songToHighlight = document.getElementById(`song-${id}`);

    playlistSongElements.forEach((songEl) => {
        songEl.removeAttribute("aria-current");
    });

    if (songToHighlight) {
        songToHighlight.setAttribute("aria-current", "true");
    }
}

function togglePlay() {
    isPlaying? pauseMusic() : playMusic();
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    highlightCurrentSong(songs[musicIndex].id);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

renderSongs(userData?.songs);
document.addEventListener("DOMContentLoaded", () => {
    const firstSong = document.querySelector('.playlist-song');
    if (firstSong) {
        const firstSongId = firstSong.id.split('-')[1];
        highlightCurrentSong(firstSongId);
    }
});
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);