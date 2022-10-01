let params = (new URL(window.location)).searchParams;
let pageId = params.get('id');

//___________________________
/*                           *\
---------> PRODUCTS <----------
\*___________________________*/

let currentItemName;
const url = 'http://localhost:3000/api/products';

fetch(url)
    .then(function(res) {
        // console.log(1);
        return res.json();
    })
    .then(function(data) {

        const found = data.find(element => element['_id'] === pageId);
        const itemName = found['name'];;
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

        //___________________________
        /*                           *\
        ------> LOCAL STORAGE <-------
        \*___________________________*/

        document.getElementById('addToCart').addEventListener('click', function() {

            //========> COLOR AND QUANTITY
            //QUANTITY
            console.log(itemName);
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
            let traduction;

            function translate() {
                switch (choice.color) {
                    case 'Grey':
                        traduction = 'gris';
                        break;
                    case 'Blue':
                        traduction = 'bleu';
                        break;
                    case 'Yellow':
                        traduction = 'jaune';
                        break;
                    case 'Purple':
                        traduction = 'violet';
                        break;
                    case 'Black':
                        traduction = 'noir';
                        break;
                    case 'White':
                        traduction = 'blanc';
                        break;
                    case 'Black/Yellow':
                        traduction = 'Noir/Jaune'
                        break;
                    case 'Black/Red':
                        traduction = 'Noir/Rouge'
                        break;
                    case 'Red':
                        traduction = 'rouge';
                        break;
                    case 'Orange':
                        traduction = 'orange';
                        break;
                    case 'Green':
                        traduction = 'vert';
                        break;
                    case 'Pink':
                        traduction = 'rose';
                        break;
                    case 'Navy':
                        traduction = 'bleu marine';
                        break;
                    case 'Silver':
                        traduction = 'argent';
                        break;
                    case 'Brown':
                        traduction = 'marron';
                        break;
                    default:
                        traduction = color.choice;
                }
            }

            translate();

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
            const tooMuch = quantity > 100;
            const noColorSelected = color == '';
            const problem = tooLittle || tooMuch || noColorSelected;

            function resetSelection(reset) {
                document.getElementById('quantity').value = reset;
                const defaultText = '--SVP, choisissez une couleur --';

                for (let i, j = 0; i = colorChoice.options[j];
                    '') {
                    if (i.value !== defaultText) {
                        colorChoice.selectedIndex = j;
                        break;
                    }
                }

            }

            if (problem) {
                switch (problem) {
                    case noColorSelected && tooLittle || noColorSelected && tooMuch:
                        alert('Veuillez selectionner une couleur et une quantité entre 1 et 100.');
                        document.getElementById('quantity').value = 1;
                        break;
                    case tooLittle:
                        alert('La quantité ne peut être inférieure à 1')
                        document.getElementById('quantity').value = 100;

                        break;
                    case tooMuch:
                        alert('La quantité ne peut être supérieure à 100');
                        document.getElementById('quantity').value = 100;
                        break;
                    case noColorSelected:
                        alert('Veuillez selectionner une couleur.')
                        break;

                    default:
                        alert('Unexpected error');
                }
            }
            else {

                const neverBeenSelected = localStorage.getItem(pageId) == null;
                const hasBeenSelected = !neverBeenSelected;

                switch (!problem) {
                    case neverBeenSelected:
                        console.log("This Kanap has never been selected before. Let's add it to the local storage");
                        firstPushInEmptyArray(choice);
                        makeStringThenSetInLS(firstValue);
                        alert(`Vous venez d'ajouter ${quantity} ${itemName} en ${traduction} au panier! Merci!`)
                        resetSelection(1)
                        break;
                    case hasBeenSelected:

                        console.log("This Kanap has been selected before...");
                        getFromLocalStorage();
                        const parseCurrentLs = JSON.parse(currentLs);
                        const colorIndex = parseCurrentLs.findIndex(object => {

                            return object.color === choice.color

                        })
                        const addNewColor = colorIndex === -1;

                        function setInLS() {
                            const stringifyNewChoice = JSON.stringify(parseCurrentLs);
                            const backInLocalStorage = localStorage.setItem(pageId, stringifyNewChoice)
                        }

                        if (addNewColor) {
                            console.log("... but with another color. Let's add this one to the local sto.");
                            parseCurrentLs.push(choice);
                            setInLS();
                            alert(`Vous venez d'ajouter ${quantity} ${itemName} ${traduction} au panier! Merci!`)
                            resetSelection(1);
                        }
                        else {
                            const currentQuantity = parseCurrentLs[colorIndex].quantity;
                            console.log("...with this exact color. Let's update the quantity.");
                            const updatedQuantity = currentQuantity + choice.quantity;
                            const maxQuantity = updatedQuantity === 100;

                            
                            switch (!addNewColor) {
                                case currentQuantity === 100:
                                    alert(`Votre panier contient déjà le nombre maximal de ${itemName} ${traduction}`);
                                    break;
                                case updatedQuantity <= 100:
                                    const newChoice = {
                                        color: choice.color,
                                        quantity: updatedQuantity
                                    };
                                    removedEl = parseCurrentLs.splice(colorIndex, 1, newChoice);
                                    setInLS();
                                    alert(`Vous avez rajouté ${quantity} ${itemName} de couleur ${traduction} à votre panier, qui ${maxQuantity ? 'contient désormais la quantité maximale pour cet article dans cette couleur': `en contient désormais ${updatedQuantity}`}. Merci!`);
                                    resetSelection(1)
                                    break;

                                case updatedQuantity >= 101:
                                    const maxItemPossible = 100 - currentQuantity;
                                    alert(`Le nombre maximal d'article par couleur est 100. Etant donné que vous avez déjà ${currentQuantity} ${itemName} de couleur ${traduction} dans votre panier, vous ne pouvez en rajouter que ${maxItemPossible} de plus.`)
                                    document.getElementById('quantity').value = maxItemPossible;
                                    break;

                            }
                        }
                        break;
                    default:
                        console.log('Unexpected error2');

                }

            }
        })

    })
    .catch(function(err) {

        console.log("Une erreur s'est produite.", err);
    });