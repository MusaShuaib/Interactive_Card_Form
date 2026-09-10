// ============================================================
// GET ELEMENTS FROM HTML
// ============================================================

// Form
const form = document.getElementById("cardForm");

// Inputs
const cardHolderNameInput =
  document.getElementById("card-holder");

const cardNumberInput =
  document.getElementById("card-number");

const cardExpMonthInput =
  document.getElementById("card-expiration-date");

const cardExpYearInput =
  document.getElementById("card-expiration-year");

const cardCvcInput =
  document.getElementById("card-cvc");


// ============================================================
// CARD ELEMENTS
// ============================================================

const cardCvc =
  document.querySelector(".card-cvc");

const cardNumber =
  document.querySelector(".card-holder-number");

const cardHolderName =
  document.querySelector(".card-holder-name");

const cardExpiry =
  document.querySelector(".card-expiry");


// ============================================================
// BUTTONS AND COMPLETED STATE
// ============================================================

const submitBtn =
  document.getElementById("submitBtn");

const continueBtn =
  document.getElementById("continueBtn");

const cardDetails =
  document.querySelector(".card-details");

const completedState =
  document.querySelector(".completed-state");


// ============================================================
// 1. CARDHOLDER NAME
// ============================================================

cardHolderNameInput.addEventListener("input", () => {

  const name = cardHolderNameInput.value.trim();

  cardHolderName.textContent =
    name || "JANE APPLESEED";

});


// ============================================================
// 2. CARD NUMBER
// ============================================================

cardNumberInput.addEventListener("input", () => {

  // Remove anything that isn't a number
  const numbersOnly =
    cardNumberInput.value.replace(/\D/g, "");


  // Limit the card number to 16 digits
  const limitedNumber =
    numbersOnly.slice(0, 16);


  // Format into groups of four
  const formattedNumber =
    limitedNumber
      .replace(/(.{4})/g, "$1 ")
      .trim();


  // Put the formatted number on the card
  cardNumber.textContent =
    formattedNumber || "0000 0000 0000 0000";


  // Put the formatted number back into the input
  cardNumberInput.value = formattedNumber;

});


// ============================================================
// 3. EXPIRY DATE
// ============================================================

function updateExpiryDate() {

  const month =
    cardExpMonthInput.value;

  const year =
    cardExpYearInput.value;


  // Show 00 when nothing has been entered
  const displayMonth =
    month || "00";

  const displayYear =
    year || "00";


  cardExpiry.textContent =
    `${displayMonth}/${displayYear}`;

}


// Run whenever month changes
cardExpMonthInput.addEventListener(
  "input",
  updateExpiryDate
);


// Run whenever year changes
cardExpYearInput.addEventListener(
  "input",
  updateExpiryDate
);


// ============================================================
// 4. CVC
// ============================================================

cardCvcInput.addEventListener("input", () => {

  const cvc =
    cardCvcInput.value.replace(/\D/g, "");


  cardCvcInput.value =
    cvc.slice(0, 3);


  cardCvc.textContent =
    cardCvcInput.value || "000";

});


// ============================================================
// 5. ERROR FUNCTION
// ============================================================

function showError(input, message) {

  // Add red border
  input.classList.add("error");


  // Find the error message belonging to this input
  const errorMessage =
    input.parentElement.querySelector(
      ".error-message"
    );


  // Display the error
  if (errorMessage) {

    errorMessage.textContent =
      message;

  }

}


// ============================================================
// 6. CLEAR ERROR
// ============================================================

function clearError(input) {

  // Remove red border
  input.classList.remove("error");


  // Find error message
  const errorMessage =
    input.parentElement.querySelector(
      ".error-message"
    );


  // Remove error text
  if (errorMessage) {

    errorMessage.textContent = "";

  }

}


// ============================================================
// 7. VALIDATE FORM
// ============================================================

function validateForm() {

  // We start by assuming the form is valid.
  let isValid = true;


  // ========================================================
  // CARDHOLDER NAME
  // ========================================================

  if (cardHolderNameInput.value.trim() === "") {

    showError(
      cardHolderNameInput,
      "Can't be blank"
    );

    isValid = false;

  } else {

    clearError(cardHolderNameInput);

  }


  // ========================================================
  // CARD NUMBER
  // ========================================================

  const cardNumberValue =
    cardNumberInput.value.replace(/\s/g, "");


  if (cardNumberValue === "") {

    showError(
      cardNumberInput,
      "Can't be blank"
    );

    isValid = false;

  }

  else if (!/^\d+$/.test(cardNumberValue)) {

    showError(
      cardNumberInput,
      "Wrong format, numbers only"
    );

    isValid = false;

  }

  else if (cardNumberValue.length !== 16) {

    showError(
      cardNumberInput,
      "Card number must be 16 digits"
    );

    isValid = false;

  }

  else {

    clearError(cardNumberInput);

  }


  // ========================================================
  // EXPIRATION MONTH
  // ========================================================

  const month =
    cardExpMonthInput.value.trim();


  if (month === "") {

    showError(
      cardExpMonthInput,
      "Can't be blank"
    );

    isValid = false;

  }

  else if (!/^\d{2}$/.test(month)) {

    showError(
      cardExpMonthInput,
      "Wrong format"
    );

    isValid = false;

  }

  else if (
    Number(month) < 1 ||
    Number(month) > 12
  ) {

    showError(
      cardExpMonthInput,
      "Invalid month"
    );

    isValid = false;

  }

  else {

    clearError(cardExpMonthInput);

  }


  // ========================================================
  // EXPIRATION YEAR
  // ========================================================

  const year =
    cardExpYearInput.value.trim();


  if (year === "") {

    showError(
      cardExpYearInput,
      "Can't be blank"
    );

    isValid = false;

  }

  else if (!/^\d{2}$/.test(year)) {

    showError(
      cardExpYearInput,
      "Wrong format"
    );

    isValid = false;

  }

  else {

    clearError(cardExpYearInput);

  }


  // ========================================================
  // CVC
  // ========================================================

  const cvc =
    cardCvcInput.value.trim();


  if (cvc === "") {

    showError(
      cardCvcInput,
      "Can't be blank"
    );

    isValid = false;

  }

  else if (!/^\d+$/.test(cvc)) {

    showError(
      cardCvcInput,
      "Wrong format, numbers only"
    );

    isValid = false;

  }

  else if (cvc.length !== 3) {

    showError(
      cardCvcInput,
      "CVC must be 3 digits"
    );

    isValid = false;

  }

  else {

    clearError(cardCvcInput);

  }


  // ========================================================
  // RETURN RESULT
  // ========================================================

  return isValid;

}


// ============================================================
// 8. SUBMIT FORM
// ============================================================

form.addEventListener("submit", (e) => {

  // Stop browser from refreshing
  e.preventDefault();


  // Validate everything
  const isValid =
    validateForm();


  // Only continue if everything is valid
  if (isValid) {

    // Hide the input fields
    cardDetails.style.display =
      "none";


    // Hide Confirm button
    submitBtn.style.display =
      "none";


    // Show completed state
    completedState.style.display =
      "block";

  }

});


// ============================================================
// 9. CONTINUE BUTTON
// ============================================================

continueBtn.addEventListener("click", () => {

  // Reset all inputs
  form.reset();


  // Reset card display
  cardHolderName.textContent =
    "JANE APPLESEED";

  cardNumber.textContent =
    "0000 0000 0000 0000";

  cardExpiry.textContent =
    "00/00";

  cardCvc.textContent =
    "000";


  // Remove all error states
  clearError(cardHolderNameInput);
  clearError(cardNumberInput);
  clearError(cardExpMonthInput);
  clearError(cardExpYearInput);
  clearError(cardCvcInput);


  // Show the form again
  cardDetails.style.display =
    "block";


  // Show Confirm button again
  submitBtn.style.display =
    "block";


  // Hide completed state
  completedState.style.display =
    "none";

});