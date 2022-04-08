const apikey = "99b176eed3aed8b8540e56dd3cc2a79c"
const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin:"cors"
    })
    const respData = await resp.json()
    console.log(respData, ktoC(respData.main.temp))
    addWeatherToPage(respData)
    
}




function addWeatherToPage(data) {
    main.innerHTML = ""
    const  temp = ktoC(data.main.temp)
    const weather = document.createElement('div')
    weather.classList.add('weather')
   
    weather.innerHTML = `
    <h2>
     <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>
     ${temp}C  
    </h2>
    <small>${data.weather[0].main}</small>`
 

    main.appendChild(weather)
}

function ktoC(k) {
    return (k - 273.15).toFixed(2)
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = search.value
   
    if(city) {
        getWeatherByLocation(city)
    }
})