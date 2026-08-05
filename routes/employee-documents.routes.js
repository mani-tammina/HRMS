/**
 * EMPLOYEE DOCUMENTS ROUTES
 * API endpoints for document management and bulk Form 16 upload
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { auth, hr, admin } = require("../middleware/auth");
const controller = require("../controllers/employee-documents.controller");

// Multer storage configuration for temporary upload before processing
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "..", "uploads", "temp");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for ZIP or PDF
});

// Middleware wrapper to catch Multer file upload errors cleanly as JSON
const handleUpload = (multerMiddleware) => {
  return (req, res, next) => {
    multerMiddleware(req, res, (err) => {
      if (err) {
        console.error("Multer file upload error:", err.message);
        return res.status(400).json({
          success: false,
          message: `File upload error: ${err.message}`
        });
      }
      next();
    });
  };
};

/* ============ PUBLIC / AUTHENTICATED EMPLOYEE ROUTES ============ */
router.get("/types", auth, controller.getDocumentTypes);
router.get("/my-documents", auth, controller.getMyDocuments);
router.get("/download/:id", auth, controller.downloadDocument);
router.get("/preview/:id", auth, controller.previewDocument);

/* ============ HR / ADMIN & SELF-SERVICE ROUTES ============ */
router.post("/types", auth, hr, controller.addDocumentType);
router.get("/employee/:employeeId", auth, controller.getEmployeeDocuments);
router.get("/:employeeId", auth, (req, res, next) => {
  if (/^\d+$/.test(req.params.employeeId)) {
    return controller.getEmployeeDocuments(req, res, next);
  }
  next();
});
router.get("/all", auth, hr, controller.getAllDocuments);

// Single document upload by HR (accepts any file field name)
router.post("/upload", auth, hr, handleUpload(upload.any()), controller.uploadSingleDocument);

// Bulk Form 16 upload by HR (supports ZIP or multiple PDFs under any field name)
router.post("/bulk-form16", auth, hr, handleUpload(upload.any()), controller.bulkForm16Upload);

// Helpful GET handler for bulk-form16 when accessed via browser/GET
router.get("/bulk-form16", auth, hr, (req, res) => {
  return res.json({
    success: true,
    message: "Bulk Form 16 Endpoint is Active. Use POST with multipart/form-data containing files and financial_year."
  });
});

// Soft delete / deactivate document (HR only)
router.delete("/:id", auth, hr, controller.deleteDocument);

module.exports = router;
