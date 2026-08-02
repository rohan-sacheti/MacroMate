import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { theme } from '../theme';
import { UserProfile } from '../types';

type GoalForm = Record<'proteinGoal' | 'carbsGoal' | 'fatsGoal' | 'caloriesGoal', string>;

const ProfileScreen = () => {
  const { profile, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name ?? '');
  const [goals, setGoals] = useState<GoalForm>({
    proteinGoal: String(profile?.proteinGoal ?? ''),
    carbsGoal: String(profile?.carbsGoal ?? ''),
    fatsGoal: String(profile?.fatsGoal ?? ''),
    caloriesGoal: String(profile?.caloriesGoal ?? ''),
  });
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (!profile || isEditing) return;
    setName(profile.name);
    setGoals({
      proteinGoal: String(profile.proteinGoal),
      carbsGoal: String(profile.carbsGoal),
      fatsGoal: String(profile.fatsGoal),
      caloriesGoal: String(profile.caloriesGoal),
    });
  }, [isEditing, profile]);

  if (!profile) return null;

  const save = async () => {
    const values = Object.fromEntries(
      Object.entries(goals).map(([key, value]) => [key, Number(value)])
    ) as unknown as Pick<UserProfile, keyof GoalForm>;
    if (
      !name.trim() ||
      Object.values(values).some((value) => !Number.isFinite(value) || value <= 0)
    ) {
      setValidationError('Enter a name and goals greater than zero.');
      return;
    }
    try {
      await updateProfile({
        ...profile,
        ...values,
        name: name.trim(),
        updatedAt: new Date().toISOString(),
      });
      setValidationError('');
      setIsEditing(false);
    } catch {
      // The global error message provides actionable feedback.
    }
  };

  const cancel = () => {
    setName(profile.name);
    setGoals({
      proteinGoal: String(profile.proteinGoal),
      carbsGoal: String(profile.carbsGoal),
      fatsGoal: String(profile.fatsGoal),
      caloriesGoal: String(profile.caloriesGoal),
    });
    setValidationError('');
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View>
        <Text variant="headlineSmall">Your goals</Text>
        <Text variant="bodyMedium" style={styles.muted}>
          Personalize the targets shown on Today.
        </Text>
      </View>
      <Card mode="outlined">
        <Card.Content style={styles.form}>
          <TextInput
            label="Display name"
            value={name}
            disabled={!isEditing}
            onChangeText={setName}
          />
          <View style={styles.row}>
            <TextInput
              style={styles.flex}
              label="Protein (g)"
              value={goals.proteinGoal}
              disabled={!isEditing}
              keyboardType="decimal-pad"
              onChangeText={(proteinGoal) => setGoals({ ...goals, proteinGoal })}
            />
            <TextInput
              style={styles.flex}
              label="Carbs (g)"
              value={goals.carbsGoal}
              disabled={!isEditing}
              keyboardType="decimal-pad"
              onChangeText={(carbsGoal) => setGoals({ ...goals, carbsGoal })}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.flex}
              label="Fats (g)"
              value={goals.fatsGoal}
              disabled={!isEditing}
              keyboardType="decimal-pad"
              onChangeText={(fatsGoal) => setGoals({ ...goals, fatsGoal })}
            />
            <TextInput
              style={styles.flex}
              label="Calories"
              value={goals.caloriesGoal}
              disabled={!isEditing}
              keyboardType="decimal-pad"
              onChangeText={(caloriesGoal) => setGoals({ ...goals, caloriesGoal })}
            />
          </View>
          {validationError ? <Text style={styles.error}>{validationError}</Text> : null}
          {isEditing ? (
            <View style={styles.row}>
              <Button style={styles.flex} mode="outlined" onPress={cancel}>Cancel</Button>
              <Button style={styles.flex} mode="contained" onPress={() => void save()}>Save</Button>
            </View>
          ) : (
            <Button mode="contained" icon="pencil-outline" onPress={() => setIsEditing(true)}>
              Edit profile
            </Button>
          )}
        </Card.Content>
      </Card>
      <Card mode="contained">
        <Card.Content style={styles.privacy}>
          <Text variant="titleMedium">Local-first by default</Text>
          <Text variant="bodyMedium" style={styles.muted}>
            Your profile and nutrition log stay in this app's local database. No account or cloud connection is required.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 32, gap: 16 },
  muted: { color: theme.colors.onSurfaceVariant },
  form: { gap: 16 },
  row: { flexDirection: 'row', gap: 12 },
  flex: { flex: 1 },
  error: { color: theme.colors.error },
  privacy: { gap: 6 },
});

export default ProfileScreen;
