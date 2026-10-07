require("dotenv").config();

const app = require("./src/app");
const connection = require("./src/config/db");

const PORT = process.env.PORT || 5001;

async function startServer() {
    try {
        const db = await connection.getConnection();

        console.log("MySQL connected successfully");
        db.release();

        app.listen(PORT, () => {
            console.log(`Auth Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

startServer();