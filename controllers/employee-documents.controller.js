/**
 * EMPLOYEE DOCUMENTS CONTROLLER
 * Handles document master types, individual employee document uploads,
 * bulk Form 16 ZIP upload with automated PAN matching, and document downloads/previews.
 */

const path = require("path");
const fs = require("fs");
const { db } = require("../config/database");
const { findEmployeeByUserId } = require("../utils/helpers");

// Utility to parse PAN format regex: 5 uppercase letters, 4 digits, 1 uppercase letter
const PAN_REGEX = /[A-Z]{5}[0-9]{4}[A-Z]{1}/g;

/**
 * Get all available document types
 */
exports.getDocumentTypes = async (req, res) => {
  let conn;
  try {
    conn = await db();
    const [types] = await conn.query(
      "SELECT id, code, name, category, is_system, created_at FROM document_types ORDER BY category, name"
    );
    return res.json({ success: true, data: types });
  } catch (error) {
    console.error("Error fetching document types:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch document types", error: error.message });
  } finally {
    if (conn) { try { await conn.end(); } catch (e) {} }
  }
};

/**
 * Add a custom document type (HR / Admin dynamically)
 */
exports.addDocumentType = async (req, res) => {
  let conn;
  try {
    const { name, category } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Document type name is required" });
    }

    const code = name.toUpperCase().replace(/[^A-Z0-9]/g, "_");
    const docCategory = ['Identity', 'Payroll', 'Employment', 'Other'].includes(category) ? category : 'Other';

    conn = await db();
    const [result] = await conn.query(
      `INSERT INTO document_types (code, name, category, is_system) 
       VALUES (?, ?, ?, 0) 
       ON DUPLICATE KEY UPDATE name=VALUES(name), category=VALUES(category)`,
      [code, name, docCategory]
    );

    return res.json({
      success: true,
      message: "Document type created successfully",
      data: { id: result.insertId || result.id, code, name, category: docCategory }
    });
  } catch (error) {
    console.error("Error adding document type:", error);
    return res.status(500).json({ success: false, message: "Failed to add document type", error: error.message });
  } finally {
    if (conn) { try { await conn.end(); } catch (e) {} }
  }
};

/**
 * Get logged-in employee's own documents and PAN Number
 */
exports.getMyDocuments = async (req, res) => {
  let conn;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee profile not found" });
    }

    conn = await db();
    
    // Fetch employee PAN number
    const [empRows] = await conn.query(
      "SELECT id, PANNumber, FirstName, LastName, EmployeeNumber FROM employees WHERE id = ?",
      [employee.id]
    );
    const empInfo = empRows[0] || {};

    // Fetch active documents
    const [documents] = await conn.query(
      `SELECT ed.id, ed.employee_id, ed.document_type_id, dt.code as document_type_code, 
              dt.name as document_type_name, dt.category, ed.financial_year, ed.document_name, 
              ed.original_file_name, ed.file_size, ed.mime_type, ed.version, ed.uploaded_at, ed.remarks
       FROM employee_documents ed
       JOIN document_types dt ON ed.document_type_id = dt.id
       WHERE ed.employee_id = ? AND ed.is_active = 1
       ORDER BY dt.category, ed.uploaded_at DESC`,
      [employee.id]
    );

    return res.json({
      success: true,
      data: {
        pan_number: empInfo.PANNumber || null,
        employee_id: employee.id,
        employee_name: `${empInfo.FirstName || ''} ${empInfo.LastName || ''}`.trim(),
        employee_code: empInfo.EmployeeNumber || '',
        documents: documents
      }
    });
  } catch (error) {
    console.error("Error fetching my documents:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch documents", error: error.message });
  } finally {
    if (conn) { try { await conn.end(); } catch (e) {} }
  }
};

/**
 * Get documents for a specific employee (HR View)
 */
exports.getEmployeeDocuments = async (req, res) => {
  let conn;
  try {
    const employeeId = parseInt(req.params.employeeId, 10);
    if (isNaN(employeeId)) {
      return res.status(400).json({ success: false, message: "Invalid employee ID" });
    }

    // Access control: HR/Admin can view any employee's docs; employees can only view their own
    if (req.user.role !== 'admin' && req.user.role !== 'hr') {
      const selfEmp = await findEmployeeByUserId(req.user.id);
      if (!selfEmp || selfEmp.id !== employeeId) {
        return res.status(403).json({ success: false, message: "Access denied. You can only view your own documents." });
      }
    }

    conn = await db();
    const [empRows] = await conn.query(
      "SELECT id, PANNumber, FirstName, LastName, EmployeeNumber FROM employees WHERE id = ?",
      [employeeId]
    );
    if (empRows.length === 0) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const empInfo = empRows[0];
    const [documents] = await conn.query(
      `SELECT ed.id, ed.employee_id, ed.document_type_id, dt.code as document_type_code, 
              dt.name as document_type_name, dt.category, ed.financial_year, ed.document_name, 
              ed.original_file_name, ed.file_size, ed.mime_type, ed.version, ed.uploaded_at, ed.remarks
       FROM employee_documents ed
       JOIN document_types dt ON ed.document_type_id = dt.id
       WHERE ed.employee_id = ? AND ed.is_active = 1
       ORDER BY dt.category, ed.uploaded_at DESC`,
      [employeeId]
    );

    return res.json({
      success: true,
      data: {
        pan_number: empInfo.PANNumber || null,
        employee_id: empInfo.id,
        employee_name: `${empInfo.FirstName || ''} ${empInfo.LastName || ''}`.trim(),
        employee_code: empInfo.EmployeeNumber || '',
        documents: documents
      }
    });
  } catch (error) {
    console.error("Error fetching employee documents:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch employee documents", error: error.message });
  } finally {
    if (conn) { try { await conn.end(); } catch (e) {} }
  }
};

/**
 * Get all document records across employees (HR Dashboard / Filters)
 */
exports.getAllDocuments = async (req, res) => {
  let conn;
  try {
    const { search, document_type_id, financial_year, category } = req.query;

    let sql = `
      SELECT ed.id, ed.employee_id, e.EmployeeNumber, e.FirstName, e.LastName, e.PANNumber,
             ed.document_type_id, dt.code as document_type_code, dt.name as document_type_name, 
             dt.category, ed.financial_year, ed.document_name, ed.original_file_name, 
             ed.file_size, ed.mime_type, ed.version, ed.uploaded_at, ed.remarks
      FROM employee_documents ed
      JOIN employees e ON ed.employee_id = e.id
      JOIN document_types dt ON ed.document_type_id = dt.id
      WHERE ed.is_active = 1
    `;
    const params = [];

    if (document_type_id) {
      sql += ` AND ed.document_type_id = ?`;
      params.push(document_type_id);
    }
    if (financial_year) {
      sql += ` AND ed.financial_year = ?`;
      params.push(financial_year);
    }
    if (category) {
      sql += ` AND dt.category = ?`;
      params.push(category);
    }
    if (search) {
      sql += ` AND (e.FirstName LIKE ? OR e.LastName LIKE ? OR e.EmployeeNumber LIKE ? OR e.PANNumber LIKE ? OR ed.document_name LIKE ?)`;
      const term = `%${search}%`;
      params.push(term, term, term, term, term);
    }

    sql += ` ORDER BY ed.uploaded_at DESC LIMIT 500`;

    conn = await db();
    const [rows] = await conn.query(sql, params);

    return res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching all documents:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch document dashboard records", error: error.message });
  } finally {
    if (conn) { try { await conn.end(); } catch (e) {} }
  }
};

/**
 * Individual Employee Document Upload
 */
exports.uploadSingleDocument = async (req, res) => {
  let conn;
  try {
    const { employee_id, document_type_id, financial_year, document_name, remarks } = req.body;
    const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);

    if (!file) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }
    if (!employee_id || !document_type_id) {
      return res.status(400).json({ success: false, message: "employee_id and document_type_id are required" });
    }

    conn = await db();

    // Verify employee & document type
    const [empRows] = await conn.query("SELECT id FROM employees WHERE id = ?", [employee_id]);
    if (empRows.length === 0) {
      return res.status(404).json({ success: false, message: "Target employee not found" });
    }

    const [typeRows] = await conn.query("SELECT id, code, category FROM document_types WHERE id = ?", [document_type_id]);
    if (typeRows.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid document type" });
    }
    const docType = typeRows[0];

    // Determine target directory: uploads/employee_documents/{employee_id}/{TYPE}/
    const subFolder = docType.code === 'FORM16' && financial_year 
      ? path.join("uploads", "employee_documents", String(employee_id), "FORM16", financial_year.replace('/', '_'))
      : path.join("uploads", "employee_documents", String(employee_id), docType.code);

    const fullDirPath = path.join(__dirname, "..", subFolder);
    if (!fs.existsSync(fullDirPath)) {
      fs.mkdirSync(fullDirPath, { recursive: true });
    }

    // Move file to target path
    const safeFileName = `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const destinationPath = path.join(fullDirPath, safeFileName);
    fs.renameSync(file.path, destinationPath);

    const relativeFilePath = path.join(subFolder, safeFileName).replace(/\\/g, '/');

    // Deactivate previous active document of same type for this employee if Form16/Identity
    if (['FORM16', 'PAN_CARD', 'AADHAAR', 'PASSPORT'].includes(docType.code)) {
      if (docType.code === 'FORM16' && financial_year) {
        await conn.query(
          "UPDATE employee_documents SET is_active = 0 WHERE employee_id = ? AND document_type_id = ? AND financial_year = ?",
          [employee_id, document_type_id, financial_year]
        );
      } else {
        await conn.query(
          "UPDATE employee_documents SET is_active = 0 WHERE employee_id = ? AND document_type_id = ?",
          [employee_id, document_type_id]
        );
      }
    }

    const [insertRes] = await conn.query(
      `INSERT INTO employee_documents 
       (employee_id, document_type_id, financial_year, document_name, original_file_name, file_path, file_size, mime_type, uploaded_by, remarks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        employee_id,
        document_type_id,
        financial_year || null,
        document_name || file.originalname,
        file.originalname,
        relativeFilePath,
        file.size,
        file.mimetype || 'application/octet-stream',
        req.user ? req.user.id : null,
        remarks || null
      ]
    );

    return res.json({
      success: true,
      message: "Document uploaded successfully",
      data: { id: insertRes.insertId, file_path: relativeFilePath }
    });
  } catch (error) {
    console.error("Error in single document upload:", error);
    return res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  } finally {
    if (conn) { try { await conn.end(); } catch (e) {} }
  }
};

/**
 * Bulk Form 16 Upload (ZIP file or multiple PDFs) with Auto PAN Matching
 */
exports.bulkForm16Upload = async (req, res) => {
  let conn;
  try {
    const financial_year = req.body.financial_year || `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`;
    const files = req.files || (req.file ? [req.file] : []);

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "No Form 16 file or ZIP archive attached in request" });
    }

    conn = await db();

    // 1. Fetch Form16 document_type_id
    const [typeRows] = await conn.query("SELECT id FROM document_types WHERE code = 'FORM16' LIMIT 1");
    if (typeRows.length === 0) {
      return res.status(500).json({ success: false, message: "Form 16 document type not configured in database" });
    }
    const form16TypeId = typeRows[0].id;

    // 2. Fetch all employees with non-null PAN numbers into a lookup map
    const [employees] = await conn.query(
      "SELECT id, EmployeeNumber, FirstName, LastName, PANNumber FROM employees WHERE PANNumber IS NOT NULL AND TRIM(PANNumber) != ''"
    );
    
    const panMap = new Map();
    for (const emp of employees) {
      if (emp.PANNumber) {
        const cleanPan = emp.PANNumber.trim().toUpperCase();
        panMap.set(cleanPan, emp);
      }
    }

    const results = [];
    let successCount = 0;
    let failCount = 0;

    // Helper to process a single PDF file
    const processPdfFile = async (filePath, originalName, fileSize) => {
      try {
        let extractedPan = null;

        // Method 1: Check original filename for PAN pattern
        const filenameMatches = originalName.toUpperCase().match(PAN_REGEX);
        if (filenameMatches && filenameMatches.length > 0) {
          extractedPan = filenameMatches[0];
        } else {
          // Method 2: Inspect raw text buffer of PDF file
          const buffer = fs.readFileSync(filePath);
          const rawText = buffer.toString('utf8', 0, Math.min(buffer.length, 100000));
          const textMatches = rawText.toUpperCase().match(PAN_REGEX);
          if (textMatches && textMatches.length > 0) {
            // Find a matched PAN in panMap if available
            for (const panCandidate of textMatches) {
              if (panMap.has(panCandidate)) {
                extractedPan = panCandidate;
                break;
              }
            }
            if (!extractedPan) extractedPan = textMatches[0];
          }
        }

        if (!extractedPan) {
          failCount++;
          results.push({
            file_name: originalName,
            matched: false,
            pan: null,
            reason: "No PAN number detected in file content or filename"
          });
          return;
        }

        const matchedEmp = panMap.get(extractedPan.toUpperCase());
        if (!matchedEmp) {
          failCount++;
          results.push({
            file_name: originalName,
            matched: false,
            pan: extractedPan,
            reason: `PAN ${extractedPan} extracted, but no matching employee found in database`
          });
          return;
        }

        // Store file under uploads/employee_documents/{employee_id}/FORM16/{financial_year}/
        const subFolder = path.join("uploads", "employee_documents", String(matchedEmp.id), "FORM16", financial_year.replace('/', '_'));
        const fullDirPath = path.join(__dirname, "..", subFolder);
        if (!fs.existsSync(fullDirPath)) {
          fs.mkdirSync(fullDirPath, { recursive: true });
        }

        const safeFileName = `Form16_${extractedPan}_${financial_year.replace('/', '_')}_${Date.now()}.pdf`;
        const destPath = path.join(fullDirPath, safeFileName);
        fs.copyFileSync(filePath, destPath);

        const relativeFilePath = path.join(subFolder, safeFileName).replace(/\\/g, '/');

        // Deactivate old Form 16 for same FY
        await conn.query(
          "UPDATE employee_documents SET is_active = 0 WHERE employee_id = ? AND document_type_id = ? AND financial_year = ?",
          [matchedEmp.id, form16TypeId, financial_year]
        );

        // Insert document record
        await conn.query(
          `INSERT INTO employee_documents 
           (employee_id, document_type_id, financial_year, document_name, original_file_name, file_path, file_size, mime_type, uploaded_by, remarks)
           VALUES (?, ?, ?, ?, ?, ?, ?, 'application/pdf', ?, 'Auto-matched via Form 16 Bulk Upload')`,
          [
            matchedEmp.id,
            form16TypeId,
            financial_year,
            `Form 16 (${financial_year})`,
            originalName,
            relativeFilePath,
            fileSize,
            req.user ? req.user.id : null
          ]
        );

        successCount++;
        results.push({
          file_name: originalName,
          matched: true,
          pan: extractedPan,
          employee_id: matchedEmp.id,
          employee_code: matchedEmp.EmployeeNumber,
          employee_name: `${matchedEmp.FirstName || ''} ${matchedEmp.LastName || ''}`.trim()
        });
      } catch (fileErr) {
        failCount++;
        results.push({
          file_name: originalName,
          matched: false,
          pan: null,
          reason: `Error processing file: ${fileErr.message}`
        });
      }
    };

    // Iterate over uploaded files (handling multi-file or zip extraction)
    for (const file of files) {
      if (file.originalname.toLowerCase().endsWith('.zip')) {
        let zipHandled = false;
        try {
          const AdmZip = require('adm-zip');
          const zip = new AdmZip(file.path);
          const zipEntries = zip.getEntries();

          for (const entry of zipEntries) {
            if (!entry.isDirectory && entry.entryName.toLowerCase().endsWith('.pdf')) {
              const tempPath = path.join(__dirname, "..", "uploads", `temp_${Date.now()}_${path.basename(entry.entryName)}`);
              fs.writeFileSync(tempPath, entry.getData());
              await processPdfFile(tempPath, path.basename(entry.entryName), entry.header.size);
              if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            }
          }
          zipHandled = true;
        } catch (zipErr) {
          console.warn("Zip extraction fallback:", zipErr.message);
        }

        if (!zipHandled) {
          failCount++;
          results.push({
            file_name: file.originalname,
            matched: false,
            pan: null,
            reason: "ZIP file processing failed or invalid format"
          });
        }
      } else {
        await processPdfFile(file.path, file.originalname, file.size);
      }

      // Cleanup temp uploaded file
      if (fs.existsSync(file.path)) {
        try { fs.unlinkSync(file.path); } catch (e) {}
      }
    }

    return res.json({
      success: true,
      message: `Bulk processing complete. ${successCount} mapped successfully, ${failCount} failed.`,
      summary: {
        financial_year,
        total_files: files.length,
        successful_count: successCount,
        failed_count: failCount,
        results
      }
    });

  } catch (error) {
    console.error("Error in bulk Form 16 upload:", error);
    return res.status(500).json({ success: false, message: "Bulk upload failed", error: error.message });
  } finally {
    if (conn) { try { await conn.end(); } catch (e) {} }
  }
};

/**
 * Download Document
 */
exports.downloadDocument = async (req, res) => {
  let conn;
  try {
    const docId = parseInt(req.params.id, 10);
    if (isNaN(docId)) return res.status(400).send("Invalid document ID");

    conn = await db();
    const [docs] = await conn.query("SELECT * FROM employee_documents WHERE id = ?", [docId]);

    if (docs.length === 0) return res.status(404).send("Document record not found");

    const doc = docs[0];

    // Access control check
    if (req.user.role !== 'admin' && req.user.role !== 'hr') {
      const employee = await findEmployeeByUserId(req.user.id);
      if (!employee || employee.id !== doc.employee_id) {
        return res.status(403).send("Access denied. You can only download your own documents.");
      }
    }

    const fullFilePath = path.join(__dirname, "..", doc.file_path);
    if (!fs.existsSync(fullFilePath)) {
      return res.status(404).send("File not found on storage");
    }

    return res.download(fullFilePath, doc.original_file_name);
  } catch (error) {
    console.error("Error downloading document:", error);
    return res.status(500).send("Failed to download file");
  } finally {
    if (conn) { try { await conn.end(); } catch (e) {} }
  }
};

/**
 * Preview Document (inline stream)
 */
exports.previewDocument = async (req, res) => {
  let conn;
  try {
    const docId = parseInt(req.params.id, 10);
    if (isNaN(docId)) return res.status(400).send("Invalid document ID");

    conn = await db();
    const [docs] = await conn.query("SELECT * FROM employee_documents WHERE id = ?", [docId]);

    if (docs.length === 0) return res.status(404).send("Document not found");

    const doc = docs[0];

    if (req.user.role !== 'admin' && req.user.role !== 'hr') {
      const employee = await findEmployeeByUserId(req.user.id);
      if (!employee || employee.id !== doc.employee_id) {
        return res.status(403).send("Access denied.");
      }
    }

    const fullFilePath = path.join(__dirname, "..", doc.file_path);
    if (!fs.existsSync(fullFilePath)) {
      return res.status(404).send("File not found on storage");
    }

    res.setHeader("Content-Type", doc.mime_type || "application/octet-stream");
    res.setHeader("Content-Disposition", `inline; filename="${doc.original_file_name}"`);
    return fs.createReadStream(fullFilePath).pipe(res);
  } catch (error) {
    console.error("Error previewing document:", error);
    return res.status(500).send("Failed to preview document");
  } finally {
    if (conn) { try { await conn.end(); } catch (e) {} }
  }
};

/**
 * Soft Delete / Deactivate Document (HR Only)
 */
exports.deleteDocument = async (req, res) => {
  let conn;
  try {
    const docId = parseInt(req.params.id, 10);
    if (isNaN(docId)) return res.status(400).json({ success: false, message: "Invalid document ID" });

    conn = await db();
    await conn.query("UPDATE employee_documents SET is_active = 0 WHERE id = ?", [docId]);

    return res.json({ success: true, message: "Document deactivated successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    return res.status(500).json({ success: false, message: "Failed to delete document", error: error.message });
  } finally {
    if (conn) { try { await conn.end(); } catch (e) {} }
  }
};
