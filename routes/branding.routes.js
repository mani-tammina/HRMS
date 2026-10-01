const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { db } = require("../config/database");
const { auth, roleAuth } = require("../middleware/auth");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads/branding");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e4);
    cb(null, `logo_${cleanName}_${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|svg|webp|ico/;
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
  const mime = file.mimetype.toLowerCase();

  if (allowedTypes.test(ext) || allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (PNG, JPG, JPEG, SVG, WEBP, ICO) are allowed!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter,
});

/**
 * Helper to ensure at least one company_branding record exists
 */
async function getOrCreateBranding(connection) {
  const [rows] = await connection.query("SELECT * FROM company_branding ORDER BY id ASC LIMIT 1");
  if (rows && rows.length > 0) {
    return rows[0];
  }

  // Insert default record
  const defaultData = {
    company_name: "Tech Tammina",
    legal_name: "Tech Tammina LLC",
    tagline: "Empowering Innovation & Digital Transformation",
    website: "https://www.tammina.com",
    email: "contact@tammina.com",
    phone: "+1 (703) 349-1070",
    tax_id: "",
    registration_number: "",
    logo_url: "assets/tt_blue_logo.png",
    favicon_url: "",
    primary_color: "#2563eb",
    secondary_color: "#1e40af",
    about_us: "Tech Tammina provides premium software development, IT staffing, enterprise cloud services, and comprehensive human capital management solutions globally.",
    mission: "To deliver exceptional digital transformation and human resources agility through innovative technology and high-integrity consulting.",
    vision: "To be a world-class technology partner driving workforce excellence, employee empowerment, and enterprise success.",
    core_values: "Integrity, Innovation, Customer Success, Transparency, Teamwork",
    linkedin_url: "https://www.linkedin.com/company/tech-tammina",
    twitter_url: "https://twitter.com/techtammina",
    facebook_url: "https://facebook.com/techtammina",
    instagram_url: "",
    youtube_url: "",
  };

  const [result] = await connection.query("INSERT INTO company_branding SET ?", [defaultData]);
  const [newRows] = await connection.query("SELECT * FROM company_branding WHERE id = ?", [result.insertId]);
  return newRows[0];
}

/* =========================================================================
   GET /api/company-branding - Get Company Branding and Overview (Public)
========================================================================= */
router.get("/", async (req, res) => {
  let c;
  try {
    c = await db();
    const branding = await getOrCreateBranding(c);
    res.json(branding);
  } catch (err) {
    console.error("Error fetching company branding:", err);
    res.status(500).json({ error: "Failed to fetch company branding: " + err.message });
  } finally {
    if (c) c.end();
  }
});

/* =========================================================================
   PUT /api/company-branding - Update Company Branding & Content
========================================================================= */
router.put("/", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  let c;
  try {
    const {
      company_name,
      legal_name,
      tagline,
      website,
      email,
      phone,
      tax_id,
      registration_number,
      logo_url,
      favicon_url,
      primary_color,
      secondary_color,
      about_us,
      mission,
      vision,
      core_values,
      linkedin_url,
      twitter_url,
      facebook_url,
      instagram_url,
      youtube_url,
    } = req.body;

    if (!company_name || !company_name.trim()) {
      return res.status(400).json({ error: "Company name is required." });
    }

    c = await db();
    const existing = await getOrCreateBranding(c);

    const updateData = {
      company_name: company_name ? company_name.trim() : existing.company_name,
      legal_name: legal_name !== undefined ? legal_name : existing.legal_name,
      tagline: tagline !== undefined ? tagline : existing.tagline,
      website: website !== undefined ? website : existing.website,
      email: email !== undefined ? email : existing.email,
      phone: phone !== undefined ? phone : existing.phone,
      tax_id: tax_id !== undefined ? tax_id : existing.tax_id,
      registration_number: registration_number !== undefined ? registration_number : existing.registration_number,
      logo_url: logo_url !== undefined ? logo_url : existing.logo_url,
      favicon_url: favicon_url !== undefined ? favicon_url : existing.favicon_url,
      primary_color: primary_color || existing.primary_color || "#2563eb",
      secondary_color: secondary_color || existing.secondary_color || "#1e40af",
      about_us: about_us !== undefined ? about_us : existing.about_us,
      mission: mission !== undefined ? mission : existing.mission,
      vision: vision !== undefined ? vision : existing.vision,
      core_values: core_values !== undefined ? core_values : existing.core_values,
      linkedin_url: linkedin_url !== undefined ? linkedin_url : existing.linkedin_url,
      twitter_url: twitter_url !== undefined ? twitter_url : existing.twitter_url,
      facebook_url: facebook_url !== undefined ? facebook_url : existing.facebook_url,
      instagram_url: instagram_url !== undefined ? instagram_url : existing.instagram_url,
      youtube_url: youtube_url !== undefined ? youtube_url : existing.youtube_url,
    };

    await c.query("UPDATE company_branding SET ? WHERE id = ?", [updateData, existing.id]);

    const [updatedRows] = await c.query("SELECT * FROM company_branding WHERE id = ?", [existing.id]);

    res.json({
      success: true,
      message: "Company branding updated successfully.",
      data: updatedRows[0],
    });
  } catch (err) {
    console.error("Error updating company branding:", err);
    res.status(500).json({ error: "Failed to update company branding: " + err.message });
  } finally {
    if (c) c.end();
  }
});

/* =========================================================================
   POST /api/company-branding/logo - Upload Company Logo
========================================================================= */
router.post("/logo", auth, roleAuth(["admin", "hr"]), upload.single("logo"), async (req, res) => {
  let c;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a valid logo image file." });
    }

    const relativePath = `/uploads/branding/${req.file.filename}`;

    c = await db();
    const existing = await getOrCreateBranding(c);

    await c.query("UPDATE company_branding SET logo_url = ? WHERE id = ?", [relativePath, existing.id]);

    res.json({
      success: true,
      message: "Company logo uploaded successfully.",
      logo_url: relativePath,
    });
  } catch (err) {
    console.error("Error uploading logo:", err);
    res.status(500).json({ error: "Failed to upload logo: " + err.message });
  } finally {
    if (c) c.end();
  }
});

/* =========================================================================
   LOCATIONS MANAGEMENT (Enhanced with detailed addresses)
========================================================================= */

// GET /api/company-branding/locations - Get all locations with full address
router.get("/locations", auth, async (req, res) => {
  let c;
  try {
    c = await db();
    const [rows] = await c.query(`
      SELECT 
        id, 
        name, 
        country, 
        address_line1, 
        address_line2, 
        city, 
        state, 
        postal_code, 
        phone_number, 
        email, 
        timezone, 
        is_headquarters, 
        created_at, 
        updated_at 
      FROM locations 
      ORDER BY is_headquarters DESC, name ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching locations with addresses:", err);
    res.status(500).json({ error: "Failed to fetch locations: " + err.message });
  } finally {
    if (c) c.end();
  }
});

// POST /api/company-branding/locations - Create new location with address
router.post("/locations", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  let c;
  try {
    const {
      name,
      country,
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      phone_number,
      email,
      timezone,
      is_headquarters,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Location name is required." });
    }

    c = await db();

    // Check duplicate
    const [existing] = await c.query("SELECT id FROM locations WHERE name = ?", [name.trim()]);
    if (existing.length > 0) {
      return res.status(409).json({ error: `Location '${name.trim()}' already exists.` });
    }

    // If marked as headquarters, unset previous headquarters
    if (is_headquarters) {
      await c.query("UPDATE locations SET is_headquarters = 0");
    }

    const payload = {
      name: name.trim(),
      country: country || null,
      address_line1: address_line1 || null,
      address_line2: address_line2 || null,
      city: city || null,
      state: state || null,
      postal_code: postal_code || null,
      phone_number: phone_number || null,
      email: email || null,
      timezone: timezone || null,
      is_headquarters: is_headquarters ? 1 : 0,
    };

    const [result] = await c.query("INSERT INTO locations SET ?", [payload]);

    res.status(201).json({
      success: true,
      message: "Location created successfully.",
      id: result.insertId,
      ...payload,
    });
  } catch (err) {
    console.error("Error creating location:", err);
    res.status(500).json({ error: "Failed to create location: " + err.message });
  } finally {
    if (c) c.end();
  }
});

// PUT /api/company-branding/locations/:id - Update location with full address
router.put("/locations/:id", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  let c;
  try {
    const id = req.params.id;
    const {
      name,
      country,
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      phone_number,
      email,
      timezone,
      is_headquarters,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Location name is required." });
    }

    c = await db();

    // Check if location exists
    const [locRows] = await c.query("SELECT id FROM locations WHERE id = ?", [id]);
    if (locRows.length === 0) {
      return res.status(404).json({ error: "Location not found." });
    }

    // Check duplicate name
    const [duplicateRows] = await c.query(
      "SELECT id FROM locations WHERE name = ? AND id != ?",
      [name.trim(), id]
    );
    if (duplicateRows.length > 0) {
      return res.status(409).json({ error: `Another location named '${name.trim()}' already exists.` });
    }

    // If marked as headquarters, unset other headquarters
    if (is_headquarters) {
      await c.query("UPDATE locations SET is_headquarters = 0 WHERE id != ?", [id]);
    }

    const payload = {
      name: name.trim(),
      country: country || null,
      address_line1: address_line1 !== undefined ? address_line1 : null,
      address_line2: address_line2 !== undefined ? address_line2 : null,
      city: city !== undefined ? city : null,
      state: state !== undefined ? state : null,
      postal_code: postal_code !== undefined ? postal_code : null,
      phone_number: phone_number !== undefined ? phone_number : null,
      email: email !== undefined ? email : null,
      timezone: timezone !== undefined ? timezone : null,
      is_headquarters: is_headquarters ? 1 : 0,
    };

    await c.query("UPDATE locations SET ? WHERE id = ?", [payload, id]);

    res.json({
      success: true,
      message: "Location updated successfully.",
      id,
      ...payload,
    });
  } catch (err) {
    console.error("Error updating location:", err);
    res.status(500).json({ error: "Failed to update location: " + err.message });
  } finally {
    if (c) c.end();
  }
});

// DELETE /api/company-branding/locations/:id - Delete location
router.delete("/locations/:id", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  let c;
  try {
    const id = req.params.id;
    c = await db();

    // Check if location is referenced in employees
    const [empCheck] = await c.query("SELECT id FROM employees WHERE LocationId = ? LIMIT 1", [id]);
    if (empCheck.length > 0) {
      return res.status(400).json({
        error: "Cannot delete this location because it is currently assigned to one or more employees.",
      });
    }

    const [result] = await c.query("DELETE FROM locations WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Location not found." });
    }

    res.json({
      success: true,
      message: "Location deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting location:", err);
    res.status(500).json({ error: "Failed to delete location: " + err.message });
  } finally {
    if (c) c.end();
  }
});

module.exports = router;
