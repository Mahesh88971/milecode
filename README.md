# MILADICODE website snapshot

This folder contains a local static snapshot of the website at https://miladic-u2nvq9q.runable.site, including its compiled app, styles, and image assets. The original interactive process timeline, portfolio cards, and experiment tabs are part of the compiled app.

The Experiments section and its navigation links are hidden locally by `custom.css`.

## Run locally (Windows)

Open PowerShell in this folder and run:

```powershell
py -m http.server 5173
```

Then visit http://localhost:5173. Keep the server running while viewing the page. Relative asset URLs support both root hosting and GitHub Pages project URLs such as `/milecode/`.

The fonts are loaded from Google Fonts, so they require an internet connection. All site images and app/style bundles are stored locally.
