import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Tabs: React.FC = () => {
  return (
    <View style={styles.tabsWrapper}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Comidas</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Favoritos</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Pratos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsWrapper: {
    backgroundColor: '#fff', // Fundo branco para os botões de abas em conjunto
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
  },
});

export default Tabs;