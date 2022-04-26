# Gosha Web

#### Gosha - is a voice assistant on a PC. Having Gosha on just one system is not particularly convenient. Therefore, a new solution has appeared that solves a number of disadvantages

## Advantages and disadvantages
- Cross-platform -  Now Gosha can be used on any systems with `internet access, microphone and speaker`
- Without additional installations
- Speed
- Availability

## Instruction manual
![App Screenshot](https://i.ibb.co/YZMGPPZ/2022-04-23-143041436.png)

#### This is what Gosha looks like on a Pc, at the very bottom there is a button, when clicked, Gosha launches the `main function`:
```javascript
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
```

#### In the upper left corner there is a button, when clicked, a window with the version and other data appears
![App Screenshot](https://i.ibb.co/RY0NK3n/2022-04-23-143920337.png)

```javascript
let countSett = 1;
settBtn.addEventListener("click", function () {
    if (countSett == 0) {
        settings.style.opacity = "0";
        countSett += 1;
    } else {
        settings.style.opacity = "1";
        countSett -= 1;
    }
});
```
Gosha is also optimized for different platforms.
This is how Gosha looks on the phone:  
![App Screenshot](https://i.ibb.co/yn7ndXb/2022-04-23-144400146.png)

## Support & License
Link to GoshaWeb: http://goshaweb.netlify.app  
Feedback mail: goshafeedback@gmail.com

Copyright © DimaK 2021-2022  
ItGym Software Production
