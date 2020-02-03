export const getRecepi = (recipe, serchBy = 's') => {
    // return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`)

    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${serchBy}=${recipe}`)
        .then(data => data.json())
        // .then(data => console.log(data))
        .catch(e => console.log(e))
};