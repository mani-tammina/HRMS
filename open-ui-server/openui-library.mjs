import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createLibrary, defineComponent, generateSystemPrompt, tagSchemaId } from "@openuidev/lang-core";
import { buildInboxOpenUiLibrary, promptOptions } from "../public/src/app/modules/inbox/openui/schema.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// component: null keeps Angular component classes out of the Node process.
export const library = buildInboxOpenUiLibrary({
  createLibrary,
  defineComponent,
  tagSchemaId,
  components: {},
});

export const systemPrompt = generateSystemPrompt({
  library: library.toSpec(),
  promptOptions,
});

export const DEFAULT_PROMPT_OUTPUT_PATH = path.join(
  __dirname,
  "generated",
  "openui-system-prompt.txt"
);

export async function writeGeneratedPrompt(outputPath = DEFAULT_PROMPT_OUTPUT_PATH) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, systemPrompt, "utf8");
  return outputPath;
}
