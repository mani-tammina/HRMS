/**
 * Migration: Add all missing columns to employees table
 */

const mysql = require('mysql2/promise');

async function migrate() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'hrms_db_new'
    });

    const alterations = [
        // Address columns
        "ADD COLUMN current_address_line1 TEXT AFTER DateOfBirth",
        "ADD COLUMN current_address_line2 TEXT AFTER current_address_line1",
        "ADD COLUMN current_city VARCHAR(100) AFTER current_address_line2",
        "ADD COLUMN current_state VARCHAR(100) AFTER current_city",
        "ADD COLUMN current_zip VARCHAR(20) AFTER current_state",
        "ADD COLUMN current_country VARCHAR(100) AFTER current_zip",
        "ADD COLUMN permanent_address_line1 TEXT AFTER current_country",
        "ADD COLUMN permanent_address_line2 TEXT AFTER permanent_address_line1",
        "ADD COLUMN permanent_city VARCHAR(100) AFTER permanent_address_line2",
        "ADD COLUMN permanent_state VARCHAR(100) AFTER permanent_city",
        "ADD COLUMN permanent_zip VARCHAR(20) AFTER permanent_state",
        "ADD COLUMN permanent_country VARCHAR(100) AFTER permanent_zip",
        
        // Family columns
        "ADD COLUMN father_name VARCHAR(150) AFTER permanent_country",
        "ADD COLUMN mother_name VARCHAR(150) AFTER father_name",
        "ADD COLUMN spouse_name VARCHAR(150) AFTER mother_name",
        "ADD COLUMN children_names TEXT AFTER spouse_name",
        
        // Employment columns
        "ADD COLUMN time_type VARCHAR(50) AFTER DateJoined",
        "ADD COLUMN worker_type VARCHAR(50) AFTER time_type",
        "ADD COLUMN notice_period INT AFTER EmploymentStatus",
        
        // Organization mapping - fix column names
        "ADD COLUMN SubDepartmentId INT AFTER DepartmentId",
        "ADD COLUMN SecondaryDesignationId INT AFTER DesignationId",
        "ADD COLUMN BandId INT AFTER LegalEntityId",
        "ADD COLUMN PayGradeId INT AFTER BandId",
        "ADD COLUMN reporting_manager_id INT AFTER CostCenterId",
        
        // Policies
        "ADD COLUMN leave_plan_id INT AFTER reporting_manager_id",
        "ADD COLUMN shift_policy_id INT AFTER leave_plan_id",
        "ADD COLUMN weekly_off_policy_id INT AFTER shift_policy_id",
        "ADD COLUMN attendance_policy_id INT AFTER weekly_off_policy_id",
        "ADD COLUMN attendance_capture_scheme_id INT AFTER attendance_policy_id",
        "ADD COLUMN holiday_list_id INT AFTER attendance_capture_scheme_id",
        "ADD COLUMN expense_policy_id INT AFTER holiday_list_id",
        
        // Statutory
        "ADD COLUMN pf_number VARCHAR(30) AFTER AadhaarNumber",
        "ADD COLUMN uan_number VARCHAR(30) AFTER pf_number",
        
        // Exit/Separation
        "ADD COLUMN exit_date DATE AFTER loss_of_days",
        "ADD COLUMN exit_status VARCHAR(50) AFTER exit_date",
        "ADD COLUMN termination_type VARCHAR(100) AFTER exit_status",
        "ADD COLUMN termination_reason VARCHAR(200) AFTER termination_type",
        "ADD COLUMN resignation_note TEXT AFTER termination_reason",
        "ADD COLUMN comments TEXT AFTER resignation_note"
    ];

    let added = 0;
    let skipped = 0;

    try {
        console.log('🔄 Adding missing columns to employees table...\n');
        
        for (const alteration of alterations) {
            try {
                await connection.query(`ALTER TABLE employees ${alteration}`);
                const columnName = alteration.match(/ADD COLUMN (\w+)/)[1];
                console.log(`  ✓ Added: ${columnName}`);
                added++;
            } catch (error) {
                if (error.message.includes('Duplicate column')) {
                    skipped++;
                } else {
                    console.error(`  ✗ Failed: ${alteration}`);
                    console.error(`    Error: ${error.message}`);
                }
            }
        }
        
        console.log(`\n✅ Migration complete: ${added} added, ${skipped} skipped`);
        
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        throw error;
    } finally {
        await connection.end();
    }
}

migrate()
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Migration error:', err);
        process.exit(1);
    });
