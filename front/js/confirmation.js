const orderNumber = document.getElementById('orderId');

let params = (new URL(window.location)).searchParams;
let orderId = params.get('orderId');
console.log(orderId);

orderNumber.innerText = orderId;
localStorage.clear();