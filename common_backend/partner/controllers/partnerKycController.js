const connection = require("../../model/db");
const fs = require("fs");

const submitKyc = async (req, res) => {
    console.log("Submit KYC Request Body:", req.body);

    try {
        const partner_id = req.partnerId;
        if (!partner_id) {
            return res.status(400).json({
                success: false,
                message: "partner_id is required"
            });
        }
        
        const { owner_name, business_name, business_address, pan_number, gst_number, aadhaar_number } = req.body;
        if (!owner_name) {
            return res.status(400).json({
                success: false,
                message: "owner_name is required"
            });
        }

        const panFile = req.files?.pan_document?.[0];
        const aadhaarFile = req.files?.aadhaar_document?.[0];
        const gstFile = req.files?.gst_document?.[0];

        const panDocument = panFile ? `/myfiles/kyc/${partner_id}/pan_document/${panFile.filename}` : null;
        const aadhaarDocument = aadhaarFile ? `/myfiles/kyc/${partner_id}/aadhaar_document/${aadhaarFile.filename}` : null;
        const gstDocument = gstFile ? `/myfiles/kyc/${partner_id}/gst_document/${gstFile.filename}` : null;

        const [existingKyc] = await connection.execute(
            ` SELECT * FROM partner_kyc WHERE partner_id = ? `, [partner_id]
        );

        if (existingKyc.length > 0) {
            const oldKyc = existingKyc[0];
            
            if (panFile && oldKyc.pan_document) {
                const oldPath = oldKyc.pan_document.startsWith('/') ? oldKyc.pan_document.substring(1) : oldKyc.pan_document;
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            if (aadhaarFile && oldKyc.aadhaar_document) {
                const oldPath = oldKyc.aadhaar_document.startsWith('/') ? oldKyc.aadhaar_document.substring(1) : oldKyc.aadhaar_document;
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            if (gstFile && oldKyc.gst_document) {
                const oldPath = oldKyc.gst_document.startsWith('/') ? oldKyc.gst_document.substring(1) : oldKyc.gst_document;
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            const finalPanDocument = panDocument || oldKyc.pan_document;
            const finalAadhaarDocument = aadhaarDocument || oldKyc.aadhaar_document;
            const finalGstDocument = gstDocument || oldKyc.gst_document;

            await connection.execute( 
                `UPDATE partner_kyc SET owner_name = ?, business_name = ?, business_address = ?, pan_number = ?, gst_number = ?,
                aadhaar_number = ?, pan_document = ?, aadhaar_document = ?, gst_document = ?, kyc_status = 'pending',
                rejection_reason = NULL, verified_at = NULL WHERE partner_id = ? `,
                [
                    owner_name, business_name || null, business_address || null, pan_number || null,
                    gst_number || null, aadhaar_number || null, finalPanDocument,
                    finalAadhaarDocument, finalGstDocument, partner_id 
                ]
            );

            return res.json({ 
                success: true,
                message: "KYC updated successfully",
                kyc_id: oldKyc.kyc_id 
            });
        }

        const [result] = await connection.execute(
            ` INSERT INTO partner_kyc (partner_id, owner_name, business_name, business_address, pan_number,
             gst_number, aadhaar_number, pan_document, aadhaar_document, gst_document, kyc_status )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending') `, 
            [
                partner_id, owner_name, business_name || null, business_address || null, pan_number || null,
                gst_number || null, aadhaar_number || null, panDocument, aadhaarDocument, gstDocument 
            ]
        );

        return res.status(201).json({
            success: true,
            message: "KYC submitted successfully",
            kyc_id: result.insertId
        });

    } catch (error) {
        console.error("Submit KYC Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};

const getKycByPartnerId = async (req, res) => {
    try {
        const partner_id = req.partnerId;
        const [rows] = await connection.execute(
            ` SELECT kyc_id, partner_id, owner_name, business_name, business_address, pan_number, gst_number, aadhaar_number,
            pan_document, aadhaar_document, gst_document, kyc_status, rejection_reason, submitted_at, verified_at FROM partner_kyc
            WHERE partner_id = ? `, [partner_id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "KYC not found"
            });
        }
        
        return res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error("Get KYC Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { submitKyc, getKycByPartnerId };