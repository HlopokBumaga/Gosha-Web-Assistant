let body = document.querySelector(".body");
let back = document.querySelector(".back");
let color = document.querySelectorAll("#color");
let currentColor = document.querySelector(".color-curr");

let sw = document.querySelector(".switch");
let inp = document.querySelector(".input");

let sw2 = document.querySelector(".switch2");
let inp2 = document.querySelector(".input2");

let btn = document.querySelector(".inp__btn");
let input = document.querySelector(".input__text");
let del = document.querySelector(".del");

let tagName = document.querySelector(".tag-walpaper__tag");

let bee = document.querySelector(".cont__bee");
let beeCoutner = true;
const beeSound = new Audio;

changeCurrentColor();

function changeCurrentColor() {
    if (localStorage.getItem("colorBg") == 0) {
        currentColor.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(17, 53, 171, 1) 100%)";
    } if (localStorage.getItem("colorBg") == 1) {
        currentColor.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(8, 228, 107, 1) 100%)";
    } if (localStorage.getItem("colorBg") == 2) {
        currentColor.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(219, 88, 13, 1) 100%)";
    } if (localStorage.getItem("colorBg") == 3) {
        currentColor.style.background = "linear-gradient(333deg, rgba(18, 19, 18, 1) 0%, rgba(0, 14, 5, 1) 43%, rgba(188, 12, 241, 1) 100%)";
    } if (localStorage.getItem("colorBg") == 4) {
        currentColor.style.background = "black";
    } if (localStorage.getItem("colorBg") == 5) {
        currentColor.style.background = "white";
    }
}

function changeColor(colorIndex) {
    if (colorIndex == 0) {
        localStorage.setItem("colorBg", 0);
        changeCurrentColor()
    } if (colorIndex == 1) {
        localStorage.setItem("colorBg", 1);
        changeCurrentColor()
    } if (colorIndex == 2) {
        localStorage.setItem("colorBg", 2);
        changeCurrentColor()
    } if (colorIndex == 3) {
        localStorage.setItem("colorBg", 3);
        changeCurrentColor()
    } if (colorIndex == 4) {
        localStorage.setItem("colorBg", 4);
        changeCurrentColor()
    } if (colorIndex == 5) {
        localStorage.setItem("colorBg", 5);
        changeCurrentColor()
    }
}

sw.addEventListener("click", function () {
    if (inp.checked) {
        inp.checked = true;
        setTimeout(function () {
            inp.checked = false;
        }, 200)
    }
});

bee.addEventListener("click", function () {
    if (beeCoutner == true) {
        beeCoutner = false;
        beeSound.src = "Egg.mp3";
        beeSound.play();
        setTimeout(function () {
            beeCoutner = true;
        }, 4000);
    }
});

if (localStorage.getItem("liveWallpaper") == 'true') {
    inp2.checked = true;
} else {
    inp2.checked = false;
}

del.addEventListener("click", function () {
    if (localStorage.getItem("liveWallpaper") == 'true') {
        localStorage.setItem("tagBg", '');
        alert("Категория удалена!");
        tagName.innerHTML = "---";
    }
})

if (localStorage.getItem("tagBg") == " " || localStorage.getItem("tagBg") == "" || localStorage.getItem("tagBg") == null) {
    tagName.innerHTML = "---";
} else {
    tagName.innerHTML = localStorage.getItem("tagBg");
}

btn.addEventListener("click", function () {
    if (localStorage.getItem("liveWallpaper") == 'true') {
        if (input.value != '' || input.value != ' ') {
            localStorage.setItem("tagBg", input.value);
            alert("Категория создана!");
            tagName.innerHTML = localStorage.getItem("tagBg");
        } else {
            localStorage.setItem("tagBg", '');
            tagName.innerHTML = "---";
        }
    }
})

color[0].addEventListener("click", function () { changeColor(0) });
color[1].addEventListener("click", function () { changeColor(1) });
color[2].addEventListener("click", function () { changeColor(2) });
color[3].addEventListener("click", function () { changeColor(3) });
color[4].addEventListener("click", function () { changeColor(4) });
color[5].addEventListener("click", function () { changeColor(5) });

sw2.addEventListener("click", function () {
    if (inp2.checked) {
        localStorage.setItem("liveWallpaper", true);
    } else {
        localStorage.setItem("liveWallpaper", false);
    }
});

back.addEventListener("click", function () {
    body.style.animation = "bganim 0.6s forwards";
    setTimeout(function () {
        window.location.href = "../index.html";
    }, 1000);
});