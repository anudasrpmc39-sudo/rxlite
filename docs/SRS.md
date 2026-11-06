# RxLite Software Requirements Specification

## Purpose
RxLite is a lightweight, local-first GP prescription writer for Bangladesh. It supports patient records, medicine catalogue search, manual medicine entry, prescription creation, two prescription layouts, print/PDF output and encrypted backup.

## MVP requirements
- Doctor/chamber profile including BMDC registration number.
- Local patient registration, search and editing.
- Basic medical history and allergy notes.
- Searchable local medicine catalogue and manual entry.
- Multiple medicines per prescription with separate dose, route, frequency, duration and quantity fields.
- Traditional Rx and modern structured layouts.
- Draft and issued prescription states.
- Local encrypted storage, lock screen and encrypted backup/restore.
- Offline-capable PWA.

## Exclusions
No automated diagnosis, dose recommendation, interaction checking, pharmacy integration, cloud synchronization, billing or hospital management.

## Clinical limitation
RxLite is a documentation tool, not clinical decision support. The prescribing clinician must verify and authorize every prescription. Legal and clinical review is required before real-patient deployment.
