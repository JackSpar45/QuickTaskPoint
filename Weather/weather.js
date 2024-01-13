    
const app = document.querySelector('.weather-app');
const temp =  document.querySelector('.temp');
const dateOutput =  document.querySelector('.date');
const timeOutput =  document.querySelector('.time');
const conditionOutput =  document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

// Default city when page loads
let cityInput = "Bengaluru";

// Click event for all cities in the list
cities.forEach((city) => {
    
    // Changing from default city to clicked city
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
       
        fetchWeatherData();
        app.style.opacity =  "0";
    });
});


form.addEventListener('submit', (e) => {
 
    if (search.value.length == 0) {
        alert('Please enter a city name');
    } else {
        
        cityInput = search.value;
        
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
    
});

/* Function that returns day of week */
function dayOfTheWeek(day, month, year){
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
}

async function fetchWeatherData(){
    const apiKey ='Your Api key';
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.main.temp.toFixed(1) + "&#176;C";  // Updating temperature
            conditionOutput.innerHTML = data.weather[0].description;
            
            const dateObject = new Date(data.dt * 1000);
            const y = dateObject.getFullYear();
            const m = dateObject.getMonth() + 1;  // Months are zero-based, so adding 1
            const d = dateObject.getDate();
            const hours = dateObject.getHours().toString().padStart(2, '0');
            const minutes = dateObject.getMinutes().toString().padStart(2, '0');

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}-${m}-${y}`;
            timeOutput.innerHTML = `${hours}:${minutes} `;
            nameOutput.innerHTML = data.name;  

            /* Updates icon */
            const iconId = data.weather[0].icon;
            icon.src = `https://openweathermap.org/img/wn/${iconId}.png`;

            cloudOutput.innerHTML = data.clouds.all + "%";
            humidityOutput.innerHTML = data.main.humidity + "%";
            windOutput.innerHTML = data.wind.speed + "km/h";

            let timeOfDay = "day";
            const weatherCondition = data.weather[0].id;

            if (!data.sys || (data.sys && data.sys.sunset < data.dt && data.sys.sunrise > data.dt)) {
                timeOfDay = "night";
            }

            if (weatherCondition === 800) {
                // Clear weather image
                app.style.backgroundImage = `url('https://wallpaperaccess.com/full/3265131.jpg')`;
                btn.style.background = "#1bde11";

                if (timeOfDay === "night") {
                    btn.style.background = "#ccc";
                }
            } else if (weatherCondition >= 801 && weatherCondition <= 804) {
                // Cloudy weather
                app.style.backgroundImage = `url('https://rootedministry.com/wp-content/uploads/darkclouds.jpeg')`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay === "night") {
                    btn.style.background = "#181e27";
                }
            } else if (weatherCondition >= 500 && weatherCondition <= 531) {
                // Rainy weather
                app.style.backgroundImage = `url('https://wallpapercave.com/wp/wp8317316.jpg')`;
                btn.style.background = "#162362";
                if (timeOfDay === "night") {
                    btn.style.background = "#325c80";
                }
            } else if (weatherCondition >= 200 && weatherCondition <= 232) {
                // Thunderstorm
                app.style.backgroundImage = `url('https://th.bing.com/th/id/R.3039ba502d22c539cdc06bc3c3c621b2?rik=j29i7F6mZbU7%2bw&riu=http%3a%2f%2fwww.weatherforecast.co.uk%2fblog%2fwp-content%2fuploads%2f2015%2f06%2fthunderstorms.jpg&ehk=mGm1woomVerVg0Tg%2f3SH0f2turniwHNp1LGU8ZTxRMQ%3d&risl=&pid=ImgRaw&r=0')`;
                btn.style.background = "#647d75";
                if (timeOfDay === "night") {
                    btn.style.background = "#325c80";
                }
            } else if (weatherCondition >= 600 && weatherCondition <= 622) {
                // Snowy weather
                app.style.backgroundImage = `url('https://static.independent.co.uk/2020/12/04/08/PRI174730356.jpg')`;
                btn.style.background = "#23322e";
                if (timeOfDay === "night") {
                    btn.style.background = "#325c80";
                }
            
            } else {
                // Mist
                app.style.backgroundImage = `url('https://www.fixautousa.com/wp-content/uploads/2020/06/bigstock-Driving-On-Countryside-Road-In-286905808.jpg')`;
                btn.style.background = "#4d72aa";
                if (timeOfDay === "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            app.style.opacity = "1";
        })
        .catch(() => {
            alert('City not found, Please try again');
            app.style.opacity = "1";
        });
}

fetchWeatherData();

app.style.opacity = "1";
 
