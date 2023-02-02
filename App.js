// para instalar npm install react-native-paper
// npm install add react-native-vector-icons
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//  para importar de  react-native-paper
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inicio } from './views/Inicio';
import { NuevoCliente } from './views/NuevoCliente';
import { DetallesCliente } from './views/DetallesCliente';
import { BarraSuperior } from './components/ui/Barra';


const Stack = createNativeStackNavigator();

// Definir el tema
const theme = {
  // obtenemos una copia del  DefaultTheme
  ...DefaultTheme,
  // asi reescribimos algo q no nos guste
  colors: {
    // tomamos una copia de la parte que queremos sobreescribir
    ...DefaultTheme.colors,
    // sobreescribimos lo q queremos
    primary: '#1774F2',
    accent: '#0655BF'
  }
}



const App = () => {


  return (
    <>
    <PaperProvider>

      <NavigationContainer>
        {/* definimos el tipo de navegacion en este caso stack cada uno de estos seria una pantalla */}
        <Stack.Navigator
          // para decirle cual es la de inicio
          initialRouteName='Inicio'
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme.colors.primary
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        >
          <Stack.Screen
            name='Inicio'
            component={Inicio}
            // como aca lo declaro por eso se agrega a todos los Stack.Screen el navigation y route
            options={ ({navigation, route}) => ({
             
              // para poner un titulo al header
              // title: 'Componente Principal',
              // para mostrar algo en el header y mandar props a ese componente
              // headerLeft: (props) => 
              // <BarraSuperior {...props}
              // navigation={navigation}
              // route={route}
              // />
            })}
          />

          <Stack.Screen
            name='NuevoCliente'
            component={NuevoCliente}
            options={{
              // para poner un titulo al header
              title: 'Nuevo Cliente',
            }}
          />

          <Stack.Screen
            name='DetallesCliente'
            component={DetallesCliente}
            options={{
              // para poner un titulo al header
              title: 'Detalles Cliente',
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
