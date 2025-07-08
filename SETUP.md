# MacroMate Setup Guide

## Prerequisites Installation

Since Node.js is not currently installed on your system, you'll need to install it first:

### 1. Install Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version for Windows
3. Run the installer and follow the setup wizard
4. Restart VS Code after installation

### 2. Install Expo CLI
After Node.js is installed, run:
```bash
npm install -g @expo/cli
```

### 3. Install Project Dependencies
In the project directory, run:
```bash
npm install
```

## Running the Project

### Development Server
```bash
npm start
```
This will open the Expo development server with a QR code.

### Platform-Specific Commands
```bash
npm run ios      # Run on iOS simulator (requires Xcode)
npm run android  # Run on Android emulator (requires Android Studio)
npm run web      # Run in web browser
```

## Testing on Device

### Method 1: Expo Go App
1. Install "Expo Go" from App Store (iOS) or Google Play (Android)
2. Scan the QR code from the development server
3. The app will load on your device

### Method 2: Simulator/Emulator
- **iOS**: Install Xcode and use iOS Simulator
- **Android**: Install Android Studio and set up an emulator

## Development Workflow

1. Start the development server: `npm start`
2. Make changes to the code
3. The app will automatically reload with your changes
4. Use the development menu to access debugging tools

## Current Project Status

✅ **Completed:**
- Project structure created
- All screen components implemented
- Type definitions established
- Basic navigation setup
- Material Design UI components
- Utility functions for calculations

🔄 **Next Steps:**
1. Install Node.js and dependencies
2. Test the app on simulator/device
3. Implement data persistence with SQLite
4. Add food database API integration
5. Enhance user experience features

## Troubleshooting

### Common Issues:
- **Module not found errors**: Run `npm install` to install dependencies
- **Metro bundler issues**: Clear cache with `npx expo start --clear`
- **Simulator not starting**: Check iOS Simulator or Android emulator setup

### Getting Help:
- Check the Expo documentation: https://docs.expo.dev/
- React Native documentation: https://reactnative.dev/docs/getting-started
