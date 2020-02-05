import { getRecepi } from '../controllers/fetch.js'
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


let a;
const fetchData = (value1, value2) => {
    return getRecepi(value1, value2)
        .then(data => a = data)
        .then(() => console.log(a))
};

const recipeInputSearch = () => {
    fetchData(false, recipeInput.value)
    .then(() => insertDataToLi(a))
}

recipeButton.addEventListener("click", recipeInputSearch, false);


function insertDataToLi(data) {

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

const openClikcedRecepi = (e, clikedItem = 0) => {
    // let clikedItem;
    if (e.target.id) {
        clikedItem = e.target.id.slice(3, 8);
    } else {
        clikedItem = e.target.parentNode.id.slice(3, 8);
    };

    headerH2.textContent = a.meals[clikedItem].strMeal;
    headerImg.src = a.meals[clikedItem].strMealThumb;
    headerImg.classList.remove('none');
    checkIngredient(a.meals[clikedItem])
    intrudoctions.textContent = a.meals[clikedItem].strInstructions;
    goToOunerA.classList.remove('none')
    goToOunerA.href = a.meals[clikedItem].strSource;
    likeImg.classList.remove('none');
    likeImg.setAttribute('id', `${a.meals[clikedItem].idMeal}`)
    ifarme.classList.remove('none');
    ifarme.src = `${a.meals[clikedItem].strYoutube.slice(0, 24)}embed/${a.meals[clikedItem].strYoutube.slice(32)}`;
}
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

const addToFav = (e) => {
    fetchData(parseInt(e.target.id), false)
        .then(() => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            li.textContent = a.meals[0].strMeal;
            li.setAttribute('id', `id-${a.meals[0].idMeal}fav-item`);
            li.setAttribute('class', `fav-item ${a.meals[0].idMeal}`);
            img.src = a.meals[0].strMealThumb;
            img.setAttribute('class', 'fav-img');
            // favoritedItems.classList.remove('none');
// id=5 letters
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
    };
    fetchData(parseInt(reqString), false)
    .then(() => {
        openClikcedRecepi(e);
    });

}

favoritedItems.addEventListener('click', openFavItem, false);


// 0527118855