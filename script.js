const btn = document.getElementById("themeBtn");

const body = document.body;

const icon = btn.querySelector("i");

const currentTime = document.getElementById('time')
const currentDay = document.getElementById('day')

const dashboard = document.getElementById("dashboard");

const goalPage = document.getElementById("goalPage");
const todopage = document.getElementById("todo_page");




const goalCard = document.getElementById("goalCard");
const todocard = document.getElementById("todocard");



const backGoal = document.getElementById("backGoal");


const title = document.getElementById("title")

// Load saved theme
const savedTheme = localStorage.getItem("theme");

goalCard.addEventListener("click",()=>{
    console.log('goal')
    dashboard.style.display="none";

    goalPage.classList.add("active");
    title.innerText='Daily Goal'

});

backGoal.addEventListener("click",()=>{

    goalPage.classList.remove("active");

    dashboard.style.display="block";

    title.innerText='Productivity Dashboard'

});


todocard.addEventListener("click", () => {

    dashboard.style.display = "none";

    goalPage.classList.remove("active");

    todopage.classList.add("todoactive");

    title.innerText = "To-Do Task";
});


const todoBack = document.getElementById("todo_BackGoal");

todoBack.addEventListener("click", () => {

    todopage.classList.remove("todoactive");

    dashboard.style.display = "block";

    title.innerText = "Productivity Dashboard";

});


const input = document.getElementById("goalInput");

const list = document.getElementById("goalList");

const addBtn = document.getElementById("addGoal");

addBtn.addEventListener("click",()=>{

    if(input.value==="") return;

    const li=document.createElement("li");

    li.innerHTML=`
        <span>${input.value}</span>
        <button class="delete">❌</button>
    `;

    list.appendChild(li);

    input.value="";

});


list.addEventListener("click",(e)=>{

    if(e.target.classList.contains("delete")){

        e.target.parentElement.remove();

    }

});


if(savedTheme){

    body.setAttribute("data-theme", savedTheme);

    icon.className =
        savedTheme === "dark"
        ? "ri-moon-line"
        : "ri-sun-line";
}

btn.addEventListener("click",()=>{

    const current = body.getAttribute("data-theme");

    if(current==="dark"){

        body.setAttribute("data-theme","light");

        icon.className="ri-sun-line";

        localStorage.setItem("theme","light");

    }else{

        body.setAttribute("data-theme","dark");

        icon.className="ri-moon-line";

        localStorage.setItem("theme","dark");

    }

});


function updatedtime(){
    const now = new Date()
    // Time
    const Time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    // Date
    const currDate = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    currentTime.textContent = Time;

}

function updateDay(){
    const now = new Date()
        // Date
    const currDate = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    currentDay.textContent = currDate;
}

updateDay()
updatedtime()

setInterval(updatedtime,1000)




async function getWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8774&hourly=temperature_2m,rain&timezone=auto`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        document.getElementById("temp").textContent =`${data.hourly.temperature_2m[0]}°C`;

    } catch (error) {
        console.error(error);
    }

     
}

getWeather()

async function getQuote() {

    const url = "https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom";

    try {

        const response = await fetch(url, {
            headers: {
                "X-Api-Key": "pFbuVx0Ekfd93RnFel2KW397SLEYxA25Sg82nTwy"
            }
        });

        const data = await response.json();
        console.log(data)
        document.getElementById("Dailyquote").textContent = data[0].quote;
        document.getElementById("author").textContent = "- " + data[0].author;

    } catch (error) {
        console.log(error);
    }
}

getQuote()


const tasklist = document.querySelector(".list");

tasklist.addEventListener("change", (e) => {

    if(e.target.classList.contains("task-check")){

        const task = e.target.closest(".task1");
        const content = task.querySelector(".task-content");

        content.classList.toggle("completed", e.target.checked);

    }

});





const addTaskBtn = document.getElementById("addtask");
const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");

const saveTask = document.getElementById("saveTask");

const titleInput = document.getElementById("taskTitle");
const descInput = document.getElementById("taskDescription");

const taskList = document.querySelector(".list");


// Open Popup
addTaskBtn.addEventListener("click", () => {

    taskModal.classList.add("active");

});


// Close Popup
closeModal.addEventListener("click", () => {

    taskModal.classList.remove("active");

});


// Click Outside
taskModal.addEventListener("click", (e)=>{

    if(e.target===taskModal){

        taskModal.classList.remove("active");

    }

});


// Save Task
saveTask.addEventListener("click", ()=>{

    const title = titleInput.value.trim();

    const desc = descInput.value.trim();

    if(title===""){

        alert("Enter Task Title");

        return;

    }

    const task=document.createElement("div");

    task.className="task1";

    task.innerHTML=`

        <div class="task-left">

            <input type="checkbox" class="task-check">

            <div class="task-content">

                <h3>${title}</h3>

                <p>${desc}</p>

            </div>

        </div>

        <button class="deleteTask">

            <i class="ri-delete-bin-line"></i>

        </button>

    `;

    taskList.appendChild(task);

    titleInput.value="";

    descInput.value="";

    taskModal.classList.remove("active");

});



taskList.addEventListener("click",(e)=>{

    if(e.target.closest(".deleteTask")){

        e.target.closest(".task1").remove();

    }

});

taskList.addEventListener("change",(e)=>{

    if(e.target.classList.contains("task-check")){

        const content=e.target
            .closest(".task1")
            .querySelector(".task-content");

        content.classList.toggle("completed",e.target.checked);

    }

});