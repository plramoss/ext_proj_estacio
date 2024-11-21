import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
} from 'react-native';

interface DropdownButtonProps {
  title: string; // Título do botão
  items: string[]; // Itens do dropdown (array de strings)
  dropdownHeight?: number; // Altura do dropdown (opcional)
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  title,
  items,
  dropdownHeight = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [height] = useState<Animated.Value>(new Animated.Value(0));

  const toggleDropdown = () => {
    if (isExpanded) {
      Animated.timing(height, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsExpanded(false));
    } else {
      setIsExpanded(true);
      Animated.timing(height, {
        toValue: dropdownHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão principal */}
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <View style={styles.leftStripe}></View> {/* Listra verde à esquerda */}
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
        <Text style={styles.plusIcon}>+</Text> {/* Ícone de + à direita */}
      </TouchableOpacity>

      {/* Dropdown com animação */}
      <Animated.View style={[styles.dropdown, { height }]}>
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: string }) => (
            <View style={styles.dropdownItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={true} // Ativar o indicador de rolagem vertical
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  leftStripe: {
    backgroundColor: 'green', // Listra verde
    width: 5,
    height: '100%',
  },
  textContainer: {
    flex: 1, // Faz o texto ocupar o espaço restante
    justifyContent: 'center',
    paddingLeft: 10, // Espaçamento à esquerda do texto
  },
  buttonText: {
    color: '#000', // Texto preto
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left', // Garante alinhamento à esquerda
  },
  plusIcon: {
    fontSize: 18,
    color: '#000', // Ícone preto
    paddingHorizontal: 10, // Espaçamento do ícone à direita
  },
  dropdown: {
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 12,
    color: '#333',
  },
});

export default DropdownButton;
