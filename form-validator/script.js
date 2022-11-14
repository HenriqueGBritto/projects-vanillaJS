/*  -------------- Project description -------------------
Here we have a form with four fields: Username, email, password and confirm password; and a submit button.

The focus of the project is to create a validation within the javascript.

Initially, there are 2 functions called 'showError() and showSuccess() that works like this:

- Both functions receive 2 parameters (input, message);

- Inside each function, there are two constants, one called 'form control', which is the input parameter parent element(div with 'formControl' class), and other called 'small', which is the small tag within the formControl div;

- When the showError function runs, it adds the "error" class (this class changes de input border color to a tone of red) to the formControl div and gives the small tag innerText the value received in the 'message' parameter;

- When the showSuccess function runs, it removes the 'error' class from the formControl div (in case it haves, due to a previous error), and adds the 'success' class (this class changes de input border color to a tone of green) to the formControl div.

Here I made the validation in two ways:

- The first one was way simpler than the second:
 - It consists in an event listener in the submit button;
 - Inside the event listener, there is an if statement to each input field;
 - The if statement checks if the input.value is equals to "";
    - If it is, then the showError() function will run;
    - If it is not, the showSuccess() function will run;
 - To check if the email input is valid, the checkEmail() was used;
    - the function receives an input;
    - inside the function, the is a 're' constant, which is a regular expression that will be used to check if the email matches the pattern specified in the regex
    - To test if the email matches, there is an if statement that passes the regular expression and uses the test() method to check if the email matches the regex pattern, if it matches, the showSuccess() function will run, if not, the showError() function will run.

- In order to make the validator more professional and scalable, the code were refactored and a some things were changed:
    - checkRequired() function created to check if the input fields are empty. If they do, showError() function will run, if not, showSuccess() will run; 
    - In username and password fields, there is a minimum and maximum number of characters needed to both, so the checkLength() function was created. It checks if both the username and the password meet the requirements;
    - checkPasswordsMatch() function was created
*/

const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

//Functions

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.classList.add("error");
  small.innerText = message;
}

//show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
  formControl.classList.add("success");
}

//Get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check if email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters long`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must have a ${max} characters max`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

//Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

//Event listeners
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (username.value === "") {
//     showError(username, "Username is required");
//   } else {
//     showSuccess(username);
//   }
//   if (email.value === "") {
//     showError(email, "Email is required");
//   } else if (!isValidEmail(email.value)) {
//     showError(email, "Email is not valid");
//   } else {
//     showSuccess(email);
//   }
//   if (password.value === "") {
//     showError(password, "Password is required");
//   } else {
//     showSuccess(password);
//   }
//   if (password2.value === "") {
//     showError(password2, "Password 2 is required");
//   } else {
//     showSuccess(password2);
//   }
// });
