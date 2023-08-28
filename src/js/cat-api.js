import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {   
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error('Помилка запиту:', error.message);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error('Помилка запиту:', error.message);
    });
}
export { fetchBreeds, fetchCatByBreed };