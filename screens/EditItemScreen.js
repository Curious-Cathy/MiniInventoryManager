import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { styles } from './AddItemScreen';

export default function EditItemScreen({ item, onUpdate, onClose }) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(String(item.quantity));
  const [category, setCategory] = useState(item.category);

  const handleUpdate = () => {
    const qty = parseInt(quantity, 10);
    if (!name || !category || isNaN(qty) || qty < 1) return;
    onUpdate({ ...item, name, quantity: qty, category });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.modalTitle}>Edit Item</Text>

      <TextInput style={styles.input} value={name} onChangeText={setName} />

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

      <TextInput style={styles.input} value={category} onChangeText={setCategory} />

      <View style={styles.modalButtons}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
          <Text style={styles.btnText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
