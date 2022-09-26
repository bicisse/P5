const orderId = document.getElementById('"orderId');
   console.log('Test');
// fetch('http://localhost:3000/api/products/order')
//     .then(function(res){
//         console.log(1);
//         return res.json();
//     })
//     .then(function(data){
//         console.log('test')
//     })
//     .catch(function(err){
    
//         console.log("Une erreur s'est produite.", err);
//     });

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

fetch('/order')
    .then (res =>{
      return res.json()
    })
    .then (data =>{console.log("Test")})
    .catch(error => console.log('Error'));
//________________