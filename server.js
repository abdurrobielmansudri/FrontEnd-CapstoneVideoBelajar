import { spawn } from "node:child_process";

const port = process.env.PORT || "3001";

const proc = spawn(
  "npx",
  ["json-server", "db.json", "--host", "0.0.0.0", "--port", port],
  { stdio: "inherit", shell: true }
);

proc.on("exit", (code) => process.exit(code ?? 0));