// ==========================================
// FRIENDSHIP DAY WEBSITE v4.0
// gallery.js
// Part 1/4
// ==========================================

// Current Friend
const currentFriend = JSON.parse(sessionStorage.getItem("friend"));

if (!currentFriend) {
    window.location.href = "index.html";
}

// Elements
const friendName = document.getElementById("friendName");
const mediaContainer = document.getElementById("mediaContainer");
const counter = document.getElementById("counter");
const mediaCaption = document.getElementById("mediaCaption");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const letterBtn = document.getElementById("letterBtn");

// Friend Name
friendName.textContent = currentFriend.name + " ❤️";

// Gallery Data
const folder = currentFriend.folder;
const mediaFiles = gallery[folder] || [];

let currentIndex = 0;
let slideshow = null;

// Load Media
function loadMedia(index) {

    mediaContainer.innerHTML = "";

    if (mediaFiles.length === 0) {

        mediaContainer.innerHTML = `
            <div class="empty-gallery">
                <h2>No Memories Yet ❤️</h2>
                <p>Memories will be added soon.</p>
            </div>
        `;

        counter.textContent = "0 / 0";
        mediaCaption.textContent = "";

        return;
    }

    const item = mediaFiles[index];
    const path = `assets/images/${folder}/${item.file}`;

        // -------------------------------
    // IMAGE
    // -------------------------------

    if (item.type === "image") {

        const img = document.createElement("img");

        img.src = path;
        img.alt = currentFriend.name;
        img.loading = "lazy";
        img.draggable = false;

        mediaContainer.appendChild(img);

    }

    // -------------------------------
    // VIDEO
    // -------------------------------

    else if (item.type === "video") {

        const video = document.createElement("video");

        video.src = path;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.preload = "metadata";

        mediaContainer.appendChild(video);

    }

    counter.textContent =
        `${index + 1} / ${mediaFiles.length}`;

    mediaCaption.textContent =
        item.caption || "";

    animateMedia();

}

// ==========================================
// Animation
// ==========================================

function animateMedia() {

    const media =
        mediaContainer.querySelector("img,video");

    if (!media) return;

    media.animate(

        [

            {
                opacity: 0,
                transform: "scale(.96)"
            },

            {
                opacity: 1,
                transform: "scale(1)"
            }

        ],

        {

            duration: 350,
            easing: "ease"

        }

    );

}

// ==========================================
// Next Media
// ==========================================

function nextMedia() {

    if (mediaFiles.length === 0) return;

    currentIndex++;

    if (currentIndex >= mediaFiles.length) {

        currentIndex = 0;

    }

    loadMedia(currentIndex);

}

// ==========================================
// Previous Media
// ==========================================

function previousMedia() {

    if (mediaFiles.length === 0) return;

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = mediaFiles.length - 1;

    }

    loadMedia(currentIndex);

}

// ==========================================
// Buttons
// ==========================================

nextBtn.addEventListener("click", nextMedia);

prevBtn.addEventListener("click", previousMedia);

backBtn.addEventListener("click", () => {

    window.location.href = "profile.html";

});

letterBtn.addEventListener("click", () => {

    window.location.href = "letter.html";

});

// ==========================================
// Keyboard Navigation
// ==========================================

document.addEventListener("keydown", (e) => {

    switch (e.key) {

        case "ArrowRight":
            nextMedia();
            break;

        case "ArrowLeft":
            previousMedia();
            break;

        case "Escape":

            if (document.fullscreenElement) {

                document.exitFullscreen();

            }

            break;

    }

});

// ==========================================
// Fullscreen
// ==========================================

fullscreenBtn.addEventListener("click", () => {

    const media =
        mediaContainer.querySelector("img,video");

    if (!media) return;

    if (media.requestFullscreen) {

        media.requestFullscreen();

    }

});

// ==========================================
// Double Click Fullscreen
// ==========================================

mediaContainer.addEventListener("dblclick", () => {

    const media =
        mediaContainer.querySelector("img,video");

    if (!media) return;

    if (media.requestFullscreen) {

        media.requestFullscreen();

    }

});

// ==========================================
// Touch Swipe
// ==========================================

let startX = 0;
let endX = 0;

mediaContainer.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;

});

mediaContainer.addEventListener("touchend", (e) => {

    endX = e.changedTouches[0].clientX;

    if (startX - endX > 60) {

        nextMedia();

    }

    if (endX - startX > 60) {

        previousMedia();

    }

});

// ==========================================
// Mouse Wheel Navigation
// ==========================================

mediaContainer.addEventListener("wheel", (e) => {

    e.preventDefault();

    if (e.deltaY > 0) {

        nextMedia();

    }

    else {

        previousMedia();

    }

});

// ==========================================
// Video Auto Next
// ==========================================

mediaContainer.addEventListener("ended", (e) => {

    if (e.target.tagName === "VIDEO") {

        nextMedia();

    }

}, true);

// ==========================================
// Slideshow Play
// ==========================================

playBtn.addEventListener("click", () => {

    if (mediaFiles.length === 0) return;

    if (slideshow) return;

    slideshow = setInterval(() => {

        nextMedia();

    }, 3000);

});

// ==========================================
// Slideshow Pause
// ==========================================

pauseBtn.addEventListener("click", () => {

    if (!slideshow) return;

    clearInterval(slideshow);

    slideshow = null;

});

// ==========================================
// Stop Slideshow
// ==========================================

window.addEventListener("beforeunload", () => {

    if (slideshow) {

        clearInterval(slideshow);

    }

});

// ==========================================
// Media Animation on Load
// ==========================================

mediaContainer.addEventListener("load", (e) => {

    if (
        e.target.tagName === "IMG" ||
        e.target.tagName === "VIDEO"
    ) {

        animateMedia();

    }

}, true);

// ==========================================
// Initial Gallery Load
// ==========================================

loadMedia(currentIndex);

// ==========================================
// END OF gallery.js
// ==========================================
