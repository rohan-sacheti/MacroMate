import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ActivityIndicator,
  Button,
  PaperProvider,
  Snackbar,
  Text,
} from 'react-native-paper';
import { AppProvider, useApp } from './src/context/AppContext';
import { RootTabParamList } from './src/navigation/types';
import FoodSearchScreen from './src/screens/FoodSearchScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import HomeScreen from './src/screens/HomeScreen';
import MealsScreen from './src/screens/MealsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { theme } from './src/theme';

const Tab = createBottomTabNavigator<RootTabParamList>();

const icons: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  Today: 'today-outline',
  Add: 'add-circle-outline',
  Meals: 'restaurant-outline',
  History: 'stats-chart-outline',
  Profile: 'person-outline',
};

const AppContent = () => {
  const { clearError, error, isLoading } = useApp();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text variant="bodyLarge">Preparing your log…</Text>
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={icons[route.name]} color={color} size={size} />
            ),
            tabBarActiveTintColor: theme.colors.primary,
            tabBarStyle: styles.tabBar,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.background },
            headerTitleStyle: { fontWeight: '700' },
          })}
        >
          <Tab.Screen name="Today" component={HomeScreen} />
          <Tab.Screen name="Add" component={FoodSearchScreen} options={{ title: 'Add food' }} />
          <Tab.Screen name="Meals" component={MealsScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <Snackbar
        visible={Boolean(error)}
        onDismiss={clearError}
        action={<Button onPress={clearError}>Dismiss</Button>}
      >
        {error}
      </Snackbar>
    </>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: theme.colors.background,
  },
  tabBar: {
    height: 68,
    paddingBottom: 8,
    paddingTop: 6,
    backgroundColor: theme.colors.surface,
  },
});
