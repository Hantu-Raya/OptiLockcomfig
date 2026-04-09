import { BlobReader, BlobWriter, ZipWriter, TextReader } from "@zip.js/zip.js";
import { PRESETS, ADDONS, VIDEO_SETTINGS } from "@utils/deadlockData";
import { useDeadlockStore } from "@store/deadlock";

function getStoreState() {
  return useDeadlockStore.getState();
}

function buildVideoTxt(overrides: Record<string, string>): string {
  const lines: string[] = [];
  for (const s of VIDEO_SETTINGS) {
    const val = overrides[s.key] ?? s.defaultValue;
    lines.push(`"${s.key}" "${val}"`);
  }
  return lines.join("\n") + "\n";
}

async function fetchText(url: string): Promise<string> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Failed to fetch ${url}: ${r.status}`);
  return r.text();
}

async function fetchBytes(url: string): Promise<Uint8Array> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Failed to fetch ${url}: ${r.status}`);
  return new Uint8Array(await r.arrayBuffer());
}

export async function installDeadlockConfig(): Promise<void> {
  const { selectedPreset, enabledAddons, videoOverrides, installPath } = getStoreState();
  const preset = PRESETS.find((p) => p.id === selectedPreset);
  if (!preset) throw new Error("No preset selected");

  const zipWriter = new ZipWriter(new BlobWriter("application/zip"));
  const gameinfo = await fetchText(preset.files.gameinfo);
  await zipWriter.add("game/citadel/gameinfo.gi", new TextReader(gameinfo));
  // Write video.txt: always build from VIDEO_SETTINGS defaults merged with user overrides.
  // Never write a raw remote file verbatim — it may contain instructions, not valid config.
  if (preset.files.video || Object.keys(videoOverrides).length > 0) {
    const videoTxt = buildVideoTxt(videoOverrides);
    await zipWriter.add("game/citadel/cfg/video.txt", new TextReader(videoTxt));
  }
  for (const addonId of enabledAddons) {
    const addon = ADDONS.find((a) => a.id === addonId);
    if (!addon) continue;
    const data = await fetchBytes(addon.filePath);
    const blob = new Blob([data]);
    await zipWriter.add("game/citadel/addons/" + addon.fileName, new BlobReader(blob));
  }
  const zipBlob = await zipWriter.close();
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "optilock-deadlock-config.zip";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export async function deadlockApp(): Promise<void> {
  const { mountDeadlockApp } = await import("@components/deadlock/DeadlockApp");
  const el = document.createElement("div");
  el.id = "deadlock-app-root";
  document.querySelector("deadlock-app-loader")?.appendChild(el);
  mountDeadlockApp(el);
}
