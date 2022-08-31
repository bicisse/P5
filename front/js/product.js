// const pageUrl = window.location.search;
// const productId = pageUrl.slice(4);
// console.log(productId);

let params = (new URL(window.location)).searchParams;
let extractId = params.get('id');
console.log(extractId);

fetch('http://localhost:3000/api/products')
.then(function(res){
    // console.log(1);
    return res.json();
})
.then(function(data){
    const found = data.find( element => element['_id'] === extractId);
    // console.log(extractId,found['_id']);
    // console.log(2);
    // 
    const itemImg = document.getElementById('item__img');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const price = document.getElementById('price');
    const colors = document.getElementById('colors');
    //
   itemImg.innerHTML = ` <img src="${found['imageUrl']}" alt="${found['altTxt']}">`;
   title.innerHTML= found['name'];
   description.innerHTML = found['description'];
   price.innerHTML = found['price'];
   for (let i =0; i < found['colors'].length; i++)
   colors.innerHTML += ` <option value="${found['colors'][i]}">${found['colors'][i]}</option>`;
})   
.catch(function(err){
    
    console.log("Une erreur s'est produite.", err);
});


//________________________________________
//Local storage

document.getElementById('addToCart').addEventListener('click', 
function (){
    //quantité
    const quantity = document.getElementById('quantity').value;
    
    //couleur
    const colorSelect = document.getElementById('colors'); 
    const optionColor = colorSelect.options[colorSelect.selectedIndex].value;   
    // console.log(colorSelect);
    
// console.log(optionColor, '(color)', quantity, '(quantity)');

    // local storage
window.localStorage.setItem('color', optionColor );
window.localStorage.setItem('quantity', quantity );
console.log(localStorage.getItem('color'));
console.log(localStorage.getItem('quantity'));


})