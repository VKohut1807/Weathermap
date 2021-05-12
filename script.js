const param = {
	"url" : "https://api.openweathermap.org/data/2.5/",
	"appid" : "97da67d3b14e1b4fb3efa6d54ce9e004"
}
const cities =  {
    2643743 : "London",
    625144 : "Minsk",
    703448 : "Kyiv",
    7531926 : "Warszawa",
    2950158 : "Berlin",
    4229546 : "Washington",
}

function getWeather() {
    const cityId = document.querySelector('#city').value;
    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
	.then(weather => {
			return weather.json();
	})
    .then(showWeather)
    .catch(()=>{
        console.log("error!!!!!");
    })
}

let selectSity = document.createElement("select");
selectSity.id = "city";
    for (const key in cities) {
        let option = document.createElement("option");
        option.textContent = cities[key];
        option.value = key;
        selectSity.appendChild(option);
    }
document.querySelector(".city").appendChild(selectSity);

function showWeather(data) {
    let result = new Date(data.dt*1000);
    document.querySelector(".thisDate").innerHTML = `${result.toDateString()}`;

    document.querySelector(".iconWeather").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    
    document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}&deg;`;
    
    document.querySelector(".weatherInfo").textContent = `${data.weather[0]['description']}`;

    document.querySelector(".humidity").textContent = `${data.main.humidity} %`;

    let arrowWind = document.querySelector(".wind");
    let degWind = data.wind.deg;
    arrowWind.style.transform = "rotate(" + degWind + "deg)";
    document.querySelector(".windSpeed").textContent =`${data.wind.speed} m/s`;
    
    document.querySelector(".pressure").textContent =`${data.main.pressure} hPa`;
    
    document.querySelector(".visibility").textContent =`${data.visibility/1000} km`;

    document.querySelector(".feelsLike").innerHTML =`${Math.round(data.main.feels_like)} &deg;C`;
}

getWeather();
document.querySelector('#city').onchange = getWeather;
