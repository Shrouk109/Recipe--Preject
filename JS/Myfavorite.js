logout.addEventListener("click", function(event){
    window.location.href = "signUp.html";
  });

  // استرجاع العناصر من localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
console.log(favorites);
let allfav=document.querySelector("#fav .row");
console.log(allfav);



function updateDisplay() {
  if (favorites.length > 0) {
    addInCard();
  } else {
    allfav.innerHTML = `<img class="no-data" src="img/no-data.png">`;
  }
}

setInterval(updateDisplay, 500);



// دالة لإضافة العناصر إلى السلة
function addInCard() {
  let  slide1 = ``;
 
  for (let i = 0; i < favorites.length; i++) {
    slide1 += `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
      <div class="item-container">
        <div class="item-img">
          <img src="${favorites[i].strMealThumb}" / class="w-100">
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
           <span class="delet" >
              <i class="fa-solid fa-square-minus" onclick="delet(${i})"></i>
              </span>
        </div>
        <div class="item-content">
          <h3>
            <a href="" class="nameresape">
              ${favorites[i].strMeal.split(" ").slice(0, 2).join(" ")}
            </a>
            <small class="sinregrents">${favorites[i].strCategory}</small>
          </h3>
          <div class="avatar">
            <div class="d-flex justify-content-between">
              <div class="d-flex">
                <img src="img/avatar.png"  />
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
  allfav.innerHTML = slide1;
 
  
};


function delet(id) {
  favorites.splice(id, 1);  // Remove the item at index id
  localStorage.setItem("favorites", JSON.stringify(favorites));  // Update localStorage
  addInCard();  // Re-render the list
}





