
const firstName  = document.getElementById('firstName');
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastName  = document.getElementById('lastName');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const address  = document.getElementById('address');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const city = document.getElementById('city');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const email  = document.getElementById('email');
const emailErrorMsg = document.getElementById('emailErrorMsg');
const order = document.getElementById('order');
const formInput = document.getElementsByClassName('cart__order__form__question');
// const formInput = document.querySelectorAll('input [type="text"]');

function noNumbers(str) {
    return /^([^0-9]*)$/.test(str);
  }



order.addEventListener( 'click', function(event){
    event.preventDefault();

    
    let errorMsgArray = [];
    
    if (firstName.value === " ") {
        errorMsgArray.push('firstName');
        firstNameErrorMsg.textContent  = "Veuillez renseigner votre nom de famille";   
    }
  
    if (lastName.value === " ") {
        errorMsgArray.push('lastName');
        lastNameErrorMsg.textContent  = "Veuillez renseigner votre nom de famille";
    }

    if (address.value === " ") {
        errorMsgArray.push('address');
        addressErrorMsg.textContent  = "Veuillez renseigner votre adresse";
    }
    if (city.value === " ") {
        errorMsgArray.push('city');
        cityErrorMsg.textContent  = "Veuillez renseigner votre ville de résidence";
    }
    if (email.value === " ") {
        errorMsgArray.push('email');
        emailErrorMsg.textContent  = "Veuillez renseigner votre email";}
       
   
    //CHECKING THERE ARE ONLY LETTERS

    if (!noNumbers(firstName.value) || !noNumbers(lastName.value)){
        alert("Merci de n'utiliser que des lettres");
        errorMsgArray.push('only letters');
    }
        
    // PREVENT DEFAULT
        if (errorMsgArray.length > 0) {
    
            event.preventDefault();
            console.log(errorMsgArray);
        }
    // console.log(errorMsgArray);

        while(errorMsgArray.length >0){
        errorMsgArray.pop();
    }
    // console.log(errorMsgArray);
        
    });


    // form data
const form = document.getElementById('cart__order__form');


// const formData = new FormData(form);

let formData;
form.addEventListener('click', (e) => {
    // e.preventDefault();
    formData = new FormData(form);
    const values = [...formData.entries()];
    console.log(values);
   

    // show the form values
});
console.log('formData',formData);
