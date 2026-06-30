import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import { DashboardScreen } from '../screens/Dashboard';
import { HostScreen } from '../screens/Host';
import { RankingScreen } from '../screens/Ranking';
import { BluetoothScreen } from '../screens/Bluetooth';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#00E676',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#121212' },
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Painel de Controle' }} />
        <Stack.Screen name="Host" component={HostScreen} options={{ title: 'Modo Host' }} />
        <Stack.Screen name="Ranking" component={RankingScreen} options={{ title: 'Ranking / Histórico' }} />
        <Stack.Screen name="Bluetooth" component={BluetoothScreen} options={{ title: 'Conectar STM32' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}