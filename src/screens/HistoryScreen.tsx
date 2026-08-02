import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { colors, theme } from '../theme';
import { formatDate, getDateString } from '../utils/calculations';

const HistoryScreen = () => {
  const { logs, profile } = useApp();
  const previousLogs = logs.filter((log) => log.date !== getDateString());

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View>
        <Text variant="headlineSmall">History</Text>
        <Text variant="bodyMedium" style={styles.muted}>
          Your daily nutrition at a glance.
        </Text>
      </View>

      {!previousLogs.length ? (
        <Card mode="outlined">
          <Card.Content style={styles.empty}>
            <Text variant="titleMedium">Your history will appear here</Text>
            <Text variant="bodyMedium" style={styles.muted}>
              Keep logging and return tomorrow to see your trend.
            </Text>
          </Card.Content>
        </Card>
      ) : (
        previousLogs.map((log) => {
          const caloriePercent = profile?.caloriesGoal
            ? Math.round((log.calories / profile.caloriesGoal) * 100)
            : 0;
          return (
            <Card mode="outlined" key={log.id}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text variant="titleMedium">{formatDate(log.date)}</Text>
                    <Text variant="bodySmall" style={styles.muted}>
                      {log.entries.length} logged items
                    </Text>
                  </View>
                  <View style={styles.caloriePill}>
                    <Text variant="labelLarge" style={styles.calorieText}>
                      {Math.round(log.calories)} kcal
                    </Text>
                  </View>
                </View>
                <View style={styles.metrics}>
                  <Metric label="Protein" value={log.protein} color={colors.protein} />
                  <Metric label="Carbs" value={log.carbs} color={colors.carbs} />
                  <Metric label="Fats" value={log.fats} color={colors.fats} />
                  <Metric label="Goal" value={caloriePercent} unit="%" color={colors.calories} />
                </View>
              </Card.Content>
            </Card>
          );
        })
      )}
    </ScrollView>
  );
};

const Metric = ({
  color,
  label,
  unit = 'g',
  value,
}: {
  color: string;
  label: string;
  unit?: string;
  value: number;
}) => (
  <View style={styles.metric}>
    <Text variant="labelSmall" style={styles.muted}>{label}</Text>
    <Text variant="titleMedium" style={{ color }}>
      {Math.round(value)}{unit}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 32, gap: 16 },
  muted: { color: theme.colors.onSurfaceVariant },
  empty: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  cardContent: { gap: 18 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  caloriePill: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20, backgroundColor: theme.colors.secondaryContainer },
  calorieText: { color: theme.colors.onSecondaryContainer },
  metrics: { flexDirection: 'row', justifyContent: 'space-between' },
  metric: { alignItems: 'center', gap: 3 },
});

export default HistoryScreen;
