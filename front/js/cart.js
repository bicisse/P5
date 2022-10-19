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

        function addUp(pushInArray, array) {
            array.push(pushInArray);
            const initialValue = 0;
            const sumWithInitial = array.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                initialValue
            );
            return sumWithInitial;


        }


        for (let i = 0; i < localStorage.length; i++) { // loops over local storage keys
            getKeys = localStorage.key(i);
            let getArrays = localStorage.getItem(getKeys);
            parseArray = JSON.parse(getArrays);
            arrayOfKeys.push(getKeys);


            for (let a = 0; a < parseArray.length; a++) { // loops over specific items

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
        //
        //⭐ MODIFY QUANTITY AND DELETE ITEM                                      */
        const deleteItem = document.querySelectorAll(".deleteItem");
        const itemQuantity = document.querySelectorAll('.itemQuantity');

        for (let i = 0; i < deleteItem.length; i++) {
            const button = deleteItem[i];
            const price = parseInt(button.closest('.cart__item__content').querySelector('.cart__item__content__description :nth-child(3)').textContent);
            const color = button.closest('article').getAttribute('data-color');
            const id = button.closest('article').getAttribute('id');

            let found;
            let currentLocalStorage;

            function getItemFromLocalStorage() {
                // RECUPERER UN ITEM PRECIS DANS LE LCAL STORAGE
                // A PARTIR DES INFORMATIONS RECUPEREES CI DESSUS
                currentLocalStorage = JSON.parse(localStorage.getItem(id));
                found = currentLocalStorage.findIndex(element => element.color === color);

            }

            function updateLocalStorage() {
                // MET A JOUR LE LOCAL STORAGE
                const backInLocalStorage = JSON.stringify(currentLocalStorage);
                localStorage.setItem(id, backInLocalStorage);

            }

            let inputValue;
            button.addEventListener('click', function() {



                // ⭐ DELETE ITEM


                //get the local storage and find the corresponding object

                getItemFromLocalStorage();

                // ----------   DELETE THE ITEM IN THE CART
                button.parentElement.parentElement.parentElement.parentElement.remove();

                // MODIFY TOTAL PRICE
                const itemQuantity = currentLocalStorage[found].quantity;
                const toRemove = price * itemQuantity;
                const updateTotalPrice = parseInt(totalPrice.textContent) - toRemove;
                totalPrice.textContent = updateTotalPrice;


                // MODIFY TOTAL QUANTITY

                const currentQuantity = parseInt(totalQuantity.textContent);
                const updateTotalQuantity = currentQuantity - itemQuantity;
                totalQuantity.textContent = updateTotalQuantity;



                // UPDATE THE LOCAL STORAGE
                const removed = currentLocalStorage.splice(found, 1);
                console.log('removed', removed, 'currentLocalStorage', currentLocalStorage);
                updateLocalStorage();
                if (currentLocalStorage.length === 0) {
                    localStorage.removeItem(id);

                }
            })


            // MODIFY ITEM QUANTITY
            const plusMinus = itemQuantity[i];

            plusMinus.addEventListener('change', function(event) {

                inputValue = parseInt(event.target.value);
                // REPEATED CODE

                getItemFromLocalStorage();
                const itemQuantity = currentLocalStorage[found].quantity;
                let currentQuantity;



                function acceptedQuantity() {
                    // VERIFIE QUE LA QUANTITE EST UN CHIFFRE/NOMBRE ENTRE 1 ET 100
                    if (isNaN(inputValue) || inputValue <= 0) {
                        plusMinus.value = '1';
                        inputValue = 1;
                        alert('La quantité ne peut pas être inférieure à 1');
                        modifyTotalInLocalStorage();
                    }

                    if (inputValue > 100) {
                        plusMinus.value = '100';
                        inputValue = 100;
                        alert('La quantité ne peut pas être supérieure à 100.');
                        modifyTotalInLocalStorage();
                    }

                }

                function modifyTotalInLocalStorage() {
                    // PREPARE UN NOUVEL OBJECT 
                    // MET A JOUR LE LOCAL STORAGE
                    currentQuantity = parseInt(totalQuantity.textContent);
                    const newObject = {
                        color: color,
                        quantity: inputValue
                    }
                    const removedItem = currentLocalStorage.splice(found, 1, newObject);
                    updateLocalStorage();
                }

                function modifyInputValue() {

                    modifyTotalInLocalStorage();
                    acceptedQuantity();
                    updateTotals();

                }

                function updateTotals() {
                    // MET A JOUR LE TOTAL QUANTITE ET PRIX
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

                let newQuantity;
                let newPrice;
                let quantityDifference;
                let currentPrice;
                let priceDifference;


                modifyInputValue();

            })

        }

    })

    .catch(function(err) {
        console.log("Une erreur s'est produite:", err);
    });

if (localStorage.length == 0) {
    // SI LE LOCAL STORAGE EST VIDE
    // LES TOTAUX AFFICHENT ZERO
    totalPrice.textContent = 0;
    totalQuantity.textContent = 0;
}


/*               
⭐⭐⭐⭐FORM 
 */

const order = document.getElementById('order');
let values;
let stringifyValues;
let jsonBody;
let orderId;



function ValidateEmail(mail) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
        return (true)
    }
    return (false)
}


function noNumbers(input) {
    return /^([^0-9]*)$/.test(input);
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

    console.log('jsonBody', typeof jsonBody, jsonBody);

    // ⭐SEND DATA TO BACK⭐
    __

    fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(jsonBody)
        })


        .then((res) => res.json())
        .then(function(data) {

            orderId = data.orderId;

            let url = new URL('http://127.0.0.1:5502/front/html/confirmation.html');
            url.searchParams.append('orderId', `${orderId}`);
            location.href = url;
        })

        .catch(function(err) {
            console.log("Une erreur s'est produite:", err);
        });

}

//⭐FORM VALIDATION


order.addEventListener('click', function(event) {
    event.preventDefault();
    let correctlyFilled = []



    let inputLabel;
    let currentInput;
    let errorMessage;
    const inputs = document.querySelectorAll('form .cart__order__form__question input');
    if (localStorage.length >= 1) {
        // LE FORMULAIRE NE PEUT ETRE VALIDé SI LE 
        // LOCAL STORAGE EST VIDE

        for (let i = 0; i < inputs.length; i++) {
            inputLabel = inputs[i].name;
            currentInput = document.getElementById(inputLabel);
            errorMessage = document.getElementById(`${inputLabel}ErrorMsg`);

            switch (inputLabel) {

                case `${inputLabel}`:
                    if (currentInput.value === " " || currentInput.value.length == 0) {
                        // SI LE CHAMP EST VIDE OU NE CONTIENT QU'UN ESPACE
                        errorMessage.textContent = "Ce champ est obligatoire";
                    } else {
                        errorMessage.textContent = '';
                        switch (inputLabel) {
                            case 'firstName':
                            case 'lastName':
                                // VERIFIER QUE CES CHAMPS NE CONTIENNENT PAS DE CHIFFRES
                                const check = !noNumbers(currentInput.value);
                                if (check) {
                                    errorMessage.textContent = "Seules les lettres sont acceptées";
                                } else {

                                    errorMessage.textContent = '';
                                    correctlyFilled.push(`OK`)
                                }
                                break;
                            case 'address':
                            case 'city':
                                // CONSIDERéS COMME CORRECTEMENT REMPLIS DèS LORS QU'ILS NE SONT PAS VIDES
                                correctlyFilled.push(`OK`)
                                break;
                            case 'email':
                                // VERIFIE QUE LE CHAMP A UN FORMAT CORRECT:
                                // DES LETTRES AVANT LE @ ET UN POINT APRES LE @
                                // PRESENCE D'UN @ ET D'UN POINT
                                // MINIMUM 2 ET MAXIMUM 3 LETTRES APRES LE POINT

                                if (ValidateEmail(email)) {
                                    errorMessage.textContent = 'Merci de renseigner une adresse mail correcte'
                                } else {
                                    errorMessage.textContent = '';
                                    correctlyFilled.push('OK')
                                }
                                break;
                            default:
                                alert(`unexpected error`);
                                break;
                        }
                    }
                    break;
                default:
                    alert(`unexpected error`);
                    break;

            }

            // 🔸A CHAQUE FOIS QU'UN CHAMP EST CORRECTEMENT REMPLI, IL RENVOIE 'OK' 
            // DANS L'ARRAY correctlyFilled
            // SI L'ARRAY A LA MEME LONGUEUR QUE LE NOMDRE D'INPUT
            // LA FONCTION SEND EST APPELEE
            if (correctlyFilled.length === inputs.length) {
                send()
            }
        }
    } else {
        // SI LE LOCAL STORAGE EST VIDE
        // UNE ALERTE EN INFORME LE CLIENT

        alert('Votre panier est vide pour le moment')
    }

});