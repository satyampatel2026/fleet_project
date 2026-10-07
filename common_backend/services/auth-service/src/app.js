const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        service: "auth-service",
        message: "Auth service is running"
    });
});


const adminAuthRouter = require("./routes/adminAuthRoute");
const partnerAuthRouter = require("./routes/partnerAuthRoute");

app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/partner/auth", partnerAuthRouter);

module.exports = app;