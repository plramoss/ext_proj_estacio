import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InclusaoRef from './app/screens/InclusaoRef';
import { Cadastro, Home, Login, Historico } from "./app/screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logout from "./app/functions/Logout";
import {Ionicons} from "@expo/vector-icons";
import Formulario from "./app/components/FormRefeicoes";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ size}) => {
          let iconName;
          let colorIcon = 'rgba(52, 199, 89, 1)';

          if (route.name === "Home") {
            iconName = navigation.isFocused() ? "home" : "home-outline";
          } else if (route.name === "Historico") {
            iconName = navigation.isFocused() ? "time" : "time-outline";
          } else if (route.name === "Logout") {
            iconName = navigation.isFocused() ? "exit" : "exit-outline";
          }

          // @ts-ignore
          return <Ionicons name={ iconName } size={ size } color={ colorIcon } />
        },
        tabBarLabelStyle: {
          color: 'rgba(52, 199, 89, 1)',
        }
      })}
    >
      <Tab.Screen name="Home" component={ Home } options={{
        headerTitle: "Bem-vindo(a)!",
      }} />
      <Tab.Screen name="Historico" component={ Historico } />
      <Tab.Screen name={"Logout"} component={ Logout } options={{
        headerShown: false,
      }} />
    </Tab.Navigator>
  )
}

export const Layout = () => {
  const { authState } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { authState?.authenticated ? (
          <>
            <Stack.Screen
              name="HomeTabs"
              component={ Tabs }
              options={ {
                headerShown: false,
              } }
            />
            <Stack.Screen
              name={'AddRefeicao'}
              component={Formulario}
              options={{
                headerTitle: "Adicionar Refeição",
                headerBackButtonDisplayMode: 'minimal',
                headerTitleStyle: {
                  color: 'black',
                },
                headerTintColor: 'rgba(52, 199, 89, 1)',
              }}
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