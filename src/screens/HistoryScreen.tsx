import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, List } from 'react-native-paper';
import { DailyLog } from '../types';

const HistoryScreen = ({ navigation }: any) => {
  const [historyLogs] = useState<DailyLog[]>([
    {
      id: '1',
      date: '2025-07-07',
      meals: [],
      totalProtein: 145,
      totalCarbs: 180,
      totalFats: 55,
      totalCalories: 1850,
    },
    {
      id: '2',
      date: '2025-07-06',
      meals: [],
      totalProtein: 160,
      totalCarbs: 200,
      totalFats: 65,
      totalCalories: 2000,
    },
  ]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Recent Logs</Title>
            <Paragraph>Your nutrition history</Paragraph>
          </Card.Content>
        </Card>

        {historyLogs.map((log) => (
          <Card key={log.id} style={styles.card}>
            <Card.Content>
              <Title style={styles.date}>{log.date}</Title>
              
              <View style={styles.macroRow}>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Protein</Paragraph>
                  <Paragraph style={styles.macroValue}>{log.totalProtein}g</Paragraph>
                </View>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Carbs</Paragraph>
                  <Paragraph style={styles.macroValue}>{log.totalCarbs}g</Paragraph>
                </View>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Fats</Paragraph>
                  <Paragraph style={styles.macroValue}>{log.totalFats}g</Paragraph>
                </View>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Calories</Paragraph>
                  <Paragraph style={styles.macroValue}>{log.totalCalories}</Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    marginBottom: 16,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
