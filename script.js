// GoshaWeb Alpha 1.0

// Переменные
let settBtn = document.querySelector("#Settings_Btn");
let settings = document.getElementById("settings");
let gosha = document.getElementById("Gosha");
let speakLight = document.getElementById("sp");

let countSett = 1;
let dsBtn = true;

let camera = new Audio('assets/sounds/speak/blip3.mp3');
// Function
// Gosha

gosha.addEventListener("click", function() {
    if (dsBtn == true) {
        gosha.classList.remove("fade-in");
        gosha.offsetWidth = gosha.offsetWidth;
        gosha.classList.add("fade-in");

        dsBtn = false
        gosha.style.filter = "brightness(50%)";

        speakLight.style.opacity = "1";

        let audio = new Audio('assets/sounds/speak/Tisy.mp3');
        audio.play();

        audio.onloadeddata = function() {
            rty = Math.round(audio.duration) * 1000;
            setTimeout(function(){
                speakLight.style.opacity = "0";
                gosha.style.filter = "brightness(100%)";
                dsBtn = true;
            }, rty);
        }
    }
});


// Настройки
settBtn.addEventListener("click", function () {
    if (countSett == 0) {
        settings.style.opacity = "0";
		camera.play();
        countSett += 1;
    } else {
        settings.style.opacity = "1";
		camera.play();
        countSett -= 1;
    }
});