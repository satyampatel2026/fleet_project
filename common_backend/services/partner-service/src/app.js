const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const partnerAuthRouter = require("./routes/partnerAuthRoute");
const partnerkycRouter = require("./routes/partnerKycRoute");

const app = express();

app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        service: "partner-service",
        message: "partner service is running"
    });
});

app.use("/", partnerAuthRouter);
app.use("/api", partnerkycRouter);

module.exports = app;