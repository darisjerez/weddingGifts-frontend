const openBtn = document.getElementById('findBtn');
const searchBox = document.getElementById('containerForSearchBox');
const giftList = document.getElementById('gift-list-container');
const loader = document.getElementById('loader');
const nameInput = document.getElementById('nameInput');
const accordion = document.getElementById('accordionExample');
const alerts = document.getElementById("alert-confirmation");


function saveName(name){
    return localStorage.setItem('guest', name);
}
const guestName = () => localStorage.getItem('guest');

(function weddingCountdown(){
  // Set the date we're counting down to
const countDownDate = new Date("Dec 12, 2020 08:30:25").getTime();
const x = setInterval(function() {
  const now = new Date().getTime();

  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
  document.getElementById("countdown").innerHTML = `Restan ${days}d${hours}h${minutes}m${seconds}s`;
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Boda Time!";
  }
  }, 1000);
})();


async function AddOwner(id){
  const data = {
        "owner": guestName(),
        "taken": true
  };
    const serviceCall = await fetch(`https://wedding-gift-nestjs.herokuapp.com/gifts/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });
    const serviceResponse = await serviceCall.json();
    console.log(`Service response: ${serviceResponse.message}`);
    alerts.style.display = "block";

    (function(){
      var counter = 10;
    var interval = setInterval(function() {
        counter--;
        alerts.innerHTML = `${serviceResponse.message}. Esta pagina se refrescará en ${counter}`;
        if (counter == 0) {
            // Display a login box
            clearInterval(interval);
            location.reload();
        }
    }, 1000);
    })();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 
async function retrieveGiftData(){
    const dataRetriever = await fetch("https://wedding-gift-nestjs.herokuapp.com/gifts");
    const dataFormatted = await dataRetriever.json();
    await generateList(dataFormatted);
}
function generateList(dataArray){
    dataArray.forEach((element, index)=>{
        const htmlElementTemplate = `
        <div class="card weddingText">
        <div class="card-header" id="heading${index}">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block ${element.taken ? 'giftTaken':'btnwblacktext'} ${!element.taken ? 'bg-info':'bg-danger'} text-left" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
              ${element.name} <span class="badge badge-light">${element.quantity !== undefined ? element.quantity : 'Tu elección'}</span>
            </button>
          </h2>
        </div>
        
        <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordionExample">
          <div class="card-body">
          ${!element.taken ? `<button type="button" class="btn btn-outline-success" onclick="AddOwner('${element._id}')">Tomar!</button>`: 'Tomado por: '+ element.owner}
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
        saveName(nameInput.value);
        retrieveGiftData();
        searchBox.style.display = "none";
        loader.style.display = "block";
        setTimeout(()=>{
        loader.style.display = "none";
        giftList.style.display = "block";
        }, 3000);

        
    }
    
}
