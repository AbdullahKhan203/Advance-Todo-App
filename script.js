const mainTable = document.querySelector(".main-table");
const deletePopup = document.querySelector(".delete-popup");
const todo = document.querySelector(".todo");
const listDiv = document.querySelector(".list-div");
const prevButton=document.querySelector(".prev");
const nextButton=document.querySelector(".next");
const pageNumbers=Math.ceil(JSON.parse(localStorage.getItem("myTodoTask")).length/10);
console.log("pageNumbers",pageNumbers);


let todos = JSON.parse(localStorage.getItem("myTodoTask")) || [];

function listGrid() {
    todo.classList.toggle("grid");
}

function showTable() {
    mainTable.innerHTML = "";

    mainTable.innerHTML = todos.map((item, i) => `
        <tr data-uid="${item.id}">
            <td>${i + 1}</td>
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

    listDiv.innerHTML = todos.map((item, i) => `
        <div class="grid-box" data-uid="${item.id}">
            <strong>${i + 1}. ${item.title}</strong>
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
