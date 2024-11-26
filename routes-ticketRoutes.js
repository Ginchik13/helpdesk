const express = require("express");
const router = express.Router();

let tickets = []; // Временное хранилище заявок

router.get("/", (req, res) => {
    res.json(tickets);
});

router.post("/", (req, res) => {
    const { title, description, category } = req.body;
    const newTicket = { id: Date.now(), title, description, category, status: "Новая" };
    tickets.push(newTicket);
    res.status(201).json(newTicket);
});

module.exports = router;
