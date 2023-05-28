import axios from 'axios';

const BASIC_URL = 'https://pixabay.com/api/';
const API_KEY = '36805938-0e5858f236185e483726e7849';

async function pixabayPhoto(name, number, pages) {
  return await axios({
    method: 'GET',
    url: BASIC_URL,
    params: {
      key: API_KEY,
      page: number,
      per_page: pages,
      q: name,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
}

export default { pixabayPhoto };
