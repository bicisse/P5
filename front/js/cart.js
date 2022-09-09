
const cartItems = document.getElementById('cart__items');
const deleteItem =  document.getElementsByClassName('deleteItem');


fetch('http://localhost:3000/api/products')

.then(function(res){
  return res.json();
})

.then(function(data){
  
  
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
      const itemColor = parseArray[a].color;
      const itemQuantity = parseArray[a].quantity;
      const price = data[i]['price'];
      console.log('price', price, typeof price);
      console.log('itemQuantity', itemQuantity, typeof itemQuantity);
      console.log('itemColor', itemColor);
    
      // Inner HTML
      cartItems.innerHTML += ` <article class="cart__item" data-id="{${data[i]['_id']}}" data-color="${itemColor}">
          <div class="cart__item__img">
            <img src="${data[i]['imageUrl']}" alt="${data[i]['altTxt']}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data[i]['name']}</h2>
              <p>${itemColor}</p>
              <p>${price} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemQuantity}">
          </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem"  >Supprimer</p>
              </div>
            </div>
          </div>
        </article> `
        //End Inner HTML
      
      //
      const totalItemQuantity = document.getElementById('totalQuantity');
      const totalPrice = document.getElementById('totalPrice');
      let test = [];
      
      let addition = (itemQuantity)*(price);
      console.log('addition', addition, typeof addition);
      
      //Total Quantity

        // delete Item
        
    } //loop A

    for(let j=0; j< deleteItem.length; j++){
      const button = deleteItem[j];
        button.addEventListener('click', function(event){
          window.alert("L'article a bien été supprimé du panier")
        const buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
        })
      console.log('removeFromLs', removeFromLs);
      }// loop J
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