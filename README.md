# RxLite — Open-source GP Prescription Writer

A lightweight, local-first prescription-writing PWA intended for GP workflows in Bangladesh.

> **Clinical and privacy notice:** This repository is a development starter, not a certified clinical product. Do not use it with real patient information until security, clinical and applicable legal reviews have been completed. Every prescription must be checked and authorized by a qualified prescriber.

## Features in this starter
- Local encrypted vault
- Doctor/chamber profile
- Patient registration and search
- Basic allergy and history fields
- Medicine catalogue search interface plus manual entry
- Multi-medicine prescription editor
- Traditional Rx and modern layouts
- Local prescription history
- Print / browser PDF
- Encrypted backup and restore
- PWA/offline foundation

The bundled catalogue starts empty. Import only data whose provenance, accuracy and licensing have been checked. Do not interpret catalogue presence as proof of current DGDA registration.

## Requirements
- Node.js 20+
- npm

## Run locally
```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## GitHub Pages
1. Push this repository to GitHub.
2. If the repository is `username/rxlite`, set `base: "/rxlite/"` in `vite.config.ts`.
3. If using `username.github.io` or a custom domain, set `base: "/"`.
4. Enable GitHub Actions as the Pages build and deployment source.
5. Push to `main`.

## Data protection
Patient records are stored in the browser's IndexedDB and encrypted as a vault payload. The source code and public static hosting do not need access to patient data. Use a strong password and download encrypted backups regularly. Browser profile deletion, storage eviction or device loss can still cause data loss.

Never commit patient data, backup files, patient screenshots or identifiable test records.

## Limitations
- No cloud synchronization or multi-user clinic database.
- No automated diagnosis, dose calculation, drug interaction checking or clinical recommendations.
- The catalogue is an empty starter catalogue.
- The PIN/password and encryption flow needs independent security testing.
- This starter does not implement legally validated electronic signatures or national e-prescription transmission.
- Bangla interface translations and end-to-end Bangla print QA remain to be completed.

## Documentation
See `docs/` for the SRS, architecture, database design, user guide, developer guide, privacy notes and testing plan.

## License
MIT. See `LICENSE`.
