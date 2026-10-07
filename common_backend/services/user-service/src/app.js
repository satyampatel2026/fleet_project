const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/userRoute");
const departmentRouter = require("./routes/departmentRoute");
const rolesRouter = require("./routes/rolesRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        service: "user-service",
        message: "User service is running"
    });
});

app.use("/", usersRouter);
app.use("/", departmentRouter);
app.use("/", rolesRouter);

module.exports = app;