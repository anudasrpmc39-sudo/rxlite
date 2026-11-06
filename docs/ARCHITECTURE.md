# Architecture

RxLite is a client-side React + TypeScript PWA.

- Presentation: React pages and reusable components.
- Application services: patient, medicine, prescription, backup and encryption services.
- Persistence: IndexedDB via Dexie.
- Encryption: Web Crypto API (PBKDF2-derived AES-GCM key).
- Deployment: static hosting such as GitHub Pages.

Patient information must never be included in source control, public logs, analytics or public catalogue assets.

Security note: this starter implementation encrypts the persisted vault payload. It requires independent threat modelling, security review and testing before clinical use. A browser-only app does not provide managed endpoint security.
