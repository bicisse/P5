
const cartItems = document.getElementById('cart__items');
const deleteItemButton =  document.getElementsByClassName('deleteItem');
let itemToDelete;
let getKeys;

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

    const parseArray = JSON.parse(getArrays);
    // console.log('parseArray',parseArray);



 
    
    for( let a = 0; a< parseArray.length; a++){
    //  console.log(parseArray[a]);
      const storedColor = parseArray[a].color;
      const storedQuantity = parseArray[a].quantity;
      const storedId = parseArray[a].id;
      const price = data[i]['price'];
      
      const totalQuantity = document.getElementById('totalQuantity');
      const totalPrice = document.getElementById('totalPrice');
    
      
      const dataIndex = data.findIndex(object=>{
        return object._id === storedId;
      })
      // console.log(dataIndex);
      
      
     
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
            <input type="number" class="storedQuantity" name="storedQuantity" id="storedQuantity" min="1" max="100" value="${storedQuantity}">
          </div>
              <div class="cart__item__content__settings__delete" onclick='deleteItemFromCart()'>
                <p class="deleteItem" >Supprimer</p>
              </div>
            </div>
          </div>
        </article> `
        //End Inner HTML
      
        itemToDelete = {id: getKeys ,color: storedColor};
        // console.log(itemToDelete);

      
       


        // INPUT QUANTITY
        const inputQuantity = document.getElementById('storedQuantity');
        // console.log(inputQuantity);

        inputQuantity.addEventListener('change', function (){
          // console.log("more");
        })




      
         // SUPPRIMER ARTICLES
         

         
          
          
         

        
      
    
        
      } //loop A

   
  }//loop I
//
})

.catch(function(err){
console.log("Une erreur s'est produite");
});


  function deleteItemFromCart() {
  
          const findId =itemToDelete.id;
          console.log(itemToDelete.color);
          console.log('getKeys', getKeys);

          for (let i=0; i<localStorage.length; i++){
           
       console.log(localStorage.key(getKeys));
       console.log(localStorage.getItem(getKeys));

        }
      
       
      //   const colorIndex = parseCurrentLs.findIndex(object => {
      //     return object.color === choice.color;

      // })
        // console.log(findKey);

        //   // erase the article front end
        
          
        //   localStorage.getItem('');
          console.log(3);
          // erase the article in th parsed array
          console.log(4);
          // put back the string minus the item in the local storage
          console.log(5);
           
        }

       