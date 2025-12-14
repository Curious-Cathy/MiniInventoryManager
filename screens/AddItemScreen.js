import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { getItems, saveItems } from '../services/storageService';
import { Alert } from 'react-native';


export default function AddItemScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  const save = async () => {
  if (!name || !quantity || !category) {
    Alert.alert(
      'Validation Error',
      'Please fill all fields before adding the item.'
    );
    return;
  }

  const items = await getItems();
  items.push({
    id: Date.now().toString(),
    name,
    quantity,
    category
  });

  await saveItems(items);
  route.params.loadItems();
  navigation.goBack();
};


  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Item Name" placeholderTextColor="#6A89A7" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Quantity" placeholderTextColor="#6A89A7" onChangeText={setQuantity} />
      <TextInput style={styles.input} placeholder="Category" placeholderTextColor="#6A89A7" onChangeText={setCategory} />

      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Add</Text>
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
  marginBottom: 12,
  color: '#384959'   
},


  button: {
    backgroundColor: '#384959',   // Primary
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
