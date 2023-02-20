import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Cica from './Cica'
import Kereses from './Kereses'
import Felvitel from './Felvitel'

function Cicak_fuggveny({ navigation }) {
  return (
   <Cica />
  );
}
function Kereses_fuggveny({ navigation }) {
  return (
   <Kereses />
  );
}
function Felvitel_fuggveny({ navigation }) {
  return (
   <Felvitel />
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Cicák" component={Cicak_fuggveny} />
        <Drawer.Screen name="Keresés" component={Kereses_fuggveny} />
        <Drawer.Screen name="Felvitel" component={Felvitel_fuggveny} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}