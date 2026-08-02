import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  SegmentedButtons,
  Text,
  TextInput,
} from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { theme } from '../theme';
import { MealType } from '../types';

const MealsScreen = () => {
  const {
    addMealToToday,
    createMeal,
    removeMeal,
    savedMeals,
    todayLog,
  } = useApp();
  const [name, setName] = useState('');
  const [mealType, setMealType] = useState<MealType>('Breakfast');
  const [createVisible, setCreateVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  const selectedMeal = savedMeals.find((meal) => meal.id === selectedMealId);

  const saveToday = async () => {
    if (!name.trim() || !todayLog?.entries.length) return;
    try {
      await createMeal(name, todayLog.entries);
      setName('');
      setCreateVisible(false);
    } catch {
      // The global error message provides actionable feedback.
    }
  };

  const addSelectedMeal = async () => {
    if (!selectedMeal) return;
    try {
      await addMealToToday(selectedMeal, mealType);
      setSelectedMealId(null);
    } catch {
      // The global error message provides actionable feedback.
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heading}>
        <View style={styles.headingText}>
          <Text variant="headlineSmall">Saved meals</Text>
          <Text variant="bodyMedium" style={styles.muted}>
            Reuse combinations you eat often.
          </Text>
        </View>
        <Button
          mode="contained"
          icon="bookmark-plus-outline"
          disabled={!todayLog?.entries.length}
          onPress={() => setCreateVisible(true)}
        >
          Save today
        </Button>
      </View>

      {!savedMeals.length ? (
        <Card mode="outlined">
          <Card.Content style={styles.empty}>
            <Text variant="titleMedium">No saved meals yet</Text>
            <Text variant="bodyMedium" style={styles.muted}>
              Log foods on Today, then save that combination here.
            </Text>
          </Card.Content>
        </Card>
      ) : (
        savedMeals.map((meal) => (
          <Card mode="outlined" key={meal.id}>
            <Card.Content>
              <View style={styles.mealHeader}>
                <View style={styles.headingText}>
                  <Text variant="titleMedium">{meal.name}</Text>
                  <Text variant="bodySmall" style={styles.muted}>
                    {meal.foodItems.length} items · {Math.round(meal.calories)} kcal
                  </Text>
                </View>
                <IconButton
                  icon="delete-outline"
                  accessibilityLabel={`Delete ${meal.name}`}
                  onPress={() => void removeMeal(meal.id)}
                />
              </View>
              <Text variant="bodyMedium">
                P {Math.round(meal.protein)}g · C {Math.round(meal.carbs)}g · F {Math.round(meal.fats)}g
              </Text>
              <Button
                style={styles.addButton}
                mode="contained-tonal"
                icon="plus"
                onPress={() => setSelectedMealId(meal.id)}
              >
                Add to today
              </Button>
            </Card.Content>
          </Card>
        ))
      )}

      <Portal>
        <Dialog visible={createVisible} onDismiss={() => setCreateVisible(false)}>
          <Dialog.Title>Save today as a meal</Dialog.Title>
          <Dialog.Content>
            <TextInput
              autoFocus
              label="Meal name"
              value={name}
              onChangeText={setName}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setCreateVisible(false)}>Cancel</Button>
            <Button disabled={!name.trim()} onPress={() => void saveToday()}>
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={Boolean(selectedMeal)} onDismiss={() => setSelectedMealId(null)}>
          <Dialog.Title>Add {selectedMeal?.name}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={styles.dialogLabel}>Choose a meal</Text>
            <SegmentedButtons
              value={mealType}
              onValueChange={(value) => setMealType(value as MealType)}
              buttons={[
                { value: 'Breakfast', label: 'Breakfast' },
                { value: 'Lunch', label: 'Lunch' },
                { value: 'Dinner', label: 'Dinner' },
                { value: 'Snack', label: 'Snack' },
              ]}
              density="small"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSelectedMealId(null)}>Cancel</Button>
            <Button onPress={() => void addSelectedMeal()}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 32, gap: 16 },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headingText: { flex: 1, gap: 4 },
  muted: { color: theme.colors.onSurfaceVariant },
  empty: { alignItems: 'center', gap: 8, paddingVertical: 24 },
  mealHeader: { flexDirection: 'row', alignItems: 'center' },
  addButton: { marginTop: 14 },
  dialogLabel: { marginBottom: 12 },
});

export default MealsScreen;
