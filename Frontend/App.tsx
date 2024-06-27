// App.tsx

import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import { StudentNavigation, TeacherNavigation } from './components/BottomTabNavigation';

const RootStack = createBottomTabNavigator();

const App = () => (
  <NavigationContainer theme={NavigationTheme}>
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="StudentNavigation" component={StudentNavigation} />
      <RootStack.Screen name="TeacherNavigation" component={TeacherNavigation} />
    </RootStack.Navigator>
  </NavigationContainer>
);

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

export default App;
