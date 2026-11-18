import { writeGeneratedPrompt } from "./openui-library.mjs";

const savedPath = await writeGeneratedPrompt();
console.log(`Generated OpenUI system prompt at: ${savedPath}`);

