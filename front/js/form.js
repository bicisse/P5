

const order = document.getElementById('order');
let values;
let stringifyValues;
let jsonBody;

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
        currentInput = document.getElementById(inputLabel);
        errorMessage = document.getElementById(`${inputLabel}ErrorMsg`);

        const check = !noNumbers(currentInput.value);

 
        //     ---> checks if there are numbers in the first and last names
    if (currentInput.value === " "||currentInput.value.length ==0 ) {
        //   currentInput.style.backgroundColor ='red' ;  
        // if yes ----> displays an error message   
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




      

    } else if (check && (inputLabel === 'firstName' || inputLabel === 'lastName')){
        //if not:
        // ---> checks if the input is empty or is only a space
        errorMsgArray.push(`only letters`);
        errorMessage.textContent = "Seules les lettres sont acceptées";
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
 
  
  
    // check that the form is correctly filled
    if(correctlyFilledForm.length == inputs.length){
        while(errorMsgArray.length >0){
            errorMsgArray.pop();
        }
         send();
      
    } else {
        event.preventDefault(); 
        console.log('Errors:', errorMsgArray);
    }


   
    });



   function send(){
  
    const form = document.getElementsByClassName('cart__order__form')[0];
    const formData = new FormData(form);
    

    const contact = Object.fromEntries(formData.entries());
    let productsArray = [];
    productsArray = arrayOfKeys;
    const jsonArray = JSON.stringify(productsArray);
   const jsonBody = { contact,
                     products : productsArray
                     }
    
      let response = fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body :JSON.stringify(jsonBody)
        
        
      })
      
        .then(function(res) {
            if (res.ok) {
                console.log(response);
                console.log(Promise);
              return res.json();
            }
          })
     

        .catch(function(err){
    
                console.log("Une erreur s'est produite:", err);
            });
        }