# Testing plan

Before release, test:

1. Create vault, lock, unlock and wrong-password behaviour.
2. Patient create, search, edit and persistence after reload.
3. Medicine catalogue search and manual entry.
4. Multiple prescription items and required-field validation.
5. Traditional and modern print layouts on A4.
6. PDF output and Bangla font rendering.
7. Encrypted backup and restore, including wrong password and malformed file.
8. Offline reload after service-worker installation.
9. Confirm no patient information is sent in network requests.
10. Test browser storage clearing and recovery guidance.

The starter repository is not clinically validated. Add automated tests before a production release.
