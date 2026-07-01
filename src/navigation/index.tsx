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
          headerStyle: { backgroundColor: '#0A0A0F' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '900', fontSize: 14 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#0A0A0F' },
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'IFSP - GUARULHOS' }} />
        <Stack.Screen name="Host" component={HostScreen} options={{ title: 'Modo Host' }} />
        <Stack.Screen name="Ranking" component={RankingScreen} options={{ title: 'Ranking / Histórico' }} />
        <Stack.Screen name="Bluetooth" component={BluetoothScreen} options={{ title: 'Conexão STM32' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}