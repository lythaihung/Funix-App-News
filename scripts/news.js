'use strict';
//Your API key is: d710676f62b643fba2b7a1e735a5a5d2
//variable
const newsContainer = document.getElementById('news-container');
const previousBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const pageNumberBtn = document.querySelector('.page-num');
const pageNumbersBtn = document.querySelector('.page-item');
const pageNumbers = document.querySelector('.pagination ');

let page = 1;
// assign to get settings by user
let newsPerPage =
  getFromStorage('user') && getFromStorage('user').newsPerPage
    ? Number(getFromStorage('user').newsPerPage)
    : 5;
let newsCategory =
  getFromStorage('user') && getFromStorage('user').category
    ? getFromStorage('user').category
    : 'General';

//callback function
//render news each page
const renderNews = function (array) {
  array.forEach((news) =>
    newsContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="row mb-4 border-news">
      <div class="col-4 p-0">
      <img class='m-0 p-0' src='${
        news.urlToImage ? news.urlToImage : ''
      }' width='100%' height='100%'>
      </div>
      <div class="col-8 pb-3 pt-3">
      <h4>${news.title ? news.title : ''}</h4>
      <p>${news.description ? news.description : ''}</p>
      <button type="button" class="btn btn-primary" id="btn-view-news">View</button>
      </div>
      </div>`
    )
  );
};
// render all news from selecting page
const renderPage = function (array, page, newsPerPage) {
  //hide previous when at page 1
  page === 1 ? (previousBtn.style = 'display:none') : (previousBtn.style = '');
  //hide next when at lastpage
  page === Math.ceil(array.length / newsPerPage)
    ? (nextBtn.style = 'display:none')
    : (nextBtn.style = '');
  //render news from this page
  renderNews(
    array.slice(
      newsPerPage * (page - 1),
      newsPerPage + newsPerPage * (page - 1)
    )
  );
};

//get API to render news use async function
const getNews = function (category) {
  //request API
  fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=d710676f62b643fba2b7a1e735a5a5d2`
  )
    .then((res) => {
      //if have errors that alert errors
      if (!res.ok) {
        throw new Error(
          alert(
            `Somethings wrong!!!\nPlease check again.\nDescription: ${res.status}`
          )
        );
      }
      //return response by json file
      return res.json();
    })
    //render data of response as question
    .then((data) => {
      const newsArr = data.articles;
      if (newsArr.length === 0) return;
      getPages(newsArr, newsPerPage);
      renderPage(newsArr, page, newsPerPage);
      saveToStorage('newsArr', newsArr);
    })
    //catch errors if it's appear
    .catch((err) => alert(err));
};
//get API to render page number
const getPages = function (array, newsPerPage) {
  //insert page list base on array
  if (array) {
    pageNumberBtn.parentNode.removeChild(pageNumberBtn);
    const pages = Math.ceil(array.length / newsPerPage);
    //create a loop in order to render page list
    for (let i = 1; i <= pages; i++) {
      nextBtn.parentNode.insertAdjacentHTML(
        'beforeBegin',
        `<li class="page-item">
        <a class="page-link" id="page-num">${i}</a>
      </li>`
      );
    }
  } else return;
};
//get render others page news by click number page
const getPageByNumberPage = function (e) {
  const dataArr = getFromStorage('newsArr');
  if (!e.target.classList.contains('page-link')) return;
  newsContainer.innerHTML = '';
  if (Number(e.target.textContent))
    (page = Number(e.target.textContent)) &&
      renderPage(dataArr, page, newsPerPage);
  else {
    if (e.target.textContent === 'Next') {
      renderPage(dataArr, page + 1, newsPerPage);
      page++;
    } else {
      renderPage(dataArr, page - 1, newsPerPage);
      page--;
    }
  }
};

//revoke function - Event handle
//render at first click to News
getNews(newsCategory);
//Event handle: click page to render new newspage
pageNumbers.addEventListener('click', getPageByNumberPage);
