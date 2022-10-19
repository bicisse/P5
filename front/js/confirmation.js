const orderNumber = document.getElementById('orderId');

// recupérer order id dans les params   
let params = (new URL(window.location)).searchParams;
let orderId = params.get('orderId');
console.log(orderId);

// mettre l'order id dans le message de confirmation
orderNumber.innerText = orderId;

// vider le local storage
localStorage.clear();