import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  onAddPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddPress }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Inclusão</Text>
      <TouchableOpacity onPress={onAddPress}>
        <Icon name="add-circle-outline" size={30} color="#000" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  icon: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Header;