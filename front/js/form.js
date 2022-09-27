

const order = document.getElementById('order');
let values;
let stringifyValues;

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

    //     let test = inputLabel;
    // switch(test){
    //     case 'firstName':
    //     case 'lastName':
    //     case 'address':
    //     case 'city':
    //     case 'email':
    //         if(currentInput.value === " "||currentInput.value.length ==0 ){
    //         console.log(1);
    //             expr = `${inputLabel}`;
    //             // ---->if yes : displays an error message 
    //             switch (expr){
    //             case `${inputLabel}`:
    //             errorMsgArray.push(`${inputLabel} input empty`);
    //                 errorMessage.textContent = "Veuillez renseigner ce champ";   
    //                 break;
    //             default:
    //                 errorMsgArray.push(`unpexpected error`);                                    
    //             }
            
    //         }

    //     break;
    //     case 'firstName':
    //     case 'lastName':
    //         if (!check ){
    //             console.log(2);
    //             errorMsgArray.push(`only letters`);
    //             errorMessage.textContent = "Seules les lettres sont acceptées";
    //         }

    //     break;
    //     case 'email':
    //         if(ValidateEmail(email)){
    //             console.log(3);
    //             errorMsgArray.push('wrong email format');
    //     errorMessage.textContent = 'Veuillez renseigner une adresse mail correcte';

    //         }
    //     break;

    // }
        // ____________________
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

        //--------> form Data
        const form = document.getElementsByClassName('cart__order__form')[0];
        const formData = new FormData(form);
        values = [...formData.entries()];
        console.log(values);
        //_____
        let questionAnswers= [];
        for(var pair of formData.entries()) {
            questionAnswers.push(`${pair[0]} : '${pair[1]}'`);
         }

        const contact = Object.values(questionAnswers).join(', ');
        let productsArray = [];
         
        for(let i=0; i<localStorage.length; i++){
           const portia = localStorage.key(i);
           console.log(portia);
           productsArray.push(portia)
        }
        console.log('products:' + productsArray);


        const jsonBody= 'contact: {' +contact +'}';
        console.log(jsonBody);
        
        // const jsonBody = {
        //     contact : {
        //     firstName: 'Harry',
        //     lastName : "Potter", 
        //     address : '4, Private Drive', 
        //     city: "Little Whinging, Surrey", 
        //     email: "harry.potter@hogwarts.uk"},
        //     products: ["107fb5b75607497b96722bda5b504926"]
        // }
    
        //____________
        //send(jsonBody);
      
    } else {
        event.preventDefault(); 
        console.log('Errors:', errorMsgArray);
    }


   
    });



   function send(toSend){
    let user = JSON.stringify(values);
   
    // const jsonBody = {
    //     contact : {
    //     firstName: 'Harry',
    //     lastName : "Potter", 
    //     address : '4, Private Drive', 
    //     city: "Little Whinging, Surrey", 
    //     email: "harry.potter@hogwarts.uk"},
    //     products: ["107fb5b75607497b96722bda5b504926"]
    // }

    
      let response = fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body : jsonBody
        
        
      })

      
      .then(function(res) {
            if (res.ok) {
                console.log(response);
              return res.json();
            }
          })

   }


        // ----> post formData

       
        //fetch('http://localhost:3000/api/order', ----> error 404
        // fetch('/order',  ----> error 405
        //  fetch('http://localhost:3000/api/products/order',// ---> error 400
        //  {
        //     method: 'POST',
        //     headers: { 
        //         'Accept': 'application/json', 
        //         'Content-Type': 'application/json' 
        //         },
        //     body: JSON.stringify({nom : 'test'})
        // })
        
        // .then(function(res) {
        //     console.log('test 1');
        //     console.log(res.json);
        //     return res.json;
        //   })
       
        //   .catch(function(err){
    
        //     console.log("Une erreur s'est produite:", err);
        // });


     
           
            
         
       
        
        