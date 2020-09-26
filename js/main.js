const openBtn = document.getElementById('findBtn');
const searchBox = document.getElementById('containerForSearchBox');
const giftList = document.getElementById('gift-list-container');
const loader = document.getElementById('loader');
const nameInput = document.getElementById('nameInput');
const accordion = document.getElementById('accordionExample');
import { appContants } from './helpers.js'


function saveName(name){
    return localStorage.setItem('guest', name);
}

async function retrieveGiftData(){
    const dataRetriever = await fetch("https://wedding-gift-nestjs.herokuapp.com/gifts");
    const dataFormatted = await dataRetriever.json();
    await generateList(dataFormatted);
}
function generateList(array){
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const htmlElementTemplate = `
        <div class="card">
        <div class="card-header" id="heading${index}">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block btn-warning ${element.taken ? 'giftTaken':'btnwblacktext'} text-left" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
              ${element.name} <span class="badge badge-light">${element.quantity !== undefined ? element.quantity : 'Tu elección'}</span>
            </button>
          </h2>
        </div>
    
        <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordionExample">
          <div class="card-body">
          ...
          </div>
        </div>
      </div>
        `;
        accordion.insertAdjacentHTML('beforeend', htmlElementTemplate);
    }
}
openBtn.onclick = ()=>{
    if(nameInput.value === ""){
        alert('Nombre esta vacio.');
    } else{
        searchBox.style.display = "none";
        loader.style.display = "block";
        setTimeout(()=>{
        loader.style.display = "none";
        giftList.style.display = "block";
        }, 3000);

        saveName(nameInput.value);
        retrieveGiftData();
    }
    
}
