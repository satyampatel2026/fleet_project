require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

app.get("/health", (req, res) => {
    res.json({
        success: true,
        service: "api-gateway",
        message: "API Gateway is running"
    });
});

// ===============================
// USER SERVICE
// ===============================

app.use(
    "/api/admin/auth",
    createProxyMiddleware({
        target: process.env.AUTH_SERVICE_URL,
        changeOrigin: true
    })
);

app.use(
    "/api/users",
    createProxyMiddleware({
        target: process.env.USER_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (path) => `/api/users${path}`
    })
);

app.use(
    "/api/departments",
    createProxyMiddleware({
        target: process.env.USER_SERVICE_URL,
        changeOrigin: true,
         pathRewrite: (path) => `/api/departments${path}`
    })
);

app.use(
    "/api/roles",
    createProxyMiddleware({
        target: process.env.USER_SERVICE_URL,
        changeOrigin: true,
         pathRewrite: (path) => `/api/roles${path}`
    })
);

app.use(
    "/api/userrole",
    createProxyMiddleware({
        target: process.env.USER_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (path) => `/api/userrole${path}`
    })
);

// ===============================
// PARTNER SERVICE
// ===============================
app.use(
    "/api/partner/auth",
    createProxyMiddleware({
        target: process.env.AUTH_SERVICE_URL,
        changeOrigin: true
    })
);

app.use(
    "/api/partner",
    createProxyMiddleware({
        target: process.env.PARTNER_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/": "/api/"
        },
        logger:console
    })
);

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
