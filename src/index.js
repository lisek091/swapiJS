const menuFrame = document.querySelector('.menuFrame');
let loadingpage;
(async function run() {
  const response = await fetch('https://swapi.dev/api/');
  const data = await response.json();
  loadingpage = data;
  Object.entries(data).map(key => {
    const newFrame = document.createElement('button');
    newFrame.innerText = key[0];
    newFrame.addEventListener('click', () => {
      menuFrame.innerHTML = '';
      nextTarget(key[1]);
    });
    newFrame.dataset.id = key[0];
    newFrame.className = 'frame';
    menuFrame.appendChild(newFrame);
  });
})();
async function nextTarget(target) {
  const response = await fetch(target); // pobiera dane z danej kategorii
  const data = await response.json();
  const goBack = document.createElement('button');
  goBack.innerText = 'back to main page';
  goBack.className = 'frame';
  goBack.addEventListener('click', () => {
    menuFrame.innerHTML = '';
    Object.entries(loadingpage).map(key => {
      const newFrame = document.createElement('button');
      newFrame.innerText = key[0];
      newFrame.addEventListener('click', () => {
        menuFrame.innerHTML = '';
        nextTarget(key[1]);
      });
      newFrame.dataset.id = key[0];
      newFrame.className = 'frame';
      menuFrame.appendChild(newFrame);
    });
  });
  menuFrame.appendChild(goBack);
  const newInfo = document.createElement('h3'); // wyswietla ile jest wpisow danej kategorii
  newInfo.innerText = `Elements found: ${Object.entries(data)[0][1]}`; // wyswietla ile jest wpisow danej kategorii
  menuFrame.appendChild(newInfo); // wyswietla ile jest wpisow danej kategorii
  const objects = Object.entries(data)[3][1]; // informacje ktore nas interesuja
  objects.map(object => {
    const newData = document.createElement('div');
    newData.className = 'objectData'; // dla kazdej osoby / planety tworzy diva
    Object.entries(object).map(el => {
      const elin = document.createElement('div'); // zbiorcze informacje o planecie
      elin.innerText = el[0] + ':' + el[1];
      elin.className = 'endData';
      newData.appendChild(elin);
    });
    menuFrame.appendChild(newData);
  });
  const nawigatebuttonprev = document.createElement('button');
  nawigatebuttonprev.innerText = Object.entries(data)[2][0];
  nawigatebuttonprev.className = 'frame';
  nawigatebuttonprev.dataset.id = 'prev';
  nawigatebuttonprev.addEventListener('click', () => {
    menuFrame.innerHTML = '';
    nextTarget(Object.entries(data)[2][1]);
  });
  if (Object.entries(data)[2][1] == null) {
    nawigatebuttonprev.setAttribute('disabled', '');
  }
  menuFrame.appendChild(nawigatebuttonprev);
  const nawigatebuttonnext = document.createElement('button');
  nawigatebuttonnext.dataset.id = 'next';
  nawigatebuttonnext.className = 'frame';
  nawigatebuttonnext.innerText = Object.entries(data)[1][0];
  nawigatebuttonnext.addEventListener('click', () => {
    menuFrame.innerHTML = '';
    nextTarget(Object.entries(data)[1][1]);
  });
  if (Object.entries(data)[1][1] == null) {
    nawigatebuttonnext.setAttribute('disabled', '');
  }
  menuFrame.appendChild(nawigatebuttonnext);
}
