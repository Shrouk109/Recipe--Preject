let allLinks = document.querySelectorAll(
  ".navbar  .dropdown-menu .dropdown-menu li"
);

allLinks.forEach((li) => {
  li.addEventListener("click", function () {
    localStorage.setItem("name-category", li.textContent);
    window.location.href = "recipe-type.html";
  });
});
logout.addEventListener("click", function(event){
  window.location.href = "signUp.html";
});