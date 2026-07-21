const cron = require("node-cron");
const syncUpdates = require("./jobs/sync-updates");

function startScheduler() {
  cron.schedule("*/20 * * * * *", async () => {
    console.log("Running scheduled job...");
    await syncUpdates();
  });

  console.log("⏰ Scheduler started");
}

module.exports = startScheduler;
