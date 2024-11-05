import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
};

export default function Login() {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { onLogin } = useAuth();
  
  const handleLogin = async ({ email, password }: { email: string, password: string }) => {
    await onLogin!(email, password);
  }
  
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Login</Text>
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
      <Button title="Login" onPress={ () => handleLogin({ email, password }) }/>
      <View style={ styles.buttonSpacing }/>
      <Button title="Cadastre-se" onPress={ () => navigation.navigate('Cadastro') }/>
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
  buttonSpacing: {
    height: 10,
  },
});