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
const rows=document.getElementsByTagName('tr')

function addStyles() {
  for (let i = 1; i < rows.length; i++) {
    if (i % 2 === 0) {
      // Remove '.style' before classList
      rows[i].classList.add('table-primary');
    } else {
      // Fixed typo: 'table-secondry' to 'table-secondary'
      rows[i].classList.add('table-secondary');
    }
  }
}


let todos = JSON.parse(localStorage.getItem("myTodoTask")) || [];
let filteredTodos = [...todos];

let searchTimer = null;
const delay = 2000; 


let currentPage = 1;
const itemsPerPage = 10;

function getPaginatedTodos() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTodos.slice(start, end);
}

function updatePaginationUI() {
    const totalPages = Math.ceil(filteredTodos.length / itemsPerPage) || 1;
    pageInfo.innerHTML = `Page  <span class="current-page-number">${currentPage}</span> of ${totalPages}`;
   
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function render() {
    showTable();
    showGrid();
    updatePaginationUI();
    addStyles();
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

// function showTable() {
//     mainTable.innerHTML = "";

//     const pageTodos = getPaginatedTodos();

//     mainTable.innerHTML = pageTodos.map((item, i) => `
//         <tr data-uid="${item.id}">
//             <td>${(currentPage - 1) * itemsPerPage + i + 1}</td>
//             <td>${item.title}</td>
//             <td>${item.description}</td>
//             <td>${item.location}</td>
//             <td>${item.email}</td>
//             <td>${item.status}</td>
//             <td>${item.category}</td>
//             <td>${item.priority}</td>
//             <td>${item.time}</td>
//             <td class="edit"><i class="fa-solid fa-pen-to-square"></i></td>
//             <td class="delete"><i class="fa-solid fa-trash-can"></i></td>
//         </tr>
//     `).join("");
// }

function showTable() {
    mainTable.innerHTML = "";

    const pageTodos = getPaginatedTodos();

    if (filteredTodos.length === 0) {
        mainTable.innerHTML = `
            <tr>
                <td colspan="11" style="text-align:center; font-weight:bold;">
                    Todos not found for this title
                </td>
            </tr>
        `;
        return;
    }

    mainTable.innerHTML = pageTodos.map((item, i) => `
        <tr class="border-top" data-uid="${item.id}">
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
    // document.querySelector('tr').style.marginBlock="20px"
}


// function showGrid() {
//     listDiv.innerHTML = "";

//      const pageTodos = getPaginatedTodos();

//     listDiv.innerHTML = pageTodos.map((item, i) => `
//         <div class="grid-box" data-uid="${item.id}">
//             <strong>${(currentPage - 1) * itemsPerPage + i + 1}. ${item.title}</strong>
//             <p>${item.description}</p>
//             <div class="grid-edit-del-buttons">
//             <div class="edit"><i class="fa-solid fa-pen-to-square"></i></div>
//             <div class="delete"><i class="fa-solid fa-trash-can"></i></div>
//             </div>
//         </div>
//     `).join("");
// }

function showGrid() {
    listDiv.innerHTML = "";

    const pageTodos = getPaginatedTodos();

    if (filteredTodos.length === 0) {
        listDiv.innerHTML = `<p><strong>Todos not found for this title</strong></p>`;
        return;
    }

    listDiv.innerHTML = pageTodos.map((item, i) => `
        <div class="grid-box border" data-uid="${item.id}">
            <strong>${(currentPage - 1) * itemsPerPage + i + 1}. ${item.title}</strong>
            <p>${item.description}</p>
            <div class="grid-edit-del-buttons">
                <div class="edit"><i class="fa-solid fa-pen-to-square"></i></div>
                <div class="delete"><i class="fa-solid fa-trash-can"></i></div>
            </div>
        </div>
    `).join("");
}


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


deletePopup.addEventListener("click", (e) => {
    if (e.target.classList.contains("yes")) {
        const delItem = document.querySelector(".del");
        const id = delItem.dataset.uid;

        todos = todos.filter(t => t.id !== id);
        filteredTodos = filteredTodos.filter(t => t.id !== id);

        localStorage.setItem("myTodoTask", JSON.stringify(todos));
        render();
    }

    if (e.target.classList.contains("no")) {
        document.querySelector(".del")?.classList.remove("del");
    }
});


closeFilterIcon.addEventListener("click", (e) => {
     todo.classList.toggle('filter')
    });

    selectStatusFilterOption.addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "all") {
        filteredTodos = [...todos];
    } else {
        filteredTodos = todos.filter(item => item.status === selectedValue);
    }

    currentPage = 1;
    render();
    todo.classList.toggle('filter');
});

// function handleChange(value) {
//     value = value.toLowerCase().trim();

//     if (value === "") {
//         filteredTodos = [...todos];
//     } else {
//         filteredTodos = todos.filter(item =>
//             item.title.toLowerCase().startsWith(value)
//         );
//     }

//     currentPage = 1;
//     render();
// }

function handleChange(value) {
    value = value.toLowerCase().trim();

    clearTimeout(searchTimer);

    searchTimer = setTimeout(() => {
        if (value === "") {
            filteredTodos = [...todos];
        } else {
            filteredTodos = todos.filter(item =>
                item.title.toLowerCase().includes(value)
            );
        }

        currentPage = 1;
        render();
    }, delay);
}
