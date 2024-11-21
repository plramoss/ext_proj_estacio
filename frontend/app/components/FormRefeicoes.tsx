import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

const Formulario = () => {
  const [alimento, setAlimento] = useState<string>('');
  const [porcao, setPorcao] = useState<string>('');
  const [postado, setPostado] = useState<boolean>(false);

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
    } catch (error) {
      alert('Erro ao postar consumo');
    }
  }

  const calcularCalorias = async ({ porcaoBase, cal }: { porcaoBase: number, cal: number }) => {
    const porcaoNumber = parseFloat(porcao);
    let valor = (cal * (porcaoNumber / porcaoBase));
    await postarConsumo(valor);
    limparCampos();
    alert('Consumo postado com sucesso');
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

      <View style={styles.formGroup}>
        <View style={styles.itemContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Alimento"
            value={alimento}
            onChangeText={(value) => setAlimento(value)}
          />
          <PaperTextInput
            label="Quantidade (em gramas)"
            value={porcao}
            keyboardType="numeric"
            onChangeText={(value) => setPorcao(value)}
            style={styles.input}
          />
        </View>
      </View>

      {!postado && <Button title="Calcular Calorias" onPress={ProcurarAlimento}/>}

      {postado && (
        <View style={styles.confirmation}>
          <Text>Deseja inserir mais algum item?</Text>
          <Button title="Sim" onPress={handleAddMore} />
          <Button title="Não" onPress={() => setPostado(false)} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  formGroup: {
    marginBottom: 30,
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
});

export default Formulario;