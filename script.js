import * as module from './assets/modules/functions.js'

// Подготовка ( Проверка РР и активации по голосу ) -----------------------------------------------------------------
if (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition){
	console.log('Speech Recognition system is work! 😀');
    console.log('GoshaWeb by Exerium');
} else {
    module.body.style.animation = "bganim 1s forwards";
    setTimeout(function () {
        window.location.href = "error/error.html";
    }, 1000);
}

// Второй этап подготовки -----------------------------------------------------------------

if (localStorage.getItem("todo") == null || localStorage.getItem("todo") == 'null') {
    console.log("...")
} else {
    module.todoNotifi.style.animation = "none";
    setTimeout(function () {
        module.todoNotifi.style.animation = "notifianim 1s forwards";
        setTimeout(function () {
            module.todoNotifi.style.animation = "notifibackanim 1s forwards";
        }, 5000)
    }, 50)
}

if (module.nameUser.value == null) {
    let inputUserName = prompt("Введи своё имя: ")
    if (inputUserName == null || inputUserName == "") {
        alert("Введи имя пж :3 (перезагрузи страницу)");
    } else {
        localStorage.setItem("name", inputUserName);
        window.location.reload()
    }
} else {
    module.outputText.innerHTML = `Привет, ${module.nameUser.value}. Чем сегодня займемся?`
}

if (localStorage.getItem("liveWallpaper") == 'true') {
    if (localStorage.getItem("season") == 'false') {
        module.body.style.backgroundImage = `url("https://source.unsplash.com/random/${document.documentElement.clientWidth}x${document.documentElement.clientHeight}")`;
    } if (localStorage.getItem("tagBg") != '') {
        module.body.style.backgroundImage = `url("https://source.unsplash.com/random/${document.documentElement.clientWidth}x${document.documentElement.clientHeight}/?${localStorage.getItem("tagBg")}")`;
    } else {
        let time = new Date;
        if (time.getMonth() == 12 || time.getMonth() <= 2) {
            var currSeason = "winter";
        } if (time.getMonth() >= 3 && time.getMonth() <= 5) {
            var currSeason = "spring";
        } if (time.getMonth() >= 6 && time.getMonth() <= 8) {
            var currSeason = "summer";
        } if (time.getMonth() >= 9 && time.getMonth() <= 11) {
            var currSeason = "autumn";
        }
        module.body.style.backgroundImage = `url("https://source.unsplash.com/random/${document.documentElement.clientWidth}x${document.documentElement.clientHeight}/?${currSeason}")`;
    }
} else {
    setColor();
}

function setColor() {
    if (localStorage.getItem("colorBg") == 0) {
        module.body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(17, 53, 171, 1) 100%)";
        module.body.style.backgroundRepeat = "no-repeat";
        module.body.style.backgroundSize = "cover";
    } if (localStorage.getItem("colorBg") == 1) {
        module.body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(8, 228, 107, 1) 100%)";
        module.body.style.backgroundRepeat = "no-repeat";
        module.body.style.backgroundSize = "cover";
    } if (localStorage.getItem("colorBg") == 2) {
        module.body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(219, 88, 13, 1) 100%)";
        module.body.style.backgroundRepeat = "no-repeat";
        module.body.style.backgroundSize = "cover";
    } if (localStorage.getItem("colorBg") == 3) {
        module.body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(188, 12, 241, 1) 100%)";
        module.body.style.backgroundRepeat = "no-repeat";
        module.body.style.backgroundSize = "cover";
    } if (localStorage.getItem("colorBg") == 4) {
        module.body.style.background = "black";
        module.body.style.backgroundRepeat = "no-repeat";
        module.body.style.backgroundSize = "cover";
    } if (localStorage.getItem("colorBg") == 5) {
        module.body.style.background = "white";
        module.body.style.backgroundRepeat = "no-repeat";
        module.body.style.backgroundSize = "cover";
        module.outputText.style.color = "black"
    }
}

// Основные функции -----------------------------------------------------------------

// Gosha
module.gosha.addEventListener("click", function() {
    if (module.dsBtn.value == true) {
        module.gosha.style.animation = "none";
        setTimeout(function () {
            module.gosha.style.animation = "fade-in 1s";
        }, 50)

        module.dsBtn.value = false
        module.gosha.style.filter = "brightness(50%)";

        module.speakLight.style.opacity = "1";

        module.speakAnalyzator(true, '');
    }
});

// Настройки
module.settingsBtn.addEventListener("click", function () {
    module.settingsBtn.style.animation = "settanim 0.5s";
    module.body.style.animation = "bganim 1s forwards";
    setTimeout(function () {
        window.location.href = "settings/index.html";
    }, 1000);
});