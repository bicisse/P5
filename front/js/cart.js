const cartItems = document.getElementById('cart__items');

const totalQuantity = document.getElementById('totalQuantity');
      const totalPrice = document.getElementById('totalPrice');
let getKeys;
let currentStoredQuantity;
let parseArray;
let sum = 0;
let finalPrice;
let finalQuantity;
//____________________________
         
fetch('http://localhost:3000/api/products')

.then(function(res){
  return res.json();
})

.then(function(data){
  
  let multiplyPriceByQuantity;
  let addUpQuantities=[];
  let addUpPrices = [];
  function addUp(pushInArray, array) {
     array.push(pushInArray);
const initialValue = 0;
const sumWithInitial = array.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
return sumWithInitial;


   }

  


  for(let i=0; i< localStorage.length; i++) {
    getKeys = localStorage.key(i);
    let getArrays= localStorage.getItem(getKeys);
    parseArray = JSON.parse(getArrays);
   
   

    for( let a = 0; a< parseArray.length; a++){
    //  console.log(parseArray[a]);
      const storedColor = parseArray[a].color;
      const storedQuantity = parseArray[a].quantity;
      const storedId = parseArray[a].id;
      
      const dataIndex = data.findIndex(object=>{
          return object._id === storedId;
        })
      const price = data[i]['price'];
    
      //TOTAL
      // QUANTITY
      // Prix total quantité x couleur
    
       multiplyPriceByQuantity = price*storedQuantity;
        // 

        //

    totalPrice.innerHTML = addUp(multiplyPriceByQuantity, addUpPrices);
    totalQuantity. innerHTML = addUp(storedQuantity, addUpQuantities )



      //________________
      // Inner HTML
      cartItems.innerHTML += `
      <article id="${data[dataIndex]['_id']}" class="cart__item" data-id="{${storedId}}" data-color="${storedColor}">
      <div class="cart__item__img">
         <img src="${data[dataIndex]['imageUrl']}" alt="${data[dataIndex]['altTxt']}">
      </div>
      <div class="cart__item__content">
         <div class="cart__item__content__description">
            <h2>${data[dataIndex]['name']}</h2>
            <p>${storedColor}</p>
            <p>${price} €</p>
         </div>
         <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
               <input type="number" 
               class="storedQuantity" 
               name="storedQuantity" 
               id="storedQuantity" 
               min="1" max="100" value="${storedQuantity}">
            </div>
            <div class="cart__item__content__settings__delete" >
               <p class="deleteItem" >Supprimer</p>
            </div>
         </div>
      </div>
   </article> `

      //______________________________________________________________________________
      //End Inner HTML

      } //loop A
      
      
    }//loop I
    /////////
    // MODIFY CART BEFORE CONFIRMATION
    //DELETE ITEM
    const deleteItem = document.querySelectorAll(".deleteItem");
  
    for (let i=0; i<deleteItem.length; i++){
      const button = deleteItem[i];
      button.addEventListener('click', function() {
        console.log('click');
        const name= button.closest('.cart__item__content').querySelector('.cart__item__content__description :nth-child(1) ').textContent;
        const price= button.closest('.cart__item__content').querySelector('.cart__item__content__description :nth-child(3)').textContent;
        const quantity= button.closest('.cart__item__content').querySelector('.cart__item__content__settings').querySelector('div').querySelector('input').value;
        const color =  button.closest('article').getAttribute('data-color');
        const id = button.closest('article').getAttribute('id');
        

          // DELETE ITEM
        button.parentElement.parentElement.parentElement.parentElement.remove();
        
          // MODIFY TOTAL PRICE
        const priceByQuantity = parseInt(price)*parseInt(quantity);
        console.log('priceByQuantity', priceByQuantity);
        console.log('price', price, parseInt(price), typeof price);
        console.log('quantity',quantity, typeof quantity);
        const toRemove = parseInt(price)*parseInt(quantity);
        console.log('toRemove', toRemove);
        const substractTotalPrice = parseInt(totalPrice.textContent) - toRemove;
        console.log(substractTotalPrice);
        totalPrice.textContent = substractTotalPrice;


          // MODIFY TOTAL QUANTITY
        
        const currentQuantity =  parseInt(totalQuantity.textContent);
        const substractTotalQuantity = currentQuantity - parseInt(quantity);
        console.log(substractTotalQuantity);
        totalQuantity.textContent = substractTotalQuantity;

         
        // const updateSum = sum - addUp(parseInt(price)*parseInt(quantity)); 
        // console.log(updateSum);
        // totalPrice.textContent = updateSum;
    
      console.log('color',color, 'id', id, 'quantity', quantity, 'name', name, 'price', price);
      //   console.log('test');
      
      //   const itemKey= JSON.parse(localStorage.getItem(name));
      //   console.log('itemKey',itemKey);
      
      //   const found = itemKey.find( element => element.color === color);
      //  console.log("found",found);
      
      // removedItem =  itemKey.splice(found, 1);
      // console.log('removedItem', removedItem);
      // console.log('itemKey', itemKey);
      
      // // REMOVE ITEM FROM ARRAY / PUT ARRAY BACK IN LOCAL STORAGE
      // const stringifyAgain = JSON.stringify(itemKey);
      // console.log(stringifyAgain);
      // localStorage.setItem(name, stringifyAgain);
      // console.log(localStorage);
      
      
      // // for (let i=0; i<localStorage.length; i++){
      
      // // REMOVE EMPTY ARROW FROM LOCAL STORAGE
      // console.log(itemKey.length, 'length');
      // if (itemKey.length === 0){
      //   console.log('Empty Array');
      //   // localStorage.removeItem(name);
      // } else {
      //   console.log('Array not empty');
      // }
      // // ERASE ARTICLE FROM CART
      
      })
   
    }
})




.catch(function(err){
console.log("Une erreur s'est produite");
});



let removedItem;



let inputValue;
// const deleteItem = document.querySelectorAll('.deleteItem')
// console.log(deleteItem);

//____________
// const removeItemFromCart = document.getElementsByClassName('deleteItem');
// console.log(removeItemFromCart);
// console.log(removeItemFromCart.length);

// for (let i=0; i< removeItemFromCart.length; i++){
    
//     const button = removeItemFromCart[i];
//     console.log(button);
//    button.addEventListener('click', function (){
//   console.log('click');
// })
//     // console.log(button);
//     // button.addEventListener('click', function (event){
//     //   console.log(1);
//     //   let buttonClicked = event.target;
//     //   buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
      
//     // })
//   }

//________________


// function deleteCartItem(color, quantity, name, event){
//   console.log(localStorage);
//   itemColor = color;
//   itemQuantity = quantity;
//   itemName = name; 

//   console.log(itemColor, itemQuantity, itemName);
//   console.log('test');

//   const itemKey= JSON.parse(localStorage.getItem(name));
//   console.log('itemKey',itemKey);

//   const found = itemKey.find( element => element.color === color);
//  console.log("found",found);

// removedItem =  itemKey.splice(found, 1);
// console.log('removedItem', removedItem);
// console.log('itemKey', itemKey);

// // REMOVE ITEM FROM ARRAY / PUT ARRAY BACK IN LOCAL STORAGE
// const stringifyAgain = JSON.stringify(itemKey);
// console.log(stringifyAgain);
// localStorage.setItem(name, stringifyAgain);
// console.log(localStorage);


// // for (let i=0; i<localStorage.length; i++){

// // REMOVE EMPTY ARROW FROM LOCAL STORAGE
// console.log(itemKey.length, 'length');
// if (itemKey.length === 0){
//   console.log('Empty Array');
//   localStorage.removeItem(name);
// } else {
//   console.log('Array not empty');
// }
// // ERASE ARTICLE FROM CART


//   // TODO   --->    UPDATE TOTAL QUANTITY AND PRICE
//  }
//_____________________ PLUS AND MINUS

function plusMinus(color, quantity, name, id){
  itemColor = color;
  itemQuantity = quantity;
  itemName = name; 
  let itemId = id;
  console.log(itemColor, itemQuantity, itemName);
  console.log('test 1');
  const currentInput = document.getElementsByClassName('storedQuantity');

  for (let i=0; i< currentInput.length; i++){
    const button = currentInput[i];
    console.log('test2');
    console.log('itemQuantity', itemQuantity);
      button.addEventListener('change', function (event, itemQuantity){
        console.log('test3');
        const input = event.target;
        console.log('test 3.2', input.value);
        inputValue = input.value;
        console.log('test 3.2',inputValue,itemQuantity);
        console.log('test4');
        return inputValue;
          
      })
  }
  console.log('inputValue', inputValue);
  if (inputValue !== itemQuantity){
    console.log('different quantities', inputValue, itemQuantity);
    const itemKey= JSON.parse(localStorage.getItem(name));
      console.log('itemKey',itemKey);

      const found = itemKey.find( element => element.color === color);
    console.log("found",found);

    removedItem =  itemKey.splice(found, 1);
    console.log('removedItem', removedItem);
    console.log('itemKey', itemKey);

    // REMOVE ITEM FROM ARRAY / PUT ARRAY BACK IN LOCAL STORAGE
    const newString = {id : itemId, color: itemColor, quantity :inputValue}
    console.log('newString', newString);
    console.log(itemKey);
    itemKey.push(newString);
    console.log(itemKey);
    const stringifyAgain = JSON.stringify(itemKey);
    console.log(stringifyAgain);
    localStorage.setItem(name, stringifyAgain);
    console.log(localStorage);

  }

  
  console.log(itemColor, itemQuantity, itemName);
//_________________
// console.log(currentInput);

}




// for (let i=0; i<deleteItem.length; i++){
//   console.log(2);
// let buttons = deleteItem[i];
// console.log(typeof buttons);
// buttons.addEventListener('click', function(){
//   console.log('Test');
// })
// }
// console.log(3);








