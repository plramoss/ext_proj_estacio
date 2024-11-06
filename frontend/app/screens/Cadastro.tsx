import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useAuth } from "../context/AuthContext";
import InputWithIcon from "../components/InputWithIcon";
import { StyledButtonAuth } from "../components/StyledButtonAuth";

export default function Cadastro() {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const { onRegister } = useAuth();
  
  const handleRegister = async ({ email, password }: { email: string, password: string }) => {
    await onRegister!(email, password);
  }
  
  return (
    <View style={ styles.container }>
      <Image source={ require('../../assets/d10.jpeg') } style={ styles.logo }/>
      <Text style={ styles.title }>Cadastro</Text>
      <InputWithIcon state={ email } setState={ setEmail } type={ 'email' }/>
      <InputWithIcon state={ email } setState={ setEmail } type={ 'email' }/>
      <InputWithIcon state={ password } setState={ setPassword } type={ 'password' }/>
      <InputWithIcon state={ password } setState={ setPassword } type={ 'password' }/>
      <StyledButtonAuth title="Cadastre" onPress={ () => handleRegister({ email, password }) }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(52, 199, 89, 0.46)',
  },
  logo: {
    width: 400,
    height: 350,
  },
  title: {
    fontSize: 32,
    fontWeight: 'semibold',
    marginBottom: 16,
    marginTop: 16,
    textAlign: 'center',
    color: '#fff',
  },
  forgotPassword: {
    marginLeft: 'auto',
    width: 150,
    alignItems: 'center',
    padding: 8,
  },
  secondaryButton: {
    borderColor: '#fff',
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderRadius: 19,
    paddingBottom: 8,
    marginTop: 8,
    width: 150,
    alignItems: 'center',
    marginHorizontal: 'auto'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
});