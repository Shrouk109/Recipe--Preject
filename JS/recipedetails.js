let mealId = localStorage.getItem("meal-id");
console.log(mealId);

let headerName = document.querySelector(".landing-title");
let title = document.querySelector(".page-sec");

async function recipeDetails(mealId) {
  if (mealId) {
    try {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      let finalRes = await response.json();
      let meal = finalRes.meals[0];  // Store the meal data in a variable
      console.log('Meal object:', meal);  // Debugging the meal object

      // Set meal title
      headerName.innerHTML = `${meal.strMeal}`;
      title.innerHTML = `${meal.strMeal}`;

      // Display meal details
      let data = `
      <div class="col-10 mx-auto">
            <div class="card-group">
              <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-footer">
                  <div class="row text-center">
                    <div class="col-lg-4 col-12">
                      <p> Name : <strong> ${meal.strMeal} </strong> </p>
                    </div>
                    <div class="col-lg-4 col-12">
                      <p> Category: <strong> ${meal.strCategory} </strong></p>
                    </div>
                    <div class="col-lg-4 col-12">
                      <div class="button-box">
                        <a href="#" class="favorite" id="favorite-btn">
                          <i class="far fa-heart"></i> Favorite
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
      `;

      // Display ingredient list
      let ingredientMeal = `
      <div class="col-lg-6 col-md-12">
        <div class="recipe-content">
          <h3>Ingredients</h3>35:20
          
          
          
          
          
          <div class="ingredients-list">
            <ul class="ingredient-check">
              <li><span> - </span> ${meal.strIngredient1}</li>
              <li><span> - </span> ${meal.strIngredient2}</li>
              <li><span> - </span> ${meal.strIngredient3}</li>
              <li><span> - </span> ${meal.strIngredient4}</li>
              <li><span> - </span> ${meal.strIngredient5}</li>
              <li><span> - </span> ${meal.strIngredient6}</li>
              <li><span> - </span> ${meal.strIngredient7}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12">
        <div class="recipe-content">
          <h3>Steps</h3>
          <div class="instructions">
            <p>${meal.strInstructions.split(" ").slice(0, 200).join(" ")}</p>
          </div>
        </div>
      </div>
      `;

      // Set HTML content
      document.querySelector(".recipe-details .row").innerHTML = data;
      document.querySelector(".ingredients-steps .row").innerHTML = ingredientMeal;

      // Add event listener to the favorite button
      document.querySelector('.button-box i').addEventListener("click", function (e) {
        e.preventDefault();
        addToFavorites(meal);
        document.querySelector('.button-box i').style.color="red";
   
        setTimeout(() => {
          window.location.href = "myfav.html";
        }, 50)
  
        
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    console.log("No meal ID found in localStorage");
  }
}

// Function to add the meal to localStorage as a favorite
function addToFavorites(meal) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];  // Get existing favorites

  // Check if the meal is already in favorites to avoid duplicates
  const existingFavorite = favorites.find(fav => fav.idMeal === meal.idMeal);

  if (!existingFavorite) {
    favorites.push({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory
    });

    // Save updated favorites to localStorage
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(`${meal.strMeal} added to favorites!`);
    } catch (storageError) {
      console.error("localStorage save failed:", storageError);
    }
  } else {
    console.log(`${meal.strMeal} is already in favorites.`);
  }
}

// Example call (replace mealId with actual value from your app)
recipeDetails(mealId);

// Load favorites on page load (optional)
function loadFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  console.log('Favorites:', favorites);
}
