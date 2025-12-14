import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { getItems, saveItems } from '../services/storageService';

export default function EditItemScreen({ route, navigation }) {
  const { item, loadItems } = route.params;
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [category, setCategory] = useState(item.category);

  const update = async () => {
    const items = await getItems();
    const updated = items.map(i =>
      i.id === item.id ? { ...i, name, quantity, category } : i
    );
    await saveItems(updated);
    loadItems();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} />
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />

      <TouchableOpacity style={styles.button} onPress={update}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDDDFC',
    padding: 20
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#384959',   
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
