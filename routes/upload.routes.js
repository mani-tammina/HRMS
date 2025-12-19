/**
 * UPLOAD ROUTES
 * Handles bulk uploads for employees, payroll, and holidays
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { db } = require("../config/database");
const { auth, admin, hr } = require("../middleware/auth");
const { getOrCreateMaster } = require("../utils/helpers");
const { excel } = require("../utils/excelReader");

const upload = multer({ dest: "uploads/" });

/* ============ BULK EMPLOYEE UPLOAD ============ */

router.post("/employees", auth, admin, upload.single("file"), async (req, res) => {
    const rows = excel(req.file.path);
    const c = await db();

    let inserted = 0;
    let updated = 0;
    let skipped = 0;
    let errors = [];

    for (const r of rows) {
        try {
            const empNo = r.EmployeeNumber || r['Employee Number'] || null;
            if (!empNo) {
                skipped++;
                errors.push("Missing EmployeeNumber");
                continue;
            }

            // ---- Master Data Lookups ----
            const locationName = r.Location || r.LocationName || null;
            const departmentName = r.Department || null;
            const subDepartmentName = r.SubDepartment || r['Sub Department'] || null;
            const designationName = r.Designation || r.JobTitle || null;
            const secondaryDesignationName = r.SecondaryDesignation || r['Secondary Designation'] || null;
            const buName = r.BusinessUnit || null;
            const legalName = r.LegalEntity || null;
            const costCenterCode = r.CostCenter || r.CostCenterCode || null;
            const bandName = r.Band || null;
            const payGradeName = r.PayGrade || r['Pay Grade'] || null;
            
            // Policy lookups
            const leavePlanName = r.LeavePlan || r['Leave Plan'] || null;
            const shiftPolicyName = r.ShiftPolicy || r['Shift Policy'] || null;
            const weeklyOffPolicyName = r.WeeklyOffPolicy || r['Weekly Off Policy'] || null;
            const attendancePolicyName = r.AttendancePolicy || r['Attendance Policy'] || null;
            const attendanceCaptureSchemeName = r.AttendanceCaptureScheme || r['Attendance Capture Scheme'] || null;
            const holidayListName = r.HolidayList || r['Holiday List'] || null;
            const expensePolicyName = r.ExpensePolicy || r['Expense Policy'] || null;

            // ---- Ensure master data exists and get IDs (only if value provided) ----
            console.log(`\n📋 Processing Employee: ${empNo} - ${r.FullName || r.Name || ''}`);
            console.log(`   Master Data: Location="${locationName}", Dept="${departmentName}", Desig="${designationName}"`);
            
            const locationId = locationName ? await getOrCreateMaster(c, 'locations', 'name', locationName) : null;
            const deptId = departmentName ? await getOrCreateMaster(c, 'departments', 'name', departmentName) : null;
            const subDeptId = subDepartmentName ? await getOrCreateMaster(c, 'sub_departments', 'name', subDepartmentName) : null;
            const desgId = designationName ? await getOrCreateMaster(c, 'designations', 'name', designationName) : null;
            const secondaryDesgId = secondaryDesignationName ? await getOrCreateMaster(c, 'designations', 'name', secondaryDesignationName) : null;
            const buId = buName ? await getOrCreateMaster(c, 'business_units', 'name', buName) : null;
            const legalId = legalName ? await getOrCreateMaster(c, 'legal_entities', 'name', legalName) : null;
            const costId = costCenterCode ? await getOrCreateMaster(c, 'cost_centers', 'code', costCenterCode) : null;
            const bandId = bandName ? await getOrCreateMaster(c, 'bands', 'name', bandName) : null;
            const payGradeId = payGradeName ? await getOrCreateMaster(c, 'pay_grades', 'name', payGradeName) : null;
            
            // Policy IDs
            const leavePlanId = leavePlanName ? await getOrCreateMaster(c, 'leave_plans', 'name', leavePlanName) : null;
            const shiftPolicyId = shiftPolicyName ? await getOrCreateMaster(c, 'shift_policies', 'name', shiftPolicyName) : null;
            const weeklyOffPolicyId = weeklyOffPolicyName ? await getOrCreateMaster(c, 'weekly_off_policies', 'name', weeklyOffPolicyName) : null;
            const attendancePolicyId = attendancePolicyName ? await getOrCreateMaster(c, 'attendance_policies', 'name', attendancePolicyName) : null;
            const attendanceCaptureSchemeId = attendanceCaptureSchemeName ? await getOrCreateMaster(c, 'attendance_capture_schemes', 'name', attendanceCaptureSchemeName) : null;
            const holidayListId = holidayListName ? await getOrCreateMaster(c, 'holiday_lists', 'name', holidayListName) : null;
            const expensePolicyId = expensePolicyName ? await getOrCreateMaster(c, 'expense_policies', 'name', expensePolicyName) : null;
            
            console.log(`   IDs: Loc=${locationId}, Dept=${deptId}, Desig=${desgId}, Band=${bandId}`);

            // Reporting Manager lookup (by EmployeeNumber)
            let reportingManagerId = null;
            if (r.ReportingManager || r['Reporting Manager']) {
                const [mgr] = await c.query(
                    `SELECT id FROM employees WHERE EmployeeNumber = ? LIMIT 1`,
                    [r.ReportingManager || r['Reporting Manager']]
                );
                if (mgr.length > 0) reportingManagerId = mgr[0].id;
            }

            // ---- Check employee exists ----
            const [existing] = await c.query(
                `SELECT id FROM employees WHERE EmployeeNumber = ?`,
                [empNo]
            );

            if (existing.length > 0) {
                // ---------- UPDATE ----------
                // Convert PhysicallyHandicapped to 0/1
                const physicallyHandicapped = (['Yes', 'YES', 'yes', 'Y', 'y', '1', 1, true].includes(r.PhysicallyHandicapped)) ? 1 : 0;
                
                // Parse notice_period - extract number from text like "3months" or "Default Notice period - 3months"
                let noticePeriod = null;
                if (r.notice_period || r.NoticePeriod) {
                    const noticeText = String(r.notice_period || r.NoticePeriod);
                    const match = noticeText.match(/(\d+)/); // Extract first number
                    if (match) {
                        noticePeriod = parseInt(match[1]);
                    }
                }
                
                await c.query(
                    `UPDATE employees SET
                        attendance_number = ?,
                        FirstName = ?,
                        MiddleName = ?,
                        LastName = ?,
                        FullName = ?,
                        WorkEmail = ?,
                        PersonalEmail = ?,
                        Gender = ?,
                        MaritalStatus = ?,
                        BloodGroup = ?,
                        PhysicallyHandicapped = ?,
                        Nationality = ?,
                        DateOfBirth = ?,
                        current_address_line1 = ?,
                        current_address_line2 = ?,
                        current_city = ?,
                        current_state = ?,
                        current_zip = ?,
                        current_country = ?,
                        permanent_address_line1 = ?,
                        permanent_address_line2 = ?,
                        permanent_city = ?,
                        permanent_state = ?,
                        permanent_zip = ?,
                        permanent_country = ?,
                        father_name = ?,
                        mother_name = ?,
                        spouse_name = ?,
                        children_names = ?,
                        DateJoined = ?,
                        time_type = ?,
                        worker_type = ?,
                        EmploymentStatus = ?,
                        notice_period = ?,
                        LocationId = ?,
                        DepartmentId = ?,
                        SubDepartmentId = ?,
                        DesignationId = ?,
                        SecondaryDesignationId = ?,
                        BusinessUnitId = ?,
                        LegalEntityId = ?,
                        BandId = ?,
                        PayGradeId = ?,
                        CostCenterId = ?,
                        reporting_manager_id = ?,
                        leave_plan_id = ?,
                        shift_policy_id = ?,
                        weekly_off_policy_id = ?,
                        attendance_policy_id = ?,
                        attendance_capture_scheme_id = ?,
                        holiday_list_id = ?,
                        expense_policy_id = ?,
                        PANNumber = ?,
                        AadhaarNumber = ?,
                        pf_number = ?,
                        uan_number = ?,
                        lpa = ?,
                        basic_pct = ?,
                        hra_pct = ?,
                        medical_allowance = ?,
                        transport_allowance = ?,
                        special_allowance = ?,
                        paid_basic_monthly = ?,
                        working_days = ?,
                        loss_of_days = ?,
                        exit_date = ?,
                        exit_status = ?,
                        termination_type = ?,
                        termination_reason = ?,
                        resignation_note = ?,
                        comments = ?
                     WHERE EmployeeNumber = ?`,
                    [
                        r.attendance_number || r.AttendanceNumber || null,
                        r.FirstName || null,
                        r.MiddleName || null,
                        r.LastName || null,
                        r.FullName || r.Name || null,
                        r.WorkEmail || null,
                        r.PersonalEmail || r['Personal Email'] || null,
                        r.Gender || null,
                        r.MaritalStatus || null,
                        r.BloodGroup || null,
                        physicallyHandicapped,
                        r.Nationality || null,
                        r.DateOfBirth || null,
                        r.current_address_line1 || r.CurrentAddressLine1 || null,
                        r.current_address_line2 || r.CurrentAddressLine2 || null,
                        r.current_city || r.CurrentCity || null,
                        r.current_state || r.CurrentState || null,
                        r.current_zip || r.CurrentZip || null,
                        r.current_country || r.CurrentCountry || null,
                        r.permanent_address_line1 || r.PermanentAddressLine1 || null,
                        r.permanent_address_line2 || r.PermanentAddressLine2 || null,
                        r.permanent_city || r.PermanentCity || null,
                        r.permanent_state || r.PermanentState || null,
                        r.permanent_zip || r.PermanentZip || null,
                        r.permanent_country || r.PermanentCountry || null,
                        r.father_name || r.FatherName || null,
                        r.mother_name || r.MotherName || null,
                        r.spouse_name || r.SpouseName || null,
                        r.children_names || r.ChildrenNames || null,
                        r.DateJoined || r.DateOfJoining || null,
                        r.time_type || r.TimeType || null,
                        r.worker_type || r.WorkerType || null,
                        r.EmploymentStatus || r.Status || null,
                        r.notice_period || r.NoticePeriod || null,
                        locationId,
                        deptId,
                        subDeptId,
                        desgId,
                        secondaryDesgId,
                        buId,
                        legalId,
                        bandId,
                        payGradeId,
                        costId,
                        reportingManagerId,
                        leavePlanId,
                        shiftPolicyId,
                        weeklyOffPolicyId,
                        attendancePolicyId,
                        attendanceCaptureSchemeId,
                        holidayListId,
                        expensePolicyId,
                        r.PANNumber || null,
                        r.AadhaarNumber || null,
                        r.pf_number || r.PFNumber || null,
                        r.uan_number || r.UANNumber || null,
                        r.lpa || r.LPA || null,
                        r.basic_pct || r.BasicPct || null,
                        r.hra_pct || r.HRAPct || null,
                        r.medical_allowance || r.MedicalAllowance || null,
                        r.transport_allowance || r.TransportAllowance || null,
                        r.special_allowance || r.SpecialAllowance || null,
                        r.paid_basic_monthly || r.PaidBasicMonthly || null,
                        r.working_days || r.WorkingDays || null,
                        r.loss_of_days || r.LossOfDays || null,
                        r.exit_date || r.ExitDate || null,
                        r.exit_status || r.ExitStatus || null,
                        r.termination_type || r.TerminationType || null,
                        r.termination_reason || r.TerminationReason || null,
                        r.resignation_note || r.ResignationNote || null,
                        r.comments || r.Comments || null,
                        empNo
                    ]
                );
                updated++;
            } else {
                // ---------- INSERT ----------
                // Convert PhysicallyHandicapped to 0/1
                const physicallyHandicapped = (['Yes', 'YES', 'yes', 'Y', 'y', '1', 1, true].includes(r.PhysicallyHandicapped)) ? 1 : 0;
                
                // Parse notice_period - extract number from text like "3months" or "Default Notice period - 3months"
                let noticePeriod = null;
                if (r.notice_period || r.NoticePeriod) {
                    const noticeText = String(r.notice_period || r.NoticePeriod);
                    const match = noticeText.match(/(\d+)/); // Extract first number
                    if (match) {
                        noticePeriod = parseInt(match[1]);
                    }
                }
                
                await c.query(
                    `INSERT INTO employees
                     (EmployeeNumber, attendance_number, FirstName, MiddleName, LastName, FullName, 
                      WorkEmail, PersonalEmail, Gender, MaritalStatus, BloodGroup, PhysicallyHandicapped, 
                      Nationality, DateOfBirth,
                      current_address_line1, current_address_line2, current_city, current_state, current_zip, current_country,
                      permanent_address_line1, permanent_address_line2, permanent_city, permanent_state, permanent_zip, permanent_country,
                      father_name, mother_name, spouse_name, children_names,
                      DateJoined, time_type, worker_type, EmploymentStatus, notice_period,
                      LocationId, DepartmentId, SubDepartmentId, DesignationId, SecondaryDesignationId,
                      BusinessUnitId, LegalEntityId, BandId, PayGradeId, CostCenterId, reporting_manager_id,
                      leave_plan_id, shift_policy_id, weekly_off_policy_id, attendance_policy_id, 
                      attendance_capture_scheme_id, holiday_list_id, expense_policy_id,
                      PANNumber, AadhaarNumber, pf_number, uan_number,
                      lpa, basic_pct, hra_pct, medical_allowance, transport_allowance, special_allowance,
                      paid_basic_monthly, working_days, loss_of_days,
                      exit_date, exit_status, termination_type, termination_reason, resignation_note, comments)
                     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [
                        empNo,
                        r.attendance_number || r.AttendanceNumber || null,
                        r.FirstName || null,
                        r.MiddleName || null,
                        r.LastName || null,
                        r.FullName || r.Name || null,
                        r.WorkEmail || null,
                        r.PersonalEmail || r['Personal Email'] || null,
                        r.Gender || null,
                        r.MaritalStatus || null,
                        r.BloodGroup || null,
                        physicallyHandicapped,
                        r.Nationality || null,
                        r.DateOfBirth || null,
                        r.current_address_line1 || r.CurrentAddressLine1 || null,
                        r.current_address_line2 || r.CurrentAddressLine2 || null,
                        r.current_city || r.CurrentCity || null,
                        r.current_state || r.CurrentState || null,
                        r.current_zip || r.CurrentZip || null,
                        r.current_country || r.CurrentCountry || null,
                        r.permanent_address_line1 || r.PermanentAddressLine1 || null,
                        r.permanent_address_line2 || r.PermanentAddressLine2 || null,
                        r.permanent_city || r.PermanentCity || null,
                        r.permanent_state || r.PermanentState || null,
                        r.permanent_zip || r.PermanentZip || null,
                        r.permanent_country || r.PermanentCountry || null,
                        r.father_name || r.FatherName || null,
                        r.mother_name || r.MotherName || null,
                        r.spouse_name || r.SpouseName || null,
                        r.children_names || r.ChildrenNames || null,
                        r.DateJoined || r.DateOfJoining || null,
                        r.time_type || r.TimeType || null,
                        r.worker_type || r.WorkerType || null,
                        r.EmploymentStatus || r.Status || null,
                        noticePeriod,
                        locationId,
                        deptId,
                        subDeptId,
                        desgId,
                        secondaryDesgId,
                        buId,
                        legalId,
                        bandId,
                        payGradeId,
                        costId,
                        reportingManagerId,
                        leavePlanId,
                        shiftPolicyId,
                        weeklyOffPolicyId,
                        attendancePolicyId,
                        attendanceCaptureSchemeId,
                        holidayListId,
                        expensePolicyId,
                        r.PANNumber || null,
                        r.AadhaarNumber || null,
                        r.pf_number || r.PFNumber || null,
                        r.uan_number || r.UANNumber || null,
                        r.lpa || r.LPA || null,
                        r.basic_pct || r.BasicPct || null,
                        r.hra_pct || r.HRAPct || null,
                        r.medical_allowance || r.MedicalAllowance || null,
                        r.transport_allowance || r.TransportAllowance || null,
                        r.special_allowance || r.SpecialAllowance || null,
                        r.paid_basic_monthly || r.PaidBasicMonthly || null,
                        r.working_days || r.WorkingDays || null,
                        r.loss_of_days || r.LossOfDays || null,
                        r.exit_date || r.ExitDate || null,
                        r.exit_status || r.ExitStatus || null,
                        r.termination_type || r.TerminationType || null,
                        r.termination_reason || r.TerminationReason || null,
                        r.resignation_note || r.ResignationNote || null,
                        r.comments || r.Comments || null
                    ]
                );
                inserted++;
            }

        } catch (err) {
            skipped++;
            const errorMsg = `Row ${inserted + updated + skipped}: ${err.message}`;
            errors.push(errorMsg);
            console.error('Employee upload error:', errorMsg);
        }
    }

    // Get master data counts after upload
    const [masterCounts] = await c.query(`
        SELECT 
            'locations' as table_name, COUNT(*) as count FROM locations
        UNION ALL SELECT 'departments', COUNT(*) FROM departments
        UNION ALL SELECT 'designations', COUNT(*) FROM designations
        UNION ALL SELECT 'business_units', COUNT(*) FROM business_units
        UNION ALL SELECT 'legal_entities', COUNT(*) FROM legal_entities
        UNION ALL SELECT 'cost_centers', COUNT(*) FROM cost_centers
        UNION ALL SELECT 'bands', COUNT(*) FROM bands
        UNION ALL SELECT 'pay_grades', COUNT(*) FROM pay_grades
        UNION ALL SELECT 'leave_plans', COUNT(*) FROM leave_plans
        UNION ALL SELECT 'shift_policies', COUNT(*) FROM shift_policies
    `);
    
    c.end();

    console.log('\n📊 Master Data Summary After Upload:');
    masterCounts.forEach(row => {
        console.log(`   ${row.table_name}: ${row.count} records`);
    });

    res.json({
        message: 'Employee upload completed',
        processed: rows.length,
        inserted,
        updated,
        skipped,
        errors: errors.slice(0, 20),
        summary: `✅ Inserted: ${inserted}, ✅ Updated: ${updated}, ⚠️ Skipped: ${skipped}`,
        masterDataCounts: masterCounts.reduce((acc, row) => {
            acc[row.table_name] = row.count;
            return acc;
        }, {})
    });
});

/* ============ BULK HOLIDAY UPLOAD ============ */

router.post("/holidays", auth, admin, upload.single("file"), async (req, res) => {
    const rows = excel(req.file.path);
    const c = await db();

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    for (const r of rows) {
        try {
            const holidayDate = r.holiday_date || r.HolidayDate || r.date || r.Date || null;
            const holidayName = r.holiday_name || r.HolidayName || r.name || r.Name || null;
            const holidayType = r.holiday_type || r.HolidayType || r.type || r.Type || 'public';
            const applicableStates = r.applicable_states || r.ApplicableStates || r.states || null;
            const description = r.description || r.Description || null;

            if (!holidayDate || !holidayName) {
                skipped++;
                continue;
            }

            // Check if holiday exists
            const [existing] = await c.query(
                "SELECT id FROM holidays WHERE holiday_date = ? AND holiday_name = ?",
                [holidayDate, holidayName]
            );

            if (existing.length > 0) {
                // Update
                await c.query(
                    "UPDATE holidays SET holiday_type = ?, applicable_states = ?, description = ? WHERE id = ?",
                    [holidayType, applicableStates, description, existing[0].id]
                );
                updated++;
            } else {
                // Insert
                await c.query(
                    "INSERT INTO holidays (holiday_date, holiday_name, holiday_type, applicable_states, description) VALUES (?, ?, ?, ?, ?)",
                    [holidayDate, holidayName, holidayType, applicableStates, description]
                );
                inserted++;
            }

        } catch (err) {
            skipped++;
        }
    }

    c.end();
    res.json({ processed: rows.length, inserted, updated, skipped });
});

/* ============ TEST/DIAGNOSTIC ENDPOINT ============ */

router.get("/test-master-creation", auth, admin, async (req, res) => {
    const c = await db();
    
    try {
        // Test creating entries in all master tables
        const testData = {
            location: "Test Location " + Date.now(),
            department: "Test Department " + Date.now(),
            designation: "Test Designation " + Date.now(),
            businessUnit: "Test BU " + Date.now(),
            legalEntity: "Test Legal " + Date.now(),
            costCenter: "TEST" + Date.now(),
            band: "Test Band " + Date.now(),
            payGrade: "Test Grade " + Date.now(),
            leavePlan: "Test Leave Plan " + Date.now(),
            shiftPolicy: "Test Shift " + Date.now()
        };
        
        const { getOrCreateMaster } = require("../utils/helpers");
        
        const results = {};
        results.locationId = await getOrCreateMaster(c, 'locations', 'name', testData.location);
        results.departmentId = await getOrCreateMaster(c, 'departments', 'name', testData.department);
        results.designationId = await getOrCreateMaster(c, 'designations', 'name', testData.designation);
        results.businessUnitId = await getOrCreateMaster(c, 'business_units', 'name', testData.businessUnit);
        results.legalEntityId = await getOrCreateMaster(c, 'legal_entities', 'name', testData.legalEntity);
        results.costCenterId = await getOrCreateMaster(c, 'cost_centers', 'code', testData.costCenter);
        results.bandId = await getOrCreateMaster(c, 'bands', 'name', testData.band);
        results.payGradeId = await getOrCreateMaster(c, 'pay_grades', 'name', testData.payGrade);
        results.leavePlanId = await getOrCreateMaster(c, 'leave_plans', 'name', testData.leavePlan);
        results.shiftPolicyId = await getOrCreateMaster(c, 'shift_policies', 'name', testData.shiftPolicy);
        
        c.end();
        
        res.json({
            message: "Master data creation test successful",
            testData,
            results,
            allCreated: Object.values(results).every(id => id !== null && id > 0)
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

/* ============ BULK PAYROLL UPLOAD ============ */

router.post("/payroll", auth, admin, upload.single("file"), async (req, res) => {
    const rows = excel(req.file.path);
    const c = await db();

    try {
        // Create payroll run
        const runMonth = req.body.month || new Date().getMonth() + 1;
        const runYear = req.body.year || new Date().getFullYear();
        
        const [runResult] = await c.query(
            "INSERT INTO payroll_runs (month, year, status, created_by) VALUES (?, ?, 'processing', ?)",
            [runMonth, runYear, req.user?.id || 1]
        );
        const runId = runResult.insertId;

        let inserted = 0;
        let skipped = 0;
        let errors = [];

        for (const r of rows) {
            try {
                const empNo = r.EmployeeNumber || r['Employee Number'] || null;
                if (!empNo) {
                    skipped++;
                    errors.push("Missing EmployeeNumber");
                    continue;
                }

                // Find employee
                const [emp] = await c.query("SELECT id FROM employees WHERE EmployeeNumber = ?", [empNo]);
                if (emp.length === 0) {
                    skipped++;
                    errors.push(`Employee ${empNo} not found`);
                    continue;
                }

                const empId = emp[0].id;
                const month = r.month || r.Month || runMonth;
                const year = r.year || r.Year || runYear;
                const basic = parseFloat(r.basic || r.Basic || 0);
                const hra = parseFloat(r.hra || r.HRA || 0);
                const conveyance = parseFloat(r.conveyance || r.Conveyance || 0);
                const specialAllowance = parseFloat(r.special_allowance || r.SpecialAllowance || 0);
                const grossSalary = parseFloat(r.gross_salary || r.GrossSalary || (basic + hra + conveyance + specialAllowance));
                const pf = parseFloat(r.pf || r.PF || 0);
                const esi = parseFloat(r.esi || r.ESI || 0);
                const professionalTax = parseFloat(r.professional_tax || r.ProfessionalTax || 0);
                const otherDeductions = parseFloat(r.other_deductions || r.OtherDeductions || 0);
                const totalDeductions = pf + esi + professionalTax + otherDeductions;
                const netSalary = grossSalary - totalDeductions;
                const daysWorked = parseInt(r.days_worked || r.DaysWorked || 30);
                const daysInMonth = parseInt(r.days_in_month || r.DaysInMonth || 30);

                // Insert payslip
                await c.query(
                    `INSERT INTO payroll_slips 
                     (run_id, employee_id, month, year, basic, hra, conveyance, special_allowance, 
                      gross_salary, pf, esi, professional_tax, other_deductions, total_deductions, 
                      net_salary, days_worked, days_in_month, status) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'generated')`,
                    [runId, empId, month, year, basic, hra, conveyance, specialAllowance,
                     grossSalary, pf, esi, professionalTax, otherDeductions, totalDeductions,
                     netSalary, daysWorked, daysInMonth]
                );

                inserted++;

            } catch (err) {
                skipped++;
                errors.push(err.message);
            }
        }

        // Update run status
        await c.query(
            "UPDATE payroll_runs SET status = 'completed', completed_at = NOW() WHERE id = ?",
            [runId]
        );

        c.end();
        res.json({
            run_id: runId,
            processed: rows.length,
            inserted,
            skipped,
            errors: errors.slice(0, 10)
        });

    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
