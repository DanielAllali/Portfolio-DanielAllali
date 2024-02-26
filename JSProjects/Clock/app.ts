interface ITimeInfo {
    abbreviation: string;
    client_ip: string;
    datetime: string;
    day_of_week: number;
    day_of_year: number;
    dst: boolean;
    dst_from: null | string;
    dst_offset: number;
    dst_until: null | string;
    raw_offset: number;
    timezone: string;
    unixtime: number;
    utc_datetime: string;
    utc_offset: string;
    week_number: number;
}

const sendBtn: HTMLButtonElement = document.getElementById("sendBtn") as HTMLButtonElement;
const regionInput: HTMLInputElement = document.getElementById("regionInput") as HTMLInputElement;
const capitalInput: HTMLInputElement = document.getElementById("capitalInput") as HTMLInputElement;
const time: HTMLHeadElement = document.getElementById("time") as HTMLHeadElement;


const getTimeObj = async (capital: string, region: string) => {
    try {
        let response = await fetch(`https://worldtimeapi.org/api/timezone/${region}/${capital}`);
        if (response.ok) {
            return response.json();
        }
        else {
            alert("Error occur try again!");
        }
    }
    catch {
        alert("Error occur try again!");
    }
}

let capital: string;
let region: string;
let rawOffset: number;
let unixTime: number;


sendBtn.addEventListener("click", async () => {
    capital = capitalInput.value;
    region = regionInput.value;
    let timeObj = await getTimeObj(capital, region);
    rawOffset = timeObj.raw_offset;
    unixTime = timeObj.unixtime;
    setInterval(() => {
        displayTime(unixTime, rawOffset);
    }, 1000);
})

let hours: number;
let min: number;
let sec: number;

const displayTime = (unixTime: number, rawOffset: number) => {
    unixTime++;
    hours = new Date(unixTime * 1000 + rawOffset * 1000).getHours() - 2;
    min = new Date().getMinutes();
    sec = new Date().getSeconds();
    let clock_hours: string;
    let clock_min: string;
    let clock_sec: string

    if (hours < 10) {
        clock_hours = `0${hours}`;
    } else {
        clock_hours = `${hours}`;
    }

    if (min < 10) {
        clock_min = `0${min}`;
    } else {
        clock_min = `${min}`;
    }

    if (sec < 10) {
        clock_sec = `0${sec}`;
    } else {
        clock_sec = `${sec}`;
    }

    time.innerText = `${clock_hours}:${clock_min}:${clock_sec}`
}