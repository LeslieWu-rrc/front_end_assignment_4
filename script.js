document.addEventListener("DOMContentLoaded", () => {
  // console.log("JS loaded");

  const formNode = document.querySelector("#surveyForm");

  formNode.addEventListener("submit", (eventObject) => {
    // invoking preventDefault stops creating a new page request
    eventObject.preventDefault();

    removeAllErrorMessages(); // remove all pre-existing error msg

    const isValid = validateForm();
    if (isValid) {
      formNode.submit();
    }
  });

  // validate form
  function validateForm() {
    let isValid = true;

    // Validation for Last Name
    const nameInput = document.querySelector("#userName");
    const nameValue = nameInput.value.trim();
    // console.log(nameValue);
    
    if (!isNotEmpty(nameValue)) {
      isValid = false;
      showInputError(nameInput, "Name cannot be empty.");
    } if (nameValue.length < 4) {
      isValid = false;
      showInputError(nameInput, "Name must be at least 4 characters.");
    } if (nameValue.includes(" ")) {
      isValid = false;
      showInputError(nameInput, "Name cannot contain spaces.");
    }

    // Validation for Email
    const emailInput = document.querySelector("#userEmail");
    const emailValue = emailInput.value.trim();
    // console.log(emailValue);

    if (!isValidEmail(emailValue)) {
      isValid = false;
      showInputError(emailInput, "Please enter a valid email address.");
    }

    // Validation for Radio 
    if (!hasCheckedOption("walmartGender")) {
      isValid = false;
      const radioContainer = document.querySelector("input[name='walmartGender']").closest(".input-container");
      showInputError(radioContainer, "Please select an option.");
    }

    // Validation for Checkbox 
    if (!hasCheckedOption("gender")) {
      isValid = false;
      const checkboxContainer = document.querySelector("input[name='gender']").closest(".input-container");
      showInputError(checkboxContainer, "Please select at least one option.");
    }

    return isValid;
  }

  // validate if the input is not empty
  function isNotEmpty(value) {
    return value.trim().length > 0;
  }

  function isValidEmail(value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value.trim());
  }

  // validate if the radio or checkbox is checked
  function hasCheckedOption(inputName) {
    const inputs = document.querySelectorAll(`input[name='${inputName}']`);
    for (let input of inputs) {
      if (input.checked) {
        return true;
      }
    }
    return false;
  }

  function removeAllErrorMessages() {
    const errorMessageNodes = document.querySelectorAll(".error-message");
    errorMessageNodes.forEach(e => {
      e.remove();
    });
  }
  
  // show error message
  function showInputError(inputElement, message) {
    // select the first ancestor of an element with the argument selector
    const inputContainer = inputElement.closest(".input-container");

    // create a <div> for showing error msg
    const errorText = document.createElement("div");
    errorText.innerText = message;
    errorText.classList.add("error-message");
    errorText.setAttribute("role", "alert");

    // append message to element
    inputContainer.appendChild(errorText);
  }
});
