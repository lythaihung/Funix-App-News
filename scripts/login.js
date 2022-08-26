'use strict';
//variable declaration
const usernameLogin = document.getElementById('input-username');
const passwordLogin = document.getElementById('input-password');
const loginBtn = document.getElementById('btn-submit');

const userArr = getFromStorage('userArr') ? getFromStorage('userArr') : [];
//callback fn
const submitLogin = function (e) {
  e.preventDefault();
  if (checkLoginValidate(usernameLogin.value, passwordLogin.value)) {
    saveToStorage(
      'user',
      userArr.find((user) => usernameLogin.value === user.username)
    );
    window.location.href = '../index.html';
  } else return;
};

const checkLoginValidate = function (username, password) {
  let checkLoginCondition = [];
  !username && checkLoginCondition.push('Username is empty');
  !password && checkLoginCondition.push('Password is empty');
  if (checkLoginCondition.length > 0) {
    alert(`Have some mistake:\n${checkLoginCondition.join('\n')}`);
  } else {
    !userArr.find((user) => username === user.username) &&
      checkLoginCondition.push("Username haven't registered");
    if (checkLoginCondition.length > 0)
      alert(`Have some mistake:\n${checkLoginCondition.join('\n')}`);
    else {
      userArr.find((user) => user.username === username).password !==
        password && checkLoginCondition.push('Password is wrong');
      if (checkLoginCondition.length > 0)
        alert(`Have some mistake:\n${checkLoginCondition.join('\n')}`);
      else return true;
    }
  }
};

//Event handle
loginBtn.addEventListener('click', submitLogin);
