import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_C8fch3W7tmmF8fmpsXU2mdIfjeqC3R8Q3wAY9gs2QZiQFnTO5tNKg722MPHavC8b';

const select = document.querySelector('.breed-select');
const card = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

select.addEventListener('change', onChange);

function createCatList() {
  loader.classList.remove('is-hidden');
  fetchBreeds()
    .then(data => {
      const options = data
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join(' ');
      select.innerHTML = options;
      new SlimSelect({
        select: select,
      });
      loader.classList.add('is-hidden');
      select.classList.remove('is-hidden');
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}
createCatList();


function onChange(evt) {
  loader.classList.remove('is-hidden');
  card.classList.add('is-hidden');
  const selectedBreedId = evt.currentTarget.value;
  fetchCatByBreed(selectedBreedId)
    .then(data => {
      renderMarkupInfo(data);
      loader.classList.add('is-hidden');
      card.classList.remove('is-hidden');
    })
    .catch(error => {
      loader.classList.add('is-hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {position: 'center-top',width:'400px', fontSize: '18px'});
    });
}

function renderMarkupInfo(data) {
    console.log(data)
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const beerdCard = `<img class="cat-img" width = "400" src="${url}" alt="${name}">
    <div class="descr-part">
  <h2 class="cat-name">${name}</h2>
  <p class="deskr-text">${description}</p>
  <p class="cat-temperament"><span class="span-temperament">Temperament:</span> ${temperament}</p></div>`;
  card.innerHTML = beerdCard;
}







