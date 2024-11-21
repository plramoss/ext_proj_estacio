import { useState } from 'react';
import {Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { useAuth } from "../context/AuthContext";
import InputWithIcon from "../components/InputWithIcon";
import { StyledButtonAuth } from "../components/StyledButtonAuth";

type RegisterProps = {
  nome: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Cadastro() {
  const [ nome, setNome ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const { onRegister } = useAuth();
  
  const handleRegister = async ({ nome, email, password, confirmPassword }: RegisterProps) => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    await onRegister!({nome, email, password});
  }
  
  return (
    <KeyboardAvoidingView style={ styles.container } behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <Image source={ require('../../assets/d10.jpeg') } style={ styles.logo }/>
        <Text style={ styles.title }>Cadastro</Text>
        <InputWithIcon state={ nome } setState={ setNome } type={ 'nome' }/>
        <InputWithIcon state={ email } setState={ setEmail } type={ 'email' }/>
        <InputWithIcon state={ password } setState={ setPassword } type={ 'password' }/>
        <InputWithIcon state={ confirmPassword } setState={ setConfirmPassword } type={ 'password' } subType={true}/>
        <StyledButtonAuth title="Cadastre" onPress={ () => handleRegister({ nome, email, password, confirmPassword }) }/>
      </ScrollView>
    </KeyboardAvoidingView>
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