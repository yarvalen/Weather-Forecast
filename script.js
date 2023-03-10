console.log("connected")
var apiKey = '773c7018bbab8899c1b942593f14b898';
var search = [];

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var searchBtn = document.querySelector('#search-button');
var cityFind = document.querySelector('#city');
var locationSearch = document.querySelector('.locationSearch');
var nowresults = document.querySelector('#nowresults');
var weather = document.querySelector('#weather');
var forecastinfo = document.querySelector(".forecastinfo")
let arrayLocalStorage = JSON.parse(localStorage.getItem("city"))||[]
var goBackBtn = document.querySelector('.goBackBtn');
var past = document.querySelector(".past")

searchBtn.addEventListener('click', function(event){
event.preventDefault()
var citySearch = cityFind.value
console.log(citySearch)
searchApi(citySearch)
})

// fetching the forecast for the city name
function searchApi(city) {
    var cityinfo = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid='+apiKey

fetch(cityinfo)
.then(function (response){
if (!response.ok){
    throw response.json();
}
return response.json();
})
.then(function(cityweather){
    console.log(cityweather);
    nowresults.innerHTML = ""
    let cityname = document.createElement('h1')
    let citytemp = document.createElement('h2')
    let cityhumidity = document.createElement('h2')
    let citywind = document.createElement('h2')
    let currentIcon = cityweather.weather[0].icon
    let imageUrl = "https://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
    cityname.textContent = "City Name:"+cityweather.name
    citytemp.textContent = cityweather.main.temp+"°C"
    cityhumidity.textContent = cityweather.main.humidity+"%"
    citywind.textContent = cityweather.wind.speed+"speed"
    nowresults.appendChild(cityname)
    nowresults.appendChild(citytemp)
    nowresults.appendChild(cityhumidity)
    nowresults.appendChild(citywind)
    $(nowresults).append($("<img>").attr("src", imageUrl))
    citySearch(cityweather.coord.lon,cityweather.coord.lat)
})
}
function citySearch (lon,lat){
fetch ('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=imperial&appid='+apiKey)
.then(function (response){
    if (!response.ok){
        throw response.json();
    }
    return response.json();
    })
    .then(function(fiveDay){
        console.log(fiveDay);
     $(fiveDay).empty();
    console.log(lon,lat);
for (var i=0; i< fiveDay.list.length; i+=8){
console.log(fiveDay.list[i])
let everyDayTemp = fiveDay.list[i].main.temp;
let everyDayHumidity = fiveDay.list[i].main.humidity;
let everyDayWind = fiveDay.list[i].wind.speed;
// console.log(everyDayWind)
let everyDayIcon = fiveDay.list[i].weather.icon
let imageUrl = "https://openweathermap.org/img/wn/" + everyDayIcon + "@2x.png"

$(forecastinfo).append($("<img>").attr("src", imageUrl))
$(forecastinfo).append($("<p>").text("Temperature is:"+everyDayTemp))
$(forecastinfo).append($("<p>").text("Humidity is:"+everyDayHumidity))
$(forecastinfo).append($("<p>").text("Wind speed is:"+everyDayWind))


    }
    addLocalStorage(fiveDay)
    buttonStorage ()
}) 
}
function addLocalStorage(fiveDay){
    let searchCityWeather = fiveDay.city.name
    arrayLocalStorage.push(searchCityWeather);
    JSON.stringify(arrayLocalStorage)
    localStorage.setItem("city",JSON.stringify(arrayLocalStorage));
}

function buttonStorage(){
    var previousCity = JSON.parse(localStorage.getItem("city"))||[];
    past.innerHTML=""
    for (let i=0; i<previousCity.length; i++){
        const newButton = document.createElement("button")
        newButton.textContent = previousCity [i]
        past.appendChild(newButton)
        
    }
}

buttonStorage()