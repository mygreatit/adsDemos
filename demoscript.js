const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');

// Unmute the main video
main_video.muted = false;

// List of video files in the demos folder
let data = [
    { id: 'a1', name: '1.mp4' },
    { id: 'a2', name: '2.mp4' },
    { id: 'a3', name: '3.mp4' },
    { id: 'a4', name: '4.mp4' },
    { id: 'a5', name: '5.mp4' },
    { id: 'a6', name: '6.mp4' },
    { id: 'a7', name: '7.mp4' },
    { id: 'a8', name: '8.mp4' },
    { id: 'a9', name: '9.mp4' },
    { id: 'a10', name: '10.mp4' },
    { id: 'a11', name: '11.mp4' },
    { id: 'a12', name: '12.mp4' },
];

// Function to format the duration
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to get video duration
function getVideoDuration(videoSrc, callback) {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.addEventListener('loadedmetadata', function() {
        callback(video.duration);
    });
}

// Sort the data array by the numeric value in the name property to ensure serial order
data.sort((a, b) => {
    const aNumber = parseInt(a.name.split('.')[0]);
    const bNumber = parseInt(b.name.split('.')[0]);
    return aNumber - bNumber;
});

data.forEach((video, i) => {
    const videoSrc = 'demos/' + video.name;
    getVideoDuration(videoSrc, (duration) => {
        const formattedDuration = formatDuration(duration);
        let video_element = `
        <div class="video" data-id="${video.id}">
            <img src="images/play.svg" alt="">
            <p>${i + 1 > 9 ? i + 1 : '0' + (i + 1)}. </p>
            <h3 class="title">${video.name}</h3>
            <p class="time">${formattedDuration}</p>
        </div>
        `;
        video_playlist.innerHTML += video_element;

        if (i === 0) {
            // Set the first video as the main video
            main_video.src = videoSrc;
            main_video_title.innerHTML = video.name;
            document.querySelectorAll('.video')[0].classList.add('active');
            document.querySelectorAll('.video')[0].querySelector('img').src = 'images/pause.svg';
        }
    });
});

document.addEventListener('click', (e) => {
    if (e.target.closest('.video')) {
        const selected_video = e.target.closest('.video');
        const videos = document.querySelectorAll('.video');

        videos.forEach((video) => {
            video.classList.remove('active');
            video.querySelector('img').src = 'images/play.svg';
        });

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = 'images/pause.svg';

        const match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = 'demos/' + match_video.name;
        main_video_title.innerHTML = match_video.name;
    }
});
