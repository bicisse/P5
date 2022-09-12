
const cartItems = document.getElementById('cart__items');
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');
const deleteItem =  document.getElementsByClassName('deleteItem');
        
fetch('http://localhost:3000/api/products')

.then(function(res){
  return res.json();
})

.then(function(data){
  let addUpQuantities=[];
  let addUpPrices = [];
  let getKeys;
  let arrayOfKeys = [];
  let arrayOfIds = [];
  let itemKey;
  

  // Array of the different keys of the local storage
  let isSame;
  for(let h=0; h< localStorage.length; h++) {
    getKeys = localStorage.key(h);
    console.log('getKeys', getKeys);
    arrayOfKeys.push(getKeys);
  
  itemKey = localStorage.getItem(getKeys);

  }
  console.log(itemKey);
    for(let l=0; l< data.length; l++) {
      getIds = data[l]['_id'];
      console.log('getIds', getIds);
      arrayOfIds.push(getIds);}
      
      console.log('arrayOfIds', arrayOfIds);
   console.log('arrayOfKeys', arrayOfKeys);
  


 



  function addUp(pushInArray, array) {
    array.push(pushInArray);
     let sum = 0;
             for (let i = 0; i< array.length; i++) {
                 sum += array[i];
             }
     return sum
   }


  for(let i=0; i< localStorage.length; i++) {
    console.log('localStorage', localStorage);
    
    let getArrays= localStorage.getItem(getKeys);
    console.log('getArrays', getArrays); 
    const parseArray = JSON.parse(getArrays);
    const test = {getArrays : parseArray};
    console.log(test);
      

    


      for( let a = 0; a< parseArray.length; a++){
        
        // console.log('parseArray', parseArray);
    
        const storedColor = parseArray[a].color;
        const storedQuantity = parseArray[a].quantity;
        const price = data[i]['price'];
      

    

        const item = parseArray[a];
        // console.log('item', item);


        //TOTAL
        // QUANTITY
        const multiplyPriceByQuantity = price*storedQuantity;
        totalQuantity.textContent = addUp(storedQuantity, addUpQuantities);
    
        // //PRICE
        
        
         totalPrice.textContent = addUp(multiplyPriceByQuantity, addUpPrices);
  // Find the index
  let dataIndex;
//   for(let k =0; k<arrayOfIds.length; k++){
//    for(let j =0; j<arrayOfKeys.length; j++){
//       dataIndex = arrayOfIds.findIndex(object => {
//        let result;
//        console.log('object',object);
//        result = object === arrayOfKeys[j];
       
//       if(result ===true){

//        console.log('YES');
//        console.log('object',object);
//        console.log(result, 'result');
//        return result;
//       }

//    })
//    console.log('dataIndex', dataIndex, typeof dataIndex);
     

//   }
// }
  
  
         // Inner HTML
        cartItems.innerHTML += ` 
        <article class="cart__item" data-id="{${data[dataIndex]['_id']}}" data-color="${storedColor}">
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
                <input type="number" class="storedQuantity" name="storedQuantity" min="1" max="100" value="${storedQuantity}">
              </div>
              <div class="cart__item__content__settings__delete"  >
                <p class="deleteItem" id="deleteItem" >Supprimer</p>
                </div>
              </div>
          </div>
        </article> `
          //End Inner HTML
          
          
          
        } //loop A
    
    }//loop I
    
})

.catch(function(err){
console.log("Une erreur s'est produite");
});

