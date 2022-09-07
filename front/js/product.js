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
    const colors = document.getElementById('color-select');
    
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

/*


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
    console.log(choice, stringifyChoice);
    let putInLocalStorage =[];
    console.log('putInLocalStorage', putInLocalStorage);
    

    // if a color is picked
    if (color !== ""){
        console.log("The selection is valid");
        //if local storage is empty
        if(localStorage.getItem(extractId)){
            console.log('There is an article with this key in the local storage');
            //Get the article in the local storage
            const getTheArticleInTheLs = localStorage.getItem(extractId);
            console.log('getTheArticleInTheLs', getTheArticleInTheLs);
           
            const parseTheResult = JSON.parse(getTheArticleInTheLs);
            console.log('parseTheResult',parseTheResult);
            
                // Parse the article
                for (let i=0; i<parseTheResult.length; i++) {
                console.log(parseTheResult[i].color,' parseTheResult color');
                console.log(choice.color);

                    // If the color is the same:
                    // 1 -  add quantities of CHOICE and PARSETHERESULT 
                    // 2 - update the local storage
                    if(parseTheResult[i].color === choice.color){
                        console.log( "The color is the same");
                        // Add the quantities
                        console.log(parseTheResult[i].quantity,choice.quantity);
                        const updatedQuantity = parseTheResult[i].quantity + choice.quantity;
                        console.log('updatedQuantity',updatedQuantity);
                        const updatedChoice = {color : choice.color, quantity : updatedQuantity};
                        console.log('updatedChoice', updatedChoice);
                        // // Update the local storage
                        putInLocalStorage.push(updatedChoice);
                        console.log(putInLocalStorage);
                        const stringifyUpdatedQuantity = JSON.stringify(putInLocalStorage);
                        console.log(stringifyUpdatedQuantity);
                        localStorage.setItem(extractId, stringifyUpdatedQuantity);

                    }else {
                        //1  - get then parse the content of local storage
                        // 2 loop over the selection
                        

                            console.log( "The color is different");
                            //TODO =>add new line to the local storage
                            //_____________________________
                            fetch('http://localhost:3000/api/products')
                            .then(function(res){
                                console.log(res);   
                                return res.json();
                            })
                            .then(data => { 
                            const findColor = data.find( element => element['_id'] === extractId);
                            console.log('findColor', findColor);
                            console.log(findColor.colors,'findColor.colors' );pl^kopo
                            const differentColorId = findColor._id;
                            console.log('differentColorId', differentColorId, extractId);
                            const differentColor = findColor.colors;
                            const found = differentColor.find(element => element === color )
                            console.log('found', found);
                            const updateColor = {color : found, quantity: quantity};
                        
                            console.log('updateColor', updateColor, typeof updateColor);
                            console.log('parseTheResult', parseTheResult);
                            parseTheResult.push(updateColor);
                            console.log('parseTheResult',parseTheResult);
                            const stringifyNewResult = JSON.stringify(parseTheResult);
                            console.log('stringifyNewResult',stringifyNewResult, typeof stringifyNewResult);
                            localStorage.setItem(extractId,stringifyNewResult);
                        
                            // if(extractId === localStorage.key && )
                            


                            } )
                            .catch(error => {
                                console.log("Une erreur s'est produite");
                            });

                            //_____________________________
                        
                        
                        }
            
           
                }
        }else{  
            console.log('No article with this key in the local storage');
            putInLocalStorage.push(choice);
            console.log(putInLocalStorage);
            const localStorageValue = JSON.stringify(putInLocalStorage);
            console.log(localStorage);
            console.log(localStorageValue, typeof localStorageValue);
            localStorage.setItem(extractId, localStorageValue);
        }

    }
})*/