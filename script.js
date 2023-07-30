const input = document.querySelector('input');
const button = document.querySelector('.btn');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
// const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?';
const API_LATTITUDE = 'lat=';
const API_LONGITUDE = '&lon=';
const API_KEY = '&appid=afee985ba293e5106d1e6ef70ecd3062';
const API_UNITS = '&units=metric';

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
const API_GEO_LINK = 'http://api.openweathermap.org/geo/1.0/direct?q=';
const API_GEO_LIMIT = '&limit=1';

const getWeather = () => {
	// const city = input.value || 'Warsaw';
	const city = input.value;
	const GEO_URL = API_GEO_LINK + city + API_GEO_LIMIT + API_KEY;

	// Get geolocation values: lattitude, longitude, standardized city name
	axios
		.get(GEO_URL)
		.then((res) => {
			// console.log(res);
			warning.textContent = '';
			// console.log(res.data);
			const town = res.data[0].name;
			const lon = res.data[0].lon;
			const lat = res.data[0].lat;
			// console.log(`#2 lattitude: ${lat}, longitude: ${lon}.`);
			//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
			const URL =
				API_LINK +
				API_LATTITUDE +
				lat +
				API_LONGITUDE +
				lon +
				API_KEY +
				API_UNITS;
			// console.log(URL);
			// Check the by coordinates
			checkCurrentWeather(URL, town);
		})
		.catch(() => (warning.textContent = 'Enter a valid city name!'));
};

const checkCurrentWeather = (apiUrl, town) => {
	axios
		.get(apiUrl)
		.then((res) => {
			console.log(res.data);
			warning.textContent = '';
			const temp = Math.floor(res.data.main.temp) + '℃';
			const hum = Math.floor(res.data.main.humidity) + '%';
			// const pres = res.data.main.pressure + 'hPa';
			const status = res.data.weather[0].main;
			const statusId = res.data.weather[0].id;

			// console.log(`temperature: ${temp}`);
			// console.log(`humidity: ${hum}`);
			// console.log(res.data.weather[0]);
			// console.log(`Status: ${status}`);

			temperature.textContent = temp;
			// pressure.textContent = pres;
			humidity.textContent = hum;
			cityName.textContent = town;
			weather.textContent = status;

			if (statusId >= 200 && statusId < 300) {
				photo.setAttribute('src', './images/thunderstorm.png');
			} else if (statusId >= 300 && statusId < 400) {
				photo.setAttribute('src', './images/drizzle.png');
			} else if (statusId >= 500 && statusId < 600) {
				photo.setAttribute('src', './images/rain.png');
			} else if (statusId >= 600 && statusId < 700) {
				photo.setAttribute('src', './images/snowflake.png');
			} else if (statusId >= 700 && statusId < 800) {
				photo.setAttribute('src', './imgages/fog.png');
			} else if (statusId == 800) {
				photo.setAttribute('src', './images/sun.png');
			} else if (statusId > 800 && statusId < 900) {
				photo.setAttribute('src', './images/cloud.png');
			} else {
				photo.setAttribute('src', './images/unknown.png');
			}
		})
		.catch(() => (warning.textContent = 'Enter a valid city name!'));
};

const checkByClickingEnter = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

button.addEventListener('click', getWeather);
input.addEventListener('keyup', checkByClickingEnter);
