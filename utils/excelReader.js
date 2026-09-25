const XLSX = require("xlsx");

function excel(file) {
    const wb = XLSX.readFile(file, { cellDates: true });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null, raw: false });
    
    // Find actual header row (skip title rows)
    let headerRowIndex = 0;
    for (let i = 0; i < Math.min(20, rawRows.length); i++) {
        const nonNullCount = rawRows[i].filter(cell => cell !== null && cell !== undefined && String(cell).trim() !== '').length;
        if (nonNullCount > 3) { // Header row usually has many columns, title rows only have 1 or 2
            headerRowIndex = i;
            break;
        }
    }

    let rows = XLSX.utils.sheet_to_json(sheet, { range: headerRowIndex, defval: null, raw: false });

    const parseTextDate = (str) => {
        if (!str || typeof str !== 'string') return null;
        const trimmed = str.trim();

        // 1. Check YYYY-MM-DD, YYYY/MM/DD, or YYYY.MM.DD
        const matchYYYYMMDD = trimmed.match(/^(\d{4})[-/. ](\d{1,2})[-/. ](\d{1,2})/);
        if (matchYYYYMMDD) {
            const [, year, month, day] = matchYYYYMMDD;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

        // 2. Check DD-MM-YYYY, DD/MM/YYYY, or DD.MM.YYYY
        const matchDDMMYYYY = trimmed.match(/^(\d{1,2})[-/. ](\d{1,2})[-/. ](\d{4})/);
        if (matchDDMMYYYY) {
            let [, p1, p2, year] = matchDDMMYYYY;
            let day = parseInt(p1, 10);
            let month = parseInt(p2, 10);
            if (month > 12 && day <= 12) {
                const tmp = day;
                day = month;
                month = tmp;
            }
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }

        // 3. Named month formats (e.g. 26-Jan-2026, 26 Jan 2026, January 26 2026)
        const monthMap = {
            jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
            jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
        };

        const matchNamed1 = trimmed.match(/^(\d{1,2})[-/. ]([A-Za-z]+)[-/. ](\d{4})/);
        if (matchNamed1) {
            const [, d, mStr, y] = matchNamed1;
            const m = monthMap[mStr.toLowerCase().substring(0, 3)];
            if (m) {
                return `${y}-${m}-${d.padStart(2, '0')}`;
            }
        }

        const matchNamed2 = trimmed.match(/^([A-Za-z]+)[-/. ](\d{1,2})[-,. ]+(\d{4})/);
        if (matchNamed2) {
            const [, mStr, d, y] = matchNamed2;
            const m = monthMap[mStr.toLowerCase().substring(0, 3)];
            if (m) {
                return `${y}-${m}-${d.padStart(2, '0')}`;
            }
        }

        // 4. Fallback to Date parsing
        const d = new Date(trimmed);
        if (!isNaN(d.getTime())) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        }
        return null;
    };

    const parseDecimal = (str) => {
        if (!str || typeof str !== 'string') return null;
        const normalized = str.trim().replace(/,/g, '');
        const num = parseFloat(normalized);
        return isNaN(num) ? null : num;
    };

    // Normalize column names: remove all spaces
    rows = rows.map(row => {
        const normalized = {};
        for (const k of Object.keys(row)) {
            const normalizedKey = k.replace(/\s+/g, '');
            normalized[normalizedKey] = row[k];
        }
        return normalized;
    });

    // Filter out rows where all values are null/empty
    rows = rows.filter(row => Object.values(row).some(v => v !== null && v !== undefined && String(v).trim() !== ''));

    return rows.map(row => {
        const r = {};
        for (const k of Object.keys(row)) {
            const v = row[k];
            if (v instanceof Date) {
                // XLSX with cellDates:true creates Date at LOCAL midnight.
                // Use local date parts (not UTC) to avoid IST timezone shift (-1 day bug).
                const yyyy = v.getFullYear();
                const mm = String(v.getMonth() + 1).padStart(2, '0');
                const dd = String(v.getDate()).padStart(2, '0');
                r[k] = `${yyyy}-${mm}-${dd}`;
            } else if (typeof v === 'string') {
                const lower = String(k).toLowerCase();
                if (lower.includes('date') || lower.includes('_at') || lower.includes('joining') || lower.includes('birth')) {
                    const parsed = parseTextDate(v);
                    r[k] = parsed || v.trim();
                }
                else if (lower.includes('amount') || lower.includes('basic') || lower.includes('hra') ||
                    lower.includes('allowance') || lower.includes('deduction') || lower.includes('salary') ||
                    lower.includes('pay') || lower.includes('pf') || lower.includes('esi') || lower.includes('tax') ||
                    lower.includes('coupon') || lower.includes('advance') || lower.includes('days') || lower.includes('units') ||
                    lower.includes('gross') || lower.includes('total') || lower.includes('incentive') || lower.includes('bonus') || lower.includes('reimbursement')) {
                    const parsed = parseDecimal(v);
                    r[k] = parsed !== null ? parsed : v.trim();
                } else {
                    r[k] = v.trim();
                }
            } else if (typeof v === 'number' && String(k).toLowerCase().includes('date')) {
                // Excel serial → UTC epoch ms. Use UTC date parts since the serial itself is UTC-based.
                const d = new Date(Math.round((v - 25569) * 86400 * 1000));
                if (!isNaN(d.getTime())) {
                    const yyyy = d.getUTCFullYear();
                    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
                    const dd = String(d.getUTCDate()).padStart(2, '0');
                    r[k] = `${yyyy}-${mm}-${dd}`;
                } else {
                    r[k] = null;
                }
            } else {
                r[k] = v;
            }
        }
        return r;
    });
}

module.exports = { excel };
