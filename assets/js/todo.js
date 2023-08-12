//유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
// delete버튼을 누르면 할 일이 삭제된다.
// check버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
// 1. check 버튼을 클릭하는 순간 true -> false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안 끝난걸로 간주하고 그대로

// 진행 중 끝남 탭은 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.task-tabs div');
let mode = 'all';
let taskList = [];
let filterList = [];
let taskIndex = 1;

addButton.addEventListener('click', addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

function addTask() {
  const taskContent = taskInput.value.trim();
  if (taskContent === '') {
    return;
  }
  let task = {
    id: randomIDGenerator(),
    taskContent: taskInput.value.trim(),
    isCompleted: false,
    taskIndex: taskIndex,
  };
  taskList.push(task);
  taskIndex++;
  render();
  taskInput.value = '';
}

function render() {
  let list = [];
  if (mode === 'all') {
    list = taskList;
  } else if (mode === 'ongoing' || mode === 'done') {
    list = filterList;
  }
  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isCompleted === true) {
      resultHTML += `<div class="task">
              <div class="task-done">${list[i].taskIndex}. ${list[i].taskContent}</div>
              <div>
                <button onClick="toggleCompleted('${list[i].id}')">Check</button>
                <button onClick="deleteTask('${list[i].id}')">Delete</button>
              </div>
            </div>`;
    } else {
      resultHTML += `<div class="task">
              <div>${list[i].taskIndex}. ${list[i].taskContent}</div>
              <div>
                <button onClick="toggleCompleted('${list[i].id}')">Check</button>
                <button onClick="deleteTask('${list[i].id}')">Delete</button>
              </div>
            </div>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleCompleted(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isCompleted = !taskList[i].isCompleted;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];

  document.getElementById('under-line').style.width =
    event.target.offsetWidth + 'px';
  document.getElementById('under-line').style.top =
    event.target.offsetTop + event.target.offsetHeight + 'px';
  document.getElementById('under-line').style.left =
    event.target.offsetLeft + 'px';

  if (mode === 'all') {
    filterList = taskList;
  } else if (mode === 'ongoing') {
    filterList = taskList.filter((task) => !task.isCompleted);
  } else if (mode === 'done') {
    filterList = taskList.filter((task) => task.isCompleted);
  }

  render();
}

function randomIDGenerator() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
