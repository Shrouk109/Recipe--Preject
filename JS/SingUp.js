

let dataUser = JSON.parse(localStorage.getItem("userData")) || [];
let input = document.querySelectorAll("input");

// Ensure dataUser is an array
if (!Array.isArray(dataUser)) {
  dataUser = [];
}

// Elements
let name = document.getElementById("register-form-name");
let email = document.getElementById("register-form-email");
let phone = document.getElementById("register-form-phone");
let password = document.getElementById("register-form-password");
let retypePassword = document.getElementById("register-form-retype");
const emailValidation = document.getElementById("validation-email");
const passwordValidation = document.getElementById("validation-password");
const nameValidation = document.getElementById("validation-name");
const repasswordValidation = document.getElementById("validation-repassword");
const phoneValidation = document.getElementById("validation-phone");

// Validation patterns
const emailPattern = /^[^\s@]+@gmail\.com$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const namePattern = /^[A-Z][a-zA-Z\s]{2,}$/;// Name should be at least 2 characters long and can only include letters and spaces
const phonePattern = /^0\d{10}$/;; // Phone should be exactly 10 digits


// Validation function
function validateForm() {
  let isValid = true;

  // Validate name
  if (!namePattern.test(name.value.trim())) {
    nameValidation.textContent = "Please enter a valid name (at least 3 letters) and first letter uppercase  .";
    isValid = false;
  } else {
    nameValidation.textContent = "";
  }

  // Validate phone number
  if (!phonePattern.test(phone.value.trim())) {
    phoneValidation.textContent = "Please enter a valid phone number (11 digits) Start with Zero number.";
    isValid = false;
  } else {
    phoneValidation.textContent = "";
  }

  // Validate email
  if (!emailPattern.test(email.value.trim())) {
    emailValidation.textContent = "Please enter a valid e-mail address.";
    isValid = false;
  } else {
    emailValidation.textContent = "";
  }

  // Validate password
  if (!passwordPattern.test(password.value.trim())) {
    passwordValidation.textContent = 
      "Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.";
    isValid = false;
  } else {
    passwordValidation.textContent = "";
  }

  // Validate retyped password and match with password
  
   if (password.value.trim() !== retypePassword.value.trim()) {


    repasswordValidation.textContent = "Passwords do not match.";



    isValid = false;
  } else {
    repasswordValidation.textContent = "";
  }

  return isValid;
}





async function submitFormData(email, password, phone, name, retypePassword) {
  const trimmedPassword = password.trim();
  const trimmedEmail = email.trim(); 
  const trimmedrePassword = retypePassword.trim();
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();

  console.log({
    name: trimmedName,
    email: trimmedEmail,
    password: trimmedPassword,
    retypePassword: trimmedrePassword,
    phone: trimmedPhone,

  });

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
            "name":trimmedName.trim(),
            "email":trimmedEmail.trim(),
            "password":password.trim(),
            "rePassword":trimmedPassword.trim(),
            "phone":trimmedPhone.trim()
        }        ),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error details:", data);
    }

    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}



document
  .getElementById("registerform")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 


    if (validateForm()) {
      submitFormData(email.value, password.value,phone.value,name.value,retypePassword.value); 

      console.log( name.value);
      localStorage.setItem("name",name.value);
      email.value="";
      password.value="";
      phone.value="";
      name.value="";
      retypePassword.value="";


      
        setTimeout(() => {
            window.location.href = "signin.html";
          }, 50);
    }
  }); 






