const syncUpdates = require("../jobs/sync-updates");

(async () => {
    const data = await syncUpdates.getPendingUpdates();
    console.log(data);
    process.exit(0);
})();