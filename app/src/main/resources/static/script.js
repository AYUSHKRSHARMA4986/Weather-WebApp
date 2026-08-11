// Allow pressing "Enter" to trigger the search
document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const errorEl = document.getElementById("error");
    const loadingEl = document.getElementById("loading");
    const weatherCardEl = document.getElementById("weatherResult");

    // Reset UI state
    errorEl.classList.add("hidden");
    weatherCardEl.classList.add("hidden");

    if (city.trim() === "") {
        errorEl.innerText = "Please enter a city name.";
        errorEl.classList.remove("hidden");
        return;
    }

    loadingEl.classList.remove("hidden");

    try {
        const response = await fetch(
            `/weather/getWeather/${encodeURIComponent(city)}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update DOM elements
        document.getElementById("city").innerText = data.location.name + ", " + data.location.country;
        document.getElementById("temperature").innerText = Math.round(data.current.temp_c);
        document.getElementById("condition").innerText = data.current.condition.text;
        document.getElementById("humidity").innerText = data.current.humidity;
        document.getElementById("wind").innerText = data.current.wind_kph;
        document.getElementById("cloud").innerText = data.current.cloud;
        document.getElementById("visibility").innerText = data.current.vis_km;
        document.getElementById("uv").innerText = data.current.uv;
        const rainChance = data.forecast ? data.forecast.forecastday[0].day.daily_chance_of_rain : "--";
        document.getElementById("rain").innerText = rainChance;

        // Hide loading and show the result card
        loadingEl.classList.add("hidden");

        // Remove hidden class and trigger re-animation by resetting element
        weatherCardEl.classList.remove("hidden");
        weatherCardEl.style.animation = 'none';
        weatherCardEl.offsetHeight; /* trigger reflow */
        weatherCardEl.style.animation = null;

    } catch (error) {
        loadingEl.classList.add("hidden");
        errorEl.innerText = "City not found or unable to fetch data.";
        errorEl.classList.remove("hidden");
    }
}