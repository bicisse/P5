const cartItems = document.getElementById('cart__items');


let getKeys;
let currentStoredQuantity;
let parseArray;



// function inputQuantity(){

// }

//
/* if(isTrue){
            
            // console.log('isTrue', isTrue);
            // console.log('parseArray', parseArray);
            
            removedEl= parseArray.splice(isTrue, 1);
            // console.log('removedEl',removedEl, 'was successfully removed from the array');
            // console.log('isTrue', isTrue);
            // console.log('parseArray', parseArray, typeof parseArray);
            const updatedCart = JSON.stringify(parseArray);
            // console.log('updatedCart', updatedCart, typeof updatedCart);
            const backInLocalStorage = localStorage.setItem(updatedCart);
            location.reload();

          } //fin If(isTrue) */


// for (let i=0; i<quantityButton.length; i++){
//   console.log('testing',quantityButton.storedQuantity.length);
// }


//____________________________
         
fetch('http://localhost:3000/api/products')

.then(function(res){
  return res.json();
})

.then(function(data){
  let addUpQuantities=[];
  let addUpPrices = [];
  function addUp(pushInArray, array) {
    array.push(pushInArray);
   // console.log('array', array, typeof array);
     let sum = 0;
             for (let g = 0; g < array.length; g++) {
                 sum += array[g];
             }
    //  console.log('sum', sum, typeof sum);
   
     return sum
   }



  for(let i=0; i< localStorage.length; i++) {
    getKeys = localStorage.key(i);
    // console.log('getKeys',getKeys);
     
    let getArrays= localStorage.getItem(getKeys);
    // console.log('getArrays',getArrays);

    parseArray = JSON.parse(getArrays);
   
   

    for( let a = 0; a< parseArray.length; a++){
    //  console.log(parseArray[a]);
      const storedColor = parseArray[a].color;
      const storedQuantity = parseArray[a].quantity;
      const storedId = parseArray[a].id;
      
   
      const totalQuantity = document.getElementById('totalQuantity');
      const totalPrice = document.getElementById('totalPrice');
    

            
      const dataIndex = data.findIndex(object=>{
        return object._id === storedId;
      })
      // console.log(dataIndex);
      
      
      const price = data[i]['price'];
      // console.log('price', price, typeof price);
      // console.log('storedQuantity', storedQuantity, typeof storedQuantity);
      // console.log('storedColor', storedColor);
      // console.log('storedId', storedId, typeof storedId);


      //TOTAL
      // QUANTITY
      const multiplyPriceByQuantity = price*storedQuantity;
      // console.log('multiplyPriceByQuantity',multiplyPriceByQuantity, typeof multiplyPriceByQuantity);
      totalQuantity.textContent = addUp(storedQuantity, addUpQuantities);
  
      // //PRICE
      // 
      totalPrice.textContent = addUp(multiplyPriceByQuantity, addUpPrices);

      //________________
      // Inner HTML
      cartItems.innerHTML += ` <article id="${data[dataIndex]['_id']}" class="cart__item" data-id="{${storedId}}" data-color="${storedColor}">
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
            <p>Qté : </p>
            <input type="number" 
            class="storedQuantity" 
            name="storedQuantity" 
            id="storedQuantity" 
            onclick='plusMinus("${storedColor}", "${storedQuantity}","${data[dataIndex]['name']}", "${storedId}")'
             min="1" max="100" value="${storedQuantity}">
          </div>
              <div class="cart__item__content__settings__delete" >
                <p class="deleteItem" onclick='deleteCartItem("${storedColor}","${storedQuantity}", "${data[dataIndex]['name']}")' >Supprimer</p>
              </div>
            </div>
          </div>
        </article> `
        //End Inner HTML

     
      } //loop A

  
  }//loop I
  /////////

})




.catch(function(err){
console.log("Une erreur s'est produite");
});



let removedItem;


let itemQuantity;
let itemColor;
let itemName;
let inputValue;
const deleteItem = document.querySelectorAll('.deleteItem')
console.log(deleteItem);

const removeItemFromCart = document.getElementsByClassName('deleteItem');
console.log(removeItemFromCart.item.length);
  for (let i=0; i< removeItemFromCart.item.length; i++){
    console.log('Test Pascal');
   
    const button = removeItemFromCart.item(i);
    button.addEventListener('click', function (event){
      console.log(1);
      let buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
      
    })
  }

function deleteCartItem(color, quantity, name, event){
  console.log(localStorage);
  itemColor = color;
  itemQuantity = quantity;
  itemName = name; 

  console.log(itemColor, itemQuantity, itemName);
  console.log('test');

  const itemKey= JSON.parse(localStorage.getItem(name));
  console.log('itemKey',itemKey);

  const found = itemKey.find( element => element.color === color);
 console.log("found",found);

removedItem =  itemKey.splice(found, 1);
console.log('removedItem', removedItem);
console.log('itemKey', itemKey);

// REMOVE ITEM FROM ARRAY / PUT ARRAY BACK IN LOCAL STORAGE
const stringifyAgain = JSON.stringify(itemKey);
console.log(stringifyAgain);
localStorage.setItem(name, stringifyAgain);
console.log(localStorage);


// for (let i=0; i<localStorage.length; i++){

// REMOVE EMPTY ARROW FROM LOCAL STORAGE
console.log(itemKey.length, 'length');
if (itemKey.length === 0){
  console.log('Empty Array');
  localStorage.removeItem(name);
} else {
  console.log('Array not empty');
}
// ERASE ARTICLE FROM CART


  // TODO   --->    UPDATE TOTAL QUANTITY AND PRICE
 }
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

