# React Native Project with Expo

This README provides the steps to create and set up a React Native project using Expo.

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

To install Expo CLI globally, run:
```bash
npm install -g expo-cli
```

## Steps to Create a React Native Project with Expo

1. **Initialize a New Project**
   ```bash
   expo init MyNewProject
   ```
   Choose a template (e.g., `blank` or `blank (TypeScript)`) when prompted.

2. **Navigate to the Project Directory**
   ```bash
   cd MyNewProject
   ```

3. **Start the Development Server**
   ```bash
   expo start
   ```
   This will open the Expo Developer Tools in your browser. You can scan the QR code with the Expo Go app on your mobile device or run the app on an emulator.

## Project Structure

This repository contains the following structure:

```
MiProyecto/
├── app.json
├── eslint.config.js
├── expo-env.d.ts
├── package.json
├── README.md
├── tsconfig.json
├── app/
│   ├── _layout.tsx
│   ├── modal.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── explore.tsx
│       └── index.tsx
├── assets/
│   └── images/
├── components/
│   ├── external-link.tsx
│   ├── haptic-tab.tsx
│   ├── hello-wave.tsx
│   ├── parallax-scroll-view.tsx
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui/
│       ├── collapsible.tsx
│       ├── icon-symbol.ios.tsx
│       └── icon-symbol.tsx
├── constants/
│   └── theme.ts
├── hooks/
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
└── scripts/
    └── reset-project.js
```

## Useful Commands

- **Run the app**: `expo start`
- **Build the app**: `expo build`
- **Eject the app**: `expo eject`

For more details, refer to the [Expo Documentation](https://docs.expo.dev/).

Otros:

npx expo start --tunnel
