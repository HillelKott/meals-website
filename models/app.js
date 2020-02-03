import { getRecepi } from '../controllers/fetch.js'
const recipeInput = document.querySelector('.meal-input');
const recipeButton = document.querySelector('.meal-button');
const mealsDiv = document.querySelector('.meals');
const mealsUl = document.querySelector('.meals--ul');
const headerH2 = document.querySelector('.header-h2');
const headerImg = document.querySelector('.header-img');
const intrudoctions = document.querySelector('.intrudoctions');
const ingredient = document.querySelector('.ingredient');

let a;
const log = async () => {
    getRecepi(recipeInput.value)
        .then(data => a = data)
        .then(() => insertDataToLi(a))
        .then(() => console.log(a))
};

recipeButton.addEventListener("click", log, false);


function insertDataToLi(data) {

    if (data.meals == null) {
        return mealsUl.textContent = 'Sorri we coldnt find a recepi for this'
    }
    mealsUl.innerHTML = null;
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
    let clikedItem;
    if (e.target.id) {
        console.log(e.target.id);
        clikedItem = e.target.id.slice(3, 4);
        console.log(a.meals[clikedItem]);

    } else {
        console.log(e.target.parentNode.id);
        clikedItem = e.target.parentNode.id.slice(3, 4);
    };

    headerH2.textContent = a.meals[clikedItem].strMeal;
    headerImg.src = a.meals[clikedItem].strMealThumb;
    checkIngredient(a.meals[clikedItem])
    intrudoctions.textContent = a.meals[clikedItem].strInstructions;
    ingredient.textContent = '';
    // https://www.youtube.com/watch?v=eKPNqFoWkCU&feature=youtu.be
    // mealsDiv.classList.add('meals-cliked');
}
const checkIngredient = (obj) => {
    for (const key in obj) {
        let str = key;
        let inRes = /strIngredient/.test(str);
        let meRes = /strMeasure/.test(str);

        if (inRes && obj[key] || meRes && obj[key]) {
            console.log(obj[key]);
            ingredient.textContent +=obj[key]
        }
        // continue here with cotact the inRes and meRes...
    }
}

mealsUl.addEventListener('click', openClikcedRecepi, false);