import { MD3LightTheme } from 'react-native-paper';

export const colors = {
  protein: '#B3265E',
  carbs: '#1666A8',
  fats: '#A15C00',
  calories: '#2E6B3E',
};

export const theme = {
  ...MD3LightTheme,
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3F6547',
    onPrimary: '#FFFFFF',
    primaryContainer: '#C1ECCD',
    onPrimaryContainer: '#00210B',
    secondary: '#526350',
    secondaryContainer: '#D5E8D0',
    background: '#F8FAF5',
    surface: '#F8FAF5',
    surfaceVariant: '#DEE5DA',
    outline: '#727970',
    error: '#BA1A1A',
  },
};
