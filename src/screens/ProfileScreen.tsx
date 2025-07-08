import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput } from 'react-native-paper';
import { UserProfile } from '../types';

const ProfileScreen = ({ navigation }: any) => {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    proteinGoal: 150,
    carbsGoal: 200,
    fatsGoal: 65,
    caloriesGoal: 2000,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [isEditing, setIsEditing] = useState(false);

  const saveProfile = () => {
    // TODO: Save to database
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Profile</Title>
            <Paragraph>Manage your account and goals</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Personal Information</Title>
            <TextInput
              label="Name"
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              disabled={!isEditing}
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={profile.email || ''}
              onChangeText={(text) => setProfile({ ...profile, email: text })}
              disabled={!isEditing}
              style={styles.input}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Daily Goals</Title>
            <View style={styles.goalRow}>
              <TextInput
                label="Protein Goal (g)"
                value={profile.proteinGoal.toString()}
                onChangeText={(text) => setProfile({ ...profile, proteinGoal: parseInt(text) || 0 })}
                disabled={!isEditing}
                keyboardType="numeric"
                style={styles.goalInput}
              />
              <TextInput
                label="Carbs Goal (g)"
                value={profile.carbsGoal.toString()}
                onChangeText={(text) => setProfile({ ...profile, carbsGoal: parseInt(text) || 0 })}
                disabled={!isEditing}
                keyboardType="numeric"
                style={styles.goalInput}
              />
            </View>
            <View style={styles.goalRow}>
              <TextInput
                label="Fats Goal (g)"
                value={profile.fatsGoal.toString()}
                onChangeText={(text) => setProfile({ ...profile, fatsGoal: parseInt(text) || 0 })}
                disabled={!isEditing}
                keyboardType="numeric"
                style={styles.goalInput}
              />
              <TextInput
                label="Calories Goal"
                value={profile.caloriesGoal.toString()}
                onChangeText={(text) => setProfile({ ...profile, caloriesGoal: parseInt(text) || 0 })}
                disabled={!isEditing}
                keyboardType="numeric"
                style={styles.goalInput}
              />
            </View>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <View style={styles.buttonRow}>
              <Button
                mode="outlined"
                onPress={() => setIsEditing(false)}
                style={styles.button}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={saveProfile}
                style={styles.button}
              >
                Save
              </Button>
            </View>
          ) : (
            <Button
              mode="contained"
              onPress={() => setIsEditing(true)}
              style={styles.editButton}
            >
              Edit Profile
            </Button>
          )}
        </View>
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
  input: {
    marginBottom: 16,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  goalInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonContainer: {
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  editButton: {
    marginTop: 16,
  },
});

export default ProfileScreen;
