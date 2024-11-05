import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from "../context/AuthContext";

export default function Cadastro() {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const { onRegister, onLogin, authState } = useAuth();
  
  const handleRegister = async ({ email, password }: { email: string, password: string }) => {
    await onRegister!(email, password);
  }
  
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Cadastro</Text>
      <TextInput
        style={ styles.input }
        placeholder="Email"
        value={ email }
        onChangeText={ setEmail }
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType={ 'emailAddress' }
      />
      <TextInput
        style={ styles.input }
        placeholder="Password"
        value={ password }
        onChangeText={ setPassword }
        secureTextEntry
      />
      <Button title="Cadastrar" onPress={ () => handleRegister({ email, password }) }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});