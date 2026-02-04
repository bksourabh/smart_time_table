import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { MathsPracticeScreen } from './src/screens/MathsPracticeScreen';

type RootStackParamList = {
  Home: undefined;
  MathsPractice: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MathsPractice" component={MathsPracticeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
