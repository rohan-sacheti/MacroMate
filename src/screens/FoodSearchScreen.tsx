import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  Button,
  Card,
  Dialog,
  Divider,
  Portal,
  Searchbar,
  SegmentedButtons,
  Text,
  TextInput,
} from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { foodCatalog } from '../data/foodCatalog';
import { RootTabParamList } from '../navigation/types';
import { theme } from '../theme';
import { FoodDraft, MealType } from '../types';
import { calculateCalories } from '../utils/calculations';

type Props = BottomTabScreenProps<RootTabParamList, 'Add'>;
type DraftForm = Record<'name' | 'quantity' | 'unit' | 'protein' | 'carbs' | 'fats' | 'calories', string>;

const emptyForm: DraftForm = {
  name: '',
  quantity: '100',
  unit: 'g',
  protein: '',
  carbs: '',
  fats: '',
  calories: '',
};

const FoodSearchScreen = ({ navigation }: Props) => {
  const { addFood } = useApp();
  const [query, setQuery] = useState('');
  const [mealType, setMealType] = useState<MealType>('Breakfast');
  const [form, setForm] = useState(emptyForm);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [validationError, setValidationError] = useState('');

  const results = useMemo(
    () =>
      query.trim().length < 2
        ? []
        : foodCatalog.filter((food) =>
            food.name.toLowerCase().includes(query.trim().toLowerCase())
          ),
    [query]
  );

  const logFood = async (food: FoodDraft) => {
    try {
      await addFood(food, mealType);
      navigation.navigate('Today');
    } catch {
      // The global error message provides actionable feedback.
    }
  };

  const submitCustomFood = async () => {
    const parsed = {
      name: form.name.trim(),
      quantity: Number(form.quantity),
      unit: form.unit.trim(),
      protein: Number(form.protein),
      carbs: Number(form.carbs),
      fats: Number(form.fats),
      calories: form.calories
        ? Number(form.calories)
        : calculateCalories(Number(form.protein), Number(form.carbs), Number(form.fats)),
    };
    if (
      !parsed.name ||
      !parsed.unit ||
      !Number.isFinite(parsed.quantity) ||
      parsed.quantity <= 0 ||
      [parsed.protein, parsed.carbs, parsed.fats, parsed.calories].some(
        (value) => !Number.isFinite(value) || value < 0
      )
    ) {
      setValidationError('Enter a name, serving, and non-negative nutrition values.');
      return;
    }
    setValidationError('');
    setDialogVisible(false);
    setForm(emptyForm);
    await logFood(parsed);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View>
          <Text variant="headlineSmall">What did you eat?</Text>
          <Text variant="bodyMedium" style={styles.muted}>
            Choose a meal, then search or create a food.
          </Text>
        </View>
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
        <Searchbar
          placeholder="Search starter foods"
          value={query}
          onChangeText={setQuery}
          accessibilityLabel="Search foods"
        />
        <Button mode="outlined" icon="plus" onPress={() => setDialogVisible(true)}>
          Create custom food
        </Button>

        {query.trim().length > 0 && query.trim().length < 2 && (
          <Text style={styles.muted}>Type at least two characters.</Text>
        )}
        {query.trim().length >= 2 && !results.length && (
          <Card mode="outlined">
            <Card.Content style={styles.empty}>
              <Text variant="titleMedium">No starter foods found</Text>
              <Button onPress={() => setDialogVisible(true)}>Create this food</Button>
            </Card.Content>
          </Card>
        )}
        {results.map((food) => (
          <Card key={food.name} mode="outlined">
            <Card.Content style={styles.result}>
              <View style={styles.resultText}>
                <Text variant="titleMedium">{food.name}</Text>
                <Text variant="bodySmall" style={styles.muted}>
                  {food.quantity}{food.unit} · P {food.protein}g · C {food.carbs}g · F {food.fats}g
                </Text>
              </View>
              <Button mode="contained-tonal" onPress={() => void logFood(food)}>
                Add
              </Button>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Create custom food</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={styles.form}>
              <TextInput label="Food name" value={form.name} onChangeText={(name) => setForm({ ...form, name })} />
              <View style={styles.row}>
                <TextInput style={styles.flex} label="Serving" keyboardType="decimal-pad" value={form.quantity} onChangeText={(quantity) => setForm({ ...form, quantity })} />
                <TextInput style={styles.flex} label="Unit" value={form.unit} onChangeText={(unit) => setForm({ ...form, unit })} />
              </View>
              <Divider />
              <View style={styles.row}>
                <TextInput style={styles.flex} label="Protein (g)" keyboardType="decimal-pad" value={form.protein} onChangeText={(protein) => setForm({ ...form, protein })} />
                <TextInput style={styles.flex} label="Carbs (g)" keyboardType="decimal-pad" value={form.carbs} onChangeText={(carbs) => setForm({ ...form, carbs })} />
              </View>
              <View style={styles.row}>
                <TextInput style={styles.flex} label="Fats (g)" keyboardType="decimal-pad" value={form.fats} onChangeText={(fats) => setForm({ ...form, fats })} />
                <TextInput style={styles.flex} label="Calories (optional)" keyboardType="decimal-pad" value={form.calories} onChangeText={(calories) => setForm({ ...form, calories })} />
              </View>
              {validationError ? <Text style={styles.error}>{validationError}</Text> : null}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={() => void submitCustomFood()}>Add to {mealType}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 32, gap: 14 },
  muted: { color: theme.colors.onSurfaceVariant },
  result: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  resultText: { flex: 1, gap: 4 },
  empty: { alignItems: 'center', gap: 8 },
  form: { paddingVertical: 16, gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
  flex: { flex: 1 },
  error: { color: theme.colors.error },
});

export default FoodSearchScreen;
