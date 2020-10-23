const adhan = require('adhan')
const moment = require('moment-timezone')
const player = require('play-sound')(opts = {})
const Gpio = require('onoff').Gpio;
const LED = new Gpio(4, 'out');

LED.writeSync(1); 

// const PRAYERS = {
//     fajr:"a1.mp3",
//     sunrise:"a2.mp3",
//     dhuhr:"a3.mp3",
//     asr:"a4.mp3",
//     magrib:"a5.mp3",
//     isha:"a6.mp3"
// }
const coordinates = new adhan.Coordinates(25.204849,55.270782);
const params = adhan.CalculationMethod.Dubai();
//params.madhab = adhan.Madhab.Hanafi;
// params.adjustments.maghrib = 1;
// params.adjustments.asr = -1;
// params.adjustments.isha = 1;
//params.adjustments.sunrise = -.8;

let playing = false;
//console.log("Now paying : " + playing)
function playAzan(prayerName) {
    playing = true;
    LED.writeSync(0);
    //console.log("Now paying : " + playing)
    player.play(prayerName, function(err){
        if (err) throw err
        playing = false;
        LED.writeSync(1); 
        //console.log("Now paying : " + playing)
    })   
}

const prayer = setInterval(()=>{
    if(!playing){
    let date = new Date()
    let prayerObject = {}
    let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
    let currentTime = moment(date).tz('Asia/Dubai').format('h:mm A');
    //console.log(currentTime);
    prayerObject.fajr = moment(prayerTimes.fajr).tz('Asia/Dubai').format('h:mm A');
    //console.log("Fajr:" + prayerObject.fajr)
    prayerObject.sunrise = moment(prayerTimes.sunrise).tz('Asia/Dubai').format('h:mm A');
    //console.log("sunriseTime:" + prayerObject.sunrise)
    prayerObject.dhuhr = moment(prayerTimes.dhuhr).tz('Asia/Dubai').format('h:mm A');
    //console.log("dhuhrTime:" + prayerObject.dhuhr)
    prayerObject.asr = moment(prayerTimes.asr).tz('Asia/Dubai').format('h:mm A');
    //console.log("asrTime:" + prayerObject.asr)
    prayerObject.maghrib = moment(prayerTimes.maghrib).tz('Asia/Dubai').format('h:mm A');
    //console.log("maghribTime:" + prayerObject.maghrib)
    prayerObject.isha = moment(prayerTimes.isha).tz('Asia/Dubai').format('h:mm A');
    //console.log("ishaTime:" + prayerObject.isha)
    switch (currentTime) {
        case prayerObject.fajr:
            playAzan("adhan_mecca.mp3");
            console.log("Prayer for fajr")
            break;
        case prayerObject.sunrise:
            playAzan("adhan_mecca.mp3");
            console.log("Prayer for sunrise")
            break;
        case prayerObject.dhuhr:
            playAzan("adhan_mecca.mp3");
            console.log("Prayer for dhuhr")
            break;
        case prayerObject.asr:
            playAzan("adhan_mecca.mp3");
            console.log("Prayer for asr")
            break;
        case prayerObject.maghrib:
            playAzan("adhan_mecca.mp3");
            console.log("Prayer for magrib")
            break;
        case prayerObject.isha:
            playAzan("adhan_mecca.mp3");
            console.log("Prayer for isha")
            break;
        default:
            console.log("Not matching any prayer time")
            break;
    }
}else{
    //console.log("Now paying : " + playing)
}
   
},30000)
