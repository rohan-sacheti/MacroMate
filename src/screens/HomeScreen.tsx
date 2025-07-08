import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, Button, FAB } from 'react-native-paper';
import { MacroTotals, DailyLog } from '../types';

const HomeScreen = ({ navigation }: any) => {
  const [dailyTotals, setDailyTotals] = useState<MacroTotals>({
    protein: 0,
    carbs: 0,
    fats: 0,
    calories: 0,
  });

  const [goals] = useState({
    protein: 150,
    carbs: 200,
    fats: 65,
    calories: 2000,
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadDailyTotals();
  }, []);

  const loadDailyTotals = async () => {
    // TODO: Load from database
    // For now, using mock data
    setDailyTotals({
      protein: 45,
      carbs: 120,
      fats: 25,
      calories: 850,
    });
  };

  const calculateProgress = (current: number, goal: number) => {
    return Math.min(current / goal, 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Today's Progress</Title>
            <Paragraph style={styles.date}>{today}</Paragraph>
            
            <View style={styles.macroRow}>
              <View style={styles.macroItem}>
                <Paragraph style={styles.macroLabel}>Protein</Paragraph>
                <Paragraph style={styles.macroValue}>
                  {dailyTotals.protein}g / {goals.protein}g
                </Paragraph>
                <ProgressBar 
                  progress={calculateProgress(dailyTotals.protein, goals.protein)} 
                  color="#E91E63" 
                  style={styles.progressBar}
                />
              </View>
            </View>

            <View style={styles.macroRow}>
              <View style={styles.macroItem}>
                <Paragraph style={styles.macroLabel}>Carbs</Paragraph>
                <Paragraph style={styles.macroValue}>
                  {dailyTotals.carbs}g / {goals.carbs}g
                </Paragraph>
                <ProgressBar 
                  progress={calculateProgress(dailyTotals.carbs, goals.carbs)} 
                  color="#2196F3" 
                  style={styles.progressBar}
                />
              </View>
            </View>

            <View style={styles.macroRow}>
              <View style={styles.macroItem}>
                <Paragraph style={styles.macroLabel}>Fats</Paragraph>
                <Paragraph style={styles.macroValue}>
                  {dailyTotals.fats}g / {goals.fats}g
                </Paragraph>
                <ProgressBar 
                  progress={calculateProgress(dailyTotals.fats, goals.fats)} 
                  color="#FF9800" 
                  style={styles.progressBar}
                />
              </View>
            </View>

            <View style={styles.macroRow}>
              <View style={styles.macroItem}>
                <Paragraph style={styles.macroLabel}>Calories</Paragraph>
                <Paragraph style={styles.macroValue}>
                  {dailyTotals.calories} / {goals.calories}
                </Paragraph>
                <ProgressBar 
                  progress={calculateProgress(dailyTotals.calories, goals.calories)} 
                  color="#4CAF50" 
                  style={styles.progressBar}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Quick Actions</Title>
            <View style={styles.buttonRow}>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Search')}
                style={styles.button}
              >
                Add Food
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => navigation.navigate('Meals')}
                style={styles.button}
              >
                Quick Meals
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Search')}
      />
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
    color: '#666',
    marginBottom: 16,
  },
  macroRow: {
    marginBottom: 16,
  },
  macroItem: {
    flex: 1,
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});

export default HomeScreen;
