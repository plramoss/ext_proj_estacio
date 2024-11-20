import { Button } from 'react-native';
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cadastro, Home, Login } from "./app/screens";
import Historico from './app/screens/Historico';
import InclusaoRef from './app/screens/InclusaoRef';

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
              options={ {
                headerShown: false,
              } }
            />
            <Stack.Screen
              name="Cadastro"
              component={ Cadastro }
              options={ {
                headerShown: false,
              } }
            />
             <Stack.Screen
               name="Historico"
               component={Historico}
                options={{
                title: 'Historico'
             }}
              />
              <Stack.Screen
              name="InclusaoRef"
              component={InclusaoRef}
              options={{
              title: 'InclusaoRef'
              }}
              />
          </>
        ) }
      </Stack.Navigator>
    </NavigationContainer>
  )
}