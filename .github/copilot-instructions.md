# MacroMate - Nutrition Tracking App

This is a React Native Expo mobile application for tracking macronutrients. The app helps users log food items, calculate macros, save meals, and track daily nutrition goals.

## Project Structure
- **App.tsx**: Main app component with navigation
- **src/screens/**: Screen components (Home, FoodSearch, Meals, History, Profile)
- **src/components/**: Reusable UI components
- **src/types/**: TypeScript type definitions
- **src/utils/**: Utility functions

## Key Features
1. **Food Search & Addition**: Search for foods and add custom food items
2. **Macro Calculation**: Automatic calculation of protein, carbs, fats, and calories
3. **Meal Management**: Save and reuse complete meals
4. **Daily Tracking**: Monitor daily macro intake with progress bars
5. **Goal Setting**: Set and track personal nutrition goals
6. **History**: View past meals and nutrition logs

## Technology Stack
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and toolchain
- **TypeScript**: Type safety and better development experience
- **React Navigation**: Navigation between screens
- **React Native Paper**: Material Design components
- **Expo SQLite**: Local database for data persistence (to be implemented)

## Development Guidelines
- Use TypeScript for all components and utilities
- Follow React Native best practices
- Use React Native Paper components for consistent UI
- Implement proper error handling
- Add data persistence with SQLite
- Consider adding food database API integration
- Implement user authentication for data sync

## Code Style
- Use functional components with hooks
- Implement proper prop types and interfaces
- Use meaningful variable and function names
- Add comments for complex logic
- Follow React Native styling conventions
