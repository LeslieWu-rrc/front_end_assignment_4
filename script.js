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

    return isValid;
  }

  function isNotEmpty(value) {
    return value.trim().length > 0;
  }

  function isValidEmail(value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value.trim());
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
