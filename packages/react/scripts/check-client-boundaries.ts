import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const componentsDir = path.join(import.meta.dirname, "../src/components");
const interactivePattern =
  /\b(?:useState|useEffect|useRef|useLayoutEffect|createContext|useContext|motion\.|document\.|window\.|ResizeObserver|IntersectionObserver)\b/u;

const entries = await readdir(componentsDir);
const files = entries
  .filter((file) => file.endsWith(".tsx") && !file.endsWith(".test.tsx"))
  .toSorted();

const results = await Promise.all(
  files.map(async (file) => ({
    file,
    source: await readFile(path.join(componentsDir, file), "utf-8"),
  }))
);
const failures = results
  .filter(
    ({ source }) =>
      interactivePattern.test(source) && !source.startsWith('"use client"')
  )
  .map(({ file }) => file);

if (failures.length > 0) {
  console.error(
    `Missing "use client" directive:\n${failures.map((file) => `- ${file}`).join("\n")}`
  );
  process.exitCode = 1;
} else {
  console.log(`✔ Checked ${files.length} component client boundaries.`);
}
