# Project Idea: Real-Time Multi-Device Sync App

## Overview
The app is designed to allow users to manage notes, tasks, or short text entries that automatically synchronize across all their devices in real time.

It will be a clean, minimal, and smooth experience with:
- Real-time synchronization via backend (e.g., Firebase or Supabase).
- Offline-first support (data is cached locally and synced when online).
- Simple UI, focusing on clarity, speed, and no clutter.
- Vibration feedback for key actions (Capacitor feature).

## MVP Features
- Add, edit, and delete notes/tasks.
- Sync instantly across all signed-in devices.
- Offline mode (with queued sync).
- Light/dark theme support.
- Account creation and login (Google, Apple, or email).

## Future Features
- End-to-end encryption for user data.
- Shared spaces for collaboration.
- Version history per item.
- Smart reminders with optional vibration.
- PWA and native app builds (iOS + Android).

## Target Stack
- **Frontend:** Angular + Ionic
- **Native Layer:** Capacitor
- **Backend:** Firebase or Supabase (to be decided)
- **Deployment:** Web, iOS, and Android from the same codebase
