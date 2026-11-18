const { test } = require("node:test");
const assert = require("node:assert/strict");
const { timesheetDescription } = require("../utils/timesheet-description");

test("Keeps a stored description and does not mutate hourly task records", () => {
  const row = { work_description: "Authored description", hours_breakdown: [{ task: "Different task" }] };
  const before = JSON.stringify(row);
  assert.equal(timesheetDescription(row), "Authored description");
  assert.equal(JSON.stringify(row), before);
});
test("Legacy hourly-only rows retain every distinct task in its original order", () => {
  const row = { work_description: null, hours_breakdown: [
    { task: "Development" }, { task: "Development" }, { task_description: " Testing " },
    { work: "Review" }, { task: "", work: "Review" }, null, { task: 12 },
  ] };
  const before = JSON.stringify(row);
  assert.equal(timesheetDescription(row), "Development | Testing | Review");
  assert.equal(JSON.stringify(row), before);
});
test("Missing or malformed task details remain missing rather than invented", () => {
  for (const row of [{}, { work_description: null }, { hours_breakdown: "invalid" }, { hours_breakdown: [] }]) {
    assert.equal(timesheetDescription(row), null);
  }
});
