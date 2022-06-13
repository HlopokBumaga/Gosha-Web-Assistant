if (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition){
	console.log('Speech Recognition system is work! 😀');
    console.log('GoshaWeb by Exerium');
} else {
    body.style.animation = "bganim 1s forwards";
    setTimeout(function () {
        window.location.href = "error/error.html";
    }, 1000);
}

if (localStorage.getItem("voiceActive") == 'true') {
    voicecActive();
}

// -----------------------------------------------------------------

const settBtn = document.querySelector("#Settings_Btn");
const settings = document.getElementById("settings");
const gosha = document.getElementById("Gosha");
const speakLight = document.getElementById("sp");
const outputText = document.querySelector(".text__recog");
const settingsBtn = document.querySelector(".sett");
const body = document.querySelector(".body");

const jokeAudio = new Audio;
const helpSound = new Audio;
const searchSound = new Audio("assets/sounds/speak/12+.mp3");
const jokeEnd = new Audio("assets/sounds/joke2.mp3");
const noTodo = new Audio("assets/sounds/speak/Текущих заметок нет. Хотите создать новую заметку.mp3");
const listenTodo = new Audio("assets/sounds/speak/ilisten.mp3");
const doTodo = new Audio("assets/sounds/speak/Обнаружена текущая заметка. Вывести, удалить или ничего не делать.mp3");

let countSett = 1;
let dsBtn = true;
let requestError = 0;
let nameUser = localStorage.getItem("name");
let notresult = 0;
let notresultmain = 0;

const appeals = {
    "time": ["час", "часы", "часа", "часов", "часу", "часам", "часом", "часами", "часе", "часах", "время", "времена", "времени", "временам", "временем", "временами", "временах"],
    "joke": ["шутка", "шутки", "шуток", "шутке", "шуткам", "шутку", "шуткою", "шутками", "шутках"],
    "help": ["умею", "умеешь", "умеет", "умеем", "умеете", "умеют", "команда", "команды", "команд", "команде", "командам", "команду", "командой", "командою", "командами", "командах"],
    "todo": ["заметка", "заметки", "заметке", "заметку", "заметкой", "заметкою", "заметок", "заметкам", "заметками", "заметках"]
}

if (localStorage.getItem("todo") == null || localStorage.getItem("todo") == 'null') {
    console.log("...")
} else {
    dsBtn = false
    gosha.style.filter = "brightness(50%)";
    speakLight.style.opacity = "1";

    const newTodo = new Audio("assets/sounds/speak/У вас есть одна заметка..mp3");
    newTodo.play();

    newTodo.onloadedmetadata = function () {
        rtg = Math.round(jokeAudio.duration) * 1000;
        setTimeout(function() {
            speakLight.style.opacity = "0";
            gosha.style.filter = "brightness(100%)";
            dsBtn = true;
        }, 3000)
    };
}

// -----------------------------------------------------------------

if (nameUser == null) {
    let inputUserName = prompt("Введи своё имя: ")
    if (inputUserName == null || inputUserName == "") {
        alert("Введи имя пж :3 (перезагрузи страницу)");
    } else {
        localStorage.setItem("name", inputUserName);
        window.location.reload()
    }
} else {
    outputText.innerHTML = `Привет, ${nameUser}. Чем сегодня займемся?`
}

setColor();

function setColor() {
    if (localStorage.getItem("colorBg") == 0) {
        body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(17, 53, 171, 1) 100%)";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
    } if (localStorage.getItem("colorBg") == 1) {
        body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(8, 228, 107, 1) 100%)";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
    } if (localStorage.getItem("colorBg") == 2) {
        body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(219, 88, 13, 1) 100%)";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
    } if (localStorage.getItem("colorBg") == 3) {
        body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(188, 12, 241, 1) 100%)";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
    } if (localStorage.getItem("colorBg") == 4) {
        body.style.background = "black";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
    } if (localStorage.getItem("colorBg") == 5) {
        body.style.background = "white";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
        outputText.style.color = "black"
    }
}

// -----------------------------------------------------------------

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function time() {
    requestError = 1;
    let today = new Date();
    outputText.innerHTML = today.getHours().toString().padStart(2, "0") + ":" + today.getMinutes().toString().padStart(2, "0");
}

function joke() {
    requestError = 1;
    let randomNum = getRandomArbitrary(1, 14);
    jokeAudio.src = `assets/sounds/speak/${randomNum}.mp3`;
    jokeAudio.play();
}

function help() {
    requestError = 1;
    helpSound.src = "assets/sounds/speak/10+.mp3"
    helpSound.play();

    setTimeout(function() {
        outputText.innerHTML = "Время, помощь, шутки, быстрая заметка, поиск в интернете";
    }, 4000);
}

function todo() {
    requestError = 1;
    if (localStorage.getItem("todo") == null || localStorage.getItem("todo") == 'null') {
        noTodo.play()
        setTimeout(function() {
            let recognizer = new webkitSpeechRecognition();
            recognizer.interimResults = true;
            recognizer.lang = 'ru-Ru';
            recognizer.onresult = function (event) {
                var result = event.results[event.resultIndex];
                notresult = 1;
                if (result.isFinal) {
                    let what = result[0].transcript.toLowerCase()
                    if (what == "да") {
                        listenTodo.play();
                        setTimeout(function() {
                            let recognizer = new webkitSpeechRecognition();
                            recognizer.interimResults = true;
                            recognizer.lang = 'ru-Ru';
                            recognizer.onresult = function (event) {
                                var result = event.results[event.resultIndex];
                                notresult = 1;
                                if (result.isFinal) {
                                    let what = result[0].transcript.toLowerCase()
                                    localStorage.setItem("todo", what)
                                }
                            }
                            recognizer.start();
                            setTimeout(function () {
                                if (notresultmain == 0) {
                                    if (localStorage.getItem("voiceActive") == 'true') {
                                        speakLight.style.opacity = "0";
                                        gosha.style.filter = "brightness(100%)";
                                        dsBtn = true;
                                        voicecActive();
                                    } else {
                                        speakLight.style.opacity = "0";
                                        gosha.style.filter = "brightness(100%)";
                                        dsBtn = true;
                                    }
                                } else {
                                    notresultmain = 0;
                                }
                            }, 10000);
                        }, 2000);
                    } else {
                        if (localStorage.getItem("voiceActive") == 'true') {
                            speakLight.style.opacity = "0";
                            gosha.style.filter = "brightness(100%)";
                            dsBtn = true;
                            voicecActive();
                        } else {
                            speakLight.style.opacity = "0";
                            gosha.style.filter = "brightness(100%)";
                            dsBtn = true;
                        }
                    }
                }
            };
            recognizer.start();
            setTimeout(function () {
                if (notresultmain == 0) {
                    if (localStorage.getItem("voiceActive") == 'true') {
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn = true;
                        voicecActive();
                    } else {
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn = true;
                    }
                } else {
                    notresultmain = 0;
                }
            }, 10000);
        }, 4000);
    } else {
        doTodo.play();
        setTimeout(function () {
            let recognizer = new webkitSpeechRecognition();
            recognizer.interimResults = true;
            recognizer.lang = 'ru-Ru';
            recognizer.onresult = function (event) {
                var result = event.results[event.resultIndex];
                notresult = 1;
                if (result.isFinal) {
                    let what = result[0].transcript.toLowerCase()
                    if (what == "удалить") {
                        localStorage.setItem("todo", null);
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn = true;
                    } if (what == "вывести") {
                        outputText.innerHTML = localStorage.getItem("todo");
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn = true;
                    } else {
                        if (localStorage.getItem("voiceActive") == 'true') {
                            speakLight.style.opacity = "0";
                            gosha.style.filter = "brightness(100%)";
                            dsBtn = true;
                            voicecActive();
                        } else {
                            speakLight.style.opacity = "0";
                            gosha.style.filter = "brightness(100%)";
                            dsBtn = true;
                        }
                    }
                }
            }
            recognizer.start();
            setTimeout(function () {
                if (notresultmain == 0) {
                    if (localStorage.getItem("voiceActive") == 'true') {
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn = true;
                        voicecActive();
                    } else {
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn = true;
                    }
                } else {
                    notresultmain = 0;
                }
            }, 10000);
        }, 6000);
    }

    if (localStorage.getItem("voiceActive") == 'true') {
        voicecActive();
    }
}

// -----------------------------------------------------------------

function voicecActive() {
    let recognizer = new webkitSpeechRecognition();
    recognizer.interimResults = true;
    recognizer.lang = 'ru-Ru';

    recognizer.onresult = function (event) {
        var result = event.results[event.resultIndex];
        notresult = 1;
        if (result.isFinal) {
            let what = result[0].transcript.toLowerCase()
            let arr = what.split(' ');
            
            for (let i = 0; arr.length > i; i++) {
                if (arr[i] == "гоша") {
                    gosha.classList.remove("fade-in");
                    gosha.offsetWidth = gosha.offsetWidth;
                    gosha.classList.add("fade-in");
                            
                    dsBtn = false
                    gosha.style.filter = "brightness(50%)";
                            
                    speakLight.style.opacity = "1";
                            
                    outputResult();
                } else {
                    voicecActive();
                    break
                }
            }            
        }
    };
    recognizer.start();
    setTimeout(function () {
        if (notresult == 0) {
            voicecActive();
        } else {
            notresult = 0;
        }
    }, 10000);
}

function outputResult() {
    let recognizer = new webkitSpeechRecognition();
    recognizer.interimResults = true;
    recognizer.lang = 'ru-Ru';

    recognizer.onresult = function (event) {
        var result = event.results[event.resultIndex];
        if (result.isFinal) {
            outputText.innerHTML = result[0].transcript;

            notresultmain = 1;
            
            let what = result[0].transcript.toLowerCase()
            let arr = what.split(' ');
            
            for (let i = 0; arr.length > i; i++) {
                if (appeals["time"].includes(arr[i]) === true) {
                    setTimeout(function() {
                        time();
                        
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn = true;
                        if (localStorage.getItem("voiceActive") == 'true') {
                            voicecActive();
                        } 
                    }, 1000);
                } if (appeals["joke"].includes(arr[i]) === true) {
                    joke();
                    
                    jokeAudio.onloadeddata = function() {
                        rty = Math.round(jokeAudio.duration) * 1000;
                        setTimeout(function() {
                            jokeEnd.play();
                            speakLight.style.opacity = "0";
                            gosha.style.filter = "brightness(100%)";
                            dsBtn = true;
                            if (localStorage.getItem("voiceActive") == 'true') {
                                voicecActive();
                            } 
                        }, rty);
                    }
                } if (appeals["help"].includes(arr[i]) === true) {
                    help();
                    
                    helpSound.onloadeddata = function() {
                        rty = Math.round(helpSound.duration) * 1000;
                        setTimeout(function() {
                            speakLight.style.opacity = "0";
                            gosha.style.filter = "brightness(100%)";
                            dsBtn = true;
                            if (localStorage.getItem("voiceActive") == 'true') {
                                voicecActive();
                            }
                        }, rty);
                    }
                } if (appeals["todo"].includes(arr[i]) === true) {
                    todo();
                }
            }
            setTimeout(function() {
                if (requestError == 0) {
                    searchSound.play();

                    setTimeout(function () {
                        window.location.href = `https://yandex.ru/search/?text=${what}`;
                    }, 4000)
                } else {
                    requestError = 0;
                }
            }, 2000);
            
        }
    };
    recognizer.start();
    setTimeout(function () {
        if (notresultmain == 0) {
            if (localStorage.getItem("voiceActive") == 'true') {
                speakLight.style.opacity = "0";
                gosha.style.filter = "brightness(100%)";
                dsBtn = true;
                voicecActive();
            } else {
                speakLight.style.opacity = "0";
                gosha.style.filter = "brightness(100%)";
                dsBtn = true;
            }

        } else {
            notresultmain = 0;
        }
    }, 10000);
}

// -----------------------------------------------------------------

// Gosha
gosha.addEventListener("click", function() {
    if (dsBtn == true) {
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
settingsBtn.addEventListener("click", function () {
    settingsBtn.style.animation = "settanim 0.5s";
    body.style.animation = "bganim 1s forwards";
    setTimeout(function () {
        window.location.href = "settings/index.html";
    }, 1000);
});