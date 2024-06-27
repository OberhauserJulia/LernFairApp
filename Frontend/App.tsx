import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from './types/navigationTypes';
import { Button } from 'react-native-paper';

// Import Screens
import ChatScreen from './screens/ChatScreen';
import SingleChatScreen from './screens/SingleChatScreen';
import FileOverviewChat from './screens/FileOverviewChat';
import FileOverviewStudent from './screens/FileOverviewStudent';
import FileOverviewTeacher from './screens/FileOverviewTeacher';
import FileOverviewCategoryStudent from './screens/FileOverviewCategory';
import FileOverviewCategoryTeacher from './screens/FileOverviewCategory';
import Archiv_Student from './screens/ArchivStudent';
import Archiv_Teacher from './screens/ArchivTeacher';
import Archiv_Category from './screens/ArchivCategory';
import Backlog from './screens/backlog';
import OpenModalComponent from './components/openModalComponent'; 

export default function App() {
  useEffect(() => {

console.log(process.env.IP_ADRESS)
  } , []) 

  return (
    <NavigationContainer> 
      <Backlog /> 
    </NavigationContainer> 
  );
}

/*const Stack = createNativeStackNavigator<RootStackParamList>();
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
        component={FileOverviewChat} 
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
        component={FileOverviewCategoryStudent} 
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
        component={FileOverviewCategoryTeacher} 
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
        name="ArchivCategoryStudent" 
        component={Archiv_Category} 
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
        name="ArchivCategoryStudent" 
        component={Archiv_Category} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
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
          component={FileOverviewStudentStack} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Archiv" 
          component={ArchivStudentStack} 
          options={{ headerShown: false }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

// import { StyleSheet, Text } from 'react-native';

// import Archiv_Category from './screens/archiv_category';
// import Archiv_Student from './screens/archiv_student';
// import Archiv_Teacher from './screens/archiv_teacher';
// import Backlog from './screens/backlog';
// import File_Overview_Category from './screens/file_overview_category';  
// import File_Overview_Chat from './screens/file_overview_chat';
// import File_Overview_Student from './screens/file_overview_student';
// import File_Overview_Teacher from './screens/file_overview_teacher';
// import OpenModalComponent from './components/openModalComponent'; // Corrected import
// import FileOverviewChat from './components/FileOverviewChat';

// export default function App() {
//   return (
//    <Archiv_Teacher   />  // Corrected component name
//   );
// }

// const styles = StyleSheet.create({
// });*/