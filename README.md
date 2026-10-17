# Block Letterboxd Ratings

A tiny Firefox extension that hides the ratings UI on Letterboxd film pages
(`letterboxd.com/film/<slug>/`):

- the **rating histogram** (the star distribution bars), and
- the **average rating number** shown to the right of it.

Both live inside the `.rating-histogram` block that Letterboxd injects into the
page, so a single CSS rule hides them.

## Layout

```
manifest.json        Manifest V3 definition (content script + popup)
src/block.css        The hiding rule, gated behind an <html> class
src/content.js       Applies/removes that class from the stored setting
popup/               Toolbar popup with an on/off checkbox
icons/               Extension/toolbar icons (16/32/48/96/128 px)
icon1000x1000.png    Master artwork the icons were scaled down from
```

## Run it

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click **Load Temporary Add-on…**.
3. Select `manifest.json` in this folder.
4. Visit any film page, e.g. <https://letterboxd.com/film/the-godfather/>.

Temporary add-ons are removed when Firefox restarts. For a persistent install
the extension has to be signed (e.g. via addons.mozilla.org or `web-ext`).

## Toggle

Click the toolbar icon to show a checkbox:

- **Hide ratings** checked → the histogram and average rating are hidden.
- Unchecked → everything is shown again.

The setting is stored with `browser.storage.local` and applies immediately to
open film pages, no reload needed.

## License

[MIT](LICENSE)
