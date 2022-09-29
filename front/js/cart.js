const cartItems = document.getElementById('cart__items');

const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');
let getKeys;
let currentStoredQuantity;
let parseArray;
let sum = 0;
let finalPrice;
let finalQuantity;
let arrayOfKeys = [];


fetch('http://localhost:3000/api/products')

    .then(function(res) {
        return res.json();
    })

    .then(function(data) {

        let multiplyPriceByQuantity;
        let addUpQuantities = [];
        let addUpPrices = [];
/**
 * 
 * 
 * FUNCTIONS
 * 
 * 
 */



        function addUp(pushInArray, array) {
            array.push(pushInArray);
            const initialValue = 0;
            const sumWithInitial = array.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                initialValue
            );
            return sumWithInitial;


        }


        for (let i = 0; i < localStorage.length; i++) {// loops over local storage keys
            getKeys = localStorage.key(i);
            let getArrays = localStorage.getItem(getKeys);
            parseArray = JSON.parse(getArrays);
            arrayOfKeys.push(getKeys);


            for (let a = 0; a < parseArray.length; a++) { // loops over specific items
                //  console.log(parseArray[a]);
                const storedColor = parseArray[a].color;
                const storedQuantity = parseArray[a].quantity;
                const storedId = getKeys;
                const dataIndex = data.findIndex(object => {
                    return object._id === storedId;
                })
                const price = data[i]['price'];

                //TOTAL
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

                //End Inner HTML

            } //loop A
         

        } //loop I
    //_________________________________________
    /*                                        *\
    ----> MODIFY QUANTITY AND DELETE ITEM <-----
    \*                                        */
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

                // =======> DELETE ITEM

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



                // UPDATE THE LOCAL STORAGE
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

               
                function aceptedQuantity(){
                      if(isNaN(inputValue) || inputValue <= 0 ){
                        plusMinus.value = '1';
                        inputValue = 1;
                        alert('La quantité ne peut pas être inférieure à 1');
                        modifyTotalInLocalStorage(); }
        
                    if (inputValue >100){
                        plusMinus.value = '100';
                        inputValue = 100;
                        alert('La quantité ne peut pas être supérieure à 100.');
                        modifyTotalInLocalStorage();
                    }
               
            }
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
                
                let newQuantity;
                let newPrice;
                let quantityDifference;
                let currentPrice;
                let priceDifference;
           
                  function modifyInputValue (){
                        modifyTotalInLocalStorage();
                    aceptedQuantity();
                    updateTotals();

                    }
                
                function updateTotals (c){
                        // QUANTITY
                    quantityDifference = inputValue - itemQuantity;
                    newQuantity = currentQuantity + quantityDifference;
                    totalQuantity.textContent = newQuantity;

                        // PRICE
                    currentPrice = parseInt(totalPrice.textContent);
                    priceDifference = price * quantityDifference;
                    newPrice = currentPrice + priceDifference;
                    totalPrice.textContent = newPrice;
                }
              
            
                if (inputValue > itemQuantity) {
                    // TOTAL QUANTITY
                  modifyInputValue();
                    
                } else {
                    // TOTAL QUANTITY
                   modifyInputValue();
                }

             

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

//____________________________________________________
/*                 *\
------> FORM <-------
\*                 */

const order = document.getElementById('order');
let values;
let stringifyValues;
let jsonBody;
let errorMsgArray = [];
let orderId ;



function ValidateEmail(mail) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
        return (true)
    }
    return (false)
}

function noNumbers(str) {
    return /^([^0-9]*)$/.test(str);
}


function send() {

    const form = document.getElementsByClassName('cart__order__form')[0];
    const formData = new FormData(form);


    const contact = Object.fromEntries(formData.entries());
    let productsArray = [];
    productsArray = arrayOfKeys;
    const jsonBody = {
        contact,
        products: productsArray
    }
  // ===============> SEND DATA TO BACK
  //____________________________________

    fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(jsonBody)
        })


        .then((res) => res.json())
        .then(function (data) {
/*
let url = new URL('https://example.com?foo=1&bar=2');
let params = new URLSearchParams(url.search);

//Add a second foo parameter.
params.append('foo', 4);
//Query string is now: 'foo=1&bar=2&foo=4' */
            
        orderId =data.orderId;
        
        let url = new URL( 'http://127.0.0.1:5502/front/html/confirmation.html');
         url.searchParams.append('orderId', `${orderId}`);
         console.log(orderId);
        location.href = url;
        })

        .catch(function(err) {
            console.log("Une erreur s'est produite:", err);
        });
        
}

//=======================> FORM VALIDATION
//__________________________________________

order.addEventListener('click', function(event) {
    event.preventDefault();
    let correctlyFilled = []
    
    const inputs = document.querySelectorAll('form .cart__order__form__question input');

    let inputLabel;
    let currentInput;
    let errorMessage;


    for (let i = 0; i < inputs.length; i++) {
        inputLabel = inputs[i].name;
        currentInput = document.getElementById(inputLabel);
        errorMessage = document.getElementById(`${inputLabel}ErrorMsg`);

        switch (inputLabel) {
            case `${inputLabel}`:
                if (currentInput.value === " " || currentInput.value.length == 0) {
                    errorMessage.textContent = "Ce champ est obligatoire";
                    errorMsgArray.push(`${inputLabel} input is empty`);
                } else {
                    errorMessage.textContent = '';
                    switch (inputLabel) {
                        case 'firstName':
                        case 'lastName':
                            const check = !noNumbers(currentInput.value);
                            if (check) {
                                errorMessage.textContent = "Seules les lettres sont acceptées";
                            } 
                            correctlyFilled.push(`OK`)
                            break;
                        case 'address':
                        case 'city':
                            correctlyFilled.push(`OK`)
                            break;
                        case 'email':
                            if (ValidateEmail(email)) {
                                errorMsgArray.push('wrong email format');
                                errorMessage.textContent = 'Merci de renseigner une adresse mail correcte'
                            } 
                                errorMessage.textContent = '';
                                correctlyFilled.push('OK')
                            break;
                        default:
                            errorMsgArray.push(`unexpected error`);
                            break;
                    }
                }
                break;
            default:
                errorMsgArray.push(`unexpected error`);
                break;

        }

        if (correctlyFilled.length === inputs.length) {
            while (errorMsgArray.length > 0) {
                errorMsgArray.pop();
            }
            send()
        } 
    }

    
});
