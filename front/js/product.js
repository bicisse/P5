let params = (new URL(window.location)).searchParams;
let pageId = params.get('id');


//___________________________
/*                           *\
---------> PRODUCTS <----------
\*___________________________*/
fetch('http://localhost:3000/api/products')
    .then(function(res) {
        // console.log(1);
        return res.json();
    })
    .then(function(data) {


        const found = data.find(element => element['_id'] === pageId);
        console.log(pageId, found['_id']);

        //====> Variables
        const itemImg = document.getElementById('item__img');
        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const price = document.getElementById('price');
        const colors = document.getElementById('color-select');

        //====> Inner HTML
        itemImg.innerHTML = ` <img src="${found['imageUrl']}" alt="${found['altTxt']}">`;
        title.innerHTML = found['name'];
        description.innerHTML = found['description'];
        price.innerHTML = found['price'];
        for (let i = 0; i < found['colors'].length; i++)
            colors.innerHTML += ` <option value="${found['colors'][i]}">${found['colors'][i]}</option>`;
    })
    .catch(function(err) {

        console.log("Une erreur s'est produite.", err);
    });


//___________________________
/*                           *\
------> LOCAL STORAGE <-------
\*___________________________*/




document.getElementById('addToCart').addEventListener('click', function() {


    //========> COLOR AND QUANTITY
    //QUANTITY

    let quantityChoice = document.getElementById('quantity').value;
    let quantity = Number(quantityChoice);



    //COLOR
    const colorChoice = document.getElementById('color-select');
    const color = colorChoice.options[colorChoice.selectedIndex].value;
    //CHOICE
    const choice = {
        color: color,
        quantity: quantity
    };
    const stringifyChoice = JSON.stringify(choice);
    // LOCAL STORAGE
    let currentLs;
    let emptyArray = [];

    function getFromLocalStorage() {

        currentLs = localStorage.getItem(pageId);
        return currentLs;
    }

    let firstValue;

    function firstPushInEmptyArray(makeString) {

        emptyArray.push(makeString);
        console.log("emptyArray", emptyArray, typeof emptyArray);
        firstValue = JSON.stringify(emptyArray);
        return firstValue;
    }
    let setInLocalStorage;

    function makeStringThenSetInLS(value) {
        setInLocalStorage = localStorage.setItem(pageId, value);
        return setInLocalStorage;
    }
    
    const tooLittle = quantity <= 0;
    const tooMuch = quantity >100;
    const noColorSelected = color =='';
    const quantityNotAccepted = tooLittle || tooMuch || noColorSelected;
    console.log(quantityNotAccepted);

    function problem(){
       if (noColorSelected && tooLittle ){
            alert('Veuillez selectionner une couleur et une quantitév entre 0 et 100.');
            document.getElementById('quantity').value = 1;
        }else if (tooMuch){
            alert('La quantité ne peut être supérieure à 100');
            document.getElementById('quantity').value = 100;
        } else if(noColorSelected){
            alert('Veuillez selectionner une couleur.')
        }else  if(tooLittle){
            alert('La quantité ne peut être inférieure à 1')
            document.getElementById('quantity').value = 1;
        } 
    }

                
                switch(quantityNotAccepted) {
                    case noColorSelected && (tooLittle || tooMuch):
                        alert('Veuillez selectionner une couleur et une quantité entre 0 et 100.');
                        document.getElementById('quantity').value = 1;
                        break;
                    case tooLittle :
                        alert('La quantité ne peut être inférieure à 1')
                        document.getElementById('quantity').value = 1;
                        break;
                    case tooMuch :
                        alert('La quantité ne peut être supérieure à 100');
                        document.getElementById('quantity').value = 100;
                        break;
                    case noColorSelected :
                        alert('Veuillez selectionner une couleur.')
                        break;
                    
                    default:
                        console.log('Unexpected error');
                }
          
   
     
      if (quantityNotAccepted) {
        
        switch(quantityNotAccepted) {
            case noColorSelected && (tooLittle || tooMuch):
                alert('Veuillez selectionner une couleur et une quantité entre 0 et 100.');
                document.getElementById('quantity').value = 1;
                break;
            case tooLittle :
                alert('La quantité ne peut être inférieure à 1')
                document.getElementById('quantity').value = 1;
                break;
            case tooMuch :
                alert('La quantité ne peut être supérieure à 100');
                document.getElementById('quantity').value = 100;
                break;
            case noColorSelected :
                alert('Veuillez selectionner une couleur.')
                break;
            
            default:
                console.log('Unexpected error');
        }



    } else {
        const kanapAlreadySelected = localStorage.getItem(pageId)
        const colorAlreadySelected = colorIndex === -1;


            // there is a key with this ID
            if (localStorage.getItem(pageId)) {
                console.log("This Kanap has been selected before...");
                console.log(choice, stringifyChoice);

                getFromLocalStorage();
                console.log('currentLs', currentLs); // get the array of the object with this page id
                const parseCurrentLs = JSON.parse(currentLs);
              
                const colorIndex = parseCurrentLs.findIndex(object => {
                    return object.color === choice.color;

                })
                console.log('colorIndex', colorIndex);

                if (colorIndex === -1) {
                    //same color
                    console.log("... but with another color. Let's add this one to the local sto.");
                    parseCurrentLs.push(choice);
                    // console.log('parseCurrentLs', parseCurrentLs);

                    const stringifyNewChoice = JSON.stringify(parseCurrentLs);
                    const backInLocalStorage = localStorage.setItem(pageId, stringifyNewChoice)

                } else {
                    //different colors
                    const objectToUpdate = parseCurrentLs[colorIndex];
                    currentQuantity = objectToUpdate.quantity;
                    console.log("...with this exact color. Let's update the quantity.");

                    const updatedQuantity = currentQuantity + choice.quantity;
                   
                    const newChoice = {
                        color: choice.color,
                        quantity: updatedQuantity
                    };
                    removedEl = parseCurrentLs.splice(colorIndex, 1);
                    parseCurrentLs.push(newChoice);
                   

                    const stringifyNewChoice = JSON.stringify(parseCurrentLs);
                    const backInLocalStorage = localStorage.setItem(pageId, stringifyNewChoice)


                }
                // __________Fin du else


            } else {
                //_____________________
                //--> if there is no key with this ID :
                console.log("This Kanap has never been selected before. Let's add it to the local storage");
                firstPushInEmptyArray(choice);
                makeStringThenSetInLS(firstValue);
            }
        
    }

    // if a color is picked 

})