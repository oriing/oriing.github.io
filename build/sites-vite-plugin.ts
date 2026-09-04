import { access, cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

async function exists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function sites(): Plugin {
  let root = process.cwd();

  return {
    name: "sites-hosting-manifest",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      const outputDirectory = resolve(root, "dist", ".openai");
      const hostingConfig = resolve(root, ".openai", "hosting.json");

      await rm(outputDirectory, { recursive: true, force: true });

      if (await exists(hostingConfig)) {
        await mkdir(outputDirectory, { recursive: true });
        await cp(hostingConfig, resolve(outputDirectory, "hosting.json"));
      }
    },
  };
}
