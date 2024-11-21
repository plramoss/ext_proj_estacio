import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const Formulario = () => {
  const [alimento, setAlimento] = useState<string>('');
  const [porcao, setPorcao] = useState<string>('');
  const [postado, setPostado] = useState<boolean>(false);

  const navigation = useNavigation();

  const limparCampos = () => {
    setAlimento('');
    setPorcao('');
  }

  const postarConsumo = async (valor: number) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    try {
      await axios.post(`${API_URL}/consumo`, { valor }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPostado(true);
      alert('Consumo postado com sucesso');
    } catch (error) {
      alert('Erro ao postar consumo');
    }
  }

  const calcularCalorias = async ({ porcaoBase, cal }: { porcaoBase: number, cal: number }) => {
    const porcaoNumber = parseFloat(porcao);
    let valor = (cal * (porcaoNumber / porcaoBase));
    await postarConsumo(valor);
    limparCampos();
  }

  const ProcurarAlimento = async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    try {
      const response = await axios.get(`${API_URL}/alimentos?nome=${alimento}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data[0];
      let porcaoBase = Number(data.porcao);
      let cal = Number(data.calorias);
      await calcularCalorias({ porcaoBase, cal });

    } catch (error) {
      alert('Alimento não encontrado');
    }
  }

  const handleAddMore = () => {
    setPostado(false);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Qual foi a sua refeição?</Text>

      <View>
        <View style={styles.itemContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Alimento"
            value={alimento}
            onChangeText={(value) => setAlimento(value)}
          />
          <TextInput
            placeholder="Quantidade (em gramas)"
            value={porcao}
            keyboardType="numeric"
            onChangeText={(value) => setPorcao(value)}
            style={styles.input}
          />
        </View>
      </View>

      {!postado && <TouchableOpacity
        style={styles.buttonRefeicao}
        onPress={ProcurarAlimento}
      >
        <Text style={styles.buttonRefeicaoText}>{'Salvar refeição'}</Text>
        <Ionicons name="cloud-upload-outline" size={30} color="rgba(52,199,89,1)" />
      </TouchableOpacity>}

      {postado && (
        <View style={styles.confirmation}>
          <Text>Deseja enviar mais alguma refeição?</Text>
          <View style={styles.final}>
            <Button title="Sim" onPress={handleAddMore} />
            <Button title="Não" onPress={() => navigation.navigate('HomeTabs' as never)} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  final: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingLeft: 10,
  },
  itemContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  confirmation: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonRefeicao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: 300,
    padding: 10,
    marginHorizontal: 'auto',
    paddingLeft: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(52,199,89,1)',
  },
  buttonRefeicaoText: {
    color: 'rgba(52,199,89,1)',
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
});

export default Formulario;