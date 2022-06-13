let body = document.querySelector(".body");
let back = document.querySelector(".back");
let sw = document.querySelector(".switch");
let inp = document.querySelector(".input");
let color = document.querySelectorAll("#color");

setColor();

function setColor() {
    if (localStorage.getItem("colorBg") == 0) {
        body.style.animation = "bganim 1s forwards";
        setTimeout(function () {
            body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(17, 53, 171, 1) 100%)";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundSize = "cover";
            body.style.animation = "bganimstart 1s forwards";
        }, 1000);
    } if (localStorage.getItem("colorBg") == 1) {
        body.style.animation = "bganim 1s forwards";
        setTimeout(function () {
            body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(8, 228, 107, 1) 100%)";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundSize = "cover";
            body.style.animation = "bganimstart 1s forwards";
        }, 1000);
    } if (localStorage.getItem("colorBg") == 2) {
        body.style.animation = "bganim 1s forwards";
        setTimeout(function () {
            body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(219, 88, 13, 1) 100%)";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundSize = "cover";
            body.style.animation = "bganimstart 1s forwards";
        }, 1000);
    } if (localStorage.getItem("colorBg") == 3) {
        body.style.animation = "bganim 1s forwards";
        setTimeout(function () {
            body.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(188, 12, 241, 1) 100%)";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundSize = "cover";
            body.style.animation = "bganimstart 1s forwards";
        }, 1000);
    } if (localStorage.getItem("colorBg") == 4) {
        body.style.animation = "bganim 1s forwards";
        setTimeout(function () {
            body.style.background = "black";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundSize = "cover";
            body.style.animation = "bganimstart 1s forwards";
        }, 1000);
    } if (localStorage.getItem("colorBg") == 5) {
        body.style.animation = "bganim 1s forwards";
        setTimeout(function () {
            body.style.background = "white";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundSize = "cover";
            body.style.animation = "bganimstart 1s forwards";
        }, 1000);
    }
}

function changeColor(colorIndex) {
    if (colorIndex == 0) {
        localStorage.setItem("colorBg", 0);
        setColor();
    } if (colorIndex == 1) {
        localStorage.setItem("colorBg", 1);
        setColor();
    } if (colorIndex == 2) {
        localStorage.setItem("colorBg", 2);
        setColor();
    } if (colorIndex == 3) {
        localStorage.setItem("colorBg", 3);
        setColor();
    } if (colorIndex == 4) {
        localStorage.setItem("colorBg", 4);
        setColor();
    } if (colorIndex == 5) {
        localStorage.setItem("colorBg", 5);
        setColor();
    }
}

color[0].addEventListener("click", function () { changeColor(0) });
color[1].addEventListener("click", function () { changeColor(1) });
color[2].addEventListener("click", function () { changeColor(2) });
color[3].addEventListener("click", function () { changeColor(3) });
color[4].addEventListener("click", function () { changeColor(4) });
color[5].addEventListener("click", function () { changeColor(5) });

if (localStorage.getItem("voiceActive") == 'true') {
    inp.checked = true;
} else {
    inp.checked = false;
}

sw.addEventListener("click", function () {
    if (inp.checked) {
        localStorage.setItem("voiceActive", true);
    } else {
        localStorage.setItem("voiceActive", false);
    }
});

back.addEventListener("click", function () {
    body.style.animation = "bganim 1s forwards";
    setTimeout(function () {
        window.location.href = "../index.html";
    }, 1000);
});