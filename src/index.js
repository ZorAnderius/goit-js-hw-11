import './css/styles.css';

const axios = require('axios/dist/node/axios.cjs');
// import getRefs from './js/get-refs';
// import API from './js/fetchCountries';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { notifyInit } from './js/notifyInit';
// const debounce = require('lodash.debounce');

// const DEBOUNCE_DELAY = 300;

// const ref = getRefs();
// const { searchInput, listOfCountries, countryInfo } = ref;

// searchInput.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

// function onInputText(e) {
//   e.preventDefault();
//   let nameOfCountry = e.target.value.trim();

//   if (!nameOfCountry) {
//     resetAllHTML();
//     return;
//   }

//   API.fetchCountries(nameOfCountry)
//     .then(checkCountriesList)
//     .catch(errorNotifycation);
// }

// function checkCountriesList(countries) {
//   resetAllHTML();
//   if (countries.length > 2 && countries.length <= 10) {
//     renderCountriesMarkup(countries);
//   } else if (countries.length === 1) {
//     renderCountryMarkup(countries);
//   } else if (countries.length > 10) {
//     Notify.info(
//       'Too many matches found. Please enter a more specific name.',
//       notifyInit
//     );
//   }
// }

// function errorNotifycation() {
//   resetAllHTML();
//   Notify.failure(
//     'Opps...there is no a country with that name. Please try again.',
//     notifyInit
//   );
// }

// function renderCountryMarkup(country) {
//   const markup = countryMarkup(country);
//   countryInfo.classList.add('country-info-styles');
//   countryInfo.innerHTML = markup;
// }

// function renderCountriesMarkup(countries) {
//   const markup = countriesListMarup(countries);
//   listOfCountries.classList.add('country-list-styles');
//   listOfCountries.innerHTML = markup;
// }

// function countriesListMarup(countries) {
//   return countries
//     .map(
//       country =>
//         `
//         <li class="country-item">
//         <img class="item-svg" src="${country.flags.svg}" alt="${country.name.official}" width="160" height="auto" />
//         <h2 class="item-title">${country.name.official}</h2>
//         </li>
//         `
//     )
//     .join('');
// }

// function countryMarkup(country) {
//   return country.reduce(
//     (acc, { name, flags, capital, population, languages }) => {
//       const lang = Object.values(languages).join(', ');
//       return (acc += `<div class="title-wrap">
//                         <img src="${flags.svg}" alt="${name.official}" width="320" height="auto" />
//                     <h2 class="title">${name.official}</h2>
//                     </div>
//                     <div class="descr-wrapper">
//                     <div class="info-wrap">
//                         <h3 class="sub-title">Capital:</h3>
//                         <p class="text">${capital}</p>
//                     </div>
//                     <div class="info-wrap">
//                         <h3 class="sub-title">Population:</h3>
//                         <p class="text">${population}</p>
//                     </div>
//                     <div class="info-wrap">
//                         <h3 class="sub-title">Languages:</h3>
//                         <p class="text">${lang}</p>
//                     </div>
//                     </div>
//                      `);
//     },
//     ''
//   );
// }

// function resetAllHTML() {
//   resetListOfCountries();
//   resetCountryInfo();
// }

// function resetListOfCountries() {
//   listOfCountries.innerHTML = '';
//   listOfCountries.classList.remove('country-list-styles');
// }

// function resetCountryInfo() {
//   countryInfo.innerHTML = '';
//   countryInfo.classList.remove('country-info-styles');
// }
