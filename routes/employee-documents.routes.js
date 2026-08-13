const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { db } = require("../config/database");
const { auth, hr } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");

// Configure Multer for temporary storage
const uploadTempDir = path.join(__dirname, "../uploads/temp");
if (!fs.existsSync(uploadTempDir)) {
    fs.mkdirSync(uploadTempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadTempDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
});

/* ==========================================================================
   DOCUMENT TYPES MASTER API
   ========================================================================== */

/**
 * GET /api/document-types
 * Retrieve all active document types
 */
router.get("/document-types", auth, async (req, res) => {
    try {
        const connection = await db();
        const [rows] = await connection.query(
            "SELECT * FROM document_types WHERE is_active = 1 ORDER BY category ASC, name ASC"
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error("[DOCUMENTS] Error fetching document types:", error);
        res.status(500).json({ error: "Failed to fetch document types", details: error.message });
    }
});

/**
 * POST /api/document-types
 * Add a new document type (HR/Admin only)
 */
router.post("/document-types", auth, hr, async (req, res) => {
    try {
        const { code, name, category, description, is_required } = req.body;

        if (!code || !name) {
            return res.status(400).json({ error: "Code and Name are required" });
        }

        const cleanCode = String(code).toUpperCase().trim().replace(/[^A-Z0-9_]/g, '_');
        const connection = await db();

        const [existing] = await connection.query(
            "SELECT id FROM document_types WHERE code = ?",
            [cleanCode]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: `Document type code '${cleanCode}' already exists` });
        }

        const [result] = await connection.query(
            `INSERT INTO document_types (code, name, category, description, is_required, is_active)
             VALUES (?, ?, ?, ?, ?, 1)`,
            [cleanCode, name, category || 'Other', description || null, is_required ? 1 : 0]
        );

        res.status(201).json({
            success: true,
            message: "Document type created successfully",
            data: { id: result.insertId, code: cleanCode, name, category, description }
        });
    } catch (error) {
        console.error("[DOCUMENTS] Error creating document type:", error);
        res.status(500).json({ error: "Failed to create document type", details: error.message });
    }
});

/* ==========================================================================
   EMPLOYEE DOCUMENTS LISTING & FILTERING
   ========================================================================== */

/**
 * GET /api/employee-documents
 * Search/filter all documents across employees (HR/Admin view)
 */
router.get("/employee-documents", auth, hr, async (req, res) => {
    try {
        const { employee_id, document_type_id, category, financial_year, search } = req.query;
        const connection = await db();

        let query = `
            SELECT 
                ed.*,
                e.FullName AS employee_name,
                e.EmployeeNumber AS employee_number,
                dt.code AS document_type_code,
                dt.name AS document_type_name,
                dt.category AS document_category,
                u.full_name AS uploaded_by_name
            FROM employee_documents ed
            JOIN employees e ON ed.employee_id = e.id
            JOIN document_types dt ON ed.document_type_id = dt.id
            LEFT JOIN users u ON ed.uploaded_by = u.id
            WHERE ed.is_active = 1
        `;

        const params = [];

        if (employee_id) {
            query += " AND ed.employee_id = ?";
            params.push(employee_id);
        }

        if (document_type_id) {
            query += " AND ed.document_type_id = ?";
            params.push(document_type_id);
        }

        if (category) {
            query += " AND dt.category = ?";
            params.push(category);
        }

        if (financial_year) {
            query += " AND ed.financial_year = ?";
            params.push(financial_year);
        }

        if (search && search.trim() !== "") {
            query += " AND (e.FullName LIKE ? OR e.EmployeeNumber LIKE ? OR ed.document_name LIKE ? OR ed.original_file_name LIKE ?)";
            const searchTerm = `%${search.trim()}%`;
            params.push(searchTerm, searchTerm, searchTerm, searchTerm);
        }

        query += " ORDER BY ed.uploaded_at DESC";

        const [rows] = await connection.query(query, params);
        res.json({ success: true, count: rows.length, data: rows });
    } catch (error) {
        console.error("[DOCUMENTS] Error searching employee documents:", error);
        res.status(500).json({ error: "Failed to search employee documents", details: error.message });
    }
});

/**
 * GET /api/employee-documents/:employeeId
 * Get documents for a specific employee (Grouped by Category)
 * Employees can access only their own profile unless HR/Admin
 */
router.get("/employee-documents/:employeeId", auth, async (req, res) => {
    try {
        const reqEmpId = parseInt(req.params.employeeId);
        const userRole = (req.user.role || '').toLowerCase();
        
        // Authorization check for self vs HR/Admin
        if (!['admin', 'hr'].includes(userRole)) {
            const currentEmp = await findEmployeeByUserId(req.user.id);
            if (!currentEmp || currentEmp.id !== reqEmpId) {
                return res.status(403).json({ error: "Access denied. You can only view your own documents." });
            }
        }

        const connection = await db();
        const [rows] = await connection.query(`
            SELECT 
                ed.*,
                dt.code AS document_type_code,
                dt.name AS document_type_name,
                dt.category AS document_category,
                u.full_name AS uploaded_by_name
            FROM employee_documents ed
            JOIN document_types dt ON ed.document_type_id = dt.id
            LEFT JOIN users u ON ed.uploaded_by = u.id
            WHERE ed.employee_id = ? AND ed.is_active = 1
            ORDER BY dt.category ASC, ed.uploaded_at DESC
        `, [reqEmpId]);

        // Group by Category
        const grouped = {
            Identity: [],
            Payroll: [],
            Employment: [],
            Other: []
        };

        rows.forEach(doc => {
            const cat = doc.document_category || 'Other';
            if (grouped[cat]) {
                grouped[cat].push(doc);
            } else {
                grouped.Other.push(doc);
            }
        });

        res.json({
            success: true,
            employee_id: reqEmpId,
            total_documents: rows.length,
            grouped,
            documents: rows
        });
    } catch (error) {
        console.error("[DOCUMENTS] Error fetching employee documents:", error);
        res.status(500).json({ error: "Failed to fetch employee documents", details: error.message });
    }
});

/* ==========================================================================
   INDIVIDUAL DOCUMENT UPLOAD
   ========================================================================== */

/**
 * POST /api/employee-documents/upload
 * Upload individual document (HR/Admin only)
 */
router.post("/employee-documents/upload", auth, hr, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No document file uploaded" });
        }

        const { employee_id, document_type_id, financial_year, document_name, remarks } = req.body;

        if (!employee_id || !document_type_id) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: "employee_id and document_type_id are required" });
        }

        const connection = await db();

        // Verify employee existence
        const [empRows] = await connection.query("SELECT id, FullName FROM employees WHERE id = ?", [employee_id]);
        if (empRows.length === 0) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(404).json({ error: "Employee not found" });
        }

        // Verify document type
        const [docTypeRows] = await connection.query("SELECT * FROM document_types WHERE id = ?", [document_type_id]);
        if (docTypeRows.length === 0) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(404).json({ error: "Document type not found" });
        }

        const docType = docTypeRows[0];
        const docTypeCode = docType.code;

        // Build target storage directory
        let targetDir = path.join(__dirname, `../uploads/employee_documents/${employee_id}/${docTypeCode}`);
        if (docTypeCode === 'FORM16' && financial_year) {
            targetDir = path.join(__dirname, `../uploads/employee_documents/${employee_id}/FORM16/${financial_year}`);
        }

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Generate target filename
        const ext = path.extname(req.file.originalname);
        const sanitizeName = (document_name || docType.name).replace(/[^a-zA-Z0-9_-]/g, '_');
        const targetFileName = `${sanitizeName}_${Date.now()}${ext}`;
        const targetFilePath = path.join(targetDir, targetFileName);

        // Move file from temp to final storage
        fs.renameSync(req.file.path, targetFilePath);

        // Relative file path stored in DB
        const relativeFilePath = path.relative(path.join(__dirname, '..'), targetFilePath).replace(/\\/g, '/');

        // Check versioning for duplicate document types
        let version = 1;
        let versionQuery = "SELECT MAX(version) AS max_v FROM employee_documents WHERE employee_id = ? AND document_type_id = ?";
        const versionParams = [employee_id, document_type_id];

        if (docTypeCode === 'FORM16' && financial_year) {
            versionQuery += " AND financial_year = ?";
            versionParams.push(financial_year);
        }

        const [vRows] = await connection.query(versionQuery, versionParams);
        if (vRows.length > 0 && vRows[0].max_v) {
            version = vRows[0].max_v + 1;

            let deactivateQuery = "UPDATE employee_documents SET is_active = 0 WHERE employee_id = ? AND document_type_id = ?";
            const deactivateParams = [employee_id, document_type_id];

            if (docTypeCode === 'FORM16' && financial_year) {
                deactivateQuery += " AND financial_year = ?";
                deactivateParams.push(financial_year);
            }
            await connection.query(deactivateQuery, deactivateParams);
        }

        const finalDocName = document_name || docType.name;

        const [insertRes] = await connection.query(
            `INSERT INTO employee_documents 
            (employee_id, document_type_id, financial_year, document_name, original_file_name, file_path, file_size, mime_type, version, uploaded_by, uploaded_at, is_active, remarks)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 1, ?)`,
            [
                employee_id,
                document_type_id,
                financial_year || null,
                finalDocName,
                req.file.originalname,
                relativeFilePath,
                req.file.size,
                req.file.mimetype || 'application/octet-stream',
                version,
                req.user.id,
                remarks || null
            ]
        );

        res.status(201).json({
            success: true,
            message: "Document uploaded successfully",
            data: {
                id: insertRes.insertId,
                employee_id,
                document_name: finalDocName,
                document_type_name: docType.name,
                version,
                file_path: relativeFilePath
            }
        });
    } catch (error) {
        console.error("[DOCUMENTS] Upload error:", error);
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: "Failed to upload document", details: error.message });
    }
});

/* ==========================================================================
   BULK FORM 16 ZIP UPLOAD WITH PDF PAN EXTRACTION
   ========================================================================== */

/**
 * POST /api/employee-documents/bulk-form16
 * Bulk upload Form 16 PDFs inside a ZIP archive mapped via PAN extraction
 */
router.post("/employee-documents/bulk-form16", auth, hr, upload.single("zip_file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "ZIP file is required" });
        }

        const { financial_year } = req.body;
        if (!financial_year) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: "financial_year (e.g. 2024-2025) is required" });
        }

        const pdfParse = require("pdf-parse");
        const AdmZip = require("adm-zip");

        const zipFilePath = req.file.path;
        const zip = new AdmZip(zipFilePath);
        const zipEntries = zip.getEntries();

        const pdfEntries = zipEntries.filter(entry => !entry.isDirectory && entry.entryName.toLowerCase().endsWith(".pdf"));

        if (pdfEntries.length === 0) {
            if (fs.existsSync(zipFilePath)) fs.unlinkSync(zipFilePath);
            return res.status(400).json({ error: "No PDF files found inside the uploaded ZIP archive" });
        }

        const connection = await db();

        // Get Form 16 Document Type ID
        const [form16Types] = await connection.query("SELECT id FROM document_types WHERE code = 'FORM16' LIMIT 1");
        let form16TypeId = form16Types.length > 0 ? form16Types[0].id : null;

        if (!form16TypeId) {
            const [insType] = await connection.query(
                "INSERT INTO document_types (code, name, category, description) VALUES ('FORM16', 'Form 16', 'Payroll', 'Annual Tax Certificate Form 16')"
            );
            form16TypeId = insType.insertId;
        }

        // Fetch all active employees with PAN numbers
        const [employees] = await connection.query("SELECT id, FullName, EmployeeNumber, PANNumber FROM employees");

        // Map normalized PAN to employee object
        const panMap = new Map();
        employees.forEach(emp => {
            if (emp.PANNumber) {
                const cleanPan = String(emp.PANNumber).toUpperCase().trim();
                panMap.set(cleanPan, emp);
            }
        });

        let successCount = 0;
        let failedCount = 0;
        const results = [];

        const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/g;

        for (const entry of pdfEntries) {
            const fileName = path.basename(entry.entryName);
            try {
                const pdfBuffer = entry.getData();

                // Extract PDF text using robust helper
                let pdfText = '';
                try {
                    if (typeof pdfParse === 'function') {
                        const pdfData = await pdfParse(pdfBuffer);
                        pdfText = pdfData.text || '';
                    } else if (pdfParse && pdfParse.PDFParse) {
                        const parser = new pdfParse.PDFParse(pdfBuffer);
                        if (typeof parser.load === 'function') await parser.load();
                        if (typeof parser.getText === 'function') {
                            const res = await parser.getText();
                            pdfText = typeof res === 'string' ? res : (res && res.text ? res.text : JSON.stringify(res));
                        }
                    }
                } catch (pErr) {
                    console.warn(`[PDF PARSE] Notice on ${fileName}:`, pErr.message);
                }

                const rawBinary = pdfBuffer.toString('binary');
                const rawUtf8 = pdfBuffer.toString('utf8');
                const fullText = pdfText + " " + rawBinary + " " + rawUtf8;

                // Extract candidate PANs from filename AND PDF content
                const fileNameMatches = fileName.match(panRegex) || [];
                const contentMatches = fullText.match(panRegex) || [];
                const uniqueExtractedPans = [...new Set([...fileNameMatches, ...contentMatches].map(p => p.toUpperCase()))];

                let matchedEmp = null;
                let matchedPan = null;

                // Step 1: Match extracted PANs against employee records
                for (const candidatePan of uniqueExtractedPans) {
                    if (panMap.has(candidatePan)) {
                        matchedEmp = panMap.get(candidatePan);
                        matchedPan = candidatePan;
                        break;
                    }
                }

                // Step 2: Fallback - Match by EmployeeNumber in filename if PAN didn't match
                if (!matchedEmp) {
                    const fileNameUpper = fileName.toUpperCase();
                    for (const emp of employees) {
                        if (emp.EmployeeNumber && fileNameUpper.includes(String(emp.EmployeeNumber).toUpperCase())) {
                            matchedEmp = emp;
                            matchedPan = emp.PANNumber || "EMP_CODE_MATCH";
                            break;
                        }
                    }
                }

                if (!matchedEmp) {
                    failedCount++;
                    results.push({
                        fileName,
                        extractedPan: uniqueExtractedPans.join(", ") || "None",
                        employeeName: "N/A",
                        status: "Failed",
                        reason: uniqueExtractedPans.length 
                            ? `Extracted PAN (${uniqueExtractedPans.join(", ")}) not found in employee database`
                            : "Could not extract valid PAN or Employee Code from PDF or Filename"
                    });
                    continue;
                }

                // Save PDF to destination
                const empId = matchedEmp.id;
                const targetDir = path.join(__dirname, `../uploads/employee_documents/${empId}/FORM16/${financial_year}`);
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }

                const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
                const targetPath = path.join(targetDir, `Form16_${financial_year}_${cleanFileName}`);
                fs.writeFileSync(targetPath, pdfBuffer);

                const relativeFilePath = path.relative(path.join(__dirname, '..'), targetPath).replace(/\\/g, '/');

                // Handle versioning
                const [vRows] = await connection.query(
                    "SELECT MAX(version) AS max_v FROM employee_documents WHERE employee_id = ? AND document_type_id = ? AND financial_year = ?",
                    [empId, form16TypeId, financial_year]
                );

                let version = 1;
                if (vRows.length > 0 && vRows[0].max_v) {
                    version = vRows[0].max_v + 1;
                    await connection.query(
                        "UPDATE employee_documents SET is_active = 0 WHERE employee_id = ? AND document_type_id = ? AND financial_year = ?",
                        [empId, form16TypeId, financial_year]
                    );
                }

                // Insert document record
                await connection.query(
                    `INSERT INTO employee_documents 
                    (employee_id, document_type_id, financial_year, document_name, original_file_name, file_path, file_size, mime_type, version, uploaded_by, uploaded_at, is_active, remarks)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 1, ?)`,
                    [
                        empId,
                        form16TypeId,
                        financial_year,
                        `Form 16 (${financial_year})`,
                        fileName,
                        relativeFilePath,
                        pdfBuffer.length,
                        'application/pdf',
                        version,
                        req.user.id,
                        `Automated Form 16 upload via PAN ${matchedPan}`
                    ]
                );

                successCount++;
                results.push({
                    fileName,
                    extractedPan: matchedPan,
                    employeeId: empId,
                    employeeName: matchedEmp.FullName,
                    status: "Success",
                    reason: `Successfully mapped to ${matchedEmp.FullName} (${matchedEmp.EmployeeNumber || empId})`
                });

            } catch (pdfErr) {
                console.error(`Error processing PDF ${fileName}:`, pdfErr);
                failedCount++;
                results.push({
                    fileName,
                    extractedPan: "N/A",
                    employeeName: "N/A",
                    status: "Failed",
                    reason: `PDF Parsing Error: ${pdfErr.message}`
                });
            }
        }

        // Clean up uploaded temp ZIP file
        if (fs.existsSync(zipFilePath)) fs.unlinkSync(zipFilePath);

        res.json({
            success: true,
            message: `Processed ${pdfEntries.length} Form 16 PDFs (${successCount} succeeded, ${failedCount} failed)`,
            summary: {
                totalFiles: pdfEntries.length,
                successCount,
                failedCount,
                financialYear: financial_year
            },
            results
        });

    } catch (error) {
        console.error("[DOCUMENTS] Bulk Form 16 Error:", error);
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: "Failed to process bulk Form 16 upload", details: error.message });
    }
});

/* ==========================================================================
   UPDATE, DELETE, PREVIEW & DOWNLOAD ENDPOINTS
   ========================================================================== */

/**
 * PUT /api/employee-documents/:id
 * Replace document file or update details (HR/Admin only)
 */
router.put("/employee-documents/:id", auth, hr, upload.single("file"), async (req, res) => {
    try {
        const docId = parseInt(req.params.id);
        const { document_name, remarks, financial_year } = req.body;

        const connection = await db();
        const [existing] = await connection.query("SELECT * FROM employee_documents WHERE id = ?", [docId]);

        if (existing.length === 0) {
            if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(404).json({ error: "Document not found" });
        }

        const doc = existing[0];
        let newFilePath = doc.file_path;
        let newFileSize = doc.file_size;
        let newMimeType = doc.mime_type;
        let newOriginalName = doc.original_file_name;
        let newVersion = doc.version;

        if (req.file) {
            const absoluteOldPath = path.join(__dirname, '..', doc.file_path);
            const targetDir = path.dirname(absoluteOldPath);

            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            const ext = path.extname(req.file.originalname);
            const sanitizeName = (document_name || doc.document_name).replace(/[^a-zA-Z0-9_-]/g, '_');
            const targetFileName = `${sanitizeName}_v${doc.version + 1}_${Date.now()}${ext}`;
            const targetFilePath = path.join(targetDir, targetFileName);

            fs.renameSync(req.file.path, targetFilePath);

            newFilePath = path.relative(path.join(__dirname, '..'), targetFilePath).replace(/\\/g, '/');
            newFileSize = req.file.size;
            newMimeType = req.file.mimetype || 'application/octet-stream';
            newOriginalName = req.file.originalname;
            newVersion = doc.version + 1;
        }

        await connection.query(
            `UPDATE employee_documents SET
                document_name = ?,
                financial_year = ?,
                original_file_name = ?,
                file_path = ?,
                file_size = ?,
                mime_type = ?,
                version = ?,
                remarks = ?,
                updated_at = NOW()
            WHERE id = ?`,
            [
                document_name || doc.document_name,
                financial_year !== undefined ? financial_year : doc.financial_year,
                newOriginalName,
                newFilePath,
                newFileSize,
                newMimeType,
                newVersion,
                remarks !== undefined ? remarks : doc.remarks,
                docId
            ]
        );

        res.json({
            success: true,
            message: "Document updated successfully",
            data: { id: docId, version: newVersion, file_path: newFilePath }
        });
    } catch (error) {
        console.error("[DOCUMENTS] Update error:", error);
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: "Failed to update document", details: error.message });
    }
});

/**
 * DELETE /api/employee-documents/:id
 * Soft delete document (HR/Admin only)
 */
router.delete("/employee-documents/:id", auth, hr, async (req, res) => {
    try {
        const docId = parseInt(req.params.id);
        const connection = await db();

        const [result] = await connection.query(
            "UPDATE employee_documents SET is_active = 0 WHERE id = ?",
            [docId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Document not found" });
        }

        res.json({ success: true, message: "Document deleted successfully" });
    } catch (error) {
        console.error("[DOCUMENTS] Delete error:", error);
        res.status(500).json({ error: "Failed to delete document", details: error.message });
    }
});

/**
 * GET /api/employee-documents/download/:id
 * Download document file
 */
router.get("/employee-documents/download/:id", auth, async (req, res) => {
    try {
        const docId = parseInt(req.params.id);
        const connection = await db();

        const [rows] = await connection.query("SELECT * FROM employee_documents WHERE id = ?", [docId]);

        if (rows.length === 0 || !rows[0].is_active) {
            return res.status(404).json({ error: "Document not found" });
        }

        const doc = rows[0];
        const userRole = (req.user.role || '').toLowerCase();

        // Security check
        if (!['admin', 'hr'].includes(userRole)) {
            const currentEmp = await findEmployeeByUserId(req.user.id);
            if (!currentEmp || currentEmp.id !== doc.employee_id) {
                return res.status(403).json({ error: "Access denied" });
            }
        }

        const fullPath = path.join(__dirname, '..', doc.file_path);

        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({ error: "Document file not found on storage" });
        }

        res.download(fullPath, doc.original_file_name);
    } catch (error) {
        console.error("[DOCUMENTS] Download error:", error);
        res.status(500).json({ error: "Failed to download document", details: error.message });
    }
});

/**
 * GET /api/employee-documents/preview/:id
 * Preview document file in browser (inline display)
 */
router.get("/employee-documents/preview/:id", auth, async (req, res) => {
    try {
        const docId = parseInt(req.params.id);
        const connection = await db();

        const [rows] = await connection.query("SELECT * FROM employee_documents WHERE id = ?", [docId]);

        if (rows.length === 0 || !rows[0].is_active) {
            return res.status(404).json({ error: "Document not found" });
        }

        const doc = rows[0];
        const userRole = (req.user.role || '').toLowerCase();

        // Security check
        if (!['admin', 'hr'].includes(userRole)) {
            const currentEmp = await findEmployeeByUserId(req.user.id);
            if (!currentEmp || currentEmp.id !== doc.employee_id) {
                return res.status(403).json({ error: "Access denied" });
            }
        }

        const fullPath = path.join(__dirname, '..', doc.file_path);

        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({ error: "Document file not found on storage" });
        }

        res.setHeader("Content-Type", doc.mime_type || "application/octet-stream");
        res.setHeader("Content-Disposition", `inline; filename="${doc.original_file_name}"`);
        fs.createReadStream(fullPath).pipe(res);

    } catch (error) {
        console.error("[DOCUMENTS] Preview error:", error);
        res.status(500).json({ error: "Failed to preview document", details: error.message });
    }
});

module.exports = router;
