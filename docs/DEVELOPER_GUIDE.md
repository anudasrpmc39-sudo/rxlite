# Developer guide

## Requirements
- Node.js 20 or later
- npm

## Install and run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## GitHub Pages
Set `base` in `vite.config.ts` to `"/rxlite/"` when deploying to a repository project page named `rxlite`. Use `/` for a user/organization page or custom domain. Configure the repository Pages source to GitHub Actions.

## Development rules
- Never commit real patient information, backups, screenshots containing PHI or local database files.
- Keep catalogue provenance and licensing in the catalogue release metadata.
- Add tests for validation, migrations, backup/restore and prescription rendering.
- Review security changes before release.
