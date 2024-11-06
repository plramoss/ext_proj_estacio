import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type InputWithIconProps = {
  type: 'nome' | 'email' | 'password';
  state: string;
  setState: Dispatch<SetStateAction<string>>
}

export default function InputWithIcon({ state, setState, type }: InputWithIconProps) {
  if (type === 'email') {
    return (
      <View style={ styles.inputContainer }>
        <Ionicons name={ 'mail-outline' } size={ 24 } color="gray" style={ styles.icon }/>
        <TextInput
          placeholderTextColor={ 'gray' }
          style={ styles.input }
          placeholder="Email"
          value={ state }
          onChangeText={ setState }
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
        />
      </View>
    );
  } else if (type === 'password') {
    return (
      <View style={ styles.inputContainer }>
        <Ionicons name={ 'lock-closed-outline' } size={ 24 } color="gray" style={ styles.icon }/>
        <TextInput
          style={ styles.input }
          placeholderTextColor={ 'gray' }
          placeholder="Senha"
          value={ state }
          onChangeText={ setState }
          secureTextEntry
          textContentType="password"
        />
      </View>
    );
  } else if (type === 'nome') {
    return (
      <View style={ styles.inputContainer }>
        <Ionicons name={ 'person-outline' } size={ 24 } color="gray" style={ styles.icon }/>
        <TextInput
          style={ styles.input }
          placeholderTextColor={ 'gray' }
          placeholder="Nome"
          value={ state }
          onChangeText={ setState }
          textContentType="name"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
  },
});