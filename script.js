const mainTable = document.querySelector(".main-table");
const deletePopup = document.querySelector(".delete-popup");
const filterPopup = document.querySelector(".filter-popup");
const thead = document.querySelector("thead");
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
      rows[i].classList.add('table-primary');
    } else {
      rows[i].classList.add('table-secondary');
    }
  }
}

let todos = JSON.parse(localStorage.getItem("myTodoTask")) || [];
let filteredTodos = [...todos];

let searchTimer = null;
const delay = 500; 

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
}

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

// todo.addEventListener("click", (e) => {
//     const delBtn = e.target.closest(".delete");
//     const editBtn = e.target.closest(".edit");
//      const asendingBtn = e.target.closest(".asending-btn");
//     const descendingBtn = e.target.closest(".descending-btn");


//     if (delBtn) {
//         // delBtn.closest("[data-uid]").classList.add("del");
//         document.querySelector('.main-container').classList.toggle("del")
//         console.log("delete button clicked");
//     }
     
//     if (editBtn) {
//         const id = editBtn.closest("[data-uid]").dataset.uid;
//         window.location.href = `GetData.html?id=${encodeURIComponent(id)}`;
//     }
//     let isAsending=true;
//     let isDescending=false;

//     if (asendingBtn) {
//        console.log("asending btn licked");
//        if(isAsending) return alert("already in asending");
         
        
//        }
//        if (descendingBtn) {
//            console.log("descending btn licked");
//     if(isDescending) return alert("already in descending");
//     console.log("reverse todos",todos.reverse());
     

//     }
// });




todo.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".delete");
    const editBtn = e.target.closest(".edit");
    const asendingBtn = e.target.closest(".asending-btn");
    const descendingBtn = e.target.closest(".descending-btn");

    if (delBtn) {
        document.querySelector('.main-container').classList.toggle("del")
        console.log("delete button clicked");
    }

    if (editBtn) {
        const id = editBtn.closest("[data-uid]").dataset.uid;
        window.location.href = `GetData.html?id=${encodeURIComponent(id)}`;
    }

if (e.target.closest('thead')) {

    const th = e.target.closest('th');
    if (!th) return;

    const allHeadings = document.querySelectorAll('thead th');

    // Find the arrow icon in clicked TH
    const clickedIcon = th.querySelector('i.fa-arrow-up, i.fa-arrow-down');
    if (!clickedIcon) return;

    // Reset all other TH arrows to up and remove active-heading
    allHeadings.forEach(h => {
        if (h !== th) {
            h.classList.remove('active-heading');
            const icon = h.querySelector('i.fa-arrow-up, i.fa-arrow-down');
            if (icon) {
                icon.classList.remove('fa-arrow-down');
                icon.classList.add('fa-arrow-up');
            }
        }
    });

    // Toggle clicked TH
    const isActive = th.classList.contains('active-heading');

    if (isActive) {
        // Already active → turn back to ASC
        th.classList.remove('active-heading');
        clickedIcon.classList.remove('fa-arrow-down');
        clickedIcon.classList.add('fa-arrow-up');

        console.log("Sorting ASCENDING");

        filteredTodos.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
        });

    } else {
        // Make active → turn arrow down
        th.classList.add('active-heading');
        clickedIcon.classList.remove('fa-arrow-up');
        clickedIcon.classList.add('fa-arrow-down');

        console.log("Sorting DESCENDING");

        filteredTodos.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
            return 0;
        });
    }

    // Reset pagination & re-render
    currentPage = 1;
    render();
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
    // for(let x of allHeadings){
    //     x.style.display="flex"
    // }

    // for (let i = 1; i < allHeadings.length-2; i++) {

    //     // prevent multiple inserts
    //     if (allHeadings[i].querySelector('.asend-desend-div')) continue;

    //     allHeadings[i].insertAdjacentHTML(
    //         'beforeend',
    //         `<span class="asend-desend-div">
    //             <button class="descending-btn"><i class="fa-solid fa-arrow-up"></i></button>
    //             <button class="asending-btn"><i class="fa-solid fa-arrow-down"></i></button>
    //         </span>`
    //     );
    // }

    
}




