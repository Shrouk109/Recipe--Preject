let row = document.querySelector("#recipes .row");

let recipeDataArr = JSON.parse(localStorage.getItem("recipeData")) || [];

if (!Array.isArray(recipeDataArr)) {
  recipeDataArr = [];
}

// show recipe that created
document.addEventListener("DOMContentLoaded", function () {
  let allData = document.querySelector("#recipes .row");

  //get recipe that created from localStorage
  let recipeDataArr = JSON.parse(localStorage.getItem("recipeData")) || [];

  // check if row is empty
  if (recipeDataArr.length === 0) {
   
    recipes.innerHTML = `<img class="no-data" src="img/no-data.png">`;
    
  } else {
    showData();
  }

  // Function to display recipes
  function showData() {
    let cartoona = "";
    for (let i = 0; i < recipeDataArr.length; i++) {
      cartoona += `
        <div class="col-lg-3 col-sm-6 col-xs-12 cols">
          <div class="item-container">
            <div class="item-img">
              <img src="${recipeDataArr[i].image}" />
              <a href="" class="nameresape">
                <div class="hover-button">View Recipe</div>
              </a>
            </div>
            <div class="item-meta d-flex justify-content-between ">
              <span class="prep">
                <i class="fa-regular fa-clock"></i>
                Prep: 35 mins
                <i class="fa-regular fa-user ms-1"></i>
                2
              </span>
              <span class="delet" >
              <i class="fa-solid fa-square-minus"></i>
              </span>
              <span class="edit" >
                <i class="fa-solid fa-pen-to-square"  ></i>
              </span>
            </div>
            <div class="item-content">
              <h3>
                <a href="" class="nameresape">
                  ${recipeDataArr[i].title}
                </a>
                <small class="sinregrents">${recipeDataArr[i].type}</small>
              </h3>
              <div class="avatar">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <img src="img/avatar.png" />
                    <a href="">admin</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    allData.innerHTML = cartoona;

    addEditListeners();
    delet();
  }

  // Function to add edit listeners
  function addEditListeners() {
    let cards = Array.from(document.querySelectorAll(".edit i"));
    console.log(cards);
    cards.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        localStorage.setItem("indexOfCard", index);
        window.location.href = "creatrecipe.html";
      });
    });
  }

  
  function delet() {
    let delets = Array.from(document.querySelectorAll(".delet i"));
    console.log(delets);
    delets.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        recipeDataArr.splice(index, 1);
        localStorage.setItem("recipeData", JSON.stringify(recipeDataArr));
        showData();
      });
    });
  }
});

let logout = document.querySelector("#logout");
console.log(logout);

logout.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "signUp.html";
});
