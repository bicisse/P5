// const pageUrl = window.location.search;
// const productId = pageUrl.slice(4);
// console.log(productId);

let params = (new URL(window.location)).searchParams;
let extractId = params.get('id');

fetch('http://localhost:3000/api/products')
.then(function(res){
    // console.log(1);
    return res.json();
})
.then(function(data){
    const found = data.find( element => element['_id'] === extractId);
    // console.log(extractId,found['_id']);
    // console.log(2);
    // 
    const itemImg = document.getElementById('item__img');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const price = document.getElementById('price');
    const colors = document.getElementById('colors');
    
    //
   itemImg.innerHTML = ` <img src="${found['imageUrl']}" alt="${found['altTxt']}">`;
   title.innerHTML= found['name'];
   description.innerHTML = found['description'];
   price.innerHTML = found['price'];
   for (let i =0; i < found['colors'].length; i++)
   colors.innerHTML += ` <option value="${found['colors'][i]}">${found['colors'][i]}</option>`;
})   
.catch(function(err){
    
    console.log("Une erreur s'est produite.", err);
});


//________________________________________

//____________________________________________________________
 //au click:
document.getElementById('addToCart').addEventListener('click', 
function (){
        //Couleur et quantité*************************
            //quantité
            let quantitySelected = document.getElementById('quantity').value;
            console.log(typeof quantitySelected); //string
             const quantity = Number(quantitySelected);
             console.log(typeof quantity);   // number
           

            //couleur
            const colorSelected = document.getElementById('colors'); 
            const color = colorSelected.options[colorSelected.selectedIndex].value; 
            
            let choice = {'color': color, "quantity": quantity};
            
            if (color !== "") {
                if (localStorage.getItem(extractId) == null) {
                    
                    const stringifierChoice = JSON.stringify([choice]);
                console.log(stringifierChoice);
                    const mettreDansLocalStorage = localStorage.setItem(extractId,stringifierChoice);
                } else{
                //1 - RECUPERER LES DONNEES DU LOCAL STORAGE
                const donneesLocalStorage = localStorage.getItem(extractId);
                console.log('donneesLocalStorage', typeof donneesLocalStorage, donneesLocalStorage);
                //2 - PARSER LES DONNEES
                const parserLesDonnees = JSON.parse(donneesLocalStorage);
                console.log('parserLesDonnees',typeof parserLesDonnees, parserLesDonnees);
                //3 - COMPARER LES COULEURS DE choice ET parserLesDonnees
                // console.log(choice[0].color);
                for (let i = 0; i< parserLesDonnees.length; i++) { 
                     if (choice.color === parserLesDonnees[i].color){
                        console.log('Identiques');
                        const additionnerLesQuantites = choice.quantity + parserLesDonnees[i].quantity;
                        console.log('additionnerLesQuantites', additionnerLesQuantites);//number
                        const newChoice = [{'color': color, 'quantity' : additionnerLesQuantites}]

                        const stringifyNewChoice = JSON.stringify(newChoice);
                        console.log(stringifyNewChoice);

                        localStorage.setItem(extractId,stringifyNewChoice)


                    }
                    else {
                        console.log('Differents');
                        const ajouterAuLocalStorage = parserLesDonnees.push(choice);
                        const nouveauChoixDeCouleur = JSON.stringify(parserLesDonnees);
                        console.log(nouveauChoixDeCouleur);
                        localStorage.setItem(extractId, nouveauChoixDeCouleur);

                    }
                    break;
                }

                  


                
            }
        
    }




           
            
            

























                      //             //****************************
// //             const choice = [colorChoice, quantityChoice]
// // console.log('choice', typeof choice,choice); //object
// //             localStorage.setItem([extractId], [choice]);     
// //                    const stringifyChoice = JSON.stringify(choice);
// // console.log(stringifyChoice, 'stringifyChoice');
// // let setItemInLocalStorage = localStorage.setItem([extractId],[stringifyChoice]);
// // console.log(localStorage, 'arrayForLocalStorage');

//     if (color !== "") {

  
//         for (let i=0; i < localStorage.length; i++){
// //DEPUIS LE LOCAL STORAGE
// // 1 - RECUPERER LES DONNES DU LOCAL STORAGE
// const donneesDuLocalStorage = localStorage.getItem([extractId]);
//     console.log('donneesDuLocalStorage',typeof donneesDuLocalStorage,donneesDuLocalStorage);
// // 2 - PARSER LES DONNEES
// const parserLesDonnees = JSON.parse(donneesDuLocalStorage);
//     console.log('parserLesDonnes', typeof parserLesDonnees, parserLesDonnees);
// //NOUVELLES DONNEES
// // 3 - SAUVEGARGER LES NOUVELLES QUANTITES ET DONNEES DANS UN CONSR
// const choice = [{}]
//     console.log('choice', typeof choice,choice); //object

// // 4 - METTRE LA CONDITION
// console.log(parserLesDonnees[0].color);
// console.log(choice[0].color);
// console.log(parserLesDonnees[1].quantity);
// console.log(choice[1].quantity);
// // 4.1 - SI LES COULEURS SONT IDENTIQUES ==> ADDITIONNER LES QUANTITES
// if (parserLesDonnees[0].color === choice[0].color) {
//     const updateQuantites = parserLesDonnees[1].quantity + choice[1].quantity;
//     console.log(updateQuantites);
// } else {
//     // 4.2 - SINON ==> PASSER A L'ETAPE 5 
//     // 4.2.1 - STRINGIFIER CHOICE ET L'AJOUTER AU LOCAL STORAGE
//     const stringifierNouvellesDonnees = JSON.stringify(choice);
//     console.log('stringifierNouvellesDonnees', typeof stringifierNouvellesDonnees, stringifierNouvellesDonnees);

//   localStorage +=  localStorage.setItem([extractId],([stringifierNouvellesDonnees]))
//     console.log('localstorage', localStorage);
//  } 
































//             // 1 - RECUPERER LES DONNEES DU LOCAL STORAGE
// let currentCart = [i].getItem([extractId]);
//             console.log(currentCart, 'currentCart getItem, typeof:', typeof currentCart);

// const parsedCart= JSON.parse(currentCart);
//             console.log(parsedCart, 'parsedCart, typeof: ', typeof parsedCart);
            
// const currentQuantity =parsedCart[1].quantity;
//             console.log(currentQuantity, 'currentQuantity, type of', typeof currentQuantity); 
            
//             // 2 - RECUPERER LA QUANTITE SELECTIONNEE
//             const addNewquantity = Number(quantitySelected);
//             console.log(addNewquantity, 'addNewquantity', typeof addNewquantity);            
//             // 3 - ADDITIONNER LES DEUX RESULTATS
           
//             const newQuantity =addNewquantity + currentQuantity;
//             console.log(newQuantity, 'newQuantity, typeof', typeof newQuantity);
           
            
            
//             // 4 - REMETTRE LES RESULTATS DANS LE LOCAL STORAGE 
            
//             quantityChoice.quantity = newQuantity;
//             localStorage.setItem([extractId],[stringifyChoice]);
        
      



                    
//_______________________________________


//________________________ WORKS
// const currentQuantity = parsedCart[quantityChoice.quantity];
//const currentQuantity = parsedCart[1].quantity;
//__________________________
//________________________ TESTS
//__________________________


                      
                    
            // for (let i =0; i < choice.length; i++) {
            //     choice = i;
            //     console.log(choice);
            // }
           
            // // for(let i = 0; i< localStorage.length; i++) {
            //     let MyStringifiedCart = JSON.stringify(choice);
            //     console.log('MyStringifiedCart', MyStringifiedCart,typeof MyStringifiedCart);
                

          
            // //1 get the current cart
            // const currentCart = localStorage.getItem(extractId);
            // console.log('currentCart',currentCart, typeof currentCart);
            
            // // 2 parse the current cart
            // let myParsedCart= JSON.parse(currentCart)
            // console.log('myParsedCart',myParsedCart,typeof myParsedCart);
            
            // //3 update quantity
            
            
            
            
            // //4 stringify because local storage only works with strings
            
            // //5 store in LS           
            // const newCart =  localStorage.setItem(extractId, MyStringifiedCart );
            // console.log('newCart', newCart, typeof newCart);
            
              



              
                


                
               
                //test
                // console.log( choice, test2,test3);
            // } (for loop curly bracket)
        
                

})
// localStorage.clear();