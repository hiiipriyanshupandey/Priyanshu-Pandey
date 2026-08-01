// ==========================================
// CERTIFICATE V2
// Part 1
// ==========================================

// ---------- Current Friend ----------

const currentFriend = JSON.parse(
    sessionStorage.getItem("friend")
);

if (!currentFriend) {

    window.location.href = "index.html";

}

// ---------- Elements ----------

const photo =
document.getElementById("certificatePhoto");

const friendName =
document.getElementById("certificateName");

const friendMessage =
document.getElementById("certificateMessage");

const certificateID =
document.getElementById("certificateID");

const downloadBtn =
document.getElementById("downloadCertificate");

const continueBtn =
document.getElementById("continueBtn");

// ---------- Friend Name ----------

friendName.textContent =
currentFriend.name;

// ---------- Certificate Message ----------

friendMessage.innerHTML =

`This certificate is proudly awarded to
<strong>${currentFriend.name}</strong>
for being an incredible friend,
creating unforgettable memories,
sharing laughter and making every
moment truly special.

Happy Friendship Day ❤️`;

// ==========================================
// FRIEND PHOTO
// ==========================================

const folder = currentFriend.folder;

const photoFormats = [

    "jpeg",

    "jpg",

    "png",

    "webp"

];

let formatIndex = 0;

function loadFriendPhoto(){

    if(formatIndex >= photoFormats.length){

        return;

    }

    photo.src = "mansi/1.jpeg";
}

photo.onerror = ()=>{

    formatIndex++;

    loadFriendPhoto();

};

loadFriendPhoto();

// ==========================================
// CERTIFICATE V2
// Part 2
// ==========================================

// ---------- Unique Number ----------

function generateCertificateID(name){

    let total = 0;

    for(let i=0;i<name.length;i++){

        total += name.charCodeAt(i);

    }

    return "FD-2026-" + (1000 + (total % 9000));

}

certificateID.textContent =
generateCertificateID(currentFriend.name);

// ---------- Fade Animation ----------

window.addEventListener("load",()=>{

    document.querySelector(".certificate").animate(

        [

            {

                opacity:0,

                transform:"translateY(25px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],

        {

            duration:700,

            easing:"ease"

        }

    );

});

// ---------- Button Animation ----------

document.querySelectorAll(".certificate-buttons button")

.forEach(button=>{

    button.addEventListener("click",()=>{

        button.animate(

            [

                {

                    transform:"scale(1)"

                },

                {

                    transform:"scale(.95)"

                },

                {

                    transform:"scale(1)"

                }

            ],

            {

                duration:180

            }

        );

    });

});

// ==========================================
// CERTIFICATE V2
// Part 3
// ==========================================

// ---------- Download Certificate ----------

downloadBtn.addEventListener("click", async () => {

    const certificate =
    document.getElementById("certificateCard");

    downloadBtn.disabled = true;

    const oldText =
    downloadBtn.textContent;

    downloadBtn.textContent =
    "Preparing...";

    try{

        const canvas =
        await html2canvas(certificate,{

            scale:3,

            useCORS:true,

            backgroundColor:"#fffdf8"

        });

        const link =
        document.createElement("a");

        link.download =
        `${currentFriend.name}-Friendship-Certificate.png`;

        link.href =
        canvas.toDataURL("image/png");

        link.click();

        downloadBtn.textContent =
        "Downloaded ✓";

    }

    catch(error){

        console.error(error);

        downloadBtn.textContent =
        "Try Again";

    }

    setTimeout(()=>{

        downloadBtn.disabled = false;

        downloadBtn.textContent = oldText;

    },1500);

});

// ---------- Continue ----------

continueBtn.addEventListener("click",()=>{

    document.body.animate(

        [

            { opacity:1 },

            { opacity:0 }

        ],

        {

            duration:450,

            fill:"forwards"

        }

    );

    setTimeout(()=>{

        window.location.href="surprise.html";

    },450);

});
