import * as dataSet from './DataSet.js';
import * as module from '../functions.js';

export var category = [];
export var notresult = 0;
export var finalResponse = "";
export var finalResponseAudioList = [];
export var finalResponseAudio = new Audio;
export var finalResponseAudioTwo = new Audio;

export function inputFunction(string) {
    let string_list = string;
    
    for (var item in dataSet.inpData) {
        for (var items in dataSet.inpData[item]) {
            for (let i = 0; string_list.length > i; i++) {
                if (string_list[i].toLowerCase() == dataSet.inpData[item][items]) {
                    var key = Object.keys(dataSet.inpData).filter(function(key) {return dataSet.inpData[key] === dataSet.inpData[item]})[0];
                    category.push(key);
                    notresult += 1;
                }
            }
        }
    }
    outputFunction();
}

export function playGslaSounds() {
    if (finalResponseAudioList.length == 1) {
        finalResponseAudio.src = finalResponseAudioList[0];
        finalResponseAudio.play();
        finalResponseAudio.onloadedmetadata = function () {
            let rty = Math.round(finalResponseAudio.duration) * 1000;
            setTimeout(function () {
                finalResponseAudioList.splice(0, finalResponseAudioList.length);
                module.speakLight.style.opacity = "0";
                module.gosha.style.filter = "brightness(100%)";
                module.dsBtn.value = true;
                return;
            }, rty);
        }
    } if (finalResponseAudioList.length == 2) {
        finalResponseAudio.src = finalResponseAudioList[0];
        finalResponseAudio.play();
        finalResponseAudio.onloadedmetadata = function () {
            let rty = Math.round(finalResponseAudio.duration) * 1000;
            setTimeout(function () {
                finalResponseAudioTwo.src = finalResponseAudioList[1];
                finalResponseAudioTwo.play();
                finalResponseAudioTwo.onloadedmetadata = function () {
                    let rty = Math.round(finalResponseAudioTwo.duration) * 1000;
                    setTimeout(function () {
                        finalResponseAudioList.splice(0, finalResponseAudioList.length);
                        module.speakLight.style.opacity = "0";
                        module.gosha.style.filter = "brightness(100%)";
                        module.dsBtn.value = true;
                        return;
                    }, rty);
                }
            }, rty);
        }
    }
}

export function outputFunction() {
    if (notresult == 0) {
        module.speakLight.style.opacity = "0";
        module.gosha.style.filter = "brightness(100%)";
        module.dsBtn.value = true;
    } else {
        finalResponseAudioList.splice(0, finalResponseAudioList.length);
        for (let i = 0; category.length > i; i++) {
            for (var key in dataSet.outData) {
                if (category[i] == key) {
                    finalResponseAudioList.push("./assets/modules/GSLA/GslaSounds/" + dataSet.outData[key][Math.floor(Math.random() * dataSet.outData[key].length)] + ".mp3");
                }
            }
        }
        category.splice(0, category.length);
        notresult = 0;
    }
    playGslaSounds();
}