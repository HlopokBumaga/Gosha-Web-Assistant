// GoshaWeb Alpha 1.0

// Переменные
let settBtn = document.querySelector("#Settings_Btn");
let settings = document.getElementById("settings");
let gosha = document.getElementById("Gosha");
let speakLight = document.getElementById("sp");

let countSett = 1;

// Function
// Gosha
gosha.addEventListener("click", function() {
    gosha.classList.remove("fade-in");
    gosha.offsetWidth = gosha.offsetWidth;
    gosha.classList.add("fade-in");

    speakLight.style.opacity = "1";

    let audio = new Audio('assets/sounds/speak/Tisy.mp3');
    audio.play();

    audio.onloadeddata = function() {
        rty = Math.round(audio.duration) * 1000;
        setTimeout(function(){
            speakLight.style.opacity = "0";
        }, rty);
    }
});

// Настройки
settBtn.addEventListener("click", function () {
    if (countSett == 0) {
        settings.style.opacity = "0";
        countSett += 1;
    } else {
        settings.style.opacity = "1";
        countSett -= 1;
    }
});