import fs from "fs-extra";
import path from "path";
import { defaultRagSettings, RagSettings } from "./interfaces";

// export let currentRagSettings: RagSettings;
export let currentRagSettings: RagSettings = { ...defaultRagSettings };

// export function updateRagSettings(newSettings: Partial<RagSettings>): void {
//   currentRagSettings = { ...currentRagSettings, ...newSettings };
//   console.log("Updated RAG settings:", currentRagSettings);
//   // Optionally reinitialize services here if needed
// }
export function updateRagSettings(newSettings: Partial<RagSettings>): void {
  // Validate and sanitize numeric settings (e.g., chunkSize and chunkOverlap)
  if (newSettings.TEXT_SPLITTER_CHUNK_SIZE !== undefined) {
    const parsedChunkSize = parseInt(newSettings.TEXT_SPLITTER_CHUNK_SIZE as unknown as string, 10);
    if (isNaN(parsedChunkSize)) {
      throw new Error("Invalid value for TEXT_SPLITTER_CHUNK_SIZE: must be a valid integer.");
    }
    newSettings.TEXT_SPLITTER_CHUNK_SIZE = parsedChunkSize;
  }

  if (newSettings.TEXT_SPLITTER_CHUNK_OVERLAP !== undefined) {
    const parsedChunkOverlap = parseInt(newSettings.TEXT_SPLITTER_CHUNK_OVERLAP as unknown as string, 10);
    if (isNaN(parsedChunkOverlap)) {
      throw new Error("Invalid value for TEXT_SPLITTER_CHUNK_OVERLAP: must be a valid integer.");
    }
    newSettings.TEXT_SPLITTER_CHUNK_OVERLAP = parsedChunkOverlap;
  }

  // Additional validation to ensure chunkOverlap < chunkSize
  if (
    newSettings.TEXT_SPLITTER_CHUNK_SIZE !== undefined &&
    newSettings.TEXT_SPLITTER_CHUNK_OVERLAP !== undefined &&
    newSettings.TEXT_SPLITTER_CHUNK_OVERLAP >= newSettings.TEXT_SPLITTER_CHUNK_SIZE
  ) {
    throw new Error("Invalid RAG settings: TEXT_SPLITTER_CHUNK_OVERLAP must be less than TEXT_SPLITTER_CHUNK_SIZE.");
  }

  // Update the current settings with the sanitized new settings
  currentRagSettings = { ...currentRagSettings, ...newSettings };

  console.log("Updated RAG settings:", currentRagSettings);
  // Optionally reinitialize services here if needed
}

export function getRagSettings(): RagSettings {
  return currentRagSettings;
}

// const SETTINGS_FILE = path.resolve("./rag-settings.json");

// function saveRagSettings(settings: RagSettings): void {
//   fs.writeJSONSync(SETTINGS_FILE, settings, { spaces: 2 });
// }

// function loadRagSettings(): RagSettings {
//   if (fs.existsSync(SETTINGS_FILE)) {
//     return fs.readJSONSync(SETTINGS_FILE);
//   }
//   return { ...defaultRagSettings };
// }

// // Load settings on startup
// currentRagSettings = loadRagSettings();
