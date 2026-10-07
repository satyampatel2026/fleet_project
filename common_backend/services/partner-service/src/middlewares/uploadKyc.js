const multer = require("multer");
const fs = require("fs");
const path = require("path");

const ALLOWED_FIELDS = ["pan_document", "aadhaar_document", "gst_document"];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const partnerId = req.partnerId;

        if (!partnerId) {
            return cb(new Error("Partner ID not found in JWT"));
        }

        if (!ALLOWED_FIELDS.includes(file.fieldname)) {
            return cb(new Error("Invalid document field"));
        }

        const location = path.join(
            "myfiles",
            "kyc",
            String(partnerId),
            file.fieldname
        );

        fs.mkdirSync(location, { recursive: true });
        cb(null, location);
    },

    filename: (req, file, cb) => {
        const partnerId = req.partnerId;

        if (!partnerId) {
            return cb(new Error("Partner ID not found in JWT"));
        }

        const ext = path.extname(file.originalname).toLowerCase();
        const filename = `${partnerId}_${file.fieldname}_${Date.now()}${ext}`;

        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, JPG, JPEG and PNG files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

module.exports = upload;