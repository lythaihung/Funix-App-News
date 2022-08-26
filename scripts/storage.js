'use strict';
//storage data to Localstorage
const saveToStorage = function (key, value) {
  if (!localStorage.getItem(key))
    localStorage.setItem(key, JSON.stringify(value));
  else {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }
};
// saveToStorage('test', [0]);
//Revoke data from Localstorage
const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};
