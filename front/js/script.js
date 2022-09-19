'use script';
const items = document.getElementById('items');

fetch('http://localhost:3000/api/products')
.then (function(res) {
  return res.json();
 
})
.then(function(data){
  
  for(let i = 0; i < data.length; i++ )
  items.innerHTML += 
  `<a href="./product.html?id=${data[i]['_id']}">
  <article>
    <img id="img" src="${data[i]['imageUrl']}" alt="${data[i]['altTxt']}">
    <h3 id="productName" class="productName">${data[i]['name']}</h3>
    <p id="productDescription" class="productDescription">${data[i]['description']}</p>
  </article>
</a>`

})
.catch(function(err){

  //
});
























// let img = document.getElementById('img');
// let items = document.getElementById('items');
// let productName = document.getElementById('productName');
// let productDescription = document.getElementById('productDescription');


// fetch('http://localhost:3000/api/products')
// .then(function(res){
//     console.log(res);   
//     return res.json();
   
// })

// .then(data => { for (let i = 0; i < data.length; i++) {
//     items.innerHTML += `<a href="./product.html?id=42">
//     <article>
//       <img id="img" src="${data[i]['imageUrl']}" alt="Lorem ipsum dolor sit amet, Kanap name1">
//       <h3 id="productName" class="productName">${data[i]['name']}</h3>
//       <p id="productDescription" class="productDescription">${data[i]['description']}</p>
//     </article>
//   </a>`;
//     // img.src = data[i]['imageUrl'];
//     // productName.textContent = data[i]['name'];
//     // productDescription.textContent = data[i]['description'];
//     console.log(i);
// }
    


// } )




// .catch(error => {
//     //Une erreur s'est produite
// });