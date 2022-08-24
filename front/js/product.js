'use strict';


const itemImg = document.getElementById('item__img');
const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const colors = document.getElementById('colors');
fetch('http://localhost:3000/api/products')
.then(function(res){
    return res.json();
})
.then(function(data){



// --------------------
    for(let i=0; i< data.length; i++){
                
        if (productId === `${data[i]['_id']}` ){ 

           
            itemImg.innerHTML =`<img src="${data[i]['imageUrl']}" alt="${data[i]['altTxt']}">`;
            title.textContent =`${data[i]['name']}`;
            description.textContent= `${data[i]['description']}`;
            price.textContent = `${data[i]['price']}`;

            for (let j= 0; j < data[i]['colors'].length; j++) 
            colors.innerHTML += 
            ` <option value="${data[i]['colors'][j]}">${data[i]['colors'][j]}</option>`;

             break;
        }
    
    };

})

.catch(function(err){
    console.log("Une erreur s'est produite.");
});

const pageUrl = window.location.search;
const productId = pageUrl.slice(4);




// Ajouter au panier


//  localStorage.clear()

let addToCart = document.getElementById('addToCart');

//----> click
addToCart.addEventListener('click', function() {
    //quantity
    const quantity = document.getElementById('quantity').value;
    //value
 const select = document.getElementById('colors');
const value = select.options[select.selectedIndex].value;
console.log('quantity',quantity, 'value', value);

window.localStorage.setItem('item',JSON.stringify({id: productId, color: value, quantity: quantity}));
window.localStorage.setItem('quantity', quantity);
localStorage.getItem('color');
localStorage.getItem('quantity');
});
//----> store the choice




//----> local storage





//---------------------------------------------------------------------------------------------
/*
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
*/

//---------------------------------------------------------------------------------------------
//recupérer elements pour le cart

