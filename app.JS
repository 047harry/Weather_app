async function getWeather() {
    const city = document.getElementById('city-input').value;
    const url = `/api/weather?city=${city}`; // Call serverless API

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert('City not available');
        }
    } catch (error) {
        alert('Error fetching data. Please try again later.');
    }
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const weatherIcon = document.querySelector(".weather-icons");

    document.getElementById('city-name').innerText = `${cityName}`;
    document.getElementById('temperature').innerText = `${Math.round(temperature)}°C`;
    
    document.querySelector(".humidity").innerText = data.main.humidity + `%`;
    document.getElementsByClassName('wind')[0].innerText = `${windSpeed} m/s`;

    if(data.weather[0].main === "Clouds") {
        weatherIcon.src  = "images/clouds.png";
    } else if(data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if(data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if(data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather-result").style.display = "block";
}

document.getElementById('city-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});
