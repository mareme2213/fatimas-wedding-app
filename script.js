function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") {
        alert("Ajoute quelque chose 😅");
        return;
    }

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = taskText;

    span.onclick = function () {
        li.classList.toggle("done");
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}
function addGuest() {
    let input = document.getElementById("guestInput");
    let name = input.value;

    if (name === "") {
        alert("Ajoute un invité 😅");
        return;
    }

    createGuest(name, false);
    saveGuests();

    input.value = "";
}

function createGuest(name, confirmed) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = name;

    if (confirmed) {
        li.classList.add("done");
    }

    // cliquer = confirmer présence
    span.onclick = function () {
        li.classList.toggle("done");
        saveGuests();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.onclick = function () {
        li.remove();
        saveGuests();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("guestList").appendChild(li);
}

// sauvegarder invités
function saveGuests() {
    let guests = [];

    document.querySelectorAll("#guestList li").forEach(li => {
        guests.push({
            name: li.querySelector("span").textContent,
            confirmed: li.classList.contains("done")
        });
    });

    localStorage.setItem("guests", JSON.stringify(guests));
}

// charger invités
function loadGuests() {
    let guests = JSON.parse(localStorage.getItem("guests")) || [];

    guests.forEach(g => {
        createGuest(g.name, g.confirmed);
    });
}

loadGuests();
function addExpense() {
    let nameInput = document.getElementById("expenseName");
    let amountInput = document.getElementById("expenseAmount");

    let name = nameInput.value;
    let amount = parseInt(amountInput.value);

    if (name === "" || isNaN(amount)) {
        alert("Remplis bien les champs 😅");
        return;
    }

    createExpense(name, amount);
    saveExpenses();
    updateTotal();

    nameInput.value = "";
    amountInput.value = "";
}

function createExpense(name, amount) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = name + " - " + amount + " FCFA";

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.onclick = function () {
        li.remove();
        saveExpenses();
        updateTotal();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("expenseList").appendChild(li);
}

// sauvegarde
function saveExpenses() {
    let expenses = [];

    document.querySelectorAll("#expenseList li").forEach(li => {
        let text = li.querySelector("span").textContent;
        let parts = text.split(" - ");

        expenses.push({
            name: parts[0],
            amount: parseInt(parts[1])
        });
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// charger
function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.forEach(e => {
        createExpense(e.name, e.amount);
    });

    updateTotal();
}

// total
function updateTotal() {
    let total = 0;

    document.querySelectorAll("#expenseList li").forEach(li => {
        let text = li.querySelector("span").textContent;
        let amount = parseInt(text.split(" - ")[1]);
        total += amount;
    });

    document.getElementById("totalAmount").textContent = total;
}

loadExpenses();
function addEvent() {
    let dateInput = document.getElementById("eventDate");
    let textInput = document.getElementById("eventText");

    let date = dateInput.value;
    let text = textInput.value;

    if (date === "" || text === "") {
        alert("Remplis tous les champs 😅");
        return;
    }

    createEvent(date, text);
    saveEvents();

    dateInput.value = "";
    textInput.value = "";
}

function createEvent(date, text) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = date + " - " + text;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.onclick = function () {
        li.remove();
        saveEvents();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("eventList").appendChild(li);
}

// sauvegarde
function saveEvents() {
    let events = [];

    document.querySelectorAll("#eventList li").forEach(li => {
        let text = li.querySelector("span").textContent;
        let parts = text.split(" - ");

        events.push({
            date: parts[0],
            text: parts[1]
        });
    });

    localStorage.setItem("events", JSON.stringify(events));
}

// chargement
function loadEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    events.forEach(e => {
        createEvent(e.date, e.text);
    });
}

loadEvents();