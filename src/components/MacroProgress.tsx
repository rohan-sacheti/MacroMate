import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, ProgressBar } from 'react-native-paper';

interface MacroProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
}

const MacroProgress: React.FC<MacroProgressProps> = ({ 
  label, 
  current, 
  goal, 
  unit, 
  color 
}) => {
  const progress = Math.min(current / goal, 1);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Paragraph style={styles.label}>{label}</Paragraph>
        <Paragraph style={styles.value}>
          {current}{unit} / {goal}{unit}
        </Paragraph>
      </View>
      <ProgressBar 
        progress={progress} 
        color={color} 
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});

export default MacroProgress;
