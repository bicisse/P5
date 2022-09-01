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
            const quantity = document.getElementById('quantity').value;
                
            //couleur
            const colorSelect = document.getElementById('colors'); 
            const color = colorSelect.options[colorSelect.selectedIndex].value; 
        //****************************


    if (color !== "") {
           
    
            //loop
            let choice = [ ];
            
            for (let i =0; i < choice.length; i++) {
                choice = i;
                console.log(choice);
            }
           
            // for(let i = 0; i< localStorage.length; i++) {
                let MyStringifiedCart = JSON.stringify(choice);
                console.log('MyStringifiedCart', MyStringifiedCart,typeof MyStringifiedCart);
                

          
            //1 get the current cart
            const currentCart = localStorage.getItem(extractId);
            console.log('currentCart',currentCart, typeof currentCart);
            
            // 2 parse the current cart
            let myParsedCart= JSON.parse(currentCart)
            console.log('myParsedCart',myParsedCart,typeof myParsedCart);
            
            //3 update quantity
            
            
            
            
            //4 stringify because local storage only works with strings
            
            //5 store in LS           
            const newCart =  localStorage.setItem(extractId, MyStringifiedCart );
            console.log('newCart', newCart, typeof newCart);
            
              



              
                


                
               
                //test
                // console.log( choice, test2,test3);
            // } (for loop curly bracket)
        }
                

})
// localStorage.clear();