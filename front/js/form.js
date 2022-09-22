
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
    
    let expr;

    // GET ALL THE FORM INPUTS, MARE A LOOP, LOOP THROUGH IT
    // DISPLAY MESSAGE ERROR IF VALIDATION IS NOT OK 
    const inputs = document.querySelectorAll('input[type=text]');
   

    let inputLabel;
    let currentInput;
    for (let i = 0; i< inputs.length; i++){
       inputLabel = inputs[i].name;
    
       console.log(inputLabel);
       currentInput = document.getElementById(inputLabel);
       const errorMessage = document.getElementById(`${inputLabel}ErrorMsg`);
    //    const errorMsg = document.getElementById(errorMessage);

const    check = !noNumbers(currentInput.value);


if (check){
    if(inputLabel === 'firstName' || inputLabel === 'lastName'){
    //   currentInput.style.backgroundColor ='red' ;     
    
    errorMsgArray.push('only letters');
    errorMessage.textContent = "Seules les lettres sont acceptées";
   
  
  
    }else {
        errorMessage.textContent = "";
    }
  
}else{
    
      if (currentInput.value === " ") {
        
        errorMessage.textContent = "Ce champ est obligatoire";
      }
      
      else if(currentInput.value.length ==0 ) {
            // console.log(`NO ${inputLabel}`);
        expr = `${inputLabel}`; 
                    
        } else {
            errorMessage.textContent = " ";
        }


}


      
    //    console.log(`${inputLabel}`);   
    switch (expr){
        case `${inputLabel}`:
        errorMsgArray.push(`${inputLabel}`);
            errorMessage.textContent = "Veuillez renseigner ce champ";   
       break;
        default:
            while(errorMsgArray.length >0){
            errorMsgArray.pop();
             }
    }
 
    // Bintou-Fatima ==> false// Bintou 29=== true
   
                
        
        }


        // EMAIL
        const email = document.getElementById('email');
        const emailErrorMrg = document.getElementById('emailErrorMsg');
      
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))
  {
      console.log('Bon');
      emailErrorMrg.textContent = "";
      return (true);
  }
    
    emailErrorMrg.textContent = "Saisissez une adresse e-mail correcte"
    return (false)
}
ValidateEmail(email)        
 
   
   
        
    // PREVENT DEFAULT
        if (errorMsgArray.length > 0) {
    
            event.preventDefault();
            console.log(errorMsgArray);
        }
    // console.log(errorMsgArray);

   
    // console.log(errorMsgArray);
    




    // FORM DATA
// form.addEventListener('click', function() {
//     // e.preventDefault();
//     formData = new FormData(form);
//     const values = [...formData.entries()];
//     // show the form values
//     console.log('values',values);
// });
    });






