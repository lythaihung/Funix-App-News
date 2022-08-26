'use strict';
//declare class Task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
//support for check isDone function
//variable declaration
const addTodoBtn = document.getElementById('btn-add');
const inputTask = document.getElementById('input-task');
const taskContent = document.getElementById('todo-list');
const closeBtn = document.querySelector('.close');
const closeBtns = document.querySelectorAll('.close');
//array include instances of task
const user = getFromStorage('user') ? getFromStorage('user') : [];
const todoArr =
  getFromStorage('user') && user.todoArr ? JSON.parse(user.todoArr) : [];

//Callback function
//
const createNewTask = function (e) {
  e.preventDefault();
  //isDone true is done & false is not yet done
  todoArr.push(new Task(inputTask.value, user.username, false));
  renderTask(todoArr, user.username);
  user.todoArr = JSON.stringify(todoArr);
  saveToStorage('user', user);
  inputTask.value = '';
};
//render task from Local storage
const renderTask = function (array, username) {
  taskContent.innerHTML = ''; //delete old task
  //filter array matching with current user
  array
    .filter((task) => {
      username === task.owner;
      return task;
    })
    //loop to render tasks
    .forEach((task) => {
      taskContent.insertAdjacentHTML(
        'beforeend',
        `<li class="${task.isDone === true ? 'checked' : ''}">${
          task.task
        }<span class="close">×</span></li>`
      );
    });
};
//function change display task  isDone or notDone
const checkIsDoneTask = function (e) {
  //asign a varible get a class status
  const isDone = e.target.classList.toggle('checked');
  //asign a varible to get target text
  const eTargetText = e.target.textContent.slice(0, -1);
  //solve array with isDone update
  todoArr.map((task) => {
    if (eTargetText === task.task && user.username === task.owner) {
      task.isDone = isDone;
      return task;
    } else return task;
  });
  //render & save to local
  renderTask(todoArr, user.username);
  user.todoArr = JSON.stringify(todoArr);
  saveToStorage('user', user);
};
//Delete task from local and render update
const deleteTask = function (e) {
  // effect on X btn
  if (!e.target.classList.contains('close')) return;
  // asign a varible to get target text
  const eTargetText = e.target.parentNode.textContent.slice(0, -1);
  //use target text to find object need to delete
  todoArr.splice(
    todoArr.findIndex((task) => eTargetText === task.task),
    1
  );
  //render & save to local
  renderTask(todoArr, user.username);
  user.todoArr = JSON.stringify(todoArr);
  saveToStorage('user', user);
};

//Revoke function - Event handle
//calling function: render task when user login
renderTask(todoArr, user.username);
//Event handle : make a new task
addTodoBtn.addEventListener('click', createNewTask);
//Event handle : click task to change isDone status
taskContent.addEventListener('click', checkIsDoneTask);
//Event handle : click X to delete task
taskContent.addEventListener('click', deleteTask);
