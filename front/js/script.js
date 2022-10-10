
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

  console.log("Une erreur inattendue s'est produite. Veuillez réessayer")
});



