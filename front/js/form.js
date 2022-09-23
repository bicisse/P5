
const email  = document.getElementById('email');
const emailErrorMsg = document.getElementById('emailErrorMsg');
const order = document.getElementById('order');
const formInput = document.getElementsByClassName('cart__order__form__question');

function ValidateEmail(mail) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)){
            return (true)
        }
        return (false)   
    }
function noNumbers(str) {
    return /^([^0-9]*)$/.test(str);
    }

 let errorMsgArray = [];
    

order.addEventListener( 'click', function(event){
    event.preventDefault();
    let correctlyFilledForm = []
    let expr;

    // GET ALL THE FORM INPUTS, MARE A LOOP, LOOP THROUGH IT
    // DISPLAY MESSAGE ERROR IF VALIDATION IS NOT OK 
    const inputs = document.querySelectorAll('form .cart__order__form__question input');   

    let inputLabel;
    let currentInput;
    let errorMessage;

    for (let i = 0; i< inputs.length; i++){
        inputLabel = inputs[i].name;
        console.log('inputLabel', inputLabel);
        currentInput = document.getElementById(inputLabel);
        errorMessage = document.getElementById(`${inputLabel}ErrorMsg`);

        const check = !noNumbers(currentInput.value);
        console.log(check);

        console.log('START');
            // ---> checks if there are numbers in the first and last names
    if (check && (inputLabel === 'firstName' || inputLabel === 'lastName')){
        console.log(1);
        //   currentInput.style.backgroundColor ='red' ;  
        // if yes ----> displays an error message   
        errorMsgArray.push(`only letters`);
        console.log(errorMsgArray);
        errorMessage.textContent = "Seules les lettres sont acceptées";

    } else if(currentInput.value === " "||currentInput.value.length ==0 ) {
        //if not:
        // ---> checks if the input is empty or is only a space
            expr = `${inputLabel}`;
                // ---->if yes : displays an error message 
            switch (expr){
                case `${inputLabel}`:
                errorMsgArray.push(`${inputLabel} input empty`);
                    errorMessage.textContent = "Veuillez renseigner ce champ";   
                    break;
                default:
                    errorMsgArray.push(`unpexpected error`);                                    
            }
    } else if(inputLabel ==='email' && ValidateEmail(email)) {
            // if not:
            // ----> validate email
           
                errorMsgArray.push('wrong email format');
                errorMessage.textContent = 'Veuillez renseigner une adresse mail correcte';
     

    } else {
        errorMessage.textContent = ''; 
        correctlyFilledForm.push('OK')
    }

 }
    // while(errorMsgArray.length >0){
    //     errorMsgArray.pop();
    //     }
        
    // PREVENT DEFAULT
    console.log(correctlyFilledForm);
    // check that the form is correctly filled
    if(correctlyFilledForm.length == inputs.length){
        while(errorMsgArray.length >0){
            errorMsgArray.pop();
        }
        console.log('Correctly filled form', errorMsgArray);
    }


   
    });

 




//   //  FORM DATA
// const form = document.getElementById('cart__order__form');

// form.addEventListener('click', function() {
 
//     formData = new FormData(form);
//     const values = [...formData.entries()];
   
//     console.log('values',values);
// });
//     })