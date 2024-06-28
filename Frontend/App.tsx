import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationStudent from './screens/NavigationStudent';
import NavigationTeacher from './screens/NavigationTeacher';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Hide the header for the Home screen
        />
        <Stack.Screen name="NavigationStudent" component={NavigationStudent} options={{ headerShown: false }} />
        <Stack.Screen name="NavigationTeacher" component={NavigationTeacher} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageCircle}>
          <Image 
            source={require('./assets/party.png')}
            style={styles.imageHeader}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Herzlich Willkommen bei Lern-Fair</Text>
        <Text style={styles.subHeaderText}>Melde dich hier mit deiner entsprechenden Rolle in der App an.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NavigationStudent')}>
          <Text style={styles.buttonText}>Schüler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NavigationTeacher')}>
          <Text style={styles.buttonText}>Lehrer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C4A52',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageCircle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHeader: {
    width: '65%',
    height: '65%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 18,
    textAlign: 'center',
    margin: 20,
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F4CC54',
    borderRadius: 5,
    width: 180,
    height: 45,
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#405B73',
    textAlign: 'center',
  },
});

export default App;

// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import { RootStackParamList } from './types/navigationTypes';
// import { Button } from 'react-native-paper';

// // Import Screens
// import Archiv_Category from './screens/ArchivCategory';
// import Archiv_Student from './screens/ArchivStudent';
// import Archiv_Teacher from './screens/ArchivTeacher';
// import Backlog from './screens/backlog';
// import ChatScreen from './screens/ChatScreen';
// import File_Overview_Category_Student from './screens/FileOverviewCategory_Student';
// import File_Overview_Category_Teacher from './screens/FileOverviewCategory_Teacher';
// import File_Overview_Chat from './screens/FileOverviewChat';
// import FileOverviewStudent from './screens/FileOverviewStudent';
// import FileOverviewTeacher from './screens/FileOverviewTeacher';
// import HomeScreen from './screens/HomeScreen';
// import SingleChatScreen from './screens/SingleChatScreen';


// const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createMaterialBottomTabNavigator();

// const ChatStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="ChatScreen">
//       <Stack.Screen  
//         name="ChatScreen" 
//         component={ChatScreen} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="SingleChatScreen" 
//         component={SingleChatScreen} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="FileOverviewChat" 
//         component={File_Overview_Chat} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="BacklogScreen" 
//         component={Backlog} 
//         options={{ headerShown: false }} 
//       />
//     </Stack.Navigator>
//   );
// };

// const FileOverviewStudentStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="FileOverviewStudent">
//       <Stack.Screen 
//         name="FileOverviewStudent" 
//         component={FileOverviewStudent} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="FileOverviewStudentCategory" 
//         component={File_Overview_Category_Student} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="BacklogScreen" 
//         component={Backlog} 
//         options={{ headerShown: false }} 
//       />
//     </Stack.Navigator>
//   );
// };

// const FileOverviewTeacherStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="FileOverviewTeacher">
//       <Stack.Screen 
//         name="FileOverviewTeacher" 
//         component={FileOverviewTeacher} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="FileOverviewTeacherCategory" 
//         component={File_Overview_Category_Teacher} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="BacklogScreen" 
//         component={Backlog} 
//         options={{ headerShown: false }} 
//       />
//     </Stack.Navigator>
//   );
// };

// const ArchivStudentStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="ArchivStudent">
//       <Stack.Screen 
//         name="ArchivStudent" 
//         component={Archiv_Student} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="ArchivCategory" 
//         component={Archiv_Category} 
//         options={{ headerShown: false }} 
//       />
//     </Stack.Navigator>
//   );
// };

// const ArchivTeacherStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="ArchivTeacher">
//       <Stack.Screen 
//         name="ArchivTeacher" 
//         component={Archiv_Teacher} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="ArchivCategory" 
//         component={Archiv_Category} 
//         options={{ headerShown: false }} 
//       />
//     </Stack.Navigator>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Chat') {
//               iconName = focused ? 'chatbox' : 'chatbox-outline';
//             } 
            
//             if (route.name === 'FileOverview') {
//               iconName = focused ? 'folder' : 'folder-outline';
//             }
            
//             if (route.name === 'Archiv') {
//               iconName = focused ? 'archive' : 'archive-outline';
//             } 

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#102E0C',
//           tabBarInactiveTintColor: '#BFDABE',
//           tabBarStyle: { backgroundColor: 'white' },
//           tabBarShowLabel: false,
//         })}
//       >
//         <Tab.Screen 
//           name="Chat" 
//           component={ChatStack} 
//           options={{ headerShown: false }} 
//         />
//         <Tab.Screen 
//           name="FileOverview" 
//           component={FileOverviewTeacherStack} 
//           options={{ headerShown: false }} 
//         />
//         <Tab.Screen 
//           name="Archiv" 
//           component={ArchivTeacherStack} 
//           options={{ headerShown: false }} 
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;