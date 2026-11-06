# Database design

The starter implementation stores one encrypted vault record in IndexedDB. The decrypted application model contains:

- Doctor
- Patient
- Medicine
- Prescription
- Prescription items
- Application settings

This single-vault approach reduces accidental plaintext persistence in the MVP. For future scale, consider encrypted per-record tables, migrations, audit events and validated import/export formats.
