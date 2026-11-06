# Privacy and security notes

RxLite is designed to keep records in a local browser database. The application source is hosted separately from the patient vault.

The vault payload is encrypted using AES-GCM with a key derived from the user's password using PBKDF2. This is a starter implementation, not a security certification.

Operational cautions:
- Use a strong unique password.
- Secure the computer and operating-system account.
- Download encrypted backups regularly.
- Store backups separately and securely.
- Do not share screenshots or exports containing patient details.
- Browser data clearing, profile deletion, device loss or hardware failure can destroy local records.
- Do not use this starter release for real patient care until a qualified security review and applicable Bangladesh legal/clinical review are complete.

No analytics or third-party tracking is included.
