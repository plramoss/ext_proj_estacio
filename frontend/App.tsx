import { Button, StyleSheet } from 'react-native';
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cadastro, Home, Login } from "./app/screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { authState?.authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={ Home }
              options={ {
                headerRight: () => <Button title="Logout" onPress={ onLogout }/>
              } }
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={ Login }
            />
            <Stack.Screen
              name="Cadastro"
              component={ Cadastro }
            />
          </>
        ) }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});