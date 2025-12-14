import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { getItems, saveItems } from '../services/storageService';
import { Alert } from 'react-native';


export default function EditItemScreen({ route, navigation }) {
  const { item, loadItems } = route.params;
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [category, setCategory] = useState(item.category);

 const update = async () => {
  if (!name || !quantity || !category) {
    Alert.alert(
      'Validation Error',
      'All fields are required.'
    );
    return;
  }

  const items = await getItems();
  const updated = items.map(i =>
    i.id === item.id
      ? { ...i, name, quantity, category }
      : i
  );

  await saveItems(updated);
  loadItems();
  navigation.goBack();
};


  return (
  <View style={styles.overlay}>
    <View style={styles.card}>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

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
        value={category}
        onChangeText={setCategory}
      />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={update}>
          <Text style={styles.buttonText}>Update Item</Text>
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
