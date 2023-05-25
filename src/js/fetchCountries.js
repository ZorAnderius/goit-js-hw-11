const BASIC_URL = 'https://restcountries.com/v3.1';
const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages,',
});

function fetchCountries(name) {
  return fetch(`${BASIC_URL}/name/${name}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error('Could not fetch countries');
    }
    return response.json();
  });
}

export default { fetchCountries };
