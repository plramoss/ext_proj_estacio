import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Graph from "../components/Graph";
import DropdownButton from "../components/Dropdownbutton";

interface HistoricoProps {}

const Historico: React.FC<HistoricoProps> = () => {
  // Função simulada para lidar com o botão de perfil
  const handleProfilePress = () => {
    console.log('Botão de perfil pressionado');
    // Lógica de navegação ou ação pode ser adicionada aqui
  };

  // Data simulada
  const currentDate = new Date().toLocaleDateString();

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de perfil no canto superior esquerdo */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={handleProfilePress}
      >
        <Text style={styles.profileIcon}>👤</Text>
        <Text style={styles.profileText}>Perfil</Text>
      </TouchableOpacity>

      {/* Balão de data no canto superior direito */}
      <View style={styles.dateBalloon}>
        <Text style={styles.calendarIcon}>📅</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>

      {/* Gráfico com ajuste de posição */}
      <View style={styles.graphContainer}>
        <Graph progress={75} size={300} strokeWidth={30} />
      </View>

      {/* DropdownButtons Renomeados */}
      <View style={styles.dropdownContainer}>
        <DropdownButton
          title="Café da Manhã"
          items={['Item 1', 'Item 2', 'Item 3']}
          dropdownHeight={80}
        />
        <DropdownButton
          title="Almoço"
          items={['Opção 1', 'Opção 2']}
          dropdownHeight={80}
        />
        <DropdownButton
          title="Lanche"
          items={['A', 'B', 'C']}
          dropdownHeight={80}
        />
        <DropdownButton
          title="Jantar"
          items={['X', 'Y', 'Z']}
          dropdownHeight={80}
        />
        <DropdownButton
          title="Outros"
          items={['Primeiro', 'Segundo']}
          dropdownHeight={80}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 199, 89, 0.46)', // Cor de fundo definida
    paddingHorizontal: 20, // Ajuste para margens internas
  },
  profileButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row', // Ícone e texto alinhados horizontalmente
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  profileIcon: {
    fontSize: 18,
    marginRight: 8, // Espaçamento entre o ícone e o texto
  },
  profileText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  dateBalloon: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  calendarIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  graphContainer: {
    marginTop: 100, // Espaçamento para empurrar o gráfico para baixo
    marginBottom: 50, // Espaçamento entre o gráfico e os botões
    alignItems: 'center',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
});

export default Historico;