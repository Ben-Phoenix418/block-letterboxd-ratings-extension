/*
 * Block Letterboxd Ratings
 *
 * Applies the on/off toggle by adding/removing the `blbr-enabled` class on
 * <html>. The actual hiding is done by src/block.css, so this stays in sync
 * with the histogram Letterboxd injects after load and reacts instantly when
 * the popup flips the setting.
 */

const STORAGE_KEY = "enabled";
const ROOT_CLASS = "blbr-enabled";

/** @param {boolean} enabled */
function applyEnabled(enabled) {
  document.documentElement.classList.toggle(ROOT_CLASS, enabled !== false);
}

// Initial state (the default is enabled).
browser.storage.local
  .get({ [STORAGE_KEY]: true })
  .then((values) => applyEnabled(values[STORAGE_KEY]));

// React to toggles from the popup on already-open film pages.
browser.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[STORAGE_KEY]) {
    applyEnabled(changes[STORAGE_KEY].newValue);
  }
});
