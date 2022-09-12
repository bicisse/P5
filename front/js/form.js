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
const formInput = document.querySelectorAll('');


console.log(orderForm);

let letters;
// function onlyLetters(str) {
//     const check = /^[a-zA-Z]+$/.test(str);
//     if (check == true){
//         console.log('OK');
//     }
//     return letters;
//   }



order.addEventListener( 'click', function (e){
    const errorMsgArray = [];
    let errorMsg;
    console.log(formInput);

    for (let i=0; i<formInput.length;i++){
        const question = formInput[i];
        
        if (question ==" ") {

            console.log('working?');
            e.defaultPrevented();
        }
    

    }
        if (firstName.value == " ") {
            errorMsgArray.push('error');
            errorMsg = "firstName";
        }
        if (lastName.value === " ") {
            errorMsgArray.push('error');
            errorMsg = "lastName";
        }

        if (address.value === " ") {
            errorMsgArray.push('error');
            errorMsg = "address";
        }
        if (city.value === " ") {
            errorMsgArray.push('error');
            errorMsg = "city";
        }
        if (email.value === " ") {
            errorMsgArray.push('error');
            errorMsg = "email";
        }
        /*
            // lastNameErrorMsg.textContent = "Veuillez indiquer votre nom.";
            // addressErrorMsg.textContent = "Veuillez indiquer votre adresse.";
            // cityErrorMsg.textContent = "Veuillez indiquer votre ville.";*/
            
    console.log('errorMsgArray', errorMsgArray);
        
    switch(errorMsg){
        case "firstName" :
            console.log('firstNAme indeed');
        break;
        case "lastName" :
            console.log('firstNAme indeed');
        break;
        case "city" :
            console.log('firstNAme indeed');
        break;
        case "address" :
            console.log('firstNAme indeed');
        break;
        case "email" :
            console.log('firstNAme indeed');
        break;
        default : console.log('Not working');
    }


        console.log(2);
    
        if (errorMsgArray.length > 0) {
    
            e.preventDefault();
            console.log(errorMsgArray);
        }
    
    }
    

);