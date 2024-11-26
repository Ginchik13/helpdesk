const express = require("express");
const app = express();
const ticketRoutes = require("./routes/ticketRoutes");
const PORT = 3000;

app.use(express.json());
app.use("/api/tickets", ticketRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
