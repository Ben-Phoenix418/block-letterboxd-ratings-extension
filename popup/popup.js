/*
 * Block Letterboxd Ratings — popup
 *
 * Binds a single checkbox to the stored `enabled` flag. Content scripts pick
 * the change up through browser.storage.onChanged, so it applies live.
 */

const STORAGE_KEY = "enabled";
const checkbox = document.getElementById("enabled");

browser.storage.local.get({ [STORAGE_KEY]: true }).then((values) => {
  checkbox.checked = values[STORAGE_KEY] !== false;
});

checkbox.addEventListener("change", () => {
  browser.storage.local.set({ [STORAGE_KEY]: checkbox.checked });
});
