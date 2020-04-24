export const getRecepi = (id, recipe) => {
    if (id) {
        return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            // return fetch('file:///C:/Users/Hillel%20Kott/Desktop/deploy-5e494f3d4fb0ac0009583d2b/deploy-5e494f3d4fb0ac0009583d2b/recepy.js')

            .then(data => data.json())
            .catch(e => console.log(e))
    } else {
        return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
            // return fetch('../recepy.js')
            .then(data => data.json())

            // return fetch('file:///C:/Users/Hillel%20Kott/Desktop/deploy-5e494f3d4fb0ac0009583d2b/deploy-5e494f3d4fb0ac0009583d2b/recepy.js')
            // .then(data => data)

            .catch(e => console.log(e))
    }
};

export const getRandomRecepi = () => {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        // return fetch('file:///C:/Users/Hillel%20Kott/Desktop/deploy-5e494f3d4fb0ac0009583d2b/deploy-5e494f3d4fb0ac0009583d2b/recepy.js')
        // return fetch('../recepy.js')
        .then(data => data.json())
        .catch(e => console.log(e))
}
