import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { clampProgress } from '../utils/calculations';

interface MacroProgressProps {
  label: string;
  current: number;
  goal: number;
  unit?: string;
  color: string;
}

const MacroProgress = ({
  label,
  current,
  goal,
  unit = 'g',
  color,
}: MacroProgressProps) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text variant="labelLarge">{label}</Text>
      <Text variant="bodyMedium">
        {Math.round(current)}{unit} of {goal}{unit}
      </Text>
    </View>
    <ProgressBar
      progress={clampProgress(current, goal)}
      color={color}
      style={styles.progress}
      accessibilityLabel={`${label}: ${Math.round(current)} of ${goal}${unit}`}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { gap: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  progress: { height: 9, borderRadius: 5 },
});

export default MacroProgress;
