'use strict';
//Variable declaration
const settingNewsPerPage = document.getElementById('input-page-size');
const settingNewsCategory = document.getElementById('input-category');
const saveSettingBtn = document.getElementById('btn-submit');

const user = getFromStorage('user') ? getFromStorage('user') : null;

//callback function
//save settings to Local
const saveSetting = function (e) {
  if (!user) return alert('You need to login to use setting function!');
  e.preventDefault();
  user.newsPerPage = settingNewsPerPage.value;
  user.category = settingNewsCategory.value;
  saveToStorage('user', user);
  window.location.href = '../pages/news.html';
};

//Event handle
//Event handle: click savesetting to save number page and category
saveSettingBtn.addEventListener('click', saveSetting);
