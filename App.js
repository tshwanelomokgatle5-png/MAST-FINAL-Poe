import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import MenuManagerScreen from './MenuManagerScreen';
import StatisticsScreen from './StatisticsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // Lifted state so all screens can access and modify it (Refactoring requirement)
  const [menuItems, setMenuItems] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'The Good Chef', headerShown: false }} />
        
        <Stack.Screen name="MenuManager" options={{ title: 'Manage Menu' }}>
          {(props) => (
            <MenuManagerScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Statistics" options={{ title: 'Menu Statistics' }}>
          {(props) => (
            <StatisticsScreen {...props} menuItems={menuItems} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}