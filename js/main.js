const openBtn = document.getElementById('findBtn');
const searchBox = document.getElementById('containerForSearchBox');
const giftList = document.getElementById('gift-list-container');
const loader = document.getElementById('loader');
const nameInput = document.getElementById('nameInput');
const accordion = document.getElementById('accordionExample');


function saveName(name){
    return localStorage.setItem('guest', name);
}
async function AddOwner(id){
    const data = {
        "owner": "elshalval",
        "taken": true
    }
    const serviceCall = await fetch(`https://wedding-gift-nestjs.herokuapp.com/gifts/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });
    const serviceResponse = await serviceCall.json();
   await console.log(`Service response: ${serviceResponse}`);
}
async function retrieveGiftData(){
    const dataRetriever = await fetch("https://wedding-gift-nestjs.herokuapp.com/gifts");
    const dataFormatted = await dataRetriever.json();
    await generateList(dataFormatted);
}
function generateList(dataArray){
    dataArray.forEach((element, index)=>{
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
          ${!element.taken ? `<button type="button" class="btn btn-outline-success" onclick="AddOwner('${element._id}')">Tomar!</button>`: 'Tomando por: '+ element.owner}
          </div>
        </div>
      </div>
        `;
        accordion.insertAdjacentHTML('beforeend', htmlElementTemplate);
    });
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
