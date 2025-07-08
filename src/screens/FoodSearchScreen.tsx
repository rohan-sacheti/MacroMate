import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  TextInput, 
  Dialog, 
  Portal,
  List,
  IconButton,
  Searchbar
} from 'react-native-paper';
import { FoodItem } from '../types';

const FoodSearchScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newFood, setNewFood] = useState({
    name: '',
    quantity: '',
    unit: 'g',
    protein: '',
    carbs: '',
    fats: '',
    calories: '',
  });

  const searchFoods = async (query: string) => {
    setSearchQuery(query);
    // TODO: Implement food database search
    // For now, showing mock data
    if (query.length > 2) {
      const mockFoods: FoodItem[] = [
        {
          id: '1',
          name: 'Chicken Breast',
          quantity: 100,
          unit: 'g',
          protein: 31,
          carbs: 0,
          fats: 3.6,
          calories: 165,
          createdAt: new Date(),
        },
        {
          id: '2',
          name: 'Brown Rice',
          quantity: 100,
          unit: 'g',
          protein: 2.6,
          carbs: 77,
          fats: 0.9,
          calories: 362,
          createdAt: new Date(),
        },
        {
          id: '3',
          name: 'Broccoli',
          quantity: 100,
          unit: 'g',
          protein: 2.8,
          carbs: 7,
          fats: 0.4,
          calories: 34,
          createdAt: new Date(),
        },
      ];
      setFoodItems(mockFoods.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFoodItems([]);
    }
  };

  const addCustomFood = () => {
    if (newFood.name && newFood.quantity && newFood.protein && newFood.carbs && newFood.fats) {
      const food: FoodItem = {
        id: Date.now().toString(),
        name: newFood.name,
        quantity: parseFloat(newFood.quantity),
        unit: newFood.unit,
        protein: parseFloat(newFood.protein),
        carbs: parseFloat(newFood.carbs),
        fats: parseFloat(newFood.fats),
        calories: newFood.calories ? parseFloat(newFood.calories) : undefined,
        createdAt: new Date(),
      };
      
      // TODO: Save to database and add to current meal
      console.log('Adding food:', food);
      setShowAddDialog(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewFood({
      name: '',
      quantity: '',
      unit: 'g',
      protein: '',
      carbs: '',
      fats: '',
      calories: '',
    });
  };

  const addFoodToMeal = (food: FoodItem) => {
    // TODO: Add to current meal or create new meal
    console.log('Adding to meal:', food);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search foods..."
          onChangeText={searchFoods}
          value={searchQuery}
          style={styles.searchBar}
        />
        <Button 
          mode="outlined" 
          onPress={() => setShowAddDialog(true)}
          style={styles.addButton}
        >
          Add Custom
        </Button>
      </View>

      <ScrollView style={styles.scrollView}>
        {foodItems.map((food) => (
          <Card key={food.id} style={styles.card}>
            <Card.Content>
              <View style={styles.foodHeader}>
                <View style={styles.foodInfo}>
                  <Title style={styles.foodName}>{food.name}</Title>
                  <Paragraph>{food.quantity}{food.unit}</Paragraph>
                </View>
                <IconButton
                  icon="plus"
                  size={24}
                  onPress={() => addFoodToMeal(food)}
                />
              </View>
              
              <View style={styles.macroGrid}>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Protein</Paragraph>
                  <Paragraph style={styles.macroValue}>{food.protein}g</Paragraph>
                </View>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Carbs</Paragraph>
                  <Paragraph style={styles.macroValue}>{food.carbs}g</Paragraph>
                </View>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Fats</Paragraph>
                  <Paragraph style={styles.macroValue}>{food.fats}g</Paragraph>
                </View>
                <View style={styles.macroItem}>
                  <Paragraph style={styles.macroLabel}>Calories</Paragraph>
                  <Paragraph style={styles.macroValue}>{food.calories || 'N/A'}</Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Portal>
        <Dialog visible={showAddDialog} onDismiss={() => setShowAddDialog(false)}>
          <Dialog.Title>Add Custom Food</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Food Name"
              value={newFood.name}
              onChangeText={(text) => setNewFood({ ...newFood, name: text })}
              style={styles.input}
            />
            <View style={styles.row}>
              <TextInput
                label="Quantity"
                value={newFood.quantity}
                onChangeText={(text) => setNewFood({ ...newFood, quantity: text })}
                keyboardType="numeric"
                style={[styles.input, styles.quantityInput]}
              />
              <TextInput
                label="Unit"
                value={newFood.unit}
                onChangeText={(text) => setNewFood({ ...newFood, unit: text })}
                style={[styles.input, styles.unitInput]}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                label="Protein (g)"
                value={newFood.protein}
                onChangeText={(text) => setNewFood({ ...newFood, protein: text })}
                keyboardType="numeric"
                style={[styles.input, styles.macroInput]}
              />
              <TextInput
                label="Carbs (g)"
                value={newFood.carbs}
                onChangeText={(text) => setNewFood({ ...newFood, carbs: text })}
                keyboardType="numeric"
                style={[styles.input, styles.macroInput]}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                label="Fats (g)"
                value={newFood.fats}
                onChangeText={(text) => setNewFood({ ...newFood, fats: text })}
                keyboardType="numeric"
                style={[styles.input, styles.macroInput]}
              />
              <TextInput
                label="Calories (optional)"
                value={newFood.calories}
                onChangeText={(text) => setNewFood({ ...newFood, calories: text })}
                keyboardType="numeric"
                style={[styles.input, styles.macroInput]}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onPress={addCustomFood}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  searchBar: {
    marginBottom: 8,
  },
  addButton: {
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 8,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    marginBottom: 4,
  },
  macroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  macroItem: {
    width: '50%',
    marginBottom: 8,
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityInput: {
    flex: 2,
    marginRight: 8,
  },
  unitInput: {
    flex: 1,
  },
  macroInput: {
    flex: 1,
    marginRight: 8,
  },
});

export default FoodSearchScreen;
