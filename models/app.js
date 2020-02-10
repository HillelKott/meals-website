import { getRecepi } from '../controllers/fetch.js'
import { getRandomRecepi } from '../controllers/fetch.js'
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
// const randomRecipes = document.querySelector('.random-recipes');
const randomRecipesContainer = document.querySelector('.random-recipes-container');
const innerRandomRecipe = document.querySelectorAll('.inner-random-recipe');
const randomRecipeP = document.querySelectorAll('.random-recipe-p');
const randomRecipeImg = document.querySelectorAll('.random-recipe-img');
const randomRecipeDiv = document.querySelectorAll('.random-recipe-div');


const fetchData = (id, string) => {
    return getRecepi(id, string);
};

let mealsInfo;
const items = [headerH2, headerImg, goToOunerA, likeImg, ifarme, ingredient, intrudoctions];

const recipeInputSearch = () => {
    items.map((item) => item.classList.add('none'));

    fetchData(false, recipeInput.value)
        .then(data => mealsInfo = data)
        .then((data) => insertDataToLi(data))
};

recipeButton.addEventListener("click", recipeInputSearch, false);

const insertDataToLi = (data) => {
    if (data.meals == null) {
        return mealsUl.textContent = 'Sorri we coldnt find a recepi for this'
    };

    mealsUl.innerHTML = null;
    mealsDiv.classList.remove('none');
    for (let i = 0; i < data.meals.length; i++) {
        const li = document.createElement('li');
        li.setAttribute('id', `li-${i}`);
        const span = document.createElement('span')
        span.textContent = data.meals[i].strMeal;
        const img = document.createElement('img');
        img.setAttribute('class', 'li-img')
        img.src = data.meals[i].strMealThumb;
        li.appendChild(span);
        li.appendChild(img);

        mealsUl.appendChild(li);
    };
};


const openClikcedRecepi = (e) => {
    let clikedItem;

    if (e.target.id && e.target.id < 999) {
        clikedItem = parseInt(e.target.id.slice(3));
    } else if (e.target.parentNode.id && e.target.parentNode.id.slice(3) < 999) {
        clikedItem = e.target.parentNode.id.slice(3);
    } else {
        clikedItem = 0
    };

    headerH2.textContent = mealsInfo.meals[clikedItem].strMeal;
    headerImg.src = mealsInfo.meals[clikedItem].strMealThumb;
    checkIngredient(mealsInfo.meals[clikedItem]);
    intrudoctions.textContent = mealsInfo.meals[clikedItem].strInstructions;
    goToOunerA.href = mealsInfo.meals[clikedItem].strSource;
    likeImg.setAttribute('id', `${mealsInfo.meals[clikedItem].idMeal}`)
    ifarme.src = `${mealsInfo.meals[clikedItem].strYoutube.slice(0, 24)}embed/${mealsInfo.meals[clikedItem].strYoutube.slice(32)}`;

    items.map((item) => item.classList.remove('none'));
};

mealsUl.addEventListener('click', openClikcedRecepi, false);

const checkIngredient = (obj) => {
    ingUl.textContent = '';
    let builderCounter = 0;
    for (const key in obj) {
        let inRes = /strIngredient/.test(key);
        let meRes = /strMeasure/.test(key);

        var li;
        let span;

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
    };
};
let temp;
const favItemsId = [];

// temp is holding the main request data 
const addToFav = (e) => {
    for (let i = 0; i < favItemsId.length; i++) {
        if (favItemsId[i] == e.target.id) {
            return
        }
    };

    fetchData(parseInt(e.target.id), false)
        .then((data) => {
            temp = mealsInfo;
            mealsInfo = data;
            favItemsId.push(mealsInfo);
        })
        .then(() => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            li.textContent = mealsInfo.meals[0].strMeal;
            li.setAttribute('id', `id-${mealsInfo.meals[0].idMeal}fav-item`);
            li.setAttribute('class', `fav-item ${mealsInfo.meals[0].idMeal}`);
            img.src = mealsInfo.meals[0].strMealThumb;
            img.setAttribute('class', 'fav-img');
            favoritedItems.appendChild(li);
            li.appendChild(img);
        })
        .then(() => mealsInfo = temp);
};

likeImg.addEventListener('click', addToFav, false);

const openFavItem = e => {
    let reqString;
    if (e.target.classList[1]) {
        reqString = e.target.classList[1];
    } else {
        reqString = e.target.parentNode.classList[1];
    }
    temp = mealsInfo;
    favItemsId.map(item => {
        if (item.meals[0].idMeal == reqString) {
            mealsInfo = item
        };
    });

    openClikcedRecepi(e);
    mealsInfo = temp;
};

favoritedItems.addEventListener('click', openFavItem, false);

// this function shuld be in the top.
const createRandomRecipes = (() => {
    let dataHolder;
    for (let i = 0; i < 6; i++) {
        getRandomRecepi()
            .then(data => dataHolder = data)
            .then(() => insetRandomRecipes(dataHolder, i));
    }

    const insetRandomRecipes = (data, i) => {
        innerRandomRecipe[i].dataset.recipeId = data.meals[0].idMeal;
        randomRecipeP[i].textContent = data.meals[0].strMeal;
        randomRecipeImg[i].src = data.meals[0].strMealThumb;
    }
})()



const openFromRandom = e => {
    console.log(e.target.dataset.recipeId);


    openClikcedRecepi(e.target.dataset.recipeId);
}

randomRecipesContainer.addEventListener('click', openFromRandom, false);