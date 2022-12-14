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
            let translation;

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

                // Remettre par defaut le message qui invite ?? choisir les problemes
                for (let i, j = 0; i = colorChoice.options[j];
                    '') {
                    if (i.value !== defaultText) {
                        colorChoice.selectedIndex = j;
                        break;
                    }
                }

            }

            // problemes eventuels
            if (problem) {
                switch (problem) {
                    case noColorSelected && tooLittle || noColorSelected && tooMuch:
                        alert('Veuillez selectionner une couleur et une quantit?? entre 1 et 100.');
                        document.getElementById('quantity').value = 1;
                        break;
                    case tooLittle:
                        alert('La quantit?? ne peut ??tre inf??rieure ?? 1')
                        document.getElementById('quantity').value = 100;

                        break;
                    case tooMuch:
                        alert('La quantit?? ne peut ??tre sup??rieure ?? 100');
                        document.getElementById('quantity').value = 100;
                        break;
                    case noColorSelected:
                        alert('Veuillez selectionner une couleur.')
                        break;

                    default:
                        alert('Unexpected error');
                }
            } else {

                const neverBeenSelected = localStorage.getItem(pageId) == null;
                const hasBeenSelected = !neverBeenSelected;

                switch (!problem) {
                    case neverBeenSelected:
                        // Le canap?? n'a jamais ??t?? s??lectionn?? dans aucune couleur
                        // Une nouvelle key correspondant au mod??le est ajout?? au LS
                        console.log("This Kanap has never been selected before. Let's add it to the local storage");
                        firstPushInEmptyArray(choice);
                        makeStringThenSetInLS(firstValue);
                        alert(`Vous avez ajout?? ${quantity} ${itemName} en ${translation} au panier! Merci!`)
                        resetSelection(1)
                        break;
                    case hasBeenSelected:
                        //Une key correspondant ?? l'ID de ce mod??le existe dans le local storage

                        console.log("This Kanap has been selected before...");
                        getFromLocalStorage();
                        const parseCurrentLs = JSON.parse(currentLs);

                        const colorIndex = parseCurrentLs.findIndex(object => {
                            // on recherche dans le local storage si la couleur selection??e 
                            // existe dans le local storage pour ce mod??le
                            // Si ce mod??le dans cette couleur a d??j?? auparavant ete selectionn??:
                            //colorIndex === (index de l'objet dans l'array)
                            // Sinon
                            // colorIndex=== -1
                            return object.color === choice.color
                        })
                        const isANewColor = colorIndex === -1;
                        const isNotANewColor = !isANewColor;

                        function setInLS() {
                            const stringifyNewChoice = JSON.stringify(parseCurrentLs);
                            makeStringThenSetInLS(stringifyNewChoice)
                            //  const backInLocalStorage = localStorage.setItem(pageId, stringifyNewChoice)
                        }

                        if (isANewColor) {
                            // M??me mod??le, nouvelle couleur ==> ajout d'un nouvel objet
                            console.log("... but with another color. Let's add this one to the local sto.");
                            parseCurrentLs.push(choice);
                            setInLS();
                            alert(`Vous avez ajout?? ${quantity} ${itemName} ${translation} au panier! Merci!`)
                            resetSelection(1);
                        } else {
                            // M??me mod??le, couleur d??j?? connue ==> mettre ?? jour la quantit??
                            const currentQuantity = parseCurrentLs[colorIndex].quantity;
                            console.log("...with this exact color. Let's update the quantity.");
                            const updatedQuantity = currentQuantity + choice.quantity;
                            const maxQuantity = updatedQuantity === 100;

                            switch (isNotANewColor) {
                                // Sert ?? v??rifier qu'on ne peut ajouter plus de 100 articles de la
                                // m??me couleur dans le local storage
                                // en v??rifiant la qtt actuelle dans le local storage
                                case currentQuantity === 100:
                                    // la quantit?? actuelle est de 100
                                    // on ne peut plus rajouter d'articles
                                    //ma quantit?? reste modifiable ?? l'??tape pahier
                                    alert(`Votre panier contient d??j?? le nombre maximal de ${itemName} ${translation}`);
                                    break;
                                case updatedQuantity <= 100:
                                    // La somme de la quantit?? acutellement dans le local storage + qtt choisie
                                    // est inf??rieure ou ??gale ?? 100
                                    const newChoice = {
                                        color: choice.color,
                                        quantity: updatedQuantity
                                    };
                                    removedEl = parseCurrentLs.splice(colorIndex, 1, newChoice);
                                    setInLS();
                                    alert(`Vous avez rajout?? ${quantity} ${itemName} ${translation} ?? votre panier, qui ${maxQuantity ? 'contient d??sormais la quantit?? maximale pour cet article dans cette couleur': `en contient d??sormais ${updatedQuantity}`}. Merci!`);
                                    resetSelection(1)
                                    break;

                                case updatedQuantity >= 101:
                                    // La somme de la quantit?? acutellement dans le local storage + qtt choisie
                                    // est sup??rieure ?? 100
                                    // L'utilisateur est inform?? de la quantit?? maximum qu'il peut rajouter
                                    const maxItemPossible = 100 - currentQuantity;
                                    alert(`Le nombre maximal d'article par couleur est 100. Etant donn?? que vous avez d??j?? ${currentQuantity} ${itemName} de couleur ${translation} dans votre panier, vous ne pouvez en rajouter que ${maxItemPossible} de plus.`)
                                    document.getElementById('quantity').value = maxItemPossible;
                                    break;

                            }
                        }
                        break;
                    default:
                        console.log('Unexpected error2');

                }

            }

            function translate() {
                switch (choice.color) {
                    case 'Grey':
                        translation = 'gris';
                        break;
                    case 'Blue':
                        translation = 'bleu';
                        break;
                    case 'Yellow':
                        translation = 'jaune';
                        break;
                    case 'Purple':
                        translation = 'violet';
                        break;
                    case 'Black':
                        translation = 'noir';
                        break;
                    case 'White':
                        translation = 'blanc';
                        break;
                    case 'Black/Yellow':
                        translation = 'Noir/Jaune'
                        break;
                    case 'Black/Red':
                        translation = 'Noir/Rouge'
                        break;
                    case 'Red':
                        translation = 'rouge';
                        break;
                    case 'Orange':
                        translation = 'orange';
                        break;
                    case 'Green':
                        translation = 'vert';
                        break;
                    case 'Pink':
                        translation = 'rose';
                        break;
                    case 'Navy':
                        translation = 'bleu marine';
                        break;
                    case 'Silver':
                        translation = 'argent';
                        break;
                    case 'Brown':
                        translation = 'marron';
                        break;
                    default:
                        translation = color.choice;
                }
            }
        })

    })
    .catch(function(err) {

        console.log("Une erreur s'est produite.", err);
    });