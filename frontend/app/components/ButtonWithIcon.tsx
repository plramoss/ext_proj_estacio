import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type ButtonWithIconProps = {
  title: string;
  targetScreen: string;
};

export default function ButtonWithIcon({ title, targetScreen }: ButtonWithIconProps) {
  const navigation = useNavigation();

  if (targetScreen == 'AddRefeicao') {
    return (
      <TouchableOpacity
        style={styles.buttonRefeicao}
        onPress={() => navigation.navigate(targetScreen as never)}
      >
        <Text style={styles.buttonRefeicaoText}>{title}</Text>
        <Ionicons name="add-circle" size={30} color="rgba(52,199,89,1)" />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {}}
    >
      <Text style={styles.buttonText}>{title}</Text>
      <Ionicons name="arrow-forward" size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: 300,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonRefeicao: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: 300,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(52,199,89,1)',
  },
  buttonRefeicaoText: {
    color: 'rgba(52,199,89,1)',
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
});