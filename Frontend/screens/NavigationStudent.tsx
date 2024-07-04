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

const FileOverviewStudentStack = () => {
  return (
    <Stack.Navigator initialRouteName="FileOverviewStudent">
      <Stack.Screen 
        name="FileOverviewStudent" 
        component={FileOverviewStudent} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="FileOverviewStudentCategory" 
        component={File_Overview_Category_Student} 
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

const ArchivStudentStack = () => {
  return (
    <Stack.Navigator initialRouteName="ArchivStudent">
      <Stack.Screen 
        name="ArchivStudent" 
        component={Archiv_Student} 
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

const NavigationStudent = () => {
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

            return <Ionicons name={iconName} size={24} color={'#2B4B51'} />;
          },
          tabBarActiveTintColor: '#2B4B51',
          tabBarInactiveTintColor: '#2B4B51',
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
          component={FileOverviewStudentStack} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Archiv" 
          component={ArchivStudentStack} 
          options={{ headerShown: false }} 
        />
      </Tab.Navigator>
  );
};

export default NavigationStudent;