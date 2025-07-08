# MacroMate - Nutrition Tracking App

A comprehensive mobile application for tracking macronutrients (protein, carbohydrates, fats) built with React Native and Expo.

## Features

### Core Features
- **Food Search & Addition**: Search for foods or add custom food items with nutritional information
- **Macro Calculator**: Automatically calculates total macros per item and per meal
- **Meal Management**: Save complete meals for quick reuse
- **Daily Logging**: Track meals throughout the day with running totals
- **Progress Tracking**: Visual progress bars showing daily macro goals
- **Nutrition History**: View past meals and weekly/monthly summaries

### User Experience
- Clean, intuitive interface with Material Design components
- Quick access to frequently used meals
- Real-time macro calculations
- Goal setting and progress visualization

## Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **TypeScript**: Type safety and enhanced development experience
- **React Navigation**: Screen navigation and routing
- **React Native Paper**: Material Design UI components
- **Expo SQLite**: Local database for data persistence (planned)

## Project Structure

```
MacroMate/
├── App.tsx                 # Main app component
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── FoodSearchScreen.tsx
│   │   ├── MealsScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/        # Reusable UI components
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── assets/               # Images and static assets
└── .github/
    └── copilot-instructions.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your preferred platform:
   ```bash
   npm run ios     # Run on iOS simulator
   npm run android # Run on Android emulator
   npm run web     # Run in web browser
   ```

## Development

### Available Scripts
- `npm start`: Start the Expo development server
- `npm run android`: Run on Android emulator/device
- `npm run ios`: Run on iOS simulator/device
- `npm run web`: Run in web browser

### Development Guidelines
- Use TypeScript for all new components
- Follow React Native best practices
- Use React Native Paper components for consistent UI
- Implement proper error handling
- Add comprehensive comments for complex logic

## Planned Features

### Phase 1 (MVP)
- [x] Basic UI structure with navigation
- [x] Food search and addition
- [x] Macro calculation
- [x] Saved meals functionality
- [x] Daily progress tracking
- [ ] Local data persistence with SQLite

### Phase 2
- [ ] Food database API integration
- [ ] Advanced meal planning
- [ ] Nutrition insights and analytics
- [ ] Export functionality

### Phase 3
- [ ] User authentication
- [ ] Cloud data sync
- [ ] Social features
- [ ] Meal sharing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact [Your Name] at [your.email@example.com].
