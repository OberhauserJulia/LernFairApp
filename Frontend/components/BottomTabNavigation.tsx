import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import File_Overview_Student from '../screens/file_overview_student';
import File_Overview_Teacher from '../screens/file_overview_teacher';
import Archiv_Student from '../screens/archiv_student';
import Archiv_Teacher from '../screens/archiv_teacher';

const StudentTab = createBottomTabNavigator();
const TeacherTab = createBottomTabNavigator();

const iconNames = {
  Chat: 'chat',
  FileOverview: 'file-outline',
  Archive: 'archive-outline',
} as const;

const getIconName = (routeName: keyof typeof iconNames): keyof typeof MaterialCommunityIcons.glyphMap => {
  return iconNames[routeName];
};

export const StudentNavigation = () => (
  <StudentTab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#2C4A52',
      tabBarInactiveTintColor: '#A0A0A0',
      headerShown: false,
      tabBarLabel: ({ color }) => {
        let label;
        if (route.name === 'Chat') {
          label = 'Chat';
        } else if (route.name === 'FileOverview') {
          label = 'Datei (Schüler)';
        } else if (route.name === 'Archive') {
          label = 'Archiv (Schüler)';
        }
        return <Text style={{ color }}>{label}</Text>;
      },
      tabBarIcon: ({ color, size }) => {
        const iconName = getIconName(route.name as keyof typeof iconNames);
        return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
      },
    })}
  >
    <StudentTab.Screen name="Chat" component={ChatScreen} />
    <StudentTab.Screen name="FileOverview" component={File_Overview_Student} />
    <StudentTab.Screen name="Archive" component={Archiv_Student} />
  </StudentTab.Navigator>
);

export const TeacherNavigation = () => (
  <TeacherTab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#2C4A52',
      tabBarInactiveTintColor: '#A0A0A0',
      headerShown: false,
      tabBarLabel: ({ color }) => {
        let label;
        if (route.name === 'Chat') {
          label = 'Chat';
        } else if (route.name === 'FileOverview') {
          label = 'Datei (Lehrer)';
        } else if (route.name === 'Archive') {
          label = 'Archiv (Lehrer)';
        }
        return <Text style={{ color }}>{label}</Text>;
      },
      tabBarIcon: ({ color, size }) => {
        const iconName = getIconName(route.name as keyof typeof iconNames);
        return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
      },
    })}
  >
    <TeacherTab.Screen name="Chat" component={ChatScreen} />
    <TeacherTab.Screen name="FileOverview" component={File_Overview_Teacher} />
    <TeacherTab.Screen name="Archive" component={Archiv_Teacher} />
  </TeacherTab.Navigator>
);
