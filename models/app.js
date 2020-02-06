import { getRecepi } from '../controllers/fetch.js'
const main = document.querySelector('#main');
const recipeInput = document.querySelector('.meal-input');
const recipeButton = document.querySelector('.meal-button');
const mealsDiv = document.querySelector('.meals');
const mealsUl = document.querySelector('.meals--ul');
const headerH2 = document.querySelector('.header-h2');
const headerImg = document.querySelector('.header-img');
const intrudoctions = document.querySelector('.intrudoctions');
const ingUl = document.querySelector('.ing-ul');
const ifarme = document.querySelector('.ifarme');
const goToOunerA = document.querySelector('.go-to-ouner');
const likeImg = document.querySelector('.like-img');
const favoritedItems = document.querySelector('.favoritedItems');
const ingredient = document.querySelector('.ingredient');


let a;
let temp;
const fetchData = (value1, value2) => {
    return getRecepi(value1, value2);
    // .then(() => console.log(a))
};

var items = [headerH2, headerImg, goToOunerA, likeImg, ifarme, ingredient, intrudoctions];

const recipeInputSearch = () => {
    fetchData(false, recipeInput.value)
        .then(data => a = data)
        .then(() => console.log(a))
        .then(() => insertDataToLi(a))

    items.map((item) => item.classList.add('none'));
    temp = null;
};

recipeButton.addEventListener("click", recipeInputSearch, false);

const insertDataToLi = (data) => {

    if (data.meals == null) {
        return mealsUl.textContent = 'Sorri we coldnt find a recepi for this'
    }
    mealsUl.innerHTML = null;
    mealsDiv.classList.remove('none');
    for (let i = 0; i < data.meals.length; i++) {
        const li = document.createElement('li');
        li.setAttribute('id', `li-${i}`);
        const span = document.createElement('span')
        span.textContent = data.meals[i].strMeal
        const img = document.createElement('img');
        img.setAttribute('class', 'li-img')
        img.src = data.meals[i].strMealThumb;
        li.appendChild(span);
        li.appendChild(img);

        mealsUl.appendChild(li);
    }
};

const openClikcedRecepi = (e) => {
    var clikedItem;

    if (e.target.id && e.target.id < 999) {
        clikedItem = parseInt(e.target.id.slice(3));
    } else if (e.target.parentNode.id && e.target.parentNode.id.slice(3) < 999) {
        clikedItem = e.target.parentNode.id.slice(3)
    } else {
        clikedItem = 0;
    }
    // mealsDiv.classList.add('none');
    if (temp) {
        a = temp
    }
    headerH2.textContent = a.meals[clikedItem].strMeal;
    headerImg.src = a.meals[clikedItem].strMealThumb;
    checkIngredient(a.meals[clikedItem])
    intrudoctions.textContent = a.meals[clikedItem].strInstructions;
    goToOunerA.href = a.meals[clikedItem].strSource;
    likeImg.setAttribute('id', `${a.meals[clikedItem].idMeal}`)
    ifarme.src = `${a.meals[clikedItem].strYoutube.slice(0, 24)}embed/${a.meals[clikedItem].strYoutube.slice(32)}`;

    items.map((item) => item.classList.remove('none'));
};

const checkIngredient = (obj) => {
    ingUl.textContent = '';
    var builderCounter = 0;
    for (const key in obj) {
        let inRes = /strIngredient/.test(key);
        let meRes = /strMeasure/.test(key);

        var li;
        var span;
        // not good try to replace
        const spanBuilder = (createLi, text) => {
            if (createLi) {
                li = document.createElement('li');
            }
            span = document.createElement('span');
            span.textContent = text;
            ingUl.appendChild(li)
        };

        if (inRes && obj[key] && inRes && obj[key] !== ' ') {
            spanBuilder(true, ` ${obj[key]} : `);
            li.appendChild(span);
        }
        if (meRes && obj[key] && meRes && obj[key] !== ' ') {
            spanBuilder(false, ` ${obj[key]}`);
            ingUl.children[builderCounter].appendChild(span);
            builderCounter++;
        }
    }
};

mealsUl.addEventListener('click', openClikcedRecepi, false);
var b;
const addToFav = (e) => {
    fetchData(parseInt(e.target.id), false)
                               
        .then(() => console.log(b))
        .then(() => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            li.textContent = b.meals[0].strMeal;
            li.setAttribute('id', `id-${b.meals[0].idMeal}fav-item`);
            li.setAttribute('class', `fav-item ${b.meals[0].idMeal}`);
            img.src = b.meals[0].strMealThumb;
            img.setAttribute('class', 'fav-img');
            favoritedItems.appendChild(li);
            li.appendChild(img);

        });
};

likeImg.addEventListener('click', addToFav, false);

const openFavItem = e => {
    let reqString;
    if (e.target.classList[1]) {
        reqString = e.target.classList[1];
    } else {
        reqString = e.target.parentNode.classList[1];
    }

    fetchData(parseInt(reqString), false)
        .then(data => temp = a)
        .then(data => a = data)
        .then(() => {
            openClikcedRecepi(e);
        });
    // mealsDiv.classList.add('none');
};

favoritedItems.addEventListener('click', openFavItem, false);