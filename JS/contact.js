var productNameInput = document.getElementById("productNameInput");
var emailInput = document.getElementById("emailInput");
var subjectInput = document.getElementById("subjectInput");
var messageInput = document.getElementById("messageInput");
var Btn = document.getElementById("Btn");
var AlertNameInput = document.getElementById("AlertNameInput");
var AlertEmailInput = document.getElementById("AlertEmailInput");
var AlertSubjectInput = document.getElementById("AlertSubjectInput");

function validateProductName() {
  var regex = /^([A-Z][a-z ]{2,30}|[A-Z][a-z]{2,20}[0-9]{1,3})$/;
  if (regex.test(productNameInput.value)) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    AlertNameInput.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    AlertNameInput.classList.remove("d-none");
    return false;
  }
}

function validateEmail() {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(emailInput.value)) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    AlertEmailInput.classList.add("d-none");
    return true;
  } else {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    AlertEmailInput.classList.remove("d-none");
    return false;
  }
}

function validateSubject() {
  if (subjectInput.value.length >= 3 && subjectInput.value.length <= 50) {
    subjectInput.classList.add("is-valid");
    subjectInput.classList.remove("is-invalid");
    AlertSubjectInput.classList.add("d-none");
    return true;
  } else {
    subjectInput.classList.add("is-invalid");
    subjectInput.classList.remove("is-valid");
    AlertSubjectInput.classList.remove("d-none");
    return false;
  }
}

function validateForm() {
  var isValidName = validateProductName();
  var isValidEmail = validateEmail();
  var isValidSubject = validateSubject();

  Btn.disabled = !(isValidName && isValidEmail && isValidSubject);
  return isValidName && isValidEmail && isValidSubject;
}

productNameInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);
subjectInput.addEventListener("input", validateForm);
let logout=document.querySelector("#logout");
console.log(logout);

logout.addEventListener("click", function(event){
  window.location.href = "signUp.html";



    
  
});