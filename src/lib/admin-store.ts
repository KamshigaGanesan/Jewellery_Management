import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { defaultAdminState, type AdminState } from "./admin-state";

const storePath = path.join(process.cwd(), "data", "admin-state.json");

async function ensureStoreDirectory() {
  await mkdir(path.dirname(storePath), { recursive: true });
}

export async function readAdminState(): Promise<AdminState> {
  try {
    const file = await readFile(storePath, "utf8");
    return JSON.parse(file) as AdminState;
  } catch {
    await writeAdminState(defaultAdminState);
    return defaultAdminState;
  }
}

export async function writeAdminState(state: AdminState): Promise<AdminState> {
  await ensureStoreDirectory();
  await writeFile(storePath, JSON.stringify(state, null, 2), "utf8");
  return state;
}
