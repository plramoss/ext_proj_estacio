import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.addButton}>
      <Text style={styles.addButtonText}>ADICIONAR</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 'auto',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
});

export default AddButton;