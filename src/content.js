/*
 * Block Letterboxd Ratings
 *
 * Applies the on/off toggle by adding/removing the `blbr-enabled` class on
 * <html>. The actual hiding is done by src/block.css, so this stays in sync
 * with the histogram Letterboxd injects after load and reacts instantly when
 * the popup flips the setting.
 *
 * While enabled, the ratings block is covered by a placeholder rectangle (see
 * block.css). Left-clicking that rectangle reveals the real ratings for the
 * current page view by adding `.blbr-revealed` to the histogram.
 */

const STORAGE_KEY = "enabled";
const ROOT_CLASS = "blbr-enabled";
const REVEALED_CLASS = "blbr-revealed";

/** @param {boolean} enabled */
function applyEnabled(enabled) {
  const isEnabled = enabled !== false;
  document.documentElement.classList.toggle(ROOT_CLASS, isEnabled);

  if (!isEnabled) {
    // Drop any reveals so the next time it's enabled we start blocked again.
    for (const histogram of document.querySelectorAll(
      `.${REVEALED_CLASS}`,
    )) {
      histogram.classList.remove(REVEALED_CLASS);
    }
  }
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

// Left-clicking the placeholder rectangle reveals the ratings. Delegated on
// <document> so it also covers the histogram Letterboxd injects asynchronously.
document.addEventListener("click", (event) => {
  if (event.button !== 0) return;
  if (!document.documentElement.classList.contains(ROOT_CLASS)) return;

  const histogram = event.target.closest(".rating-histogram");
  if (!histogram || histogram.classList.contains(REVEALED_CLASS)) return;

  histogram.classList.add(REVEALED_CLASS);
});
