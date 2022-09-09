
//______________________________


document.getElementById('addToCart').addEventListener('click', function(){
 //Couleur et quantité*************************
    //quantity
    let quantityChoice = document.getElementById('quantity').value;
        // console.log(typeof quantityChoice); //string
    const quantity = Number(quantityChoice);
        // console.log(typeof quantity);   // number
    

    //color
    const colorChoice = document.getElementById('color-select'); 
    const color = colorChoice.options[colorChoice.selectedIndex].value; 

    //choice
    const choice = {color: color, quantity: quantity};
    const stringifyChoice = JSON.stringify(choice);
    
    // Local storage
    let currentLs;
    let emptyArray =[];
    function getFromLocalStorage(){
        
        currentLs = localStorage.getItem(extractId);
        return currentLs;
    }
    
    let firstValue;
    function firstPushInEmptyArray(makeString){
        
        emptyArray.push(makeString);
        console.log("emptyArray", emptyArray, typeof emptyArray);
        firstValue = JSON.stringify(emptyArray);
        return firstValue;
    }
    let setInLocalStorage;
    function makeStringThenSetInLS(value)  {
        console.log(value);
        setInLocalStorage = localStorage.setItem(extractId, value);
        return setInLocalStorage;
    }
 
// LOCAL STORAGE


    // if a color is picked 
    if (color !== ""){


        // there is a key with this ID
        if( localStorage.getItem(extractId)){
            console.log("This Kanap has been selected before...");
            console.log(choice, stringifyChoice);

            getFromLocalStorage();
            console.log('currentLs',currentLs);// get the array of the object with this page id
            const parseCurrentLs = JSON.parse(currentLs);
            // console.log(parseCurrentLs);

            
            //Parse the content of the local storage
            


            //
            const colorIndex = parseCurrentLs.findIndex(object => {
                return object.color === choice.color;
            //

            })
            console.log('colorIndex', colorIndex);
            
            if (colorIndex === -1) {
                //same color
                console.log("... but with another color. Let's add this one to the local sto.");
                parseCurrentLs.push(choice);
                // console.log('parseCurrentLs', parseCurrentLs);
                
                const stringifyNewChoice = JSON.stringify(parseCurrentLs);
                const backInLocalStorage= localStorage.setItem(extractId, stringifyNewChoice)
                
            } else {
                //different colors
                    const objectToUpdate = parseCurrentLs[colorIndex];
                    console.log('objectToUpdate', objectToUpdate);
                    currentQuantity = objectToUpdate.quantity;
                    console.log(currentQuantity);
                    console.log("...with this exact color. Let's update the quantity.");
                    
                    const updatedQuantity = currentQuantity + choice.quantity;
                    // console.log(updatedQuantity);  
                    
                    const newChoice = {color : choice.color, quantity: updatedQuantity};
                    
                    // console.log('parseCurrentLs', parseCurrentLs);
                    removedEl= parseCurrentLs.splice(colorIndex, 1);
                    // console.log('parseCurrentLs', parseCurrentLs);
                    // console.log( 'removedEl', removedEl);

                    parseCurrentLs.push(newChoice);
                    // console.log('parseCurrentLs', parseCurrentLs);

                    const stringifyNewChoice = JSON.stringify(parseCurrentLs);
                    const backInLocalStorage= localStorage.setItem(extractId, stringifyNewChoice)
                        
                    
               }
               // __________Fin du else
                // const sameColor = parseCurrentLs[i].color === choice.color;
                // console.log('sameColor',sameColor);
                
                // const lsColor= parseCurrentLs[i].color;
                // // console.log(lsColor, 'lsColor');
                // const currentQuantity= parseCurrentLs[i].quantity;
                // // console.log(currentQuantity, 'currentQuantity');
                // // console.log(choice.color, 'choice.color');
                // // console.log(choice.quantity, 'choice.quantity');
                
                // //_______________


           
                // //___________________
                // if(sameColor){
                    
                //     console.log('Same color.Update quantity');
                //     const updatedQuantity = currentQuantity + choice.quantity;
                //     // console.log(updatedQuantity);  
                    
                //     const newChoice = {color : choice.color, quantity: updatedQuantity};
                    
                //     // console.log('parseCurrentLs', parseCurrentLs);
                //     removedEl= parseCurrentLs.splice(indexOfObject, 1);
                //     // console.log('parseCurrentLs', parseCurrentLs);
                //     // console.log( 'removedEl', removedEl);

                //     parseCurrentLs.push(newChoice);
                //     // console.log('parseCurrentLs', parseCurrentLs);

                //     const stringifyNewChoice = JSON.stringify(parseCurrentLs);
                //     const backInLocalStorage= localStorage.setItem(extractId, stringifyNewChoice)
                    



                // } else {
                //     console.log('different colors');
                //     console.log('indexOfObject2', indexOfObject2);
                //     if( indexOfObject2){
                //         console.log('different color already in the array. Update');
                //         const updatedQuantity = currentQuantity + choice.quantity;
                //     // console.log(updatedQuantity);  
                    
                //     const newChoice = {color : choice.color, quantity: updatedQuantity};
                    
                //     // console.log('parseCurrentLs', parseCurrentLs);
                //     removedEl= parseCurrentLs.splice(indexOfObject2, 1);
                //     // console.log('parseCurrentLs', parseCurrentLs);
                //     // console.log( 'removedEl', removedEl);

                //     parseCurrentLs.push(newChoice);
                //     console.log('parseCurrentLs', parseCurrentLs);

                //     const stringifyNewChoice = JSON.stringify(parseCurrentLs);
                //     const backInLocalStorage= localStorage.setItem(extractId, stringifyNewChoice)
                    
                    
                //     }else {
                //         console.log('Different color that is not yet in the array. Push choice');
                    
                //         parseCurrentLs.push(choice);
                //         const stringifyNewChoice = JSON.stringify(parseCurrentLs);
                //         const backInLocalStorage= localStorage.setItem(extractId, stringifyNewChoice)

                //     }

                    
                   
                    
                    
                    
                // }








            
            
    
         
                
        } else  {
                //_____________________
            //--> if there is no key with this ID :
                console.log("This Kanap has never been selected before. Let's add it to the local storage");
                firstPushInEmptyArray(choice);
                makeStringThenSetInLS(firstValue);
        }   
    }
}
)