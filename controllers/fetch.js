export const getRecepi = (id, recipe) => {
    if (id) {
        return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(data => data.json())
        .catch(e => console.log(e))
    } else {
        return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?$s=${recipe}`)
        .then(data => data.json())
        .catch(e => console.log(e))
    }
};