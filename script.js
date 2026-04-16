async function getWeather() {
    let city = document.getElementById("city").value.trim();

    if (city === "") {
        document.getElementById("result").innerHTML = "⚠️ Please enter a city name";
        return;
    }

    let apiKey = "83ccd61e07535b47ffcb0bc6972e208a";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Loading animation
    document.getElementById("result").innerHTML = `
        <p style="animation: fadeIn 0.5s;">⏳ Fetching weather...</p>
    `;

    try {
        let response = await fetch(url);

        // Check if response is OK
        if (!response.ok) {
            throw new Error("API not responding");
        }

        let data = await response.json();
        console.log(data);

        if (data.cod == "404") {
            document.getElementById("result").innerHTML = "❌ City not found!";
            return;
        }

        let temp = Math.round(data.main.temp);
        let weather = data.weather[0].description;
        let name = data.name;
        let icon = data.weather[0].icon;

        // Premium UI output
        document.getElementById("result").innerHTML = `
            <h2>${name}</h2>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
            <h1>${temp}°C</h1>
            <p style="text-transform: capitalize;">${weather}</p>
        `;

    } catch (error) {
        console.log(error);
        document.getElementById("result").innerHTML = `
            ❌ Error fetching data <br> 
            <small>Check API key or internet</small>
        `;
    }
}

// Enter key support
document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});