// Every page referenced in docs.json must exist, and every page on disk must be
// referenced. A docs site that 404s its own navigation is worse than no docs.
import { readFileSync, existsSync } from "node:fs";
import { globSync } from "node:fs";

const config = JSON.parse(readFileSync("docs.json", "utf8"));

const referenced = new Set();
const walk = (node) => {
  if (Array.isArray(node)) return node.forEach(walk);
  if (node && typeof node === "object") {
    if (Array.isArray(node.pages)) {
      for (const p of node.pages) typeof p === "string" ? referenced.add(p) : walk(p);
    }
    for (const [k, v] of Object.entries(node)) if (k !== "pages") walk(v);
  }
};
walk(config.navigation);

const missing = [...referenced].filter((p) => !existsSync(`${p}.mdx`));
const onDisk = globSync("**/*.mdx", { exclude: (p) => p.startsWith("snippets/") })
  .map((f) => f.replace(/\.mdx$/, ""));
const orphaned = onDisk.filter((p) => !referenced.has(p) && !p.startsWith("snippets/"));

let failed = false;
if (missing.length) {
  console.error("Referenced in docs.json but missing on disk:");
  for (const p of missing) console.error(`  ${p}.mdx`);
  failed = true;
}
if (orphaned.length) {
  console.error("On disk but not in navigation:");
  for (const p of orphaned) console.error(`  ${p}.mdx`);
  failed = true;
}
if (failed) process.exit(1);
console.log(`navigation ok: ${referenced.size} pages, all present and reachable`);
