const settBtn = document.querySelector("#Settings_Btn");
const settings = document.getElementById("settings");
const gosha = document.getElementById("Gosha");
const speakLight = document.getElementById("sp");
const outputText = document.querySelector(".text__recog");

const camera = new Audio('assets/sounds/speak/blip3.mp3');
const startSound = new Audio('assets/sounds/3.mp3');
const jokeAudio = new Audio;
const helpSound = new Audio;

let countSett = 1;
let dsBtn = true;

const appeals = {
    "time": ["час", "часы", "часа", "часов", "часу", "часам", "часом", "часами", "часе", "часах", "время", "времена", "времени", "временам", "временем", "временами", "временах"],
    "joke": ["шутка", "шутки", "шуток", "шутке", "шуткам", "шутку", "шуткою", "шутками", "шутках"],
    "help": ["умею", "умеешь", "умеет", "умеем", "умеете", "умеют", "команда", "команды", "команд", "команде", "командам", "команду", "командой", "командою", "командами", "командах"]
}

// Function
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function time() {
    let today = new Date();
    outputText.innerHTML = today.getHours().toString().padStart(2, "0") + ":" + today.getMinutes().toString().padStart(2, "0");
}

function joke() {
    let randomNum = getRandomArbitrary(1, 9);
    if (randomNum != 8) {
        jokeAudio.src = `assets/sounds/speak/${randomNum}.mp3`;
        jokeAudio.play();
    } else {
        console.log("Фингя анекдот, переделываю");
    }
}

function help() {
    helpSound.src = "assets/sounds/speak/10.mp3"
    helpSound.play();

    setTimeout(function() {
        outputText.innerHTML = "Время, помощь, погода, шутки, музыка";
    }, 4000);
    
}

function outputResult() {
    let recognizer = new webkitSpeechRecognition();
    recognizer.interimResults = true;
    recognizer.lang = 'ru-Ru';

    recognizer.onresult = function (event) {
        var result = event.results[event.resultIndex];
        if (result.isFinal) {
            outputText.innerHTML = result[0].transcript;
            
            let what = result[0].transcript.toLowerCase()
            let arr = what.split(' ');
            
            for (let i = 0; arr.length > i; i++) {
                if (appeals["time"].includes(arr[i])) {
                    setTimeout(function() {
                        time();
                        
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn = true;
                    }, 1000);
                } if (appeals["joke"].includes(arr[i])) {
                    joke();
                    
                    jokeAudio.onloadeddata = function() {
                        rty = Math.round(jokeAudio.duration) * 1000;
                        setTimeout(function() {
                            speakLight.style.opacity = "0";
                            gosha.style.filter = "brightness(100%)";
                            dsBtn = true;
                        }, rty);
                    }
                } if (appeals["help"].includes(arr[i])) {
                    help();
                    
                    helpSound.onloadeddata = function() {
                        rty = Math.round(helpSound.duration) * 1000;
                        setTimeout(function() {
                            speakLight.style.opacity = "0";
                            gosha.style.filter = "brightness(100%)";
                            dsBtn = true;
                        }, rty);
                    }
                }
            } 
        }
    };
    recognizer.start();
}

// Gosha
gosha.addEventListener("click", function() {
    if (dsBtn == true) {
        startSound.play();

        gosha.classList.remove("fade-in");
        gosha.offsetWidth = gosha.offsetWidth;
        gosha.classList.add("fade-in");

        dsBtn = false
        gosha.style.filter = "brightness(50%)";

        speakLight.style.opacity = "1";

        outputResult();
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