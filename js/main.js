const openBtn = document.getElementById('findBtn');
const searchBox = document.getElementById('containerForSearchBox');
const giftList = document.getElementById('gift-list-container');
const loader = document.getElementById('loader');
const nameInput = document.getElementById('nameInput');


function saveName(name){
    return localStorage.setItem('guest', name);
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
    }
    
}
