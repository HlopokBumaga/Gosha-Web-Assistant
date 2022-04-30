// GoshaWeb Alpha 1.0

// Переменные
// Стоит использовать const, если это возможно
// Это покажет, что переменная не поменяется никак, только будет использоваться.
const settBtn = document.querySelector("#Settings_Btn");
const settings = document.getElementById("settings");
const gosha = document.getElementById("Gosha");
const speakLight = document.getElementById("speak-light");

let countSett = 1;
let dsBtn = true;

// А почему называется camera?
const camera = new Audio('assets/sounds/speak/blip3.mp3');
// Function
// Gosha

gosha.addEventListener("click", function() {
    if (dsBtn == true) {
        // Для чего? 
        // gosha.classList.remove("fade-in");
        // gosha.offsetWidth = gosha.offsetWidth;

        // .toggle() будет добавлять класс, если нет, и удалять, если класс есть
        gosha.classList.add("fade-in");
        // blurElement можно использовать в будущем для разных элементов
        toggleBlurElement(gosha);
        toggleHideElement(speakLight);
        // speakLight.style.opacity = "1";

        dsBtn = false;

        // gosha.style.filter = "brightness(50%)";

        let audio = new Audio('assets/sounds/speak/Tisy.mp3');
        audio.play();

        audio.onloadeddata = function() {
            const delay = Math.round(audio.duration) * 1000;
            setTimeout(function() {
                toggleBlurElement(gosha);
                toggleHideElement(speakLight);
                gosha.classList.remove("fade-in");
                dsBtn = true;
            }, delay);
        }
    }
});


// Настройки
let settingsClicked = false;
settBtn.addEventListener("click", function () {
  settings.classList.toggle('hide');
  camera.play();
  // Вместо подсчёта мы можем пользоваться трюком, который вернет обратное значение
  // Теперь можно не считать

  // settingsClicked = !settingsClicked;
  // Можешь применить к dsBtn
  // if (settingsClicked) {
  //     settings.classList.add('hide');
  // } else {
  //     settings.classList.remove('hide');
  // }
  // Но все равно я смог заменить
});

function toggleBlurElement(el) {
  el.classList.toggle('blur');
}

function toggleHideElement(el) {
  el.classList.toggle('hide');
}