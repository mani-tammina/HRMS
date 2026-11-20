/** Preserve authored descriptions; legacy hourly-only rows expose their stored
 * task text without repeating an identical task for each hour. No DB writes. */
function timesheetDescription(row) {
  if (typeof row.work_description === "string" && row.work_description.trim()) {
    return row.work_description;
  }
  if (!Array.isArray(row.hours_breakdown)) return row.work_description ?? null;
  const descriptions = row.hours_breakdown.map((entry) => {
    if (!entry || typeof entry !== "object") return "";
    const text = [entry.task, entry.task_description, entry.work]
      .find((value) => typeof value === "string" && value.trim());
    return text ? text.trim() : "";
  }).filter(Boolean);
  return descriptions.length ? [...new Set(descriptions)].join(" | ") : row.work_description ?? null;
}

module.exports = { timesheetDescription };
