import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigationTypes';
import { Button } from 'react-native-paper';

// Import Screens
import Archiv_Category from './ArchivCategory';
import Archiv_Student from './ArchivStudent';
import Archiv_Teacher from './ArchivTeacher';
import Backlog from './backlog';
import ChatScreen from './ChatScreen';
import File_Overview_Category_Student from './FileOverviewCategory_Student';
import File_Overview_Category_Teacher from './FileOverviewCategory_Teacher';
import File_Overview_Chat from './FileOverviewChat';
import FileOverviewStudent from './FileOverviewStudent';
import FileOverviewTeacher from './FileOverviewTeacher';
import SingleChatScreen from './SingleChatScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="ChatScreen">
      <Stack.Screen  
        name="ChatScreen" 
        component={ChatScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="SingleChatScreen" 
        component={SingleChatScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="FileOverviewChat" 
        component={File_Overview_Chat} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="BacklogScreen" 
        component={Backlog} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

const FileOverviewTeacherStack = () => {
  return (
    <Stack.Navigator initialRouteName="FileOverviewTeacher">
      <Stack.Screen 
        name="FileOverviewTeacher" 
        component={FileOverviewTeacher} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="FileOverviewTeacherCategory" 
        component={File_Overview_Category_Teacher} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="BacklogScreen" 
        component={Backlog} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

const ArchivTeacherStack = () => {
  return (
    <Stack.Navigator initialRouteName="ArchivTeacher">
      <Stack.Screen 
        name="ArchivTeacher" 
        component={Archiv_Teacher} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ArchivCategory" 
        component={Archiv_Category} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

const NavigationTeacher = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Chat') {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            } 
            
            if (route.name === 'FileOverview') {
              iconName = focused ? 'folder' : 'folder-outline';
            }
            
            if (route.name === 'Archiv') {
              iconName = focused ? 'archive' : 'archive-outline';
            } 

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#102E0C',
          tabBarInactiveTintColor: '#BFDABE',
          tabBarStyle: { backgroundColor: 'white' },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen 
          name="Chat" 
          component={ChatStack} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="FileOverview" 
          component={FileOverviewTeacherStack} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Archiv" 
          component={ArchivTeacherStack} 
          options={{ headerShown: false }} 
        />
      </Tab.Navigator>
  );
};

export default NavigationTeacher;