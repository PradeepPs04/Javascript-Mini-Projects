const userTabBtn = document.querySelector('[data-userWeather]');
const searchTabBtn = document.querySelector('[data-searchWeather]');
const locationAccessContainer = document.querySelector('.grant-location-container');
const locationAccessBtn = document.querySelector('[data-grantAccess]');
const weatherInfoContainer = document.querySelector('.weather-info-container');
const loadingScreen = document.querySelector('.loading-container');
const notFoundScreen = document.querySelector('.not-found-container');
const searchForm = document.querySelector('.form-container');
const cityInput = document.querySelector('[data-searchInput]');

const cityName = document.querySelector('[data-cityName]');
const flag = document.querySelector('[data-countryIcon]');
const currWeather = document.querySelector('[data-weatherDesc]');
const weatherIcon = document.querySelector('[data-weatherIcon]');
const temperature = document.querySelector('[data-temp]');

const windSpeed = document.querySelector('[data-windSpeed]');
const humidity = document.querySelector('[data-humidity]');
const clouds = document.querySelector('[data-cloud]');


const API_KEY = "fc1de2316692856f41c7817aa004d7b5";






let currentTab = userTabBtn;

currentTab.classList.add('current-tab');

userTabBtn.addEventListener('click', () => switchTab(userTabBtn));
searchTabBtn.addEventListener('click', () => switchTab(searchTabBtn));

function switchTab(newTab) {
    if(newTab === currentTab)   return;
    if(currentTab != newTab) {
        currentTab.classList.remove('current-tab');
        currentTab = newTab;
        currentTab.classList.add('current-tab');
    }

    // if current tab is search weather and user selected his location weather
    if(searchForm.classList.contains('active')) {
        searchForm.classList.remove('active');
        weatherInfoContainer.classList.remove('active');
        notFoundScreen.classList.remove('active');
        // if user location was previously fetched then load it from session storage
        getLocationFromSessionStorage();
    }
    else {
        searchForm.classList.add('active');
        cityInput.value = '';   
        locationAccessContainer.classList.remove('active');
        weatherInfoContainer.classList.remove('active');
        notFoundScreen.classList.remove('active');
    }
}

function getLocationFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem('user-coordinates'); 
    // if data not saved in session storage
    // it means that user hasn't allowed access to location 
    if(!localCoordinates) {
        locationAccessContainer.classList.add('active');
    }
    else {
        const userCoordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(userCoordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    locationAccessContainer.classList.remove('active');
    loadingScreen.classList.add('active');

    try {
        const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await rawData.json();
        
        loadingScreen.classList.remove('active');
        weatherInfoContainer.classList.add('active');
        renderWeatherInfo(data);
    }
    catch {
        loadingScreen.classList.remove('active');
        weatherInfoContainer.classList.remove('active');
        // show some error here
        // maybe a container which says some error occured


    }
}

function renderWeatherInfo(data) {
    cityName.innerText = data?.name;
    flag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    currWeather.innerText = data?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temperature.innerText = data?.main?.temp + ' °C';
    windSpeed.innerText = data?.wind?.speed + ' m/s';
    humidity.innerText = data?.main?.humidity + '%';
    clouds.innerText = data?.clouds?.all + '%';
}


locationAccessBtn.addEventListener('click', getLocation());

function getLocation() {
    // if browser supports geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition); // showPosition() is callback function
    }
    else {
        alert('geolocation is not supported');
    }
}

function showPosition(position) {
    // creating userCoordinates
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }

    // save userCoordinates in session storage
    sessionStorage.setItem('user-coordinates', JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

// search weather data by city name
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let input = cityInput.value.trim();
    if(input === '')  return;
    // console.log(input);
    fetchSearchWeatherInfo(input);
});

async function fetchSearchWeatherInfo(city) {
    try {
        weatherInfoContainer.classList.remove('active');
        loadingScreen.classList.add('active');
        locationAccessContainer.classList.remove('active');
        notFoundScreen.classList.remove('active');
        
        let rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let data = await rawData.json();

        loadingScreen.classList.remove('active');
        
        // render details only if city name is found
        if(data?.name !== undefined) {
            weatherInfoContainer.classList.add('active');
            renderWeatherInfo(data);
        }
        else {
            notFoundScreen.classList.add('active');
        }
    }
    catch {
        // show some error here
        // maybe a container which says some error occured

    }
}