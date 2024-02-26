"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sendBtn = document.getElementById("sendBtn");
const regionInput = document.getElementById("regionInput");
const capitalInput = document.getElementById("capitalInput");
const time = document.getElementById("time");
const getTimeObj = (capital, region) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield fetch(`https://worldtimeapi.org/api/timezone/${region}/${capital}`);
        if (response.ok) {
            return response.json();
        }
        else {
            alert("Error occur try again!");
        }
    }
    catch (_a) {
        alert("Error occur try again!");
    }
});
let capital;
let region;
let rawOffset;
let unixTime;
sendBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    capital = capitalInput.value;
    region = regionInput.value;
    let timeObj = yield getTimeObj(capital, region);
    rawOffset = timeObj.raw_offset;
    unixTime = timeObj.unixtime;
    setInterval(() => {
        displayTime(unixTime, rawOffset);
    }, 1000);
}));
let hours;
let min;
let sec;
const displayTime = (unixTime, rawOffset) => {
    unixTime++;
    hours = new Date(unixTime * 1000 + rawOffset * 1000).getHours() - 2;
    min = new Date().getMinutes();
    sec = new Date().getSeconds();
    let clock_hours;
    let clock_min;
    let clock_sec;
    if (hours < 10) {
        clock_hours = `0${hours}`;
    }
    else {
        clock_hours = `${hours}`;
    }
    if (min < 10) {
        clock_min = `0${min}`;
    }
    else {
        clock_min = `${min}`;
    }
    if (sec < 10) {
        clock_sec = `0${sec}`;
    }
    else {
        clock_sec = `${sec}`;
    }
    time.innerText = `${clock_hours}:${clock_min}:${clock_sec}`;
};
