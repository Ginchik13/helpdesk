// Общая функция загрузки заявок
async function loadTickets(userRole) {
    const response = await fetch("/api/tickets");
    const tickets = await response.json();

    if (userRole === "admin") {
        displayTicketsByCategory(tickets);
    } else {
        const completedTickets = tickets.filter(ticket => ticket.status === "Завершена");
        displayTickets(completedTickets, document.getElementById("ticketsContainer"));
    }
}

// Отображение заявок в виде карточек
function displayTickets(tickets, container) {
    container.innerHTML = "";
    tickets.forEach(ticket => {
        const card = document.createElement("div");
        card.className = "ticket-card";
        card.innerHTML = `
            <h3>${ticket.title}</h3>
            <p><strong>Категория:</strong> ${ticket.category}</p>
            <p>${ticket.description}</p>
            <p><strong>Статус:</strong> ${ticket.status}</p>
        `;
        container.appendChild(card);
    });
}

// Группировка по категориям
function displayTicketsByCategory(tickets) {
    const categories = {
        "1С": document.getElementById("tickets-1C"),
        "Битрикс": document.getElementById("tickets-Bitrix"),
        "Почта": document.getElementById("tickets-Email"),
        "Создание Пользователя": document.getElementById("tickets-UserCreation"),
    };

    Object.values(categories).forEach(categoryContainer => categoryContainer.innerHTML = "");

    tickets.forEach(ticket => {
        const card = document.createElement("div");
        card.className = "ticket-card";
        card.innerHTML = `
            <h3>${ticket.title}</h3>
            <p>${ticket.description}</p>
            <p><strong>Статус:</strong> ${ticket.status}</p>
        `;
        categories[ticket.category].appendChild(card);
    });
}

// Создание новой заявки
document.getElementById("ticketForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category }),
    });

    if (response.ok) {
        alert("Заявка создана!");
        loadTickets("user"); // Перезагрузка заявок
    } else {
        alert("Ошибка создания заявки.");
    }
});

// Определение роли и загрузка данных
document.addEventListener("DOMContentLoaded", () => {
    const userRole = window.location.pathname.includes("admin") ? "admin" : "user";
    loadTickets(userRole);
});
