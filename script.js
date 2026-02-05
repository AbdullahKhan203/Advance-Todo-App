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
// const asendingBtn = document.querySelector(".asending-btn");
// const descendingBtn = document.querySelector(".descending-btn");
// const asendingDescendingDiv = document.querySelector(".asend-desend-div");

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
    showAsenDesBtn();
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
            <td class="checkbox"><input type="checkbox" name="" id=""></td>
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

// function showGrid() {
//     listDiv.innerHTML = "";

//     const pageTodos = getPaginatedTodos();

//     if (filteredTodos.length === 0) {
//         listDiv.innerHTML = `<p><strong>Todos not found for this title</strong></p>`;
//         return;
//     }

//     listDiv.innerHTML = pageTodos.map((item, i) => `
//         <div class="grid-box border" data-uid="${item.id}">
        
//             <strong>${(currentPage - 1) * itemsPerPage + i + 1}. ${item.title}</strong>
//             <p>${item.description}</p>
//             <div class="grid-edit-del-buttons">
//                 <div class="edit"><i class="fa-solid fa-pen-to-square"></i></div>
//                 <div class="delete"><i class="fa-solid fa-trash-can"></i></div>
//                 <div class="checkbox"><input type="checkbox" name="" id=""></div>
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
                <div class="checkbox">
                    <!-- Add data-uid here for checkbox -->
                    <input type="checkbox" data-uid="${item.id}">
                </div>
            </div>
        </div>
    `).join("");
}


todo.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".delete");
    const editBtn = e.target.closest(".edit");
     const asendingBtn = e.target.closest(".asending-btn");
    const descendingBtn = e.target.closest(".descending-btn");


    if (delBtn) {
        // delBtn.closest("[data-uid]").classList.add("del");
        document.querySelector('.main-container').classList.toggle("del")
        console.log("delete button clicked");
    }
     
    if (editBtn) {
        const id = editBtn.closest("[data-uid]").dataset.uid;
        window.location.href = `GetData.html?id=${encodeURIComponent(id)}`;
    }

    if (asendingBtn) {
       console.log("asending btn licked");
       
    }
    if (descendingBtn) {
        console.log("descending btn licked");
    }
});


// deletePopup.addEventListener("click", (e) => {
//     if (e.target.classList.contains("yes")) {
//         const delItem = document.querySelector(".del");
//         const id = delItem.dataset.uid;
         
//         todos = todos.filter(t => t.id !== id);
//         filteredTodos = filteredTodos.filter(t => t.id !== id);

//         localStorage.setItem("myTodoTask", JSON.stringify(todos));
//         render();
//     }

//     if (e.target.classList.contains("no")) {
//         document.querySelector(".del")?.classList.remove("del");
//     }
// });


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



function deleteMultiple() {
    console.log("delete multiple applied");

    // Toggle the del class for UI
    document.querySelector('.main-container').classList.toggle('del');

    // Select all checkboxes in both table and grid
    const checkboxInputs = document.querySelectorAll('.checkbox input[type="checkbox"]');

    let checkedInputfieldsIds = [];

    checkboxInputs.forEach(cb => {
        if (cb.checked) {
            const uid = cb.dataset.uid || cb.closest('[data-uid]').dataset.uid;
            checkedInputfieldsIds.push(uid);
        }
    });

    console.log("checkedInputfieldsIds", checkedInputfieldsIds);

    if (checkedInputfieldsIds.length === 0) return;

    let todos = JSON.parse(localStorage.getItem("myTodoTask")) || [];

    let remainingTodos = todos.filter(todo => !checkedInputfieldsIds.includes(todo.id));

    localStorage.setItem("myTodoTask", JSON.stringify(remainingTodos));

    render();
    window.location.reload();
}



function showAsenDesBtn() {
    let allHeadings = document.querySelectorAll('th');

    for (let i = 1; i < allHeadings.length-2; i++) {

        // prevent multiple inserts
        if (allHeadings[i].querySelector('.asend-desend-div')) continue;

        allHeadings[i].insertAdjacentHTML(
            'beforeend',
            `<div class="asend-desend-div">
                <button class="descending-btn">▲</button>
                <button class="asending-btn">▼</button>
            </div>`
        );
    }
}


// asendingDescendingDiv.addEventListener('click',(e)=>{
//      const asendingBtn = e.target.closest(".asendingBtn");
//     const descendingBtn = e.target.closest(".descending-btn");

//     if(asendingBtn){
//         console.log("asending btn clicked");
//     }
//     if(descendingBtn){
//         console.log("asending btn clicked");
//     }
// })



