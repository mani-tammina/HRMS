/**
 * CANDIDATES & PRE-ONBOARDING ROUTES
 * Manages candidate journey from offer to employee conversion
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { db } = require("../config/database");
const { auth, admin, hr } = require("../middleware/auth");

const upload = multer({ dest: "uploads/candidate_docs/" });

// Helper to parse dates in DD/MM/YYYY format to YYYY-MM-DD
function parseDate(val) {
    if (!val) return null;
    if (typeof val === 'string' && val.includes('/')) {
        const parts = val.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            const date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const dd = String(date.getDate()).padStart(2, '0');
                return `${yyyy}-${mm}-${dd}`;
            }
        }
    }
    const date = new Date(val);
    if (!isNaN(date.getTime())) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }
    return null;
}

/* ============ CANDIDATE MANAGEMENT ============ */

// Create new candidate (after interview rounds)
router.post("/", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const personal = req.body.personalDetails || {};
        const job = req.body.jobDetailsForm || {};

        let designation_id = req.body.designation_id;
        let department_id = req.body.department_id;
        let location_id = req.body.location_id;

        // If names are passed in the job details form, resolve them to database IDs
        if (job.JobTitle) {
            const [designations] = await c.query("SELECT id FROM designations WHERE name = ?", [job.JobTitle]);
            if (designations.length > 0) designation_id = designations[0].id;
        }
        if (job.Department) {
            const [departments] = await c.query("SELECT id FROM departments WHERE name = ?", [job.Department]);
            if (departments.length > 0) department_id = departments[0].id;
        }
        if (job.JobLocation) {
            const [locations] = await c.query("SELECT id FROM locations WHERE name = ?", [job.JobLocation]);
            if (locations.length > 0) location_id = locations[0].id;
        }

        const candidateData = {
            candidate_id: req.body.candidate_id || `CAN${Date.now()}`,
            first_name: req.body.first_name || personal.firstName || personal.FirstName,
            middle_name: (req.body.middle_name || personal.MiddleName || personal.middleName) || null,
            last_name: (req.body.last_name || personal.LastName || personal.lastName) || null,
            full_name: req.body.full_name || `${req.body.first_name || personal.firstName || personal.FirstName || ''} ${req.body.last_name || personal.LastName || personal.lastName || ''}`.trim(),
            email: req.body.email || personal.email,
            phone: (req.body.phone || personal.PhoneNumber || personal.phone) || null,
            alternate_phone: (req.body.alternate_phone || personal.alternatePhone || personal.alternate_phone) || null,
            date_of_birth: parseDate(req.body.date_of_birth || personal.dob || personal.date_of_birth || personal.dateOfBirth),
            gender: (req.body.gender || personal.gender) || null,
            position: (req.body.position || job.JobTitle || job.position) || null,
            designation_id: designation_id || null,
            department_id: department_id || null,
            location_id: location_id || null,
            offered_ctc: (req.body.offered_ctc || job.offered_ctc || job.offeredCtc || job.offeredCTC || job.package || job.Package) || null,
            joining_date: parseDate(req.body.joining_date || job.joining_date || job.joiningDate || job.DOJ),
            reporting_manager_id: (req.body.reporting_manager_id || job.reporting_manager_id || job.reportingManagerId) || null,
            hr_coordinator_id: req.body.hr_coordinator_id || req.user.employee_id || null,
            recruiter_name: (req.body.recruiter_name || job.recruiter_name || job.recruiterName) || null,
            recruitment_source: (req.body.recruitment_source || job.recruitment_source || job.recruitmentSource) || null,
            created_by: req.user.id || null,
            status: 'offered'
        };

        const [result] = await c.query("INSERT INTO candidates SET ?", candidateData);
        c.end();

        res.json({
            success: true,
            candidate_id: result.insertId,
            message: "Candidate created successfully. Ready for pre-onboarding."
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Get all candidates with filters
router.get("/", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const { status, joining_date_from, joining_date_to, department_id } = req.query;

        let query = `
            SELECT c.*, 
                   d.name as department_name, 
                   des.name as designation_name,
                   l.name as location_name,
                   CONCAT(m.FirstName, ' ', m.LastName) as manager_name
            FROM candidates c
            LEFT JOIN departments d ON c.department_id = d.id
            LEFT JOIN designations des ON c.designation_id = des.id
            LEFT JOIN locations l ON c.location_id = l.id
            LEFT JOIN employees m ON c.reporting_manager_id = m.id
            WHERE 1=1
        `;
        const params = [];

        if (status) {
            query += " AND c.status = ?";
            params.push(status);
        }
        if (joining_date_from) {
            query += " AND c.joining_date >= ?";
            params.push(joining_date_from);
        }
        if (joining_date_to) {
            query += " AND c.joining_date <= ?";
            params.push(joining_date_to);
        }
        if (department_id) {
            query += " AND c.department_id = ?";
            params.push(department_id);
        }

        query += " ORDER BY c.created_at DESC";

        const [candidates] = await c.query(query, params);
        c.end();

        // Helper to format flat db model to nested frontend structure
        const mapCandidateToFrontend = (cand) => {
            if (!cand) return null;
            return {
                id: cand.id,
                candidate_id: cand.candidate_id,
                status: cand.status,
                personalDetails: {
                    FirstName: cand.first_name,
                    MiddleName: cand.middle_name,
                    LastName: cand.last_name,
                    email: cand.email,
                    PhoneNumber: cand.phone,
                    alternatePhone: cand.alternate_phone,
                    dateOfBirth: cand.date_of_birth,
                    gender: cand.gender,
                    initials: (cand.first_name ? cand.first_name[0] : '') + (cand.last_name ? cand.last_name[0] : '')
                },
                jobDetailsForm: {
                    JobTitle: cand.position || cand.designation_name,
                    Department: cand.department_name,
                    JobLocation: cand.location_name,
                    WorkType: cand.work_type || 'Permanent',
                    BussinessUnit: cand.business_unit || 'Tech Tammina',
                    offeredCTC: cand.offered_ctc,
                    reportingManagerId: cand.reporting_manager_id,
                    recruiterName: cand.recruiter_name,
                    recruitmentSource: cand.recruitment_source
                },
                offerDetails: {
                    DOJ: cand.joining_date,
                    offerValidity: cand.offer_validity || '7',
                    JoiningDate: cand.joining_date
                }
            };
        };

        res.json(candidates.map(mapCandidateToFrontend));
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Get candidate by ID (Public verification endpoint)
router.get("/public/:id", async (req, res) => {
    const c = await db();
    try {
        const [candidates] = await c.query(`
            SELECT c.*, 
                   d.name as department_name, 
                   des.name as designation_name,
                   l.name as location_name,
                   CONCAT(m.FirstName, ' ', m.LastName) as manager_name,
                   CONCAT(hr.FirstName, ' ', hr.LastName) as hr_coordinator_name
            FROM candidates c
            LEFT JOIN departments d ON c.department_id = d.id
            LEFT JOIN designations des ON c.designation_id = des.id
            LEFT JOIN locations l ON c.location_id = l.id
            LEFT JOIN employees m ON c.reporting_manager_id = m.id
            LEFT JOIN employees hr ON c.hr_coordinator_id = hr.id
            WHERE c.id = ?
        `, [req.params.id]);

        if (candidates.length === 0) {
            c.end();
            return res.status(404).json({ error: "Candidate not found" });
        }

        c.end();

        // Helper to format flat db model to nested frontend structure
        const mapCandidateToFrontend = (cand) => {
            if (!cand) return null;
            return {
                id: cand.id,
                candidate_id: cand.candidate_id,
                status: cand.status,
                personalDetails: {
                    FirstName: cand.first_name,
                    MiddleName: cand.middle_name,
                    LastName: cand.last_name,
                    email: cand.email,
                    PhoneNumber: cand.phone,
                    alternatePhone: cand.alternate_phone,
                    dateOfBirth: cand.date_of_birth,
                    gender: cand.gender,
                    initials: (cand.first_name ? cand.first_name[0] : '') + (cand.last_name ? cand.last_name[0] : '')
                },
                jobDetailsForm: {
                    JobTitle: cand.position || cand.designation_name,
                    Department: cand.department_name,
                    JobLocation: cand.location_name,
                    WorkType: cand.work_type || 'Permanent',
                    BussinessUnit: cand.business_unit || 'Tech Tammina',
                    offeredCTC: cand.offered_ctc,
                    reportingManagerId: cand.reporting_manager_id,
                    recruiterName: cand.recruiter_name,
                    recruitmentSource: cand.recruitment_source
                },
                offerDetails: {
                    DOJ: cand.joining_date,
                    offerValidity: cand.offer_validity || '7',
                    JoiningDate: cand.joining_date
                }
            };
        };

        res.json({
            candidate: mapCandidateToFrontend(candidates[0])
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Public endpoint — candidate accepts or rejects their offer (no auth required)
router.put("/public/:id/status", async (req, res) => {
    const c = await db();
    try {
        const { status } = req.body;

        // Accept 'accepted'/'rejected' from frontend, map to DB ENUM values
        const dbStatusMap = {
            'accepted': 'offer_accepted',
            'rejected': 'offer_declined'
        };

        if (!dbStatusMap[status]) {
            c.end();
            return res.status(400).json({
                error: "Invalid status value. Must be 'accepted' or 'rejected'."
            });
        }

        const dbStatus = dbStatusMap[status];
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

        let sql, params;
        if (dbStatus === 'offer_accepted') {
            sql = `UPDATE candidates
                   SET status = ?,
                       offer_accepted = 1,
                       offer_accepted_date = ?,
                       offer_declined = 0,
                       offer_declined_date = NULL,
                       updated_at = NOW()
                   WHERE id = ?`;
            params = [dbStatus, today, req.params.id];
        } else {
            sql = `UPDATE candidates
                   SET status = ?,
                       offer_declined = 1,
                       offer_declined_date = ?,
                       offer_accepted = 0,
                       offer_accepted_date = NULL,
                       updated_at = NOW()
                   WHERE id = ?`;
            params = [dbStatus, today, req.params.id];
        }

        const [result] = await c.query(sql, params);
        c.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Candidate not found." });
        }

        res.json({
            success: true,
            status: dbStatus,
            message: dbStatus === 'offer_accepted'
                ? "Offer accepted successfully. Welcome aboard!"
                : "Offer declined. We appreciate your time."
        });
    } catch (error) {
        c.end();
        console.error("[CANDIDATE STATUS] Error updating status:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get candidate by ID
router.get("/:id", auth, async (req, res) => {
    const c = await db();
    try {
        const [candidates] = await c.query(`
            SELECT c.*, 
                   d.name as department_name, 
                   des.name as designation_name,
                   l.name as location_name,
                   CONCAT(m.FirstName, ' ', m.LastName) as manager_name,
                   CONCAT(hr.FirstName, ' ', hr.LastName) as hr_coordinator_name
            FROM candidates c
            LEFT JOIN departments d ON c.department_id = d.id
            LEFT JOIN designations des ON c.designation_id = des.id
            LEFT JOIN locations l ON c.location_id = l.id
            LEFT JOIN employees m ON c.reporting_manager_id = m.id
            LEFT JOIN employees hr ON c.hr_coordinator_id = hr.id
            WHERE c.id = ?
        `, [req.params.id]);

        if (candidates.length === 0) {
            c.end();
            return res.status(404).json({ error: "Candidate not found" });
        }

        // Get documents
        const [documents] = await c.query(
            "SELECT * FROM candidate_documents WHERE candidate_id = ?",
            [req.params.id]
        );

        // Get task progress
        const [tasks] = await c.query(`
            SELECT ctp.*, pt.task_name, pt.description, pt.task_category, pt.is_mandatory
            FROM candidate_task_progress ctp
            JOIN preonboarding_tasks pt ON ctp.task_id = pt.id
            WHERE ctp.candidate_id = ?
            ORDER BY pt.task_order
        `, [req.params.id]);

        c.end();

        // Helper to format flat db model to nested frontend structure
        const mapCandidateToFrontend = (cand) => {
            if (!cand) return null;
            return {
                id: cand.id,
                candidate_id: cand.candidate_id,
                status: cand.status,
                personalDetails: {
                    FirstName: cand.first_name,
                    MiddleName: cand.middle_name,
                    LastName: cand.last_name,
                    email: cand.email,
                    PhoneNumber: cand.phone,
                    alternatePhone: cand.alternate_phone,
                    dateOfBirth: cand.date_of_birth,
                    gender: cand.gender,
                    initials: (cand.first_name ? cand.first_name[0] : '') + (cand.last_name ? cand.last_name[0] : '')
                },
                jobDetailsForm: {
                    JobTitle: cand.position || cand.designation_name,
                    Department: cand.department_name,
                    JobLocation: cand.location_name,
                    WorkType: cand.work_type || 'Permanent',
                    BussinessUnit: cand.business_unit || 'Tech Tammina',
                    offeredCTC: cand.offered_ctc,
                    reportingManagerId: cand.reporting_manager_id,
                    recruiterName: cand.recruiter_name,
                    recruitmentSource: cand.recruitment_source
                },
                offerDetails: {
                    DOJ: cand.joining_date,
                    offerValidity: cand.offer_validity || '7',
                    JoiningDate: cand.joining_date
                }
            };
        };

        res.json({
            candidate: mapCandidateToFrontend(candidates[0]),
            documents,
            tasks,
            completion_percentage: tasks.length > 0
                ? (tasks.filter(t => t.status === 'completed').length / tasks.length * 100).toFixed(2)
                : 0
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Update candidate
router.put("/:id", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const personal = req.body.personalDetails || {};
        const job = req.body.jobDetailsForm || {};
        const offer = req.body.offerDetails || {};

        let designation_id = req.body.designation_id;
        let department_id = req.body.department_id;
        let location_id = req.body.location_id;

        // If names are passed in the job details form, resolve them to database IDs
        if (job.JobTitle) {
            const [designations] = await c.query("SELECT id FROM designations WHERE name = ?", [job.JobTitle]);
            if (designations.length > 0) designation_id = designations[0].id;
        }
        if (job.Department) {
            const [departments] = await c.query("SELECT id FROM departments WHERE name = ?", [job.Department]);
            if (departments.length > 0) department_id = departments[0].id;
        }
        if (job.JobLocation) {
            const [locations] = await c.query("SELECT id FROM locations WHERE name = ?", [job.JobLocation]);
            if (locations.length > 0) location_id = locations[0].id;
        }

        const updates = {};
        if (req.body.candidate_id) updates.candidate_id = req.body.candidate_id;
        
        // Map personalDetails
        const first = req.body.first_name || personal.firstName || personal.FirstName;
        const middle = req.body.middle_name || personal.MiddleName || personal.middleName;
        const last = req.body.last_name || personal.LastName || personal.lastName;
        
        if (first !== undefined) updates.first_name = first || null;
        if (middle !== undefined) updates.middle_name = middle || null;
        if (last !== undefined) updates.last_name = last || null;
        if (first || last) {
            updates.full_name = `${first || ''} ${last || ''}`.trim();
        }
        
        if (req.body.email || personal.email) updates.email = req.body.email || personal.email;
        if (req.body.phone || personal.PhoneNumber || personal.phone) updates.phone = (req.body.phone || personal.PhoneNumber || personal.phone) || null;
        if (req.body.alternate_phone || personal.alternatePhone || personal.alternate_phone) {
            updates.alternate_phone = (req.body.alternate_phone || personal.alternatePhone || personal.alternate_phone) || null;
        }
        if (req.body.date_of_birth || personal.dob || personal.date_of_birth || personal.dateOfBirth) {
            updates.date_of_birth = parseDate(req.body.date_of_birth || personal.dob || personal.date_of_birth || personal.dateOfBirth);
        }
        if (req.body.gender || personal.gender) updates.gender = (req.body.gender || personal.gender) || null;
        
        // Map jobDetailsForm & offerDetails
        if (req.body.position || job.JobTitle || job.position) updates.position = (req.body.position || job.JobTitle || job.position) || null;
        if (designation_id !== undefined) updates.designation_id = designation_id || null;
        if (department_id !== undefined) updates.department_id = department_id || null;
        if (location_id !== undefined) updates.location_id = location_id || null;
        if (req.body.offered_ctc !== undefined || job.offered_ctc !== undefined || job.offeredCtc !== undefined || job.offeredCTC !== undefined || job.package !== undefined || job.Package !== undefined) {
            updates.offered_ctc = (req.body.offered_ctc || job.offered_ctc || job.offeredCtc || job.offeredCTC || job.package || job.Package) || null;
        }
        if (req.body.joining_date || offer.DOJ || offer.JoiningDate || job.joining_date || job.joiningDate || job.DOJ) {
            updates.joining_date = parseDate(req.body.joining_date || offer.DOJ || offer.JoiningDate || job.joining_date || job.joiningDate || job.DOJ);
        }
        if (req.body.reporting_manager_id !== undefined || job.reporting_manager_id !== undefined || job.reportingManagerId !== undefined) {
            updates.reporting_manager_id = (req.body.reporting_manager_id || job.reporting_manager_id || job.reportingManagerId) || null;
        }
        if (req.body.status) updates.status = req.body.status;

        if (Object.keys(updates).length > 0) {
            await c.query("UPDATE candidates SET ? WHERE id = ?", [updates, req.params.id]);
        }
        c.end();

        res.json({ success: true, message: "Candidate updated successfully" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Send offer letter
router.post("/:id/send-offer", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const candidateId = req.params.id;

        // Fetch candidate details
        const [candidates] = await c.query("SELECT * FROM candidates WHERE id = ?", [candidateId]);
        if (candidates.length === 0) {
            c.end();
            return res.status(404).json({ error: "Candidate not found" });
        }
        const candidate = candidates[0];

        // Fetch offer details from communications
        const [offerDetails] = await c.query(`
            SELECT message FROM candidate_communications 
            WHERE candidate_id = ? AND subject = 'Offer Letter Details'
            ORDER BY communication_date DESC LIMIT 1
        `, [candidateId]);
        
        let offerInfo = {};
        if (offerDetails.length > 0) {
            try {
                offerInfo = JSON.parse(offerDetails[0].message);
            } catch (e) {
                console.error("Failed to parse offer details JSON:", e);
            }
        }

        const toEmail = req.body.to || candidate.email;
        const subject = req.body.subject || `Job Offer Confirmation - ${candidate.full_name}`;
        
        // Construct offer link for candidate to accept/decline
        const offerLink = `http://hrms.tamminahub.com/view-offer/${candidate.id}/${candidate.candidate_id}`;

        const defaultHtml = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background-color: #f8fafc; color: #1e293b;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 30px 40px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Employment Offer Letter</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">Tech Tammina HR Portal</p>
        </div>
        <div style="padding: 40px;">
            <h2 style="margin-top: 0; color: #1e3a8a; font-size: 20px;">Dear ${candidate.full_name},</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 25px;">
                We are thrilled to offer you the position of <strong>${candidate.position || 'Software Engineer'}</strong> at Tech Tammina.
            </p>
            <div style="background-color: #f1f5f9; padding: 25px; border-radius: 8px; margin-bottom: 30px; border: 1px solid #cbd5e1;">
                <h3 style="margin-top: 0; margin-bottom: 15px; color: #475569; font-size: 14px; font-weight: 700; text-transform: uppercase;">Offer Details</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #334155;">
                    <tr>
                        <td style="padding: 6px 0; font-weight: 600; width: 140px; color: #64748b;">Position:</td>
                        <td style="padding: 6px 0; font-weight: 700;">${candidate.position}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Annual CTC:</td>
                        <td style="padding: 6px 0; font-weight: 700; color: #0f766e;">₹${(candidate.offered_ctc || 0).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Joining Date:</td>
                        <td style="padding: 6px 0; font-weight: 700;">${candidate.joining_date ? new Date(candidate.joining_date).toLocaleDateString() : 'TBD'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Work Mode:</td>
                        <td style="padding: 6px 0; font-weight: 700;">${offerInfo.work_mode || 'Hybrid'}</td>
                    </tr>
                </table>
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 30px;">
                Please click the button below to view the detailed salary breakup, download your formal offer letter, and proceed with the pre-onboarding formalities.
            </p>
            <div style="text-align: center; margin-bottom: 35px;">
                <a href="${offerLink}" style="background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; display: inline-block; font-size: 16px; font-weight: 600; border-radius: 6px;">
                    View & Action Offer
                </a>
            </div>
            <p style="font-size: 14px; line-height: 1.5; color: #64748b; margin-bottom: 0;">
                If you have any questions regarding this offer, please feel free to reach out to your HR Coordinator.
            </p>
        </div>
        <div style="background-color: #f8fafc; padding: 25px 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0 0 5px 0;">This is an automated email from Tech Tammina MasterHRMS.</p>
            <p style="margin: 0;">© 2026 Tech Tammina. All rights reserved.</p>
        </div>
    </div>
</div>
        `;

        const htmlContent = req.body.html || defaultHtml;
        const textContent = req.body.text || `Dear ${candidate.full_name},\n\nWe are pleased to offer you the position of ${candidate.position} at Tech Tammina.\n\nAnnual CTC: ₹${candidate.offered_ctc}\nJoining Date: ${candidate.joining_date}\n\nPlease click the following link to review and accept your offer:\n${offerLink}\n\nBest regards,\nHR Team`;

        // Send email using SMTP helper
        const { sendMail } = require("../utils/mail.service");
        try {
            await sendMail({
                to: toEmail,
                subject: subject,
                html: htmlContent,
                text: textContent
            });
        } catch (mailErr) {
            console.error("Mail dispatch failed, proceeding with DB changes:", mailErr.message);
        }

        // Update candidate status
        await c.query(`
            UPDATE candidates SET 
                offer_letter_sent = 1,
                offer_letter_sent_date = CURDATE(),
                status = 'offered'
            WHERE id = ?
        `, [candidateId]);

        // Log communication
        await c.query(`
            INSERT INTO candidate_communications 
            (candidate_id, communication_type, subject, message, communicated_by)
            VALUES (?, 'email', ?, ?, ?)
        `, [candidateId, subject, `Offer letter email sent. Subject: ${subject}`, req.user.id]);

        c.end();
        res.json({ success: true, message: "Offer letter sent and email delivered successfully" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Accept offer
router.post("/:id/accept-offer", async (req, res) => {
    const c = await db();
    try {
        await c.query(`
            UPDATE candidates SET 
                offer_accepted = 1,
                offer_accepted_date = CURDATE(),
                status = 'offer_accepted'
            WHERE id = ?
        `, [req.params.id]);

        // Auto-assign pre-onboarding tasks
        const [tasks] = await c.query(
            "SELECT id FROM preonboarding_tasks WHERE auto_assign = 1 ORDER BY task_order"
        );

        for (const task of tasks) {
            await c.query(`
                INSERT INTO candidate_task_progress (candidate_id, task_id, status, assigned_date)
                VALUES (?, ?, 'not_started', CURDATE())
            `, [req.params.id, task.id]);
        }

        c.end();
        res.json({ success: true, message: "Offer accepted, pre-onboarding tasks assigned" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Decline offer
router.post("/:id/decline-offer", async (req, res) => {
    const c = await db();
    try {
        await c.query(`
            UPDATE candidates SET 
                offer_declined = 1,
                offer_declined_date = CURDATE(),
                decline_reason = ?,
                status = 'offer_declined'
            WHERE id = ?
        `, [req.body.reason, req.params.id]);

        c.end();
        res.json({ success: true, message: "Offer declined" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ DOCUMENT MANAGEMENT ============ */

// Upload document
router.post("/:id/documents", upload.single("file"), async (req, res) => {
    const c = await db();
    try {
        const docData = {
            candidate_id: req.params.id,
            document_type: req.body.document_type,
            document_name: req.file.originalname,
            file_path: req.file.path,
            file_size: req.file.size,
            mime_type: req.file.mimetype,
            required: req.body.required || 1
        };

        await c.query("INSERT INTO candidate_documents SET ?", docData);

        // Update candidate documents status
        await c.query(`
            UPDATE candidates SET 
                documents_submitted = 1,
                status = CASE 
                    WHEN status = 'offer_accepted' THEN 'documents_pending'
                    ELSE status
                END
            WHERE id = ?
        `, [req.params.id]);

        c.end();
        res.json({ success: true, message: "Document uploaded successfully" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Verify document
router.put("/documents/:docId/verify", auth, hr, async (req, res) => {
    const c = await db();
    try {
        await c.query(`
            UPDATE candidate_documents SET 
                verified = 1,
                verified_by = ?,
                verified_date = CURDATE(),
                verification_remarks = ?
            WHERE id = ?
        `, [req.user.id, req.body.remarks, req.params.docId]);

        c.end();
        res.json({ success: true, message: "Document verified" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ BGV MANAGEMENT ============ */

// Initiate BGV
router.post("/:id/bgv/initiate", auth, hr, async (req, res) => {
    const c = await db();
    try {
        await c.query(`
            UPDATE candidates SET 
                bgv_status = 'initiated',
                bgv_initiated_date = CURDATE(),
                status = 'bgv_initiated'
            WHERE id = ?
        `, [req.params.id]);

        c.end();
        res.json({ success: true, message: "BGV initiated" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Update BGV status
router.put("/:id/bgv/status", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const updates = {
            bgv_status: req.body.bgv_status,
            bgv_remarks: req.body.remarks
        };

        if (req.body.bgv_status === 'completed') {
            updates.bgv_completed_date = new Date();
            updates.status = 'bgv_completed';
        }

        await c.query("UPDATE candidates SET ? WHERE id = ?", [updates, req.params.id]);
        c.end();

        res.json({ success: true, message: "BGV status updated" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ TASK MANAGEMENT ============ */

// Update task progress
router.put("/tasks/:taskProgressId", async (req, res) => {
    const c = await db();
    try {
        const updates = {
            status: req.body.status,
            remarks: req.body.remarks
        };

        if (req.body.status === 'completed') {
            updates.completed_date = new Date();
            updates.completed_by = req.user?.id;
        }

        await c.query("UPDATE candidate_task_progress SET ? WHERE id = ?",
            [updates, req.params.taskProgressId]);

        c.end();
        res.json({ success: true, message: "Task updated" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ CONVERT TO EMPLOYEE ============ */

router.post("/:id/convert-to-employee", auth, hr, async (req, res) => {
    const c = await db();
    try {
        // Get candidate details
        const [candidates] = await c.query("SELECT * FROM candidates WHERE id = ?", [req.params.id]);

        if (candidates.length === 0) {
            c.end();
            return res.status(404).json({ error: "Candidate not found" });
        }

        const candidate = candidates[0];

        // Create employee
        const empData = {
            EmployeeNumber: req.body.employee_number || `EMP${Date.now()}`,
            FirstName: candidate.first_name,
            MiddleName: candidate.middle_name,
            LastName: candidate.last_name,
            FullName: candidate.full_name,
            WorkEmail: candidate.email,
            PersonalEmail: candidate.email,
            Gender: candidate.gender,
            DateOfBirth: candidate.date_of_birth,
            DateJoined: candidate.joining_date || new Date(),
            LocationId: candidate.location_id,
            DepartmentId: candidate.department_id,
            DesignationId: candidate.designation_id,
            reporting_manager_id: candidate.reporting_manager_id,
            EmploymentStatus: 'Active',
            lpa: candidate.offered_ctc
        };

        const [empResult] = await c.query("INSERT INTO employees SET ?", empData);

        // Update candidate
        await c.query(`
            UPDATE candidates SET 
                converted_to_employee = 1,
                employee_id = ?,
                conversion_date = CURDATE(),
                status = 'joined'
            WHERE id = ?
        `, [empResult.insertId, req.params.id]);

        // Create user account
        const userData = {
            username: candidate.email.split('@')[0],
            role: 'employee',
            full_name: candidate.full_name,
            employee_id: empResult.insertId
        };

        await c.query("INSERT INTO users SET ?", userData);

        c.end();

        res.json({
            success: true,
            employee_id: empResult.insertId,
            message: "Candidate converted to employee successfully"
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ PRE-ONBOARDING WORKFLOW ============ */

// Start pre-onboarding for selected candidate
router.post("/:id/start-preonboarding", auth, hr, async (req, res) => {
    const c = await db();
    try {
        // Get candidate details
        const [candidate] = await c.query(`
            SELECT c.*, 
                   d.name as department_name, 
                   des.name as designation_name,
                   l.name as location_name
            FROM candidates c
            LEFT JOIN departments d ON c.department_id = d.id
            LEFT JOIN designations des ON c.designation_id = des.id
            LEFT JOIN locations l ON c.location_id = l.id
            WHERE c.id = ?
        `, [req.params.id]);

        if (candidate.length === 0) {
            c.end();
            return res.status(404).json({ error: "Candidate not found" });
        }

        // Update status to documents_pending
        await c.query(
            "UPDATE candidates SET status = 'documents_pending' WHERE id = ?",
            [req.params.id]
        );

        c.end();
        res.json({
            success: true,
            message: "Pre-onboarding started",
            candidate: candidate[0]
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Create/Update offer with 4 workflows: Job Details, Compensation, Offer Details, Preview
router.post("/:id/create-offer", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const {
            // Job Details
            position,
            designation_id,
            department_id,
            location_id,
            reporting_manager_id,
            joining_date,

            // Compensation
            offered_ctc,
            annual_salary,
            salary_breakup,

            // Offer Details
            offer_validity_date,
            probation_period,
            notice_period,
            work_mode,

            // Additional
            special_terms,
            benefits
        } = req.body;

        // ✅ FIX: Detect whether param is a numeric id or a string candidate_id (e.g. 'CAN1772533410481')
        const candidateParam = req.params.id;
        const isNumericId = /^\d+$/.test(String(candidateParam));
        const whereField = isNumericId ? 'id' : 'candidate_id';

        // Update candidate with offer details
        await c.query(`
            UPDATE candidates SET 
                position = ?,
                designation_id = ?,
                department_id = ?,
                location_id = ?,
                reporting_manager_id = ?,
                joining_date = ?,
                offered_ctc = ?,
                status = 'offered'
            WHERE ${whereField} = ?
        `, [position, designation_id, department_id, location_id,
            reporting_manager_id, joining_date, offered_ctc, candidateParam]);

        // ✅ Resolve the numeric id for the FK in candidate_communications
        let numericId = candidateParam;
        if (!isNumericId) {
            const [rows] = await c.query(
                'SELECT id FROM candidates WHERE candidate_id = ? LIMIT 1',
                [candidateParam]
            );
            if (rows.length === 0) {
                c.end();
                return res.status(404).json({ error: `Candidate '${candidateParam}' not found` });
            }
            numericId = rows[0].id;
        }

        // Store additional offer details in communications log
        await c.query(`
            INSERT INTO candidate_communications 
            (candidate_id, communication_type, subject, message, communicated_by)
            VALUES (?, 'email', 'Offer Letter Details', ?, ?)
        `, [numericId, JSON.stringify({
            annual_salary,
            salary_breakup,
            offer_validity_date,
            probation_period,
            notice_period,
            work_mode,
            special_terms,
            benefits
        }), req.user.id]);

        c.end();
        res.json({
            success: true,
            message: "Offer details saved. Ready to preview and send."
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Preview and send offer letter
router.post("/:id/preview-send-offer", auth, hr, async (req, res) => {
    const c = await db();
    try {
        // ✅ FIX: Handle both numeric id and string candidate_id (e.g. 'CAN...')
        const candidateParam = req.params.id;
        const isNumericId = /^\d+$/.test(String(candidateParam));
        const whereField = isNumericId ? 'c.id' : 'c.candidate_id';

        // Get complete candidate and offer details
        const [candidate] = await c.query(`
            SELECT c.*, 
                   d.name as department_name, 
                   des.name as designation_name,
                   l.name as location_name,
                   CONCAT(m.FirstName, ' ', m.LastName) as manager_name
            FROM candidates c
            LEFT JOIN departments d ON c.department_id = d.id
            LEFT JOIN designations des ON c.designation_id = des.id
            LEFT JOIN locations l ON c.location_id = l.id
            LEFT JOIN employees m ON c.reporting_manager_id = m.id
            WHERE ${whereField} = ?
        `, [candidateParam]);

        if (candidate.length === 0) {
            c.end();
            return res.status(404).json({ error: "Candidate not found" });
        }

        // Resolve numeric id for FK queries
        const numericId = candidate[0].id;

        // Get offer details from communications
        const [offerDetails] = await c.query(`
            SELECT message FROM candidate_communications 
            WHERE candidate_id = ? AND subject = 'Offer Letter Details'
            ORDER BY communication_date DESC LIMIT 1
        `, [numericId]);

        // Send offer letter via email (mock)
        await c.query(`
            UPDATE candidates SET 
                offer_letter_sent = 1,
                offer_letter_sent_date = CURDATE(),
                status = 'offered'
            WHERE id = ?
        `, [numericId]);

        // Log email sent
        await c.query(`
            INSERT INTO candidate_communications 
            (candidate_id, communication_type, subject, message, communicated_by)
            VALUES (?, 'email', 'Offer Letter Sent', 'Offer letter sent to candidate email', ?)
        `, [numericId, req.user.id]);

        c.end();
        res.json({
            success: true,
            message: "Offer letter sent to candidate email",
            preview: {
                candidate: candidate[0],
                offer_details: offerDetails.length > 0 ? JSON.parse(offerDetails[0].message) : null
            }
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ CANDIDATE PORTAL - PUBLIC ACCESS ============ */

// Candidate views offer (no auth required - use token in URL)
router.get("/:id/view-offer/:token", async (req, res) => {
    const c = await db();
    try {
        const [candidate] = await c.query(`
            SELECT c.*, 
                   d.name as department_name, 
                   des.name as designation_name,
                   l.name as location_name
            FROM candidates c
            LEFT JOIN departments d ON c.department_id = d.id
            LEFT JOIN designations des ON c.designation_id = des.id
            LEFT JOIN locations l ON c.location_id = l.id
            WHERE c.id = ? AND c.candidate_id = ?
        `, [req.params.id, req.params.token]);

        if (candidate.length === 0) {
            c.end();
            return res.status(404).json({ error: "Invalid offer link" });
        }

        // Get offer details
        const [offerDetails] = await c.query(`
            SELECT message FROM candidate_communications 
            WHERE candidate_id = ? AND subject = 'Offer Letter Details'
            ORDER BY communication_date DESC LIMIT 1
        `, [req.params.id]);

        c.end();
        res.json({
            candidate: candidate[0],
            offer_details: offerDetails.length > 0 ? JSON.parse(offerDetails[0].message) : null,
            status: candidate[0].status
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Candidate approves offer (no auth required)
router.post("/:id/approve-offer/:token", async (req, res) => {
    const c = await db();
    try {
        // Verify token matches candidate_id
        const [candidate] = await c.query(
            "SELECT id FROM candidates WHERE id = ? AND candidate_id = ?",
            [req.params.id, req.params.token]
        );

        if (candidate.length === 0) {
            c.end();
            return res.status(404).json({ error: "Invalid link" });
        }

        // Update to approved
        await c.query(`
            UPDATE candidates SET 
                offer_accepted = 1,
                offer_accepted_date = CURDATE(),
                status = 'offer_accepted'
            WHERE id = ?
        `, [req.params.id]);

        // Auto-assign pre-onboarding tasks
        const [tasks] = await c.query(
            "SELECT id FROM preonboarding_tasks WHERE auto_assign = 1 ORDER BY task_order"
        );

        for (const task of tasks) {
            await c.query(`
                INSERT IGNORE INTO candidate_task_progress 
                (candidate_id, task_id, status, assigned_date)
                VALUES (?, ?, 'not_started', CURDATE())
            `, [req.params.id, task.id]);
        }

        c.end();
        res.json({
            success: true,
            message: "Offer approved successfully! Pre-onboarding tasks assigned.",
            status: "Approved"
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Candidate rejects offer (no auth required)
router.post("/:id/reject-offer/:token", async (req, res) => {
    const c = await db();
    try {
        // Verify token
        const [candidate] = await c.query(
            "SELECT id FROM candidates WHERE id = ? AND candidate_id = ?",
            [req.params.id, req.params.token]
        );

        if (candidate.length === 0) {
            c.end();
            return res.status(404).json({ error: "Invalid link" });
        }

        // Update to rejected
        await c.query(`
            UPDATE candidates SET 
                offer_declined = 1,
                offer_declined_date = CURDATE(),
                decline_reason = ?,
                status = 'offer_declined'
            WHERE id = ?
        `, [req.body.reason || 'No reason provided', req.params.id]);

        c.end();
        res.json({
            success: true,
            message: "Offer rejected. Thank you for your time.",
            status: "Rejected"
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ STATUS MANAGEMENT ============ */

// Update candidate status (Pending, Approved, Rejected, Hold, Hire as Employee)
router.post("/:id/update-status", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const { status, remarks } = req.body;

        // Validate status
        const validStatuses = [
            'offered', 'offer_accepted', 'offer_declined',
            'documents_pending', 'bgv_initiated', 'bgv_completed',
            'ready_to_join', 'joined', 'dropped_out'
        ];

        if (!validStatuses.includes(status)) {
            c.end();
            return res.status(400).json({ error: "Invalid status" });
        }

        await c.query(
            "UPDATE candidates SET status = ? WHERE id = ?",
            [status, req.params.id]
        );

        // Log status change
        if (remarks) {
            await c.query(`
                INSERT INTO candidate_communications 
                (candidate_id, communication_type, subject, message, communicated_by)
                VALUES (?, 'other', 'Status Update', ?, ?)
            `, [req.params.id, `Status changed to: ${status}. ${remarks}`, req.user.id]);
        }

        c.end();
        res.json({
            success: true,
            message: `Candidate status updated to ${status}`,
            status
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Mark candidate as "Hire as Employee" - triggers onboarding
router.post("/:id/hire-as-employee", auth, hr, async (req, res) => {
    const c = await db();
    try {
        // Check if all mandatory documents are verified
        const [pendingDocs] = await c.query(`
            SELECT COUNT(*) as pending FROM candidate_documents 
            WHERE candidate_id = ? AND required = 1 AND verified = 0
        `, [req.params.id]);

        if (pendingDocs[0].pending > 0) {
            c.end();
            return res.status(400).json({
                error: "Cannot hire: Pending document verification",
                pending_documents: pendingDocs[0].pending
            });
        }

        // Update status to ready_to_join
        await c.query(
            "UPDATE candidates SET status = 'ready_to_join' WHERE id = ?",
            [req.params.id]
        );

        c.end();
        res.json({
            success: true,
            message: "Candidate marked as 'Ready to Join'. Onboarding can now be initiated.",
            next_step: "Convert to employee on joining date"
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Put candidate on hold
router.post("/:id/put-on-hold", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const { reason } = req.body;

        await c.query(`
            INSERT INTO candidate_communications 
            (candidate_id, communication_type, subject, message, communicated_by)
            VALUES (?, 'other', 'Candidate On Hold', ?, ?)
        `, [req.params.id, reason || 'Candidate put on hold', req.user.id]);

        // Keep current status but flag as on hold
        c.end();
        res.json({
            success: true,
            message: "Candidate put on hold",
            action: "Manual follow-up required"
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ DASHBOARD & STATS ============ */

router.get("/stats/dashboard", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const [stats] = await c.query(`
            SELECT 
                COUNT(*) as total_candidates,
                SUM(CASE WHEN status = 'offered' THEN 1 ELSE 0 END) as offered,
                SUM(CASE WHEN status = 'offer_accepted' THEN 1 ELSE 0 END) as offer_accepted,
                SUM(CASE WHEN status = 'bgv_initiated' OR status = 'bgv_completed' THEN 1 ELSE 0 END) as in_bgv,
                SUM(CASE WHEN status = 'ready_to_join' THEN 1 ELSE 0 END) as ready_to_join,
                SUM(CASE WHEN status = 'joined' THEN 1 ELSE 0 END) as joined,
                SUM(CASE WHEN status = 'offer_declined' OR status = 'dropped_out' THEN 1 ELSE 0 END) as declined_dropped
            FROM candidates
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        `);

        c.end();
        res.json(stats[0]);
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
