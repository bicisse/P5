
const cartItems = document.getElementById('cart__items')
fetch('http://localhost:3000/api/products')

.then(function(res){
  return res.json();
})

.then(function(data){
  for(let i=0; i< data.length; i++) {
    console.log('test');
    cartItems.innerHTML = ` <article class="cart__item" data-id="{${data[i]['_id']}}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${data[i]['imageUrl']}" alt="${data[i]['altTxt']}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data[i]['name']}</h2>
        <p>${data[i]['pink.colors']}</p>
        <p>${data[i]['price']} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> `
  }

}

)

.catch(function(err){
console.log("Une erreur s'est produite");
});

const getColor = localStorage.getItem('color');
const getQuantity = localStorage.getItem('quantity');

// console.log(localStorage.getItem('color'));
// console.log(localStorage.getItem('quantity'));
// 