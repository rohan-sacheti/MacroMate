import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  Button,
  Card,
  IconButton,
  Surface,
  Text,
} from 'react-native-paper';
import MacroProgress from '../components/MacroProgress';
import { useApp } from '../context/AppContext';
import { RootTabParamList } from '../navigation/types';
import { colors, theme } from '../theme';
import { MealType } from '../types';
import { EMPTY_TOTALS, formatDate, getDateString } from '../utils/calculations';

type Props = BottomTabScreenProps<RootTabParamList, 'Today'>;
const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const HomeScreen = ({ navigation }: Props) => {
  const { profile, removeLoggedFood, todayLog } = useApp();
  const totals = todayLog ?? { ...EMPTY_TOTALS };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text variant="headlineMedium">Today</Text>
        <Text variant="bodyMedium" style={styles.muted}>
          {formatDate(getDateString())}
        </Text>
      </View>

      <Card mode="contained" style={styles.hero}>
        <Card.Content style={styles.heroContent}>
          <Text variant="labelLarge">Calories remaining</Text>
          <Text variant="displaySmall">
            {Math.max((profile?.caloriesGoal ?? 0) - totals.calories, 0).toFixed(0)}
          </Text>
          <Text variant="bodyMedium">
            {Math.round(totals.calories)} consumed · {profile?.caloriesGoal ?? 0} goal
          </Text>
        </Card.Content>
      </Card>

      <Surface style={styles.progressCard} elevation={1}>
        <MacroProgress label="Protein" current={totals.protein} goal={profile?.proteinGoal ?? 0} color={colors.protein} />
        <MacroProgress label="Carbs" current={totals.carbs} goal={profile?.carbsGoal ?? 0} color={colors.carbs} />
        <MacroProgress label="Fats" current={totals.fats} goal={profile?.fatsGoal ?? 0} color={colors.fats} />
      </Surface>

      <View style={styles.sectionHeading}>
        <Text variant="titleLarge">Daily log</Text>
        <Button icon="plus" onPress={() => navigation.navigate('Add')}>Add food</Button>
      </View>

      {!todayLog?.entries.length ? (
        <Card mode="outlined">
          <Card.Content style={styles.empty}>
            <Text variant="titleMedium">Nothing logged yet</Text>
            <Text variant="bodyMedium" style={styles.muted}>
              Add your first food to start tracking today.
            </Text>
            <Button mode="contained" onPress={() => navigation.navigate('Add')}>
              Add food
            </Button>
          </Card.Content>
        </Card>
      ) : (
        mealTypes.map((mealType) => {
          const entries = todayLog.entries.filter(
            (entry) => entry.mealType === mealType
          );
          if (!entries.length) return null;
          return (
            <Card mode="outlined" key={mealType}>
              <Card.Content>
                <Text variant="titleMedium">{mealType}</Text>
                {entries.map((entry) => (
                  <View style={styles.entry} key={entry.id}>
                    <View style={styles.entryText}>
                      <Text variant="bodyLarge">{entry.name}</Text>
                      <Text variant="bodySmall" style={styles.muted}>
                        {entry.quantity}{entry.unit} · {Math.round(entry.calories)} kcal
                      </Text>
                    </View>
                    <IconButton
                      icon="delete-outline"
                      accessibilityLabel={`Remove ${entry.name}`}
                      onPress={() => void removeLoggedFood(entry.id)}
                    />
                  </View>
                ))}
              </Card.Content>
            </Card>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 32, gap: 16 },
  muted: { color: theme.colors.onSurfaceVariant },
  hero: { backgroundColor: theme.colors.primaryContainer },
  heroContent: { gap: 4 },
  progressCard: { padding: 20, borderRadius: 18, gap: 20 },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  empty: { alignItems: 'center', paddingVertical: 24, gap: 12 },
  entry: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.outlineVariant,
  },
  entryText: { flex: 1 },
});

export default HomeScreen;
