function formatDateDDMMYYYY(val) {
  if (!val) return '-';
  const str = String(val).trim();
  // 1. Plain exact YYYY-MM-DD (no time)
  const ymd = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (ymd) {
    return `${ymd[3].padStart(2, '0')}-${ymd[2].padStart(2, '0')}-${ymd[1]}`;
  }
  // 2. Exact DD-MM-YYYY or DD/MM/YYYY
  const dmy = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmy) {
    return `${dmy[1].padStart(2, '0')}-${dmy[2].padStart(2, '0')}-${dmy[3]}`;
  }
  // 3. ISO string or timestamp
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    const parts = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(d);
    return parts.replace(/\//g, '-');
  }
  return str || '-';
}

function formatDateDDMMMYYYY(val) {
  if (!val) return '-';
  const str = String(val).trim();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const ymd = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (ymd) {
    const mIdx = parseInt(ymd[2], 10) - 1;
    return `${ymd[3].padStart(2, '0')} ${months[mIdx] || ymd[2]} ${ymd[1]}`;
  }
  const dmy = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmy) {
    const mIdx = parseInt(dmy[2], 10) - 1;
    return `${dmy[1].padStart(2, '0')} ${months[mIdx] || dmy[2]} ${dmy[3]}`;
  }
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(d);
  }
  return str || '-';
}

console.log("DOB test 1 ('1997-02-12'):", formatDateDDMMYYYY("1997-02-12"));
console.log("DOB test 2 ('1997-02-11T18:30:00.000Z'):", formatDateDDMMYYYY("1997-02-11T18:30:00.000Z"));
console.log("DOJ test 1 ('2025-01-20'):", formatDateDDMMMYYYY("2025-01-20"));
console.log("DOJ test 2 ('2025-01-19T18:30:00.000Z'):", formatDateDDMMMYYYY("2025-01-19T18:30:00.000Z"));
