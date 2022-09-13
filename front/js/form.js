const orderForm  = document.getElementsByClassName('cart__order__form');
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


console.log(orderForm);

let letters;
// function onlyLetters(str) {
//     const check = /^[a-zA-Z]+$/.test(str);
//     if (check == true){
//         console.log('OK');
//     }
//     return letters;
//   }

let trying = 'Harry';

// function allLetter(inputtxt)
//   {
//    var letters = /^[A-Za-z]+$/;
//    if(inputtxt.value.test(letters))
//      {
//       return true;
//      }
//    else
//      {
//      alert("message");
//      return false;
//      }
//   }

console.log(trying);  
// allLetter(test);

function onlyLetters(str) {
    return /^[0-9]+$/.test(str);
  }
  
  console.log(onlyLetters('hello')); // 👉️ true
  console.log(onlyLetters('Johnson')); // 👉️ false
  console.log(onlyLetters('Bintou-Fatima')); // 👉️ false

  
console.log(order);
order.addEventListener( 'click', function(event){

    let errorMsgArray = [];
        if (firstName.value == " ") {
            errorMsgArray.push('firstName');
            firstNameErrorMsg.textContent = "Veuillez renseigner votre prénom";

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
       
    console.log('errorMsgArray', errorMsgArray);
        console.log(errorMsgArray[0]);
    //CHECKING THERE ARE ONLY LETTERS
    if (onlyLetters(firstName.value) || onlyLetters(lastName.value)){
        alert("Merci de n'utiliser que des lettres");
        errorMsgArray.push('only letters')
    }
        
        if (errorMsgArray.length > 0) {
    
            event.preventDefault();
            console.log(errorMsgArray);
        }
    console.log(errorMsgArray);
        while(errorMsgArray.length >0){
        errorMsgArray.pop();
    }
    console.log(errorMsgArray);
        
    });