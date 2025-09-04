#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const WATCH_FILES = ["client/types.gen.ts", "client/client.gen.ts"];

function runGenerator() {
  try {
    console.log("🔄 Regenerating endpoint pages...");
    execSync("node scripts/generate-endpoint-pages.js", { stdio: "inherit" });
    console.log("✅ Pages regenerated successfully");
  } catch (error) {
    console.error("❌ Error regenerating pages:", error);
  }
}

function watchFiles() {
  console.log("👀 Watching for client file changes...");

  WATCH_FILES.forEach((file) => {
    const filePath = path.join(process.cwd(), file);

    if (fs.existsSync(filePath)) {
      fs.watchFile(filePath, { interval: 1000 }, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
          console.log(`📝 ${file} changed`);
          runGenerator();
        }
      });
      console.log(`📁 Watching ${file}`);
    }
  });
}

// Initial generation
runGenerator();

// Start watching
watchFiles();

// Keep the process alive
process.on("SIGINT", () => {
  console.log("\n👋 Stopping file watcher...");
  process.exit(0);
});
