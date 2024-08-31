import {ui} from "./ui.js"
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


async function locationWeatherData(place) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=37JHTAYVVJH37V3KZUGSMERW4`, {mode: "cors"})
    const weatherData = await response.json()
    objectData(weatherData)
}

async function objectData(Data) {
    const date = new Date()
    const hour = date.getHours()
    const relevantData = {}
    relevantData.address = Data.address
    relevantData.description = Data.description
    relevantData.timezone = Data.timezone
    relevantData.condition = Data.days[0].conditions
    relevantData.temperature = convertToCelsius(Data.days[0].hours[hour].temp)
    console.log(Data)
    console.log(relevantData)
}

function convertToCelsius(num) {
    const result = num-32
    const result2 = 5/9
    return Math.ceil(result * result2)
}

/*
Address
timezone
condition
temperature
humidity
wind speed

*/