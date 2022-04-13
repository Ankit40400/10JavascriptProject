
const mealsEl = document.getElementById("mea")
const favoriteContainer = document.getElementById("fav-meals")
const searchTerm = document.getElementById("search-term")
const searchBtn = document.getElementById("search")
const mealPopup = document.getElementById('meal-popup')
const popupCloseBtn = document.getElementById('close-popup')
const mealInfo = document.getElementById("meal-information")

getRandomMeal()
fetchFavMeals()


async function getRandomMeal() {
    let fetchRes = fetch("https://themealdb.com/api/json/v1/1/random.php")
          
    const respData = await (await fetchRes).json();
    const randomMeal = respData.meals[0]
    console.log(randomMeal)
    addMeal(randomMeal, true)
} 

   
async function getMealById(id){
    const resp = fetch("https://themealdb.com/api/json/v1/1/lookup.php?i=" + id)

    const respData = await (await resp).json()
    const meal = respData.meals[0];
    return meal
}


async function getmealsBySearch(term) {
    const resp = fetch("https://themealdb.com/api/json/v1/1/search.php?s=" + term)
    const respData = await (await resp).json()
    const meals = respData.meals
    return meals
}



function addMeal(mealData, random = false) {
    const meal = document.createElement("div")
    meal.classList.add("meal")

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `
            <span class="random"> Random Recipes </span>` : ' '}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal} ">
            <div class="meal-body">
                <h4> ${mealData.strMeal} </h4>
                <button class="fav-btn">
                <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `

    const btn = meal.querySelector(".meal-body .fav-btn")
    btn.addEventListener("click", () =>{
      if (btn.classList.contains("active")) {
          removeMealLS(mealData.idMeal)
          btn.classList.remove("active")
      } else {
          addMealLS(mealData.idMeal)
          btn.classList.add("active")
      }

      fetchFavMeals();
    })

    meal.addEventListener('click', () => {
        showMealInfo(mealData)
    })

    mealsEl.appendChild(meal)
}


function showMealInfo(mealData) {
    // clean it up
    mealInfo.innerHTML = " "

    //update the Meal info
    const mealEl = document.createElement('div')

    const ingredients = [];

    // get the ingredients and measures
    for(let i = 1; i<=20; i++) {
        if(mealData['strIngredient'+i]){
            ingredients.push(`${mealData['strIngredient'+i]} / ${mealData['strMeasure'+i]}`)
        } else {
            break
        }
    }
    

    mealEl.innerHTML= `
    <h1> ${mealData.strMeal} </h1>
    <img src=${mealData.strMealThumb} alt="">
    <p>${mealData.strInstructions}</p>
    <h3> Ingredients:</h3>
    <ul>
    ${ingredients.map((ing) => ` <li>${ing}</li`).join("")}
    </ul>
    `
    mealInfo.appendChild(mealEl)
    mealPopup.classList.remove("hidden")
}




function addMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));

}

function removeMealLS(mealId) {
    const mealIds = getMealsLS()

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id)=> id !== mealId))
    )
}


function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))
    return mealIds ===null ? [] : mealIds
}


async function fetchFavMeals() {
    // clean the container
    favoriteContainer.innerHTML = " ";
    const mealIds = getMealsLS()

    const meals = []

    for(let i = 0; i<mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId)
        addMealFav(meal)
    }
}


// function for adding meal to favorite 
function addMealFav(mealData) {

    const favMeal = document.createElement("li")
    

    favMeal.innerHTML = `
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal} ">
            <span> ${mealData.strMeal} </span>
            <button class="clear">
                <i class="fas fa-window-close"></i>
            </button>
    `
    const btn = favMeal.querySelector(".clear");
    btn.addEventListener("click", () => {
        removeMealLS(mealData.idMeal)

        fetchFavMeals()
    })

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    })

    favoriteContainer.appendChild(favMeal)
}



searchBtn.addEventListener("click", async() => {
    //cleaning the container
    mealsEl.innerHTML = " ";
    const search = searchTerm.value;
    const meals = await getmealsBySearch(search)
    console.log(meals)
    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal)
        })
    }

})


popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden')
})
