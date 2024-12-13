document.getElementById('getWeather').addEventListener('click', () => {
    const cityName = document.getElementById('city').value; // Get city from input field with id="city"
    const apiKey = '5f510a658aa5c5264064b594ef31a7ec'; // Your API key
    const weatherInfo = document.getElementById('weatherInfo');
    const error = document.getElementById('error');

    // Check if the city name is empty
    if (!cityName) {
        error.textContent = 'Please enter a city name';
        error.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
        return;
    }

    // Fetch weather data using the city name and API key
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName},IN&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // For debugging to see the full data

            // Display weather information for the first forecast entry
            const firstForecast = data.list[0];
            document.getElementById('cityName').textContent = `Weather Forecast for ${data.city.name}`;
            document.getElementById('temp').textContent = `Temperature: ${firstForecast.main.temp}°C`;
            document.getElementById('description').textContent = `Description: ${firstForecast.weather[0].description}`;
            document.getElementById('icon').src = `https://openweathermap.org/img/wn/${firstForecast.weather[0].icon}.png`;
            weatherInfo.classList.remove('hidden');
            error.classList.add('hidden');
        })
        .catch(err => {
            console.error(err);
            weatherInfo.classList.add('hidden');
            error.textContent = 'City not found or API issue. Please try again.';
            error.classList.remove('hidden');
        });
});
