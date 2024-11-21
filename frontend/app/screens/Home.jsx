import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import ButtonWithIcon from "../components/ButtonWithIcon";

const DonutChart = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [valores, setValores] = useState([]);
  const maxValue = 4000;

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      try {
        const response = await axios.get(`${API_URL}/consumo`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setValores(data);
      } catch (error) {
        alert('Erro ao buscar dados de consumo');
      }
    })();
  }, []);

  const calculeCurrentValue = () => {
    let currentValue = 0;
    valores.forEach((item) => {
      currentValue += Number(item.valor);
    });
    setCurrentValue(currentValue);
    console.log(currentValue);
  };

  useEffect(() => {
    calculeCurrentValue();

  }, [valores]);

  const chartValue = currentValue / maxValue;


  return (
    <View style={styles.container}>
      {chartValue < 0.75 ? (
        <Progress.Circle
          progress={chartValue}
          size={Dimensions.get('window').width / 2}
          showsText={true}
          animated={true}
          thickness={12}
          strokeCap={'round'}
          formatText={() => `${(currentValue).toFixed(2)} kcal`}
          textStyle={{fontSize: 24, color: 'black'}}
          borderWidth={2}
          color={'rgba(52,199,89,1)'}
        />
      ) : (
        <Progress.Circle
          progress={chartValue}
          size={Dimensions.get('window').width / 2}
          showsText={true}
          animated={true}
          thickness={12}
          strokeCap={'round'}
          formatText={() => `${(currentValue).toFixed(2)} kcal`}
          textStyle={{fontSize: 24, color: 'black'}}
          borderWidth={2}
          borderColor={'black'}
          color={'rgb(246,23,23)'}
        />
      )}
      <Text style={styles.valueText}>{`Voce consumiu ${(chartValue*100).toFixed(0)}% do recomendado mensal de ${maxValue} kcal`}</Text>

      <ButtonWithIcon title={'Adicionar nova refeição'} targetScreen={'AddRefeicao'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'regular',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default DonutChart;