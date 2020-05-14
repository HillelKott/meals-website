import { getRecepi } from '../controllers/fetch.js'
import { getRandomRecepi } from '../controllers/fetch.js'
import * as vars from './variables.js';

const fetchData = (id, string) => {
    return getRecepi(id, string);
};
var mealsInfo;

if (window.location.search) {
    console.log('id', window.location.search);

    fetchData(window.location.search.split('?')[1], false)
        .then(data => mealsInfo = data)
        .then(data => {
            openClikcedRecepi(data)

            // console.log('window.location.search', data);

        });
};

(() => {
    for (let i = 0; i < 6; i++) {
        getRandomRecepi()
            .then((data) => insetRandomRecipes(data, i))

    };

    const insetRandomRecipes = (data, i) => {
        vars.innerRandomRecipe[i].dataset.recipeId = data.meals[0].idMeal;
        vars.randomRecipeP[i].textContent = data.meals[0].strMeal;
        vars.randomRecipeImg[i].src = data.meals[0].strMealThumb;
        vars.innerRandomRecipe[i].dataset.random = true;
        vars.randomRecipeImg[i].style.display = 'inline';
        vars.placeholdertext[i].classList.add('none');
        vars.mealsDiv.classList.add('none');
    };
})();

const items = [vars.goToOunerA, vars.likeImg, vars.ifarme, vars.ingredient, vars.intudoctionsH5, vars.seperdLine, vars.containerImageMain, vars.containerUl];
//  vars.shareGmail, exit from items, return on fixed function
const recipeInputSearch = () => {
    items.map((item) => item.classList.add('none'));
    vars.mealsDiv.classList.add('none');

    fetchData(false, vars.recipeInput.value)
        .then(data => mealsInfo = data)
        .then((data) => insertDataToLi(data))
};

vars.recipeButton.addEventListener("click", recipeInputSearch, false);

const insertDataToLi = (data) => {
    vars.mealsDiv.classList.remove('none');
    vars.mealsUl.scrollIntoView({ behavior: "smooth" });

    if (data.meals == null) {
        return vars.mealsUl.textContent = 'Sorri we coldnt find a recepi for this'
    };

    vars.mealsUl.innerHTML = null;
    const len = data.meals.length;
    for (let i = 0; i < len; i++) {
        const li = document.createElement('div');
        li.setAttribute('class', 'mealsUlInDiv');
        li.dataset.liId = i;
        const span = document.createElement('span');
        span.textContent = data.meals[i].strMeal;
        const img = document.createElement('img');
        img.setAttribute('class', 'li-img')
        img.src = data.meals[i].strMealThumb;
        li.appendChild(img);
        li.appendChild(span);

        vars.mealsUl.appendChild(li);
    };
};
const openClikcedRecepi = (e) => {
    let clikedItem;
    if (e.target && e.target.dataset.liId < 999) {

        // if (e.target.dataset.liId && e.target.dataset.liId < 999) {
        clikedItem = parseInt(e.target.dataset.liId);
    } else {
        clikedItem = 0
    };

    vars.headerH2.textContent = mealsInfo.meals[clikedItem].strMeal;
    vars.headerImg.classList.remove('none')
    vars.headerImg.src = mealsInfo.meals[clikedItem].strMealThumb;
    checkIngredient(mealsInfo.meals[clikedItem]);
    vars.intrudoctions.textContent = mealsInfo.meals[clikedItem].strInstructions;
    vars.goToOunerA.href = mealsInfo.meals[clikedItem].strSource;
    vars.likeImg.dataset.likeImgId = mealsInfo.meals[clikedItem].idMeal
    vars.ifarme.src = `${mealsInfo.meals[clikedItem].strYoutube.slice(0, 24)}embed/${mealsInfo.meals[clikedItem].strYoutube.slice(32)}`;
    vars.shareGmail.href = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to&su=im+sharing+this+recepi+with+you&body=Click+the+link+to+see+this+${mealsInfo.meals[clikedItem].strMeal}+recepi%0D%0Ahttp://hillel-meals.netlify.com/?${mealsInfo.meals[clikedItem].idMeal}`

    // vars.pdfButton.classList.remove('none');

    items.map((item) => item.classList.remove('none'));

    if (e.target && e.target.dataset.random) {
        vars.mealsDiv.classList.add('none');
    }

    vars.seperdLineTop.scrollIntoView({ behavior: "smooth" });
};

vars.mealsUl.addEventListener('click', openClikcedRecepi, false);

const checkIngredient = (obj) => {
    vars.ingUl.textContent = '';
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
            vars.ingUl.appendChild(li)
        };

        if (inRes && obj[key] && inRes && obj[key] !== ' ') {
            spanBuilder(true, ` ${obj[key]} : `);
            li.appendChild(span);
        }
        if (meRes && obj[key] && meRes && obj[key] !== ' ') {
            spanBuilder(false, ` ${obj[key]}`);
            vars.ingUl.children[builderCounter].appendChild(span);
            builderCounter++;
        }
    };
};
let temp;
const favItemsId = [];

// temp is holding the main request data 
const addToFav = (e) => {
    const len = favItemsId.length;
    for (let i = 0; i < len; i++) {
        if (favItemsId[i].meals[0].idMeal == e.target.dataset.likeImgId) {
            return
        }
    };
    fetchData(parseInt(e.target.dataset.likeImgId), false)
        .then((data) => {
            temp = mealsInfo;
            mealsInfo = data;
            favItemsId.push(mealsInfo);
            console.log(e.target.dataset.likeImgId);
            console.log('favItemsId ', favItemsId);


        })
        .then(() => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            li.textContent = mealsInfo.meals[0].strMeal;
            li.setAttribute('class', `fav-item ${mealsInfo.meals[0].idMeal}`);
            img.src = mealsInfo.meals[0].strMealThumb;
            img.setAttribute('class', 'fav-img');
            vars.favoritedItems.appendChild(li);
            li.appendChild(img);

        })
        .then(() => mealsInfo = temp);
};

vars.likeImg.addEventListener('click', addToFav, false);

const openFavItem = e => {
    const reqString = e.target.classList[1];
    temp = mealsInfo;
    favItemsId.map(item => {
        if (item.meals[0].idMeal == reqString) {
            mealsInfo = item
        };
    });

    openClikcedRecepi(e);
    mealsInfo = temp;
};

vars.favoritedItems.addEventListener('click', openFavItem, false);

const openFromRandom = event => {
    fetchData(parseInt(event.target.dataset.recipeId), false)
        .then(data => {
            temp = mealsInfo;
            mealsInfo = data;
            openClikcedRecepi(event)
        }).then(() => mealsInfo = temp);
};

vars.randomRecipesContainer.addEventListener('click', openFromRandom, false);



// * added to make pdf file

let lines;
const createPdfFile = () => {

    const doc = new jsPDF();
    doc.addImage(vars.headerImg, 'JPEG', 15, 40, 180, 160)
    doc.setFontSize(40);
    doc.text(35, 25, vars.headerH2.textContent);
    doc.setFontSize(14);


    let textHeight = 210;
    let textWidth = 18;
    let ingredientText;

    for (let i = 0; i < vars.liData.length; i++) {
        if (i == 10) {
            textWidth += 70;
            textHeight = 210;
        }

        doc.text(textWidth, textHeight, vars.liData[i].children[0].innerText);
        textWidth += doc.getTextWidth(vars.liData[i].children[0].innerText);
        doc.text(textWidth + 2, textHeight, vars.liData[i].children[1].innerText);
        textWidth -= doc.getTextWidth(vars.liData[i].children[0].innerText);
        textHeight += 9;

        ingredientText += vars.liData[i].children[0].innerText;
        ingredientText += vars.liData[i].children[1].innerText;

    }


    console.log('final getTextDimensions', doc.getTextDimensions(ingredientText).w * 0.3)
    console.log(ingredientText);

    lines = doc.setFont('Times')
        .setFontSize(15)
        .splitTextToSize(vars.intrudoctions.textContent, 150);
    if (textWidth < 60 && lines.length <= 3) {
        if (lines.length <= 13) {

            doc.text(35, 310, lines);
        }
    } else {
        const spText = lines.splice(13);
        doc.text(35, 310, lines);
        doc.addPage()
        doc.text(35, 20, spText);

    }
    doc.save('YAMMI.COM.pdf');

}
// todo remove the thumbnail image while loading the image


// vars.pdfButton.addEventListener('click', createPdfFile, false);

// https://parall.ax/products/jspdf
// https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html
// https://github.com/MrRio/jsPDF


// https://icons8.com/icon