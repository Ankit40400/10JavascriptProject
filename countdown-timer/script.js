const newYear = '1 Jan 2023'
const daysText = document.getElementById("days")
const hoursText = document.getElementById("hours")
const minsText = document.getElementById("mins")
const secondText = document.getElementById("seconds")

function countdown() {
    const newYearDate = new Date(newYear)
    const currentDate = new Date()
    const timedif = newYearDate-currentDate
    const seconds = timedif / 1000

    const days = Math.floor(seconds / 3600 / 24)
    const hours = Math.floor(seconds/ 3600) % 24
    const min = Math.floor(seconds / 60 ) % 60
    const sec = Math.floor(seconds % 60)

    daysText.innerHTML = formatTime(days)
    hoursText.innerHTML = formatTime(hours)
    minsText.innerHTML = formatTime(min)
    secondText.innerHTML = formatTime(sec) 
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time
}

countdown()

setInterval(countdown,1000)
