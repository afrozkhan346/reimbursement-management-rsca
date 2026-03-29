const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");

sequelize.sync().then(() => {
  app.listen(5000, () => console.log("Server started"));
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));
app.use("/approvals", require("./routes/approvalRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});