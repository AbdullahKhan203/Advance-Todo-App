const mainTable = document.querySelector(".main-table");
const deletePopup = document.querySelector(".delete-popup");
const filterPopup = document.querySelector(".filter-popup");
const todo = document.querySelector(".todo");
const listDiv = document.querySelector(".list-div");
const closeFilterIcon = document.querySelector(".close-filter-icon");
const selectStatusFilterOption = document.querySelector(".select-status-filter-options");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("page-info");


let todos = JSON.parse(localStorage.getItem("myTodoTask")) || [];

let currentPage = 1;
const itemsPerPage = 10;

function getPaginatedTodos() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return todos.slice(start, end);
}


function updatePaginationUI() {
    const totalPages = Math.ceil(todos.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function render() {
    showTable();
    showGrid();
    updatePaginationUI();
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        render();
    }
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(todos.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        render();
    }
});

window.addEventListener("DOMContentLoaded", render);


function listGrid() {
    todo.classList.toggle("grid");
}
function filter() {
    todo.classList.toggle("filter");
}

function showTable() {
    mainTable.innerHTML = "";

    const pageTodos = getPaginatedTodos();

    mainTable.innerHTML = pageTodos.map((item, i) => `
        <tr data-uid="${item.id}">
            <td>${(currentPage - 1) * itemsPerPage + i + 1}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>${item.location}</td>
            <td>${item.email}</td>
            <td>${item.status}</td>
            <td>${item.category}</td>
            <td>${item.priority}</td>
            <td>${item.time}</td>
            <td class="edit"><i class="fa-solid fa-pen-to-square"></i></td>
            <td class="delete"><i class="fa-solid fa-trash-can"></i></td>
        </tr>
    `).join("");
}

function showGrid() {
    listDiv.innerHTML = "";

     const pageTodos = getPaginatedTodos();

    listDiv.innerHTML = pageTodos.map((item, i) => `
        <div class="grid-box" data-uid="${item.id}">
            <strong>${(currentPage - 1) * itemsPerPage + i + 1}. ${item.title}</strong>
            <p>${item.description}</p>
            <div class="grid-edit-del-buttons">
            <div class="edit"><i class="fa-solid fa-pen-to-square"></i></div>
            <div class="delete"><i class="fa-solid fa-trash-can"></i></div>
            </div>
        </div>
    `).join("");
}

/* INITIAL RENDER */
window.addEventListener("DOMContentLoaded", () => {
    showTable();
    showGrid();
});

/* EDIT & DELETE HANDLING */
todo.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".delete");
    const editBtn = e.target.closest(".edit");

    if (delBtn) {
        delBtn.closest("[data-uid]").classList.add("del");
    }
     
    if (editBtn) {
        const id = editBtn.closest("[data-uid]").dataset.uid;
        window.location.href = `GetData.html?id=${encodeURIComponent(id)}`;
    }
});

/* DELETE CONFIRMATION */
deletePopup.addEventListener("click", (e) => {
    if (e.target.classList.contains("yes")) {
        const delItem = document.querySelector(".del");
        const id = delItem.dataset.uid;

        todos = todos.filter(t => t.id !== id);
        localStorage.setItem("myTodoTask", JSON.stringify(todos));

        showTable();
        showGrid();
    }

    if (e.target.classList.contains("no")) {
        document.querySelector(".del")?.classList.remove("del");
    }
});
closeFilterIcon.addEventListener("click", (e) => {

     todo.classList.toggle('filter')
     
    });
selectStatusFilterOption.addEventListener('change', (event) => {
        // Get the selected value
        const selectedValue = event.target.value;
        console.log('Option selected:', selectedValue);
                todos=selectedValue == "all" ? JSON.parse(localStorage.getItem('myTodoTask')) : JSON.parse(localStorage.getItem('myTodoTask')).filter(item=>item.status==selectedValue)
                render();
        // You can also get the selected option element's text
        const selectedIndex = event.target.selectedIndex;
        const selectedOptionText = event.target.options[selectedIndex].text;
        console.log('Selected text:', selectedOptionText);
        todo.classList.toggle('filter')
});
