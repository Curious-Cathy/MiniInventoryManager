import {
  View,
  FlatList,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { getItems, saveItems } from '../services/storageService';

export default function HomeScreen() {
  const [items, setItems] = useState([]);

  // Modal & form state
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('');

  // Search
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data || []);
  };

  const openAddModal = () => {
    setIsEdit(false);
    setName('');
    setQuantity(1);
    setCategory('');
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEdit(true);
    setCurrentItem(item);
    setName(item.name);
    setQuantity(item.quantity);
    setCategory(item.category);
    setShowModal(true);
  };

  const saveItem = async () => {
    if (!name || !category) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    let updatedItems = [];

    if (isEdit) {
      updatedItems = items.map(i =>
        i.id === currentItem.id
          ? { ...i, name, quantity, category }
          : i
      );
    } else {
      updatedItems = [
        ...items,
        { id: Date.now().toString(), name, quantity, category }
      ];
    }

    setItems(updatedItems);
    await saveItems(updatedItems);
    setShowModal(false);
  };

  const deleteItem = (id) => {
    Alert.alert('Delete Item', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          const updated = items.filter(i => i.id !== id);
          setItems(updated);
          await saveItems(updated);
        }
      }
    ]);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        placeholderTextColor="#6A89A7"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Header */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Inventory</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={openAddModal}
        >
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No items added yet</Text>
        }
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onEdit={() => openEditModal(item)}
            onDelete={() => deleteItem(item.id)}
          />
        )}
      />

      {/* FLOATING MODAL */}
      <Modal visible={showModal} transparent animationType="fade">
  {/* Tap outside to close */}
  <TouchableOpacity
    style={styles.overlay}
    activeOpacity={1}
    onPress={() => setShowModal(false)}
  >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ width: '100%' }}
    >
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Card */}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.card}
        >
          <Text style={styles.modalTitle}>
            {isEdit ? 'Edit Item' : 'Add Item'}
          </Text>

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
    onPress={() => setQuantity(q => Math.max(1, q - 1))}
  >
    <Text style={styles.qtyBtnText}>−</Text>
  </TouchableOpacity>

  <View style={styles.qtyDisplay}>
    <Text style={styles.qtyNumber}>{quantity}</Text>
  </View>

  <TouchableOpacity
    style={styles.qtySmallBtn}
    onPress={() => setQuantity(q => q + 1)}
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
            <TouchableOpacity style={styles.saveBtn} onPress={saveItem}>
              <Text style={styles.btnText}>
                {isEdit ? 'Update' : 'Add'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>

        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  </TouchableOpacity>
</Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDDDFC',
    paddingHorizontal: 18,
    paddingTop: 20
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#384959'
  },
  addButton: {
    backgroundColor: '#384959',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 20
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#384959'
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    color: '#384959'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14
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
  color: '#384959'
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



