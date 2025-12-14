import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.text}>
          <Text style={styles.label}>Stock: </Text>
          {item.quantity}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.label}>Category: </Text>
          {item.category}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,          
    marginBottom: 16,     
    minHeight: 130,       
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
    flex: 1,
    justifyContent: 'space-between' 
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#384959',
    marginBottom: 8       
  },
  text: {
    color: '#384959',
    marginBottom: 6     
  },
  label: {
    fontWeight: 'bold'
  },
  actions: {
    justifyContent: 'space-between', 
    paddingLeft: 10
  },
  editBtn: {
    backgroundColor: '#88BDF2',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8
  },
  deleteBtn: {
    backgroundColor: '#6A89A7',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center'
  }
});

