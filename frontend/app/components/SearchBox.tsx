import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBox: React.FC = () => {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search-outline" size={20} color="#000" />
      <TextInput
        style={styles.searchInput}
        placeholder="O que Você Comeu?"
        placeholderTextColor="#333"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default SearchBox;
