import {
  View,
  FlatList,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { getItems, saveItems } from '../services/storageService';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setItems(await getItems());
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

  return (
    <View style={styles.container}>
      {/* Top Action Bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Inventory</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddItem', { loadItems })}
        >
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No items added yet</Text>
        }
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onEdit={() =>
              navigation.navigate('EditItem', { item, loadItems })
            }
            onDelete={() => deleteItem(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDDDFC',
    padding: 15
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  }
});
