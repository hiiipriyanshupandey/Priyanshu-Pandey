// ==========================================
// HAPPY FRIENDSHIP DAY
// ==========================================

// Current Friend

const currentFriend =
JSON.parse(sessionStorage.getItem("friend"));

if(!currentFriend){

    window.location.href="index.html";

}

// Elements

const finalName =
document.getElementById("finalName");

const homeBtn =
document.getElementById("homeBtn");

// Friend Name

finalName.textContent =
currentFriend.name;

// Small Entry Animation

document.body.animate(

[
{opacity:0,transform:"translateY(20px)"},
{opacity:1,transform:"translateY(0)"}
],

{
duration:600,
fill:"forwards",
easing:"ease-out"
}

);

// Home Button

homeBtn.addEventListener("click",()=>{

    homeBtn.disabled=true;

    document.body.animate(

    [

        {opacity:1},

        {opacity:0}

    ],

    {

        duration:400,

        fill:"forwards"

    });

    setTimeout(()=>{

        // Friend data remains available
        window.location.href="gallery.html";

    },400);

});