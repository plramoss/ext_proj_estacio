import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import Tabs from "../components/Tabs";
import AddButton from "../components/AddButton";

const InclusaoRef: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header onAddPress={() => console.log('Adicionar Pressionado')} />

      {/* Search Box */}
      <SearchBox />

      {/* Tabs */}
      <Tabs />

      {/* Add Button */}
      <AddButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9d4b6', // Fundo verde claro
    paddingHorizontal: 20,
    paddingTop: 50,
  },
});

export default InclusaoRef;

