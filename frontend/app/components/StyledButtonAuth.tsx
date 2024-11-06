import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function StyledButtonAuth({ title, onPress }: { title: string, onPress: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={ 0.6 }
      style={ styles.button }
      onPress={ onPress }
    >
      <Text style={ styles.text }>{ title }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    color: 'rgba(52, 199, 89, 0.46)',
    fontSize: 16,
  },
});
