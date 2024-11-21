import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useAuth } from "../context/AuthContext";
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
  const { onLogout } = useAuth();
  const navigation = useNavigation();

  const dataButton = [
    {
      title: "Cancelar",
      onPress: () => navigation.navigate('Home'),
      styles: {
        backgroundColor: 'red',
        color: 'white',
        borderColor: 'red',
      }
    },
    {
      title: "Avançar",
      onPress: onLogout,
      styles: {
        backgroundColor: 'transparent',
        color: 'rgba(52,199,89,1)',
        borderColor: 'rgba(52,199,89,1)',
      }
    },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.text} children={'Tem certeza que deseja sair?'} />
      <View style={styles.buttonContainer}>
        {dataButton.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: 150,
              alignItems: 'center',
              backgroundColor: button.styles.backgroundColor,
              paddingHorizontal: 24,
              paddingVertical: 14,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: button.styles.borderColor,
            }}
            onPress={button.onPress}
          >
            <Text style={{color: button.styles.color, fontSize: '16'}}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(52, 199, 89, 0.46)',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
  },
});