// Get elements
let inputField = document.getElementById("input");
let addButton = document.getElementById("btn");
let todoList = document.getElementById("ul");
let products = document.querySelectorAll(".product-card");
let filterSelect = document.getElementById("filter");
let highPriorityButton = document.getElementById("high-priority");
let lowPriorityButton = document.getElementById("low-priority");

// Event listener to add tasks
addButton.addEventListener("click", function () {
    let inputValue = inputField.value.trim();

    if (inputValue === "") {
        alert("Please enter a valid product name!");
        return;
    }

    let matchedProduct = null;

    // Check if input matches any mock product
    products.forEach((product) => {
        if (product.getAttribute("data-name").toLowerCase() === inputValue.toLowerCase()) {
            matchedProduct = product;
        }
    });

    // Create a new list item
    let item = document.createElement("li");
    item.className = "pending"; // Default status is pending

    if (matchedProduct) {
        item.innerText = `${matchedProduct.getAttribute("data-name")} selected. Enjoy your meal!`;

        let productImage = matchedProduct.querySelector("img").cloneNode(true);
        productImage.style.width = "50px"; // Adjust size
        productImage.style.marginLeft = "10px";
        item.appendChild(productImage);

        item.style.color = "green";
    } else {
        item.innerText = `Task: ${inputValue}`;
        item.style.color = "black";
    }

    todoList.appendChild(item);
    inputField.value = "";

    // Add event to mark task as completed
    item.addEventListener("click", function () {
        item.classList.toggle("completed");
        item.classList.remove("pending");
    });
});

// Filter tasks
filterSelect.addEventListener("change", function () {
    let filterValue = filterSelect.value;
    let tasks = todoList.querySelectorAll("li");

    tasks.forEach((task) => {
        if (filterValue === "all") {
            task.style.display = "flex";
        } else if (filterValue === "completed" && task.classList.contains("completed")) {
            task.style.display = "flex";
        } else if (filterValue === "pending" && task.classList.contains("pending")) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});

// Priority Buttons
highPriorityButton.addEventListener("click", function () {
    let selectedTask = todoList.querySelector(".selected");
    if (selectedTask) selectedTask.className = "high-priority";
});

lowPriorityButton.addEventListener("click", function () {
    let selectedTask = todoList.querySelector(".selected");
    if (selectedTask) selectedTask.className = "low-priority";
});

// Click to select a task
todoList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        let tasks = todoList.querySelectorAll("li");
        tasks.forEach((task) => task.classList.remove("selected"));
        e.target.classList.add("selected");
    }
});
