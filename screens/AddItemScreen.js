import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function AddItemScreen({ onSave, onClose }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    const qty = parseInt(quantity, 10);
    if (!name || !category || isNaN(qty) || qty < 1) return;
    onSave({ name, quantity: qty, category });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.modalTitle}>Add Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        placeholderTextColor="#6A89A7"
        value={name}
        onChangeText={setName}
      />

      {/* Quantity */}
      <View style={styles.quantityRow}>
        <TouchableOpacity
          style={styles.qtySmallBtn}
          onPress={() =>
            setQuantity(q => String(Math.max(1, parseInt(q || '1', 10) - 1)))
          }
        >
          <Text style={styles.qtyBtnText}>−</Text>
        </TouchableOpacity>

        <View style={styles.qtyDisplay}>
          <TextInput
            style={styles.qtyNumber}
            value={quantity}
            keyboardType="number-pad"
            onChangeText={setQuantity}
            textAlign="center"
            maxLength={4}
          />
        </View>

        <TouchableOpacity
          style={styles.qtySmallBtn}
          onPress={() =>
            setQuantity(q => String(parseInt(q || '0', 10) + 1))
          }
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor="#6A89A7"
        value={category}
        onChangeText={setCategory}
      />

      <View style={styles.modalButtons}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#BDDDFC',
    borderRadius: 20,
    padding: 20,
    elevation: 6
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#384959',
    marginBottom: 10,
    textAlign: 'center'
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
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  qtySmallBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#384959',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyBtnText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#384959'
  },
  qtyDisplay: {
    minWidth: 50,
    paddingVertical: 6,
    marginHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#88BDF2'
  },
  qtyNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#384959',
    padding: 0,
    height: 22
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  saveBtn: {
    backgroundColor: '#384959',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  cancelBtn: {
    backgroundColor: '#6A89A7',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});
