const locationElement = document.getElementById("location");
const getWeatherButton = document.getElementById("get-weather");
const userInputLocation = document.getElementById("user-location");
const weatherImage = document.getElementById("weather-image");
const weatherContainer = document.getElementById("weather-container");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    locationElement.textContent = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherData(lat, lon);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationElement.textContent = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      locationElement.textContent = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      locationElement.textContent = "The request to get user location timed out.";
      break;
    default:
      locationElement.textContent = "An unknown error occurred.";
  }
}

function getWeatherData(lat, lon) {
  // Replace with your chosen weather API URL and API key
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=<span class="math-inline">\{lat\}&lon\=</span>{lon}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const city = data.name;
      const temp = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
      const description = data.weather[0].description;
      const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Weather icon URL

      updateWeatherDisplay(city, temp, description, weatherIcon);
    })
    .catch(error => console.error(error));
}

function updateWeatherDisplay(city, temp, description, weatherIcon) {
  locationElement.innerHTML = `<h2>Weather in ${city}</h2>
                                  <p>Temperature: ${temp}&#8451;</p>
                                  <p>Description: ${description}</p>`;
  weatherImage.src = weatherIcon;

  // Add color animation based on weather description
  switch (description) {
    case /sunny|clear/i.🟧
      weatherContainer.style.backgroundColor = "#ffff99"; // Light yellow for sunny
      break;
    case /cloudy/i.🟦
      weatherContainer.style.backgroundColor = "#cccccc"; // Gray for cloudy
      break;
    case /rainy|shower/i.🟦
      weatherContainer.style.backgroundColor = "#87ceeb"; // Light blue for rain
      break;
    default:
      weatherContainer.style.backgroundColor = "#f0f0f0"; // Default gray
  }
}

getWeatherButton.addEventListener("click", () => {
  const userLocation = userInputLocation.value;
  if (userLocation) {
    // Replace with your chosen weather API URL for city search (if supported)
    const url = `https://api
