// Listen for clicks on hover-buttons
document.querySelectorAll(".hover-button").forEach((button) => {
  button.addEventListener("click", function () {
    // Get the parent card (".Card-chef")
    const card = this.closest(".Card-chef");

    // Get the relevant data from the card
    const imgSrc = card.querySelector(".card-img img")?.src || "";
    const name = card.querySelector(".fs-5")?.innerHTML.trim() || "";
    const email =
      card.querySelector(".fa-envelope + a")?.innerHTML.trim() || "";
    const phone =
      card.querySelector(".fa-phone + a small")?.innerHTML.trim() || "";
    const website = card.querySelector(".fa-globe + a")?.innerHTML.trim() || "";
    const description =
      card.querySelector(".list-group-flush small")?.innerHTML.trim() || "";

    // Get the recipes count from the parent element of the <i> tag
    const recipesCount =
      card.querySelector(".fa-utensil-spoon")?.parentElement.innerText.trim() ||
      "";

    // Create an object with the data
    const chefData = {
      imgSrc,
      name,
      email,
      phone,
      website,
      description,
      recipesCount,
    };

    // Store the data in localStorage
    localStorage.setItem("chefData", JSON.stringify(chefData));
    window.location.href = "chefsdetails.html";
  });
});



let message= document.querySelector("#welcome-message");
if(localStorage.getItem("checked")=="false"){
  localStorage.setItem("name","log in");
  message.innerHTML=localStorage.getItem("name");

}
else{
  let content=localStorage.getItem("name");
  message.innerHTML=content;
}
logout.addEventListener("click", function(event){
  window.location.href = "signUp.html";
});