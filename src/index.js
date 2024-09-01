import {style} from "./style.css"


const searchInput = document.getElementById("locationInput")
const submitBtn = document.querySelector(".searchSubmitBtn")

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (searchInput.value !== "") {
        console.log(searchInput.value)
        locationWeatherData(searchInput.value)
    } else {
        alert("Enter Your Location!")
    }
})

const forecastUiElements = (function () {
    const locationAddress = document.querySelector('.address')
    const temperature = document.querySelector(".temperature")
    const humid = document.querySelector('.humidity')
    const timeZone = document.querySelector(".timezone")
    const feelsLike = document.querySelector(".feelslike")
    const windSpeed = document.querySelector(".windspeed")
    const weatherCon = document.querySelector(".weatherCondition")
    const weatherDes = document.querySelector(".weatherDescription")
    
    return {locationAddress, temperature, humid, timeZone, feelsLike, windSpeed, weatherCon, weatherDes}
})()

async function locationWeatherData(place) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=37JHTAYVVJH37V3KZUGSMERW4`, {mode: "cors"})
    const weatherData = await response.json()
    objectData(weatherData)
}

async function objectData(Data) {
    const date = new Date()
    const currentHour = date.getHours()
    forecastUiElements.locationAddress.textContent = `${Data.resolvedAddress}`
    forecastUiElements.temperature.textContent = `${convertToCelsius(Data.days[0].hours[currentHour].temp)} C°`
    forecastUiElements.humid.textContent = `${Math.round(Data.days[0].hours[currentHour].humidity)}%`
    forecastUiElements.timeZone.textContent = `${Data.timezone}`
    forecastUiElements.feelsLike.textContent = `${convertToCelsius(Data.days[0].hours[currentHour].feelslike)} C°`
    forecastUiElements.windSpeed.textContent = `${Data.days[0].hours[currentHour].windspeed} km/h`
    forecastUiElements.weatherCon.textContent = `${Data.days[0].conditions}`
    forecastUiElements.weatherDes.textContent = `${Data.days[0].description}`
    projectWeatherImage(Data.days[0].icon)

    console.log(Data.days[0].hours[currentHour].temp)
    console.log(Data.days[0].hours[currentHour].feelslike)
    console.log(Data)
}

function convertToCelsius(num) {
    const result = num-32
    const result2 = 5/9
    return Math.round(result * result2)
}


async function projectWeatherImage(icon) {
    const weatherReflector = document.querySelector(".reflectionOfWeather")
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=ksnTUli7LHRvNmYPTTw4WT8KnxZY4ShT&s=${icon}`, {mode: "cors"})
    const resolvedResponse = await response.json()
    weatherReflector.src = resolvedResponse.data.images.original.url
}

