// ==========================================
// FRIENDSHIP DAY
// SCRIPT.JS
// ==========================================

// ------------------------------
// Elements
// ------------------------------

const hero = document.getElementById("hero");
const passwordPage = document.getElementById("passwordPage");

const startBtn = document.getElementById("startBtn");
const unlockBtn = document.getElementById("unlockBtn");

const passwordInput = document.getElementById("password");
const error = document.getElementById("error");

// Welcome Modal

const welcomeModal = document.getElementById("welcomeModal");
const friendName = document.getElementById("friendName");
const continueBtn = document.getElementById("continueBtn");

// ------------------------------
// Current Friend
// ------------------------------

let currentFriend = null;

// ------------------------------
// Enter Button
// ------------------------------

startBtn.addEventListener("click", () => {

    hero.style.display = "none";
    passwordPage.style.display = "flex";

    passwordInput.focus();

});

// ------------------------------
// Enter Key
// ------------------------------

passwordInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        unlock();
    }

});

// ------------------------------
// Unlock Button
// ------------------------------

unlockBtn.addEventListener("click", unlock);

// ------------------------------
// Unlock Function
// ------------------------------

function unlock() {

    const enteredPassword = passwordInput.value.trim();

    error.innerText = "";

    currentFriend = friends.find(
        friend => friend.password === enteredPassword
    );

    if (currentFriend) {

        // Save complete friend object

        sessionStorage.setItem(
            "friend",
            JSON.stringify(currentFriend)
        );

        // Future Gallery Support

        sessionStorage.setItem(
            "currentFolder",
            currentFriend.folder
        );

        sessionStorage.setItem(
            "currentName",
            currentFriend.name
        );

        unlockBtn.innerHTML = "Unlocked ✓";
        unlockBtn.disabled = true;

        setTimeout(() => {

            passwordPage.style.display = "none";

            friendName.innerHTML =
                "Welcome " +
                currentFriend.name +
                " ❤️";

            welcomeModal.style.display = "flex";

        }, 600);

    }

    else {

        error.innerText = "Incorrect Password";

        passwordInput.value = "";

        passwordInput.focus();

    }

}

// ------------------------------
// Continue Button
// ------------------------------

continueBtn.addEventListener("click", () => {

    window.location.href = "profile.html";

});