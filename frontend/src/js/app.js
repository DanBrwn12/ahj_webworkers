import registerServiceWorker from './ServiceWorkerRegister';

registerServiceWorker();

const API_URL = 'https://webworkers-one.vercel.app/api/data';

const root = document.getElementById('root');

root.innerHTML = `
  <div class="app">
    <div class="app__header">
      <h1 class="app__title">Новости мира кино</h1>
      <button class="app__refresh">Обновить</button>
    </div>
    <div class="app__content"></div>
  </div>
`;

const content = root.querySelector('.app__content');
const refreshBtn = root.querySelector('.app__refresh');

function renderSkeleton() {
  content.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const skeleton = document.createElement('div');
    skeleton.classList.add('skeleton');

    skeleton.innerHTML = `
      <div class="skeleton__title"></div>
      <div class="skeleton__row">
        <div class="skeleton__image"></div>
        <div class="skeleton__text">
          <div class="skeleton__line"></div>
          <div class="skeleton__line"></div>
        </div>
      </div>
    `;

    content.append(skeleton);
  }
}

async function loadData() {
  renderSkeleton();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    renderItems(data.items);
  } catch (error) {
    renderError();
  }
}

function renderItems(items) {
  content.innerHTML = '';

  for (const item of items) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    itemEl.innerHTML = `
      <div class="item__title"></div>
      <div class="item__row">
        <img class="item__image" src="${item.image}" alt="">
        <div class="item__text">
          <div class="item__description"></div>
          <div class="item__price"></div>
        </div>
      </div>
    `;

    itemEl.querySelector('.item__title').textContent = item.title;
    itemEl.querySelector('.item__description').textContent = item.description;
    itemEl.querySelector('.item__price').textContent = `$${item.price}`;

    content.append(itemEl);
  }
}

function renderError() {
  content.innerHTML = `
    <div class="error">
      <div class="error__text">Не удалось загрузить данные. Проверьте подключение к интернету.</div>
      <button class="error__retry">Повторить</button>
    </div>
  `;

  content.querySelector('.error__retry').addEventListener('click', loadData);
}

refreshBtn.addEventListener('click', loadData);
loadData();
