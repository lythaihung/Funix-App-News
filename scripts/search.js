'use strict';
//variable declaration
const inputSearch = document.getElementById('input-query');
const inputSearchBtn = document.getElementById('btn-submit');
const pageNumbers = document.querySelector('.pagination ');
const pageNumberBtn = document.querySelector('.page-num');
const newsContainer = document.getElementById('news-container');
// const previousBtn = document.getElementById('btn-prev');
// const nextBtn = document.getElementById('btn-next');

let page;
let resultSearchArr = [];
let newsPerPage =
  getFromStorage('user') && getFromStorage('user').newsPerPage
    ? Number(getFromStorage('user').newsPerPage)
    : 5;

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
  const previousBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
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

//get API to render news use async function search by Keywords
const getNews = function (search) {
  //validate input
  if (search) {
    //request API
    fetch(
      `https://newsapi.org/v2/everything?q=${search}&sortBy=publishedAt&apiKey=d710676f62b643fba2b7a1e735a5a5d2`
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
        if (data.totalResults === 0) {
          alert("Don't have news match with your keyword");
          return;
        }
        resultSearchArr = data.articles;
        page = 1;
        getPages(resultSearchArr, newsPerPage);
        renderPage(resultSearchArr, page, newsPerPage);
      })
      //catch errors if it's appear
      .catch((err) => alert(`Problem: \n${err}`));
  } else return alert('PLease fill the keywords to search!');
};
//get API to render page number
const getPages = function (array, newsPerPage) {
  if (!array) return;
  //empty old li
  pageNumbers.innerHTML = '';
  //prev btn
  pageNumbers.insertAdjacentHTML(
    'beforeEnd',
    `<li class="page-item">
    <button class="page-link" href="#" id="btn-prev">Previous</button>
    </li>`
  );
  //insert page list base on array
  const pages = Math.ceil(array.length / newsPerPage);
  //create a loop in order to render page list
  for (let i = 1; i <= pages; i++) {
    pageNumbers.insertAdjacentHTML(
      'beforeEnd',
      `<li class="page-item">
        <a class="page-link page-num">${i}</a>
        </li>`
    );
  }
  //next btn
  pageNumbers.insertAdjacentHTML(
    'beforeEnd',
    `<li class="page-item">
        <button class="page-link" id="btn-next">Next</button>
        </li>`
  );
};
//get render others page news by click number page
const getPageByNumberPage = function (e) {
  if (resultSearchArr.length === 0 || !e.target.classList.contains('page-link'))
    return;

  newsContainer.innerHTML = '';
  if (Number(e.target.textContent))
    (page = Number(e.target.textContent)) &&
      renderPage(resultSearchArr, page, newsPerPage);
  else {
    if (e.target.textContent === 'Next') {
      renderPage(resultSearchArr, page + 1, newsPerPage);
      page++;
    } else {
      renderPage(resultSearchArr, page - 1, newsPerPage);
      page--;
    }
  }
};
//
const showResultSearch = function (e) {
  e.preventDefault();
  newsContainer.innerHTML = '';
  getNews(inputSearch.value);
  //   console.log('ok'); //test
};

//revoke function - Event handle
//Event handle: click page to render new newspage
pageNumbers.addEventListener('click', getPageByNumberPage);
//Event handle: click search to render result news have keywords
inputSearchBtn.addEventListener('click', showResultSearch);
