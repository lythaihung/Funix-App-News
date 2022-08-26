'use strict';
//variable declaration
const user = getFromStorage('user') ? getFromStorage('user') : null;

const logoutBtn = document.getElementById('btn-logout');
const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');

//Condition display welcome look
if (!user) {
  mainContent.style = 'display:none';
} else {
  loginModal.style = 'display:none';
  welcomeMessage.textContent = `Welcome ${user.firstName}`;
}

//callback function
const deleteCurrentUser = function () {
  const userArr = getFromStorage('userArr');
  userArr.splice(
    userArr.findIndex((arr) => user.username === arr.username),
    1
  );
  userArr.push(user);

  saveToStorage('userArr', userArr);
  localStorage.removeItem('user');
  displayMainContent();
  window.location.href = '../pages/login.html';
};
const displayMainContent = function () {
  loginModal.style = '';
  mainContent.style = 'display:none';
};
//Event handle: click btn >> display login main content and delete user in local
logoutBtn.addEventListener('click', deleteCurrentUser);
//test
// console.log(Boolean(null));
