let nameIngredient = localStorage.getItem("name-Ingredient");
console.log(nameIngredient)

// get element in landing
let type = document.querySelector(".landing .landing-title span");
type.innerHTML = nameIngredient;

let pageSec = document.querySelector(".landing .page-sec");
pageSec.innerHTML = nameIngredient;

async function getMostRecipes(nameIngredient) {
  let slide1 = "";
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${nameIngredient}`
    );
    let finalRes = await response.json();
    console.log(finalRes);

    if (finalRes.meals && finalRes.meals.length > 0) {
      for (let i = 0; i < Math.max(12, finalRes.meals.length); i++) {
        let meal = finalRes.meals[i];

        slide1 += `
        <div class="col-lg-3 col-md-4 col-sm-6 col-12">
          <div class="item-container">
            <div class="item-img">
              <img src="${meal.strMealThumb}" />
              <a href="" class="nameresape">
                <div class="hover-button">View Recipe</div>
              </a>
            </div>
            <div class="item-meta">
              <span class="prep">
                <i class="fa-regular fa-clock"></i>
                Prep: 35 mins
              </span>
              <span>
                <i class="fa-regular fa-user"></i>
                2
              </span>
            </div>
            <div class="item-content">
              <h3>
                <a href="" class="nameresape">
                  ${meal.strMeal.split(" ").slice(0, 2).join(" ")}
                </a>
                <small class="sinregrents">${nameIngredient}</small>
              </h3>
              <div class="avatar">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <img src="img/avatar.png" />
                    <a href="">admin</a>
                  </div>
                  <span class="item-rate">
                    <ul class="list-unstyled d-flex">
                      <li><i class="fas fa-star active"></i></li>
                      <li><i class="fas fa-star active"></i></li>
                      <li><i class="fas fa-star active"></i></li>
                      <li><i class="fas fa-star active"></i></li>
                      <li><i class="far fa-star"></i></li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      }
      document.querySelector("#recipes .row").innerHTML = slide1;

      
    } else {
      document.querySelector(
        "#recipes .row"
      ).innerHTML = `<img src="img/no-data.png" alt="no-data" class="empyt-data">`;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    document.querySelector("#recipes .row").innerHTML = slide1;
  }
}

getMostRecipes(nameIngredient);

