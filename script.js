const input = document.querySelector('input');
const button = document.querySelector('.btn');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?';
const API_LATTITUDE = 'lat=';
const API_LONGITUDE = '&lon=';
const API_KEY = '&appid=afee985ba293e5106d1e6ef70ecd3062';
const API_UNITS = '&units=metric';

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
const API_GEO_LINK = 'http://api.openweathermap.org/geo/1.0/direct?q=';
const API_GEO_LIMIT = '&limit=1';

const geoCoding = () => {
	console.log('!!');
	const city = input.value || 'Warsaw';
	const GEO_URL = API_GEO_LINK + city + API_GEO_LIMIT + API_KEY;
	axios
		.get(GEO_URL)
		.then((res) => {
			console.log(res);
			warning.textContent = '';
			console.log(res.data);
			const town = res.data[0].name;
			const lon = res.data[0].lon;
			const lat = res.data[0].lat;
			console.log(`#2 lattitude: ${lat}, longitude: ${lon}.`);
			//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
			const URL =
				API_LINK +
				API_LATTITUDE +
				lat +
				API_LONGITUDE +
				lon +
				API_KEY +
				API_UNITS;
			console.log(URL);
			getWeather(URL, town);
		})
		.catch(() => (warning.textContent = 'Enter a valid city name!'));
};

const getWeather = (apiUrl, town) => {
	axios
		.get(apiUrl)
		.then((res) => {
			console.log(res.data);
			warning.textContent = '';
			const temp = Math.floor(res.data.main.temp) + '℃';
			const hum = Math.floor(res.data.main.humidity) + '%';
			const status = res.data.weather[0].main;
			const statusId = res.data.weather[0].id;

			console.log(`temperature: ${temp}`);
			console.log(`humidity: ${hum}`);
			console.log(res.data.weather[0]);
			console.log(`Status: ${status}`);

			temperature.textContent = temp;
			humidity.textContent = hum;
			cityName.textContent = town;
			weather.textContent = status;

			if (statusId >= 200 && statusId < 300) {
				photo.setAttribute('src', './img/thunderstorm.png');
			} else if (statusId >= 300 && statusId < 400) {
				photo.setAttribute('src', './img/drizzle.png');
			} else if (statusId >= 500 && statusId < 600) {
				photo.setAttribute('src', './img/rain.png');
			} else if (statusId >= 600 && statusId < 700) {
				photo.setAttribute('src', './img/ice.png');
			} else if (statusId >= 700 && statusId < 800) {
				photo.setAttribute('src', './img/fog.png');
			} else if (statusId == 800) {
				photo.setAttribute('src', './img/sun.png');
			} else if (statusId > 800 && statusId < 900) {
				photo.setAttribute('src', './img/cloud.png');
			} else {
				photo.setAttribute('src', './img/unknown.png');
			}
		})
		.catch(() => (warning.textContent = 'Enter a valid city name!'));
};

const checkByClickingEnter = (e) => {
	if (e.key === 'Enter') {
		geoCoding();
	}
};

button.addEventListener('click', geoCoding);
input.addEventListener('keyup', checkByClickingEnter);
