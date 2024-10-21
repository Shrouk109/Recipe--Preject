// Preview image function
function previewImage(event) {
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagePreview = document.getElementById("image-preview");
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(input.files[0]);
  }
}
let indexCard = parseInt(localStorage.getItem("indexOfCard"), 10);
const createButton = document.querySelector(".btn-recipe");

console.log(indexCard);

// Set up event listeners when DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  if (createButton) {
    createButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the form from submitting

      // Check if 'checked' is set to 'true' in localStorage
      if (localStorage.getItem("checked") === "true") {
        // Save recipe data and proceed with validation
        saveRecipeData(event);
        setupRealTimeValidation(); // Set up real-time validation
        loadRecipeData();

        // Store data in localStorage
        localStorage.setItem("recipeSaved", "true");

        // Redirect to another page
        window.location.href = "My-recipe.html";
      } else {
        // If 'checked' is not 'true', show an alert
        document.querySelector("#alert").classList.remove("d-none");

        // Optionally store a flag in localStorage to indicate why form submission failed
        localStorage.setItem("formError", "Recipe not checked");
      }
    });
  }
});

    

  


// Load existing recipe data into an array
let recipeDataArr = JSON.parse(localStorage.getItem("recipeData")) || [];

// Validate inputs function
function validateInputs() {
  const recipeTitle = document.getElementById("recipe-form-Recipe-title");
  const recipeType = document.querySelector(".form-select");
  const inputImg = document.getElementById("recipe-form-recipe-img");

  let isValid = true;

  // Validate recipe title
  if (!recipeTitle.value.trim()) {
    showError(recipeTitle, "Recipe title cannot be empty");
    isValid = false;
  } else if (recipeTitle.value.trim().length < 3) {
    showError(recipeTitle, "Recipe title must be at least 3 characters");
    isValid = false;
  } else {
    clearError(recipeTitle);
  }

  // Validate recipe type
  if (recipeType.value === "") {
    showError(recipeType, "Please select a recipe type");
    isValid = false;
  } else {
    clearError(recipeType);
  }

  // Skip image validation if editing an existing recipe
  if (indexCard === null || indexCard === -1) {
    if (inputImg.files.length === 0) {
      showError(inputImg, "Please upload an image for the recipe");
      isValid = false;
    } else {
      clearError(inputImg);
    }
  }

  return isValid;
}

// Show error message function
function showError(input, message) {
  const errorElement = input.parentElement.querySelector(".error-message");
  if (errorElement) {
    errorElement.innerText = message;
  } else {
    const newError = document.createElement("div");
    newError.classList.add("error-message");
    newError.style.color = "red";
    newError.innerText = message;
    input.parentElement.appendChild(newError);
  }
}

// Clear error message function
function clearError(input) {
  const errorElement = input.parentElement.querySelector(".error-message");
  if (errorElement) {
    errorElement.remove();
  }
}

// Real-time validation setup
function setupRealTimeValidation() {
  const recipeTitle = document.getElementById("recipe-form-Recipe-title");
  const recipeType = document.querySelector(".form-select");
  const inputImg = document.getElementById("recipe-form-recipe-img");

  // Validate title on input
  recipeTitle.addEventListener("input", function () {
    if (recipeTitle.value.trim() === "") {
      showError(recipeTitle, "Recipe title cannot be empty");
    } else if (recipeTitle.value.trim().length < 3) {
      showError(recipeTitle, "Recipe title must be at least 3 characters");
    } else {
      clearError(recipeTitle);
    }
  });

  // Validate recipe type on change
  recipeType.addEventListener("change", function () {
    if (recipeType.value === "") {
      showError(recipeType, "Please select a recipe type");
    } else {
      clearError(recipeType);
    }
  });

  // Validate image on file input change
  inputImg.addEventListener("change", function () {
    if (indexCard === null || indexCard === -1) {
      // Only validate if not editing
      if (inputImg.files.length === 0) {
        showError(inputImg, "Please upload an image for the recipe");
      } else {
        clearError(inputImg);
      }
    }
  });
}

// Save recipe data function
function saveRecipeData(event) {
  event.preventDefault();

  const recipeTitle = document.getElementById("recipe-form-Recipe-title");
  const recipeType = document.querySelector(".form-select");
  const inputImg = document.getElementById("recipe-form-recipe-img");

  // Validate inputs before saving
  if (!validateInputs()) {
    return; // Stop if validation fails
  }

  const recipeData = {
    title: recipeTitle.value,
    type: recipeType.value,
    image: "", // Default empty image
  };

  // Check if we're editing an existing recipe
  if (indexCard !== null && indexCard > -1) {
    // If the user has uploaded a new image, read it
    if (inputImg.files.length > 0) {
      const file = inputImg.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        recipeData.image = e.target.result; // Use the new image
        recipeDataArr[indexCard] = recipeData; // Update the existing recipe
        saveToLocalStorage();
      };
      reader.readAsDataURL(file);
    } else {
      // If no new image is uploaded, keep the existing image
      recipeData.image = recipeDataArr[indexCard].image;
      recipeDataArr[indexCard] = recipeData; // Update the existing recipe
      saveToLocalStorage();
    }
  } else {
    // Add a new recipe
    const file = inputImg.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      recipeData.image = e.target.result; // Base64 string of the image
      recipeDataArr.push(recipeData);
      saveToLocalStorage();
    };
    reader.readAsDataURL(file);
  }
}

// Function to save recipe data to local storage
function saveToLocalStorage() {
  localStorage.setItem("recipeData", JSON.stringify(recipeDataArr));
  clearInputFields();
// Redirect to My Recipes page
}

// Clear input fields after saving
function clearInputFields() {
  const recipeTitle = document.getElementById("recipe-form-Recipe-title");
  const recipeType = document.querySelector(".form-select");
  const inputImg = document.getElementById("recipe-form-recipe-img");
  const imageSrc = document.getElementById("image-preview");

  recipeTitle.value = "";
  recipeType.value = "";
  inputImg.value = "";
  imageSrc.src = ""; // Clear image preview

  createButton.innerHTML = "Create Recipe"; // Reset button text to "Create"
  indexCard = null; // Reset indexCard to indicate new creation
  localStorage.removeItem("indexOfCard"); // Clear indexOfCard from localStorage
}


document.addEventListener("DOMContentLoaded", function () {
  loadRecipeData();
});

function loadRecipeData() {
  let indexCard = parseInt(localStorage.getItem("indexOfCard"), 10); // Retrieve and parse index
  let cardEdit = JSON.parse(localStorage.getItem("recipeData")); // Get recipe data array

  if (indexCard > -1 && cardEdit && cardEdit[indexCard]) {
    const recipeTitle = document.getElementById("recipe-form-Recipe-title");
    const recipeType = document.querySelector(".form-select");
    const imageSrc = document.getElementById("image-preview");

    // Load values from the selected recipe
    recipeTitle.value = cardEdit[indexCard].title;
    recipeType.value = cardEdit[indexCard].type;
    imageSrc.src = cardEdit[indexCard].image;
    imageSrc.style.display = "block"; // Ensure the image is visible

    createButton.innerHTML = "Edit Recipe"; // Change button text to "Edit"
  } else {
    createButton.innerHTML = "Create Recipe"; // If no edit, show "Create"
  }
}

logout.addEventListener("click", function(event){
  window.location.href = "signUp.html";
});