// ==========================================
// LETTER PAGE
// ==========================================

// ------------------------------------------
// Current Friend
// ------------------------------------------

const currentFriend =
JSON.parse(sessionStorage.getItem("friend"));

if(!currentFriend){

    window.location.href="index.html";

}

// ------------------------------------------
// Elements
// ------------------------------------------

const letterTitle =
document.getElementById("letterTitle");

const letterContent =
document.getElementById("letterContent");

const nextPageBtn =
document.getElementById("nextPageBtn");

// ------------------------------------------
// Update Title
// ------------------------------------------

letterTitle.textContent =
currentFriend.name + " ❤️";

// ------------------------------------------
// Load Letter
// ------------------------------------------

const letter =
letters.default(currentFriend.name);

letterContent.innerHTML =
letter
.trim()
.replace(/\n\n/g,"<br><br>")
.replace(/\n/g,"<br>");
// ------------------------------------------
// Continue
// ------------------------------------------

nextPageBtn.addEventListener("click",()=>{

    window.location.href="certificate.html";

});