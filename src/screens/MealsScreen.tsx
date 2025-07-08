import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, List, IconButton } from 'react-native-paper';
import { Meal } from '../types';

const MealsScreen = ({ navigation }: any) => {
  const [savedMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Post-Workout Shake',
      foodItems: [],
      totalProtein: 30,
      totalCarbs: 45,
      totalFats: 5,
      totalCalories: 320,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Breakfast Bowl',
      foodItems: [],
      totalProtein: 25,
      totalCarbs: 60,
      totalFats: 15,
      totalCalories: 450,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const addMealToLog = (meal: Meal) => {
    // TODO: Add meal to today's log
    console.log('Adding meal to log:', meal);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Saved Meals</Title>
            <Paragraph>Quick add your favorite meals</Paragraph>
          </Card.Content>
        </Card>

        {savedMeals.map((meal) => (
          <Card key={meal.id} style={styles.card}>
            <Card.Content>
              <View style={styles.mealHeader}>
                <View style={styles.mealInfo}>
                  <Title style={styles.mealName}>{meal.name}</Title>
                  <Paragraph>{meal.totalCalories} calories</Paragraph>
                </View>
                <IconButton
                  icon="plus"
                  size={24}
                  onPress={() => addMealToLog(meal)}
                />
              </View>
              
              <View style={styles.macroRow}>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Protein</Paragraph>
                  <Paragraph style={styles.macroValue}>{meal.totalProtein}g</Paragraph>
                </View>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Carbs</Paragraph>
                  <Paragraph style={styles.macroValue}>{meal.totalCarbs}g</Paragraph>
                </View>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Fats</Paragraph>
                  <Paragraph style={styles.macroValue}>{meal.totalFats}g</Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Search')}
          style={styles.createButton}
        >
          Create New Meal
        </Button>
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
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 18,
    marginBottom: 4,
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
  createButton: {
    marginTop: 16,
  },
});

export default MealsScreen;
