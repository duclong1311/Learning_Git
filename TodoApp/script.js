const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = [];
let currentTask = {};

const addOrUpdateTask = () => {
  //tìm kiếm một phần tử trong mảng taskData đảm bảo duy nhất.
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  //nếu không tìm thấy trong taskData thì thêm vào taskObj vào.
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  }

  updateTaskContainer()
  reset()
};

//Hiển thị task đã nhập lên màn hình chính.
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  //Sử dụng forEach vào mảng taskData. Array destructuring chia làm 4 thuộc tính và hiển thị ra màn hình.
  taskData.forEach(
    ({ id, title, date, description }) => {
      (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
        </div>
      `)
    }
  );
};

//Delete task
const deleteTask = (buttonEl) => {

}

//Clean data vừa nhập.
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

//Thêm task mới
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

//Discard unsaved changes if input form contain any datas.
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  if (formInputsContainValues) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

//Cancel discard unsaved changes
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

//Confirm discard unsaved changes
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

//Add new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});