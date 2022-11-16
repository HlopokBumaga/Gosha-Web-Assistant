import * as gsla from './GSLA/gsla.js';

// Переменные
export const gosha = document.querySelector(".Gosha");
export const speakLight = document.querySelector(".content__speak-animation");
export const outputText = document.querySelector(".content__text-output");
export const settingsBtn = document.querySelector(".sett");
export const body = document.querySelector(".body");
export const todoNotifi = document.querySelector(".notif-todo");

export const jokeAudio = new Audio;
export const helpSound = new Audio;
export const searchSound = new Audio;
export const jokeEnd = new Audio;
export const noTodo = new Audio;
export const listenTodo = new Audio;
export const doTodo = new Audio;

export let requestError = { value: 0 };
export let dsBtn = { value: true };
export let nameUser = { value: localStorage.getItem("name") };
export let notresult = { value: 0 };
export let notresultmain = { value: 0 };
export let requestErrorTest = { value: 0 };
export let notResultCount = { value: 0};
export let outputResTodo = { value: ''};
export let todoOutPut = { value: ''};

// Обращения -----------------------------------------------------------------
export const appeals = {
    "time": ["час", "часы", "часа", "часов", "часу", "часам", "часом", "часами", "часе", "часах", "время", "времена", "времени", "временам", "временем", "временами", "временах"],
    "joke": ["шутка", "шутки", "шуток", "шутке", "шуткам", "шутку", "шуткою", "шутками", "шутках", "анекдот", "анекдоты", "анекдота", "анекдотов", "анекдоту", "анекдотам"],
    "help": ["умею", "умеешь", "умеет", "умеем", "умеете", "умеют", "команда", "команды", "команд", "команде", "командам", "команду", "командой", "командою", "командами", "командах", "помощь", "помощи", "помощей", "помощам", "помощью", "помощах", "помогать", "помоги"],
    "todo": ["заметка", "заметки", "заметке", "заметку", "заметкой", "заметкою", "заметок", "заметкам", "заметками", "заметках"],
    "weather": ["погода", "погоды", "погод", "погоде", "погодам", "погоду", "погодой", "погодою", "погодам", "погодах"]
}

// Функции
export function time() {
    let today = new Date();
    outputText.innerHTML = today.getHours().toString().padStart(2, "0") + ":" + today.getMinutes().toString().padStart(2, "0");
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export function joke() {
    let randomNum = getRandomArbitrary(1, 14);
    jokeAudio.src = `assets/sounds/speak/${randomNum}.mp3`;
    jokeAudio.play();

    jokeAudio.onloadeddata = function() {
        let rty = Math.round(jokeAudio.duration) * 1000;
        setTimeout(function() {
            jokeEnd.src = "assets/sounds/joke2.mp3";
            jokeEnd.play();

            jokeEnd.onloadeddata = function() {
                let rty = Math.round(jokeEnd.duration) * 1000;
                setTimeout(function() {
                    speakLight.style.opacity = "0";
                    gosha.style.filter = "brightness(100%)";
                    dsBtn.value = true;
                }, rty);
            }
        }, rty);
    }
}

export function help() {
    helpSound.src = "assets/sounds/speak/10+.mp3"
    helpSound.play();

    helpSound.onloadeddata = function() {
        let rty = Math.round(helpSound.duration) * 1000;
        setTimeout(function() {
            outputText.innerHTML = "Время, помощь, шутки, быстрая заметка, погода";
            speakLight.style.opacity = "0";
            gosha.style.filter = "brightness(100%)";
            dsBtn.value = true;
        }, rty);
    }
}

export function todo() {
    todoOutPut.value = '';
    outputResTodo.value = '';
    if (localStorage.getItem("todo") == null || localStorage.getItem("todo") == 'null') {
        noTodo.src = "assets/sounds/speak/Текущих заметок нет. Хотите создать новую заметку.mp3";
        noTodo.play();
        noTodo.onloadedmetadata = function () {
            let rty = Math.round(noTodo.duration) * 1000;
            setTimeout(function() {
                speakAnalyzator(false, 'да');
                setTimeout(function () {
                    if (outputResTodo.value == true) {
                        outputResTodo.value = '';
                        listenTodo.src = "assets/sounds/speak/ilisten.mp3";
                        listenTodo.play();
                        listenTodo.onloadedmetadata = function () {
                            let rty = Math.round(listenTodo.duration) * 1000;
                            setTimeout(function() {
                                speakAnalyzator(true, '');
                                setTimeout(function () {
                                    let endTodo = todoOutPut.value.join(' ');
                                    localStorage.setItem("todo", endTodo);
                                }, 7000)
                            }, rty);
                        }
                    } else {
                        outputResTodo.value = '';
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn.value = true;
                    }
                }, 5000)
            }, rty)
        }
    } else {
        doTodo.src = "assets/sounds/speak/Обнаружена текущая заметка. Вывести, удалить или ничего не делать.mp3";
        doTodo.play();
        doTodo.onloadedmetadata = function () {
            let rty = Math.round(doTodo.duration) * 1000;
            setTimeout(function () {
                speakAnalyzator(false, 'вывести');
                setTimeout(function () {
                    if (outputResTodo.value == true) {
                        outputResTodo.value = '';
                        outputText.innerHTML = localStorage.getItem("todo");
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn.value = true;
                    } else {
                        outputResTodo.value = '';
                        localStorage.removeItem("todo");
                        speakLight.style.opacity = "0";
                        gosha.style.filter = "brightness(100%)";
                        dsBtn.value = true;
                    }
                }, rty);
            }, 5000)
        }
    }
}

export function weather(city) {
    let apiKey = "599651a6555d21da39a6b27988381476";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;

    setTimeout(function () {
        axios.get(url).then(res => {
            outputText.innerHTML = `Погода в городе ${city}: Температура: ${res.data.main.temp}°C , Влажность: ${res.data.main.humidity}% , Скорость ветра: ${res.data.wind.speed}км/ч`;
            setTimeout(function() {
                speakLight.style.opacity = "0";
                gosha.style.filter = "brightness(100%)";
                dsBtn.value = true;
            }, 3000);
        })
    }, 3000)
    
}

export function speakAnalyzator(isTheCommand, Keyword) {
    let recognizer = new webkitSpeechRecognition();
    recognizer.interimResults = true;
    recognizer.lang = 'ru-Ru';

    recognizer.onresult = function (event) {
        var result = event.results[event.resultIndex];
        requestErrorTest.value = 0;
        if (isTheCommand === true) {
            if (result.isFinal) {
                outputText.innerHTML = result[0].transcript;
                notresultmain.value = 1;

                let what = result[0].transcript.toLowerCase()
                let arr = what.split(' ');

                todoOutPut.value = arr;
                commandAnalyzator(arr);
            }
            
        } else {
            if (result.isFinal) {
                outputText.innerHTML = result[0].transcript;
                notresultmain.value = 1;

                let what = result[0].transcript.toLowerCase()
                let arr = what.split(' ');

                for (let i = 0; arr.length > i; i++) {
                    if (Keyword.includes(arr[i]) === true) {
                        requestError.value = 1;
                        outputResTodo.value = true;
                        return true;
                    }
                }
            }
            setTimeout(function() {
                if (requestError.value == 0 && requestErrorTest.value != 1) {
                    outputResTodo.value = false;
                    return false;
                } else {
                    requestError.value = 0;
                    requestErrorTest.value = 1;
                }
            }, 2000);
        }
    }

    recognizer.start();
    setTimeout(function () {
        if (notresultmain.value == 0) {
            speakLight.style.opacity = "0";
            gosha.style.filter = "brightness(100%)";
            dsBtn.value = true;
        } else {
            notresultmain.value = 0;
        }
    }, 6000);
}

export function commandAnalyzator(array) {
    for (let i = 0; array.length > i; i++) {
        if (appeals["time"].includes(array[i]) === true) {
            setTimeout(function() {
                time();
                notResultCount.value = 1;
                
                speakLight.style.opacity = "0";
                gosha.style.filter = "brightness(100%)";
                dsBtn.value = true;
            }, 1000);
            break;
        } if (appeals["help"].includes(array[i]) === true) {
            help();
            notResultCount.value = 1;
            break;
        } if (appeals["joke"].includes(array[i]) === true) {
            joke();
            notResultCount.value = 1;
            break;
        } if (appeals["todo"].includes(array[i]) === true) {
            todo();
            notResultCount.value = 1;
            break;
        } if (appeals["weather"].includes(array[i]) === true) {
            i++
            if (array[i] != "в") {
                let city = array[i];
                weather(city);
            } if (array[i] == "в") {
                i++
                let city = array[i].substr(0, array[i].length-1)
                weather(city);
            } else {
                speakLight.style.opacity = "0";
                gosha.style.filter = "brightness(100%)";
                dsBtn.value = true;
            }
            notResultCount.value = 1;
            break;
        }
    }
    setTimeout(function () {
        if (notResultCount.value != 1) {
            gsla.inputFunction(array);
        } else {
            notResultCount.value = 0;
        }
    }, 3000)
}