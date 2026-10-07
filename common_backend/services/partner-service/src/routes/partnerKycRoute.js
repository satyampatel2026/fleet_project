const express = require("express");

const partnerkycRouter = express.Router();

const upload = require("../middlewares/uploadKyc");
const authMiddleware = require("../middlewares/authMiddleware");

const {
    submitKyc,
    getKycByPartnerId
} = require("../controllers/partnerKycController");


partnerkycRouter.post(
    "/submit-kyc",
    authMiddleware,
    upload.fields([
        {
            name: "pan_document",
            maxCount: 1
        },
        {
            name: "aadhaar_document",
            maxCount: 1
        },
        {
            name: "gst_document",
            maxCount: 1
        }
    ]),
    submitKyc
);


partnerkycRouter.get(
    "/kyc",
    authMiddleware,
    getKycByPartnerId
);

module.exports = partnerkycRouter;