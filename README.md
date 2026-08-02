# MacroMate

MacroMate is a local-first React Native app for logging food, tracking daily macros, reusing meals, and reviewing nutrition history.

## Current features

- Material 3 dashboard with calorie and macro progress
- Breakfast, lunch, dinner, and snack logging
- Offline starter food catalog and custom food entry
- SQLite persistence for goals, logs, and saved meals
- Saved-meal reuse and daily history
- Validated inputs plus loading, empty, and error states

See [the product requirements](docs/PRD.md) for the product principles, complete roadmap, and open decisions.

## Stack

- Expo 49 and React Native 0.72
- TypeScript
- React Navigation
- React Native Paper
- Expo SQLite

## Run locally

Prerequisites: a supported Node.js LTS release and an Expo-compatible simulator, emulator, or device.

```bash
npm install
npm start
```

Platform shortcuts:

```bash
npm run ios
npm run android
npm run web
```

Validate TypeScript:

```bash
npm run typecheck
```

## Project structure

```text
App.tsx
docs/PRD.md
src/
  components/
  context/
  data/
  navigation/
  screens/
  services/
  types/
  utils/
```

## Data and privacy

The current release stores nutrition data in the app's local SQLite database. It does not require an account or transmit user data. Removing the app may remove its local data until backup and restore are implemented.
