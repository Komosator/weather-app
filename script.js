const input = document.querySelector('.search--text');
const button = document.querySelector('.search--btn');
const cityName = document.querySelector('.search-city-name');
const warning = document.querySelector('.search--warning');
const photo = document.querySelector('.info--photo');
const infoDetails = document.querySelector('.info-details');
const weather = document.querySelector('.info-details--weather');
const temperature = document.querySelector('.info-details--temperature');
const humidity = document.querySelector('.info-details--humidity');
const pressure = document.querySelector('.info-details--pressure');
const windDepiction = document.querySelector('.info-wind-depiction');
const windSpeed = document.querySelector('.info-details--wind-speed');
const windDirection = document.querySelector('.info-details--wind-direction');
const windArrow = document.querySelector('.info-wind-depiction--arrow');
const windDeviationInterval = 5;
const footerYear = document.querySelector('.footer__year');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?';
const API_LATTITUDE = 'lat=';
const API_LONGITUDE = '&lon=';
const API_UNITS = '&units=metric';
const API_GEO_LINK = 'http://api.openweathermap.org/geo/1.0/direct?q=';
const API_GEO_LIMIT = '&limit=1';

import { API_KEY as apiKey } from './api_key.js';

const showCurrentYear = () => {
	const currentYear = new Date().getFullYear();
	footerYear.textContent = currentYear;
};

const checkByClickingEnter = (e) => {
	if (e.key === 'Enter') {
		geoCoding();
	}
};

const geoCoding = () => {
	const city = input.value;
	const GEO_URL = API_GEO_LINK + city + API_GEO_LIMIT + apiKey;
	axios
		.get(GEO_URL)
		.then((res) => {
			infoDetails.classList.add('hidden');
			windDepiction.classList.add('hidden');
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
				apiKey +
				API_UNITS;
			getWeather(URL, town);
		})
		.catch(() => (warning.textContent = 'Enter a valid location name!'));
};

const getWeather = (apiUrl, town) => {
	axios
		.get(apiUrl)
		.then((res) => {
			console.log(res.data);
			warning.textContent = '';
			infoDetails.classList.remove('hidden');
			const temp = Math.round(res.data.main.temp) + ' [℃]';
			const hum = Math.round(res.data.main.humidity) + ' [%]';
			const pres = Math.round(res.data.main.humidity) + ' [hPa]';
			const wSpeed = Math.round(res.data.wind.speed) + ' [km/h]';
			const wDirBasicValue = Math.round(res.data.wind.deg);
			const wDir = wDirBasicValue + ' [°]';
			const status = res.data.weather[0].main;
			const statusId = res.data.weather[0].id;
			const windDirectionArrow = Math.round(res.data.wind.deg) + 'deg';
			let arrowDir = `translate(-50%, -50%) rotate(${windDirectionArrow})`;

			cityName.textContent = town;
			weather.textContent = status;
			temperature.textContent = temp;
			pressure.textContent = pres;
			humidity.textContent = hum;
			windSpeed.textContent = wSpeed;
			windDirection.textContent = wDir;
			windArrow.style.transform = arrowDir;

			if (wSpeed !== '0 [km/h]') {
				windDepiction.classList.remove('hidden');
				windAnimation(wDirBasicValue);
			}
			showStatusImage(statusId);
		})
		.catch(
			() =>
				(warning.textContent =
					'Something went wrong, please let me know about the problem!')
		);
};

const showStatusImage = (statusId) => {
	if (statusId >= 200 && statusId < 300) {
		photo.setAttribute('src', './images/thunderstorm.png');
	} else if (statusId >= 300 && statusId < 400) {
		photo.setAttribute('src', './images/drizzle.png');
	} else if (statusId >= 500 && statusId < 600) {
		photo.setAttribute('src', './images/rain.png');
	} else if (statusId >= 600 && statusId < 700) {
		photo.setAttribute('src', './images/snowflake.png');
	} else if (statusId >= 700 && statusId < 800) {
		photo.setAttribute('src', './images/fog.png');
	} else if (statusId == 800) {
		photo.setAttribute('src', './images/sun.png');
	} else if (statusId > 800 && statusId < 900) {
		photo.setAttribute('src', './images/cloud.png');
	} else {
		photo.setAttribute('src', './images/unknown.png');
	}
};

const windAnimation = (wDirBasicValue) => {
	let windDeviationOne = wDirBasicValue + windDeviationInterval + 'deg';
	let windDeviationTwo = wDirBasicValue - windDeviationInterval + 'deg';
	console.log(windDeviationOne, windDeviationTwo);
	windArrow.animate(
		[
			{ transform: `translate(-50%, -50%) rotate(${windDeviationOne})` },
			{ transform: `translate(-50%, -50%) rotate(${windDeviationTwo})` },
			{ transform: `translate(-50%, -50%) rotate(${windDeviationOne})` },
		],
		{
			duration: 2000,
			iterations: Infinity,
		}
	);
};

showCurrentYear();
button.addEventListener('click', geoCoding);
input.addEventListener('keyup', checkByClickingEnter);
