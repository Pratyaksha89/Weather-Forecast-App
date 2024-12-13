const API_KEY = "1d8193a77cd649b183460840241212";

// Event listener for search button
document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) fetchWeatherData(city);
});

// Event listener for current location button
document.getElementById("current-location-btn").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherDataByCoords(latitude, longitude);
    });
});

// Display the spinner before fetching the data
const showSpinner = () => {
    document.getElementById("loading-spinner").classList.remove("hidden");
    document.getElementById("weather-display").classList.add("hidden");
};

// Hide the spinner after data is fetched
const hideSpinner = () => {
    document.getElementById("loading-spinner").classList.add("hidden");
    document.getElementById("weather-display").classList.remove("hidden");
};

// Fetch weather data for multiple cities
const fetchWeatherDataForCities = async (cities) => {
    const cityData = [];
    for (let city of cities) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
        const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;
        try {
            const weatherData = await fetchAPI(url);
            const forecastData = await fetchAPI(forecastUrl);
            cityData.push({ weatherData, forecastData });
        } catch (error) {
            console.log(`Error fetching data for ${city}: ${error}`);
        }
    }
    return cityData;
};

// Fetch weather data by city
const fetchWeatherData = async (city) => {
    showSpinner(); // Show spinner before fetching
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;
    try {
        const weatherData = await fetchAPI(url);
        const forecastData = await fetchAPI(forecastUrl);
        displayWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error(error);
        alert("Failed to fetch weather data. Please try again.");
    } finally {
        hideSpinner(); // Hide spinner after the data is displayed
    }
};

// Fetch weather data by coordinates
const fetchWeatherDataByCoords = async (lat, lon) => {
    showSpinner(); // Show spinner before fetching
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`;
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`;
    try {
        const weatherData = await fetchAPI(url);
        const forecastData = await fetchAPI(forecastUrl);
        displayWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error(error);
        alert("Failed to fetch weather data. Please try again.");
    } finally {
        hideSpinner(); // Hide spinner after the data is displayed
    }
};

// Fetch data from API
const fetchAPI = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Unable to fetch weather data. Please try again later.");
    }
};

// Display current weather
const displayWeather = (data) => {
    if (data) {
        document.getElementById("weather-display").classList.remove("hidden");
        document.getElementById("location-name").textContent = `${data.location.name}, ${data.location.country} (${data.location.localtime.split(" ")[0]})`;
        document.getElementById("weather-icon").src = data.current.condition.icon;
        document.getElementById("temperature").textContent = `Temperature: ${data.current.temp_c}°C`;
        document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
        document.getElementById("wind-speed").textContent = `Wind: ${data.current.wind_kph} km/h`;
    }
};

// Display forecast
const displayForecast = (data) => {
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";
    data.forecast.forecastday.forEach((forecast) => {
        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card", "p-4", "shadow-md", "bg-gray-700", "rounded-lg");
        forecastCard.innerHTML = `
            <p class="text-center font-bold">${forecast.date}</p>
            <img src="${forecast.day.condition.icon}" alt="Icon" class="w-12 h-12 mx-auto">
            <p class="text-center">Max Temp: ${forecast.day.maxtemp_c}°C</p>
            <p class="text-center">Min Temp: ${forecast.day.mintemp_c}°C</p>
            <p class="text-center">Wind: ${forecast.day.maxwind_kph} km/h</p>
            <p class="text-center">Humidity: ${forecast.day.avghumidity}%</p>
        `;
        forecastContainer.appendChild(forecastCard);
    });
};

// Save recently searched city
const saveSearchedCity = (city) => {
    let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    if (!recentCities.includes(city)) {
        recentCities.push(city);
        if (recentCities.length > 5) recentCities.shift();  // Keep only the last 5 cities
        localStorage.setItem("recentCities", JSON.stringify(recentCities));
    }
    updateRecentCitiesDropdown();
};

// Update dropdown with recent cities
const updateRecentCitiesDropdown = () => {
    const dropdown = document.getElementById("recently-searched-cities");
    dropdown.innerHTML = "";
    const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    recentCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        dropdown.appendChild(option);
    });
    dropdown.classList.remove("hidden");
    dropdown.addEventListener("change", (e) => {
        fetchWeatherData(e.target.value);
    });
};

// On page load, initialize the recent cities dropdown
document.addEventListener("DOMContentLoaded", updateRecentCitiesDropdown);
