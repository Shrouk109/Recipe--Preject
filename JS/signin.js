

const email = document.getElementById("login-form-email");
const password = document.getElementById("login-form-password");

const emailValidation = document.getElementById("validation-email");
const passwordValidation = document.getElementById("validation-password");


const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


function validateForm() {
  let isValid = true;

// validate email
  if (!emailPattern.test(email.value.trim())) {
    emailValidation.textContent = "Please enter a valid e-mail address.";
    isValid = false;
  } else {
    emailValidation.textContent = "";
  }

// validate pass
  if (!passwordPattern.test(password.value.trim())) {
    passwordValidation.textContent =
      "Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one number.";
    isValid = false;
  } else {
    passwordValidation.textContent = "";
  }

  return isValid;
}


async function submitFormData(email, password) {
  const trimmedPassword = password.trim();
  const trimmedEmail = email.trim(); 

  console.log({
    email: trimmedEmail.trim(),
    password: trimmedPassword.trim(),
  });

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          email: trimmedEmail, 
          password: trimmedPassword, //,
        }),
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
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 


    if (validateForm()) {
      submitFormData(email.value, password.value); 
      email.value ="";
      password.value ="";

      localStorage.setItem("checked", "true");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 50)
    }
  });
