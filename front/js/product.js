// const pageUrl = window.location.search;
// const productId = pageUrl.slice(4);
// console.log(productId);

let params = (new URL(window.location)).searchParams;
let pageId = params.get('id');
let itemName;
    
fetch('http://localhost:3000/api/products')
.then(function(res){
    // console.log(1);
    return res.json();
})
.then(function(data){


    const found = data.find( element => element['_id'] === pageId);
    console.log(pageId,found['_id']);
    // console.log(2);
    
    
    
    
    function keyName(){

    itemName = found['name'];
    console.log(itemName);
   
      
    }

keyName();
console.log(itemName);

    

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


