'use strict';
//////////////////////////////////////////////////////////////////////
//variable declaration
const inputFirstNameToRegister = document.getElementById('input-firstname');
const inputLastNameToRegister = document.getElementById('input-lastname');
const inputUsernameToRegister = document.getElementById('input-username');
const inputPasswordToRegister = document.getElementById('input-password');
const inputConfirmPasswordToRegister = document.getElementById(
  'input-password-confirm'
);

const registerBtn = document.getElementById('btn-submit');

//////////////////////////////////////////////////////////////////////
//callback function
//register new user and it on localstorage
const registerNewUser = function (e) {
  e.preventDefault();
  const userArr = getFromStorage('userArr') ? getFromStorage('userArr') : [];
  const checkRegisterInput = [];
  if (userArr.find((user) => inputUsernameToRegister.value === user.username))
    checkRegisterInput.push('Username is currently not available!');
  if (inputConfirmPasswordToRegister.value.length <= 8)
    checkRegisterInput.push('Password have to more than 8 character!');
  if (inputConfirmPasswordToRegister.value !== inputPasswordToRegister.value)
    checkRegisterInput.push('Confirm password is not correct!');

  if (
    RegisterCheckValidate(
      inputFirstNameToRegister,
      inputLastNameToRegister,
      inputUsernameToRegister,
      inputPasswordToRegister,
      inputConfirmPasswordToRegister
    ) &&
    checkRegisterInput.length === 0
  ) {
    userArr.push(
      new User(
        inputFirstNameToRegister.value,
        inputLastNameToRegister.value,
        inputUsernameToRegister.value,
        inputPasswordToRegister.value
      )
    );
    saveToStorage('userArr', userArr);
  } else return alert(`${checkRegisterInput.join('\n')}\nPlease try again...`);
  return (window.location.href = '../pages/login.html');
};
//check validate
const RegisterCheckValidate = function (
  FirstName,
  LastName,
  Username,
  Password,
  ConfirmPassword
) {
  let checkValidateInput = false;
  const checkEmptyInput = [];
  !FirstName.value && checkEmptyInput.push('First Name');
  !LastName.value && checkEmptyInput.push('Last Name');
  !Username.value && checkEmptyInput.push('Username');
  !Password.value && checkEmptyInput.push('Password');
  !ConfirmPassword.value && checkEmptyInput.push('Confirm Password');
  if (checkEmptyInput.length === 1)
    alert(`Your ${checkEmptyInput.join('')} is empty \nPlease check again!!!`);
  else if (checkEmptyInput.length > 1)
    alert(`${checkEmptyInput.join(', ')} are empty \nPlease check again!!!`);
  else return (checkValidateInput = true);
};

///////////////////////////////////////////////////////////////////////
//handle event
//handle event: click btn to register new user
registerBtn.addEventListener('click', registerNewUser);
