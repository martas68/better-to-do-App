//getting all required elements

const inputBoxEl = document.querySelector(".input-field input");
const addBtnEl = document.querySelector(".input-field button");
const todoListEl = document.querySelector(".todo-list");
const clearAllBtn = document.querySelector(".footer button");
// button efect when we write something in input field.
inputBoxEl.addEventListener("keyup",()=>{
    let userData = inputBoxEl.value;    //getting users entered value;
    if(userData.trim() !=0){// if users values aren't only spaces
        addBtnEl.classList.add("active");  // add active 
    }else{
        addBtnEl.classList.remove("active");// remove active from the btn
    }
})

showTasks();

addBtnEl.addEventListener("click",()=>{
    let userData = inputBoxEl.value;
    let getlocalStorage = localStorage.getItem("New Todo");//gett localStorage
    if(getlocalStorage == null){    // if local storage is null
        listArr = []; // creating empty array
    }else{
        listArr = JSON.parse(getlocalStorage);  // transforming json string into a js object
    }
    listArr.push(userData);   //pushing or adding users data
    localStorage.setItem("New Todo", JSON.stringify(listArr));// transforming js object into json string
    showTasks();//calling showTasks function
    addBtnEl.classList.remove("active");// remove active from the btn
})

//function addTask task list inside ul

function showTasks(){
    let getlocalStorage = localStorage.getItem("New Todo");//getting localStorage
    if(getlocalStorage == null){    // if local storage is null
        listArr = []; // creating empty array
    }else{
        listArr = JSON.parse(getlocalStorage);  // transforming json string into a js object
    }
    //call pendingNum el from HTMl
    const pendingNumbEl = document.querySelector(".pendingNumb");
    pendingNumbEl.textContent = listArr.length;//passing the length valie in pendingNum
    if(listArr.length > 0){ //if arrays length is greater than 0 add active class else remove active class
        clearAllBtn.classList.add("active");
    }else{
        clearAllBtn.classList.remove('active');
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick ="deleteTask(${index})"><i class="fa-solid fa-trash"></i></span></li>`;
    });
    todoListEl.innerHTML = newLiTag; //adding new li tags inside ul
    inputBoxEl.value = "";//once task added leave the input field empty
}

//delete tasks function:

function deleteTask(index){
    let getlocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getlocalStorage);  // transforming json string into a js object
    listArr.splice(index, 1); // delete or remove the particular indexed li;
    //after remove the li again update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));// transforming js object into json string
    showTasks();//calling showTasks function
}

//CLear all tasks function

clearAllBtn.addEventListener("click",()=>{
    listArr = [];//empty an array
    localStorage.setItem("New Todo", JSON.stringify(listArr));// after deleting all tasks update local storage
    showTasks();//calling showTasks function
})