
const cartItems = document.getElementById('cart__items');
const deleteItem =  document.getElementsByClassName('deleteItem');


fetch('http://localhost:3000/api/products')

.then(function(res){
  return res.json();
})

.then(function(data){
  let addUpQuantities=[];
  let addUpPrices = [];
  function addUp(pushInArray, array) {
    array.push(pushInArray);
    console.log('array', array, typeof array);
     let sum = 0;
             for (let g = 0; g < array.length; g++) {
                 sum += array[g];
             }
     console.log('sum', sum, typeof sum);
     return sum
   }



  for(let i=0; i< localStorage.length; i++) {
    const getKeys = localStorage.key(i);
    console.log('getKeys',getKeys);
     
    let getArrays= localStorage.getItem(getKeys);
    console.log('getArrays',getArrays);

    const parseArray = JSON.parse(getArrays);
    console.log('parseArray',parseArray);


    // const dataIndex = data.findIndex(object=>{
    //   return object._id === getKeys;
    // })
    // console.log(dataIndex);

 
    
    for( let a = 0; a< parseArray.length; a++){
      console.log(parseArray[a]);
      const storedColor = parseArray[a].color;
      const storedQuantity = parseArray[a].quantity;
      const price = data[i]['price'];
      const itemQuantity = document.getElementsByClassName('itemQuantity');
      const totalQuantity = document.getElementById('totalQuantity');
      const totalPrice = document.getElementById('totalPrice');
    
    
      
     
      console.log('price', price, typeof price);
      console.log('storedQuantity', storedQuantity, typeof storedQuantity);
      console.log('storedColor', storedColor);


      //TOTAL
      // QUANTITY
      const multiplyPriceByQuantity = price*storedQuantity;
      console.log('multiplyPriceByQuantity',multiplyPriceByQuantity, typeof multiplyPriceByQuantity);
      totalQuantity.textContent = addUp(storedQuantity, addUpQuantities);
  
      // //PRICE
      // 
      totalPrice.textContent = addUp(multiplyPriceByQuantity, addUpPrices);

      //________________
      // Inner HTML
      cartItems.innerHTML += ` <article class="cart__item" data-id="{${data[i]['_id']}}" data-color="${storedColor}">
          <div class="cart__item__img">
            <img src="${data[i]['imageUrl']}" alt="${data[i]['altTxt']}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data[i]['name']}</h2>
              <p>${storedColor}</p>
              <p>${price} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="storedQuantity" name="storedQuantity" min="1" max="100" value="${storedQuantity}">
          </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem"  >Supprimer</p>
              </div>
            </div>
          </div>
        </article> `
        //End Inner HTML

        // delete Item
        
         
          // loop J

        //__________________________
        
      } //loop A

   
  }//loop I
//
})

.catch(function(err){
console.log("Une erreur s'est produite");
});

const getColor = localStorage.getItem('color');
const getQuantity = localStorage.getItem('quantity');

// console.log(localStorage.getItem('color'));
// console.log(localStorage.getItem('quantity'));
// 