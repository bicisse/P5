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
    totalQuantity. innerHTML = addUp(storedQuantity, addUpQuantities );



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
           <p>Qté : </p>
           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${storedQuantity}">
         </div>
         <div class="cart__item__content__settings__delete">
           <p class="deleteItem">Supprimer</p>
         </div>
       </div>
     </div>
   </article> 
        `

      //______________________________________________________________________________
      //End Inner HTML

      } //loop A
      
      
    }//loop I
    /////////
    // MODIFY CART BEFORE CONFIRMATION
    //DELETE ITEM
    const deleteItem = document.querySelectorAll(".deleteItem");
    const itemQuantity = document.querySelectorAll('.itemQuantity');
  
    for (let i=0; i<deleteItem.length; i++){
      const button = deleteItem[i];
   
      const name= button.closest('.cart__item__content').querySelector('.cart__item__content__description :nth-child(1) ').textContent;
      const price= parseInt(button.closest('.cart__item__content').querySelector('.cart__item__content__description :nth-child(3)').textContent);
      const quantity= parseInt(button.closest('.cart__item__content').querySelector('.cart__item__content__settings').querySelector('div').querySelector('input').value);
      const color =  button.closest('article').getAttribute('data-color');
      const id = button.closest('article').getAttribute('id');
   
      button.addEventListener('click', function() {
        
          // DELETE ITEM
        
             // ----------   IN THE LOCAL STORAGE
        //repeated code /!\
        const currentLocalStorage = JSON.parse(localStorage.getItem(name));
          const found = currentLocalStorage.findIndex( element => element.color === color);
          console.log(found);
          console.log(currentLocalStorage);
          console.log(currentLocalStorage[found]);
          

   // ----------   IN THE CART
        button.parentElement.parentElement.parentElement.parentElement.remove();

          // MODIFY TOTAL PRICE
          console.log(currentLocalStorage[found]);
        const itemQuantity = currentLocalStorage[found].quantity;
        console.log('itemQuantity', itemQuantity);
        const toRemove = price*itemQuantity;
        console.log(parseInt(totalPrice.textContent));
        const substractTotalPrice = parseInt(totalPrice.textContent) - toRemove;
        totalPrice.textContent = substractTotalPrice;
     


          // MODIFY TOTAL QUANTITY
        
        const currentQuantity =  parseInt(totalQuantity.textContent);
        console.log(currentQuantity);
        const substractTotalQuantity = currentQuantity - itemQuantity;
        
        totalQuantity.textContent = substractTotalQuantity;
    
        console.log('color',color, 'id', id, 'quantity', quantity, 'name', name, 'price', price);


        // from ls
           const cutFromLocalStorage = currentLocalStorage.splice(found, 1);
           console.log('currentLocalStorage', currentLocalStorage);
           const readyForLocalStorage = JSON.stringify(currentLocalStorage);
           localStorage.setItem(name,readyForLocalStorage);
        if(currentLocalStorage.length ===0){
                localStorage.removeItem(name);
                
              }
      })


      // MODIFY ITEM QUANTITY
      const plusMinus = itemQuantity[i];
      plusMinus.addEventListener('change', function(event){
        const inputValue = parseInt(event.target.value);
        // REPLACE IN LOCAL STORAGE
                const currentLocalStorage = JSON.parse(localStorage.getItem(name));
                console.log(currentLocalStorage);
                const found = currentLocalStorage.findIndex( element => element.color === color);
                console.log('found', found);
                const itemQuantity = currentLocalStorage[found].quantity;
                console.log(itemQuantity);
          
                    if(inputValue> itemQuantity){
                      // TOTAL QUANTITY
                      console.log('more');
                      console.log(' THIS quantity =', itemQuantity, "REPLACE BY", inputValue);
                     


                      const currentQuantity =  parseInt(totalQuantity.textContent);
                      console.log(currentQuantity, typeof currentQuantity);
                      

                     
                      const newObject = {id:id, color:color, quantity:inputValue}
                      console.log(newObject);
                       const removedItem = currentLocalStorage.splice(found, 1, newObject);
                       const backInLocalStorage = JSON.stringify(currentLocalStorage);
                       localStorage.setItem(name, backInLocalStorage);
                       const newQuantity = currentQuantity+1;
                      console.log(newQuantity);
                      totalQuantity.textContent = newQuantity;

                      
                      const currentPrice = parseInt(totalPrice.textContent);
                      console.log(currentPrice);
                      console.log(price);
                      const newPrice = currentPrice + price;
                      console.log(newPrice);
                      totalPrice.textContent = newPrice
                          
                      
                  
                    } else {
                      // TOTAL QUANTITY
                      console.log('less');
                      console.log('THIS quantity =', itemQuantity, "REPLACE BY", inputValue);
                      const currentQuantity =  parseInt(totalQuantity.textContent);
                      console.log(currentQuantity, typeof currentQuantity);
                      const newQuantity = currentQuantity-1;
                      console.log(newQuantity);
                      totalQuantity.textContent = newQuantity;

                      const currentPrice = parseInt(totalPrice.textContent);
                      console.log(currentPrice);
                      console.log(price);
                      const newPrice = currentPrice - price;
                      console.log(newPrice);
                      totalPrice.textContent = newPrice

                    }

                const newString = {id:id, color: color, quantity: inputValue};
                removedItem =  currentLocalStorage.splice(found, 1, newString);
                const readyForLocalStorage = JSON.stringify(currentLocalStorage);
                console.log(readyForLocalStorage, name);
                const backInLocalStorage = localStorage.setItem(name, readyForLocalStorage)
        })

      }

    })

.catch(function(err){
console.log("Une erreur s'est produite");
});



let removedItem;



let inputValue;


  
  if(localStorage.length == 0){
    totalPrice.textContent =0;
          totalQuantity.textContent =0;
  }
