import { StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../app/src/screens/home_screens';
import DetalheNoticia from './src/screens/detalhes_screens';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: "Noticias"}}
        >
        </Stack.Screen>
        <Stack.Screen
        name="DetalheNoticia"
        component={DetalheNoticia}
        options={{title: "Noticias"}}
        ></Stack.Screen>
      </Stack.Navigator>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
