export default function getRefs() {
  return {
    searchInput: document.getElementById('search-box'),
    listOfCountries: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  };
}
