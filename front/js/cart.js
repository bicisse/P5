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

    .then(function(res) {
        return res.json();
    })

    .then(function(data) {

        let multiplyPriceByQuantity;
        let addUpQuantities = [];
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


        for (let i = 0; i < localStorage.length; i++) {
            getKeys = localStorage.key(i);
            console.log('getKeys', getKeys);
            let getArrays = localStorage.getItem(getKeys);
            parseArray = JSON.parse(getArrays);
            console.log(parseArray);



            for (let a = 0; a < parseArray.length; a++) {
                //  console.log(parseArray[a]);
                const storedColor = parseArray[a].color;
                const storedQuantity = parseArray[a].quantity;
                const storedId = getKeys;
                const dataIndex = data.findIndex(object => {
                    return object._id === storedId;
                })
                const price = data[i]['price'];

                //TOTAL
                // QUANTITY
                // Prix total quantité x couleur

                multiplyPriceByQuantity = price * storedQuantity;

                totalPrice.innerHTML = addUp(multiplyPriceByQuantity, addUpPrices);
                totalQuantity.innerHTML = addUp(storedQuantity, addUpQuantities);

                //________________
                // Inner HTML
                cartItems.innerHTML += `
      <article id="${storedId}" class="cart__item" data-id="{${storedId}}" data-color="${storedColor}">
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
         

        } //loop I
        /////////
        // MODIFY CART BEFORE CONFIRMATION
        //DELETE ITEM
        const deleteItem = document.querySelectorAll(".deleteItem");
        const itemQuantity = document.querySelectorAll('.itemQuantity');

        for (let i = 0; i < deleteItem.length; i++) {
            const button = deleteItem[i];

            const name = button.closest('.cart__item__content').querySelector('.cart__item__content__description :nth-child(1) ').textContent;
            const price = parseInt(button.closest('.cart__item__content').querySelector('.cart__item__content__description :nth-child(3)').textContent);
            const quantity = parseInt(button.closest('.cart__item__content').querySelector('.cart__item__content__settings').querySelector('div').querySelector('input').value);
            const color = button.closest('article').getAttribute('data-color');
            const id = button.closest('article').getAttribute('id');

            button.addEventListener('click', function() {

                // DELETE ITEM

                // ----------   IN THE LOCAL STORAGE
                //repeated code /!\
                const currentLocalStorage = JSON.parse(localStorage.getItem(id));
                const found = currentLocalStorage.findIndex(element => element.color === color);


                // ----------   IN THE CART
                button.parentElement.parentElement.parentElement.parentElement.remove();

                // MODIFY TOTAL PRICE
                const itemQuantity = currentLocalStorage[found].quantity;
                const toRemove = price * itemQuantity;
                const substractTotalPrice = parseInt(totalPrice.textContent) - toRemove;
                totalPrice.textContent = substractTotalPrice;



                // MODIFY TOTAL QUANTITY

                const currentQuantity = parseInt(totalQuantity.textContent);
                const substractTotalQuantity = currentQuantity - itemQuantity;

                totalQuantity.textContent = substractTotalQuantity;



                // from ls
                const cutFromLocalStorage = currentLocalStorage.splice(found, 1);
                const readyForLocalStorage = JSON.stringify(currentLocalStorage);
                localStorage.setItem(id, readyForLocalStorage);
                if (currentLocalStorage.length === 0) {
                    localStorage.removeItem(id);

                }
            })


            // MODIFY ITEM QUANTITY
            const plusMinus = itemQuantity[i];
            plusMinus.addEventListener('change', function(event) {
                let inputValue = parseInt(event.target.value);
                const currentLocalStorage = JSON.parse(localStorage.getItem(id));
                const found = currentLocalStorage.findIndex(element => element.color === color);
                const itemQuantity = currentLocalStorage[found].quantity;
                let currentQuantity;
                // QUANTITY NOT BELOW 1, ABOVE 100 OR NEGATIVE
                if(isNaN(inputValue) || inputValue <= 1){
                    
                    const minQuantity = inputValue = 1;
                    
                    modifyTotalInLocalStorage();
                    alert('La quantité ne peut pas être inférieure à 1')
                }
                if (inputValue >100){
                    const maxQuantity = inputValue =100;
                    modifyTotalInLocalStorage();
                    alert('La quantité ne peut pas être supérieure à 100.')
                }
                
                // REPLACE IN LOCAL STORAGE
                

               

                function modifyTotalInLocalStorage() {
                    currentQuantity = parseInt(totalQuantity.textContent);
                    const newObject = {
                        color: color,
                        quantity: inputValue
                    }
                    const removedItem = currentLocalStorage.splice(found, 1, newObject);
                    const backInLocalStorage = JSON.stringify(currentLocalStorage);
                    localStorage.setItem(id, backInLocalStorage);


                }

                // function updateTotalsInCart() {

                //     const quantityDifference = inputValue - itemQuantity;
                //     const newQuantity = currentQuantity + quantityDifference;
                //     totalQuantity.textContent = newQuantity;

                //     //____________

                //     const currentPrice = parseInt(totalPrice.textContent);
                //     const PriceDifference = price * quantityDifference;
                //     const newPrice = currentPrice + PriceDifference;
                //     totalPrice.textContent = newPrice;

                // }
                if (inputValue > itemQuantity) {
                    // TOTAL QUANTITY


                    modifyTotalInLocalStorage();


                    const quantityDifference = inputValue - itemQuantity;
                    const newQuantity = currentQuantity + quantityDifference;
                    totalQuantity.textContent = newQuantity;

                    //____________

                    const currentPrice = parseInt(totalPrice.textContent);
                    const PriceDifference = price * quantityDifference;
                    const newPrice = currentPrice + PriceDifference;
                    totalPrice.textContent = newPrice;



                } else {
                    // TOTAL QUANTITY
                    modifyTotalInLocalStorage();

                    const quantityDifference = itemQuantity - inputValue;
                    const newQuantity = currentQuantity - quantityDifference;
                    totalQuantity.textContent = newQuantity;
                    //____________

                    const currentPrice = parseInt(totalPrice.textContent);
                    const PriceDifference = price * quantityDifference;
                    const newPrice = currentPrice - PriceDifference;
                    totalPrice.textContent = newPrice;

                }


                    console.log(inputValue);
             

            })

        }

    })

    .catch(function(err) {
        console.log("Une erreur s'est produite:", err);
    });


if (localStorage.length == 0) {
    totalPrice.textContent = 0;
    totalQuantity.textContent = 0;
}