import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { getItems, saveItems } from '../services/storageService';
import { Alert } from 'react-native';


export default function AddItemScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
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
  <View style={styles.overlay}>
    <View style={styles.card}>
      
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        placeholderTextColor="#6A89A7"
        onChangeText={setName}
      />

      {/* Quantity + / - */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => setQuantity(q => Math.max(1, q - 1))}
        >
          <Text style={styles.qtyText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.qtyValue}>{quantity}</Text>

        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => setQuantity(q => q + 1)}
        >
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor="#6A89A7"
        onChangeText={setCategory}
      />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={save}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

    </View>
  </View>
);

}

const styles = StyleSheet.create({
  overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center'
},
card: {
  backgroundColor: '#BDDDFC',
  width: '90%',
  borderRadius: 20,
  padding: 20,

  
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 6
},

  input: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 14,
  marginBottom: 14,
  color: '#384959',
  borderWidth: 1,
  borderColor: '#88BDF2'
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
  },
  quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 14
},
qtyButton: {
  backgroundColor: '#384959',
  width: 40,
  height: 40,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center'
},
qtyText: {
  color: '#FFFFFF',
  fontSize: 22,
  fontWeight: 'bold'
},
qtyValue: {
  fontSize: 18,
  fontWeight: 'bold',
  marginHorizontal: 20,
  color: '#384959'
},

});
