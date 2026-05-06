import { execSync } from "node:child_process";

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

run("npx sanity manifest extract --path public/studio/static");

if (process.env.VERCEL_ENV === "production") {
  run("npx sanity schema deploy");
} else {
  console.log(
    `[sanity-prepare] Skipping schema deploy (VERCEL_ENV=${process.env.VERCEL_ENV ?? "unset"})`,
  );
}
