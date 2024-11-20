import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import InputWithIcon from "../components/InputWithIcon";
import { StyledButtonAuth } from "../components/StyledButtonAuth";

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
};

type Auth = {
  email: string;
  password: string;
};

export default function Login() {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { onLogin } = useAuth();
  
  const handleLogin = async ({ email, password }: Auth) => {
    await onLogin!(email, password);
  }
  
  return (
    <KeyboardAvoidingView style={ styles.container } behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <Image source={ require('../../assets/d10.jpeg') } style={ styles.logo }/>
        <Text style={ styles.title }>Login</Text>
        <InputWithIcon state={ email } setState={ setEmail } type={ 'email' }/>
        <InputWithIcon state={ password } setState={ setPassword } type={ 'password' }/>
        <TouchableOpacity style={ styles.forgotPassword } onPress={ () => navigation.navigate('Cadastro') }>
          <Text style={ styles.buttonText }>Esqueci a senha</Text>
        </TouchableOpacity>
        <StyledButtonAuth title="Login" onPress={ () => handleLogin({ email, password }) }/>
        <TouchableOpacity style={ styles.secondaryButton } onPress={ () => navigation.navigate('Cadastro') }>
          <Text style={ styles.buttonText }>Cadastro</Text>
        </TouchableOpacity>
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