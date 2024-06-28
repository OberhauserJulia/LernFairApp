import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import ChatCard from '../components/ChatCard'; // Passe den Importpfad an
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatScreen'>;

const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();

  const chats = [
    {
      profileImage: require('../assets/profile1.jpg'),
      name: "Max Mustermann",
      lastMessage: "Hallo, wie geht es dir?",
      lastMessageTime: "12:30",
      appointment: "Ab 29.07.22 • 13:00 Uhr",
    },
    {
      profileImage: require('../assets/profile1.jpg'),
      name: "Erika Musterfrau",
      lastMessage: "Ich komme später dazu!",
      lastMessageTime: "15:45",
      appointment: "Ab 01.08.22 • 10:30 Uhr",
    },
    {
      profileImage: require('../assets/profile1.jpg'),
      name: "John Doe",
      lastMessage: "Bis später!",
      lastMessageTime: "09:15",
      appointment: "Ab 03.08.22 • 14:00 Uhr",
    },
    {
      profileImage: require('../assets/profile1.jpg'),
      name: "Anna Schmidt",
      lastMessage: "Kannst du mir das Dokument schicken?",
      lastMessageTime: "10:20",
      appointment: "Ab 05.08.22 • 11:30 Uhr",
    },
    {
      profileImage: require('../assets/profile1.jpg'),
      name: "Peter Müller",
      lastMessage: "Bin gleich da!",
      lastMessageTime: "16:00",
      appointment: "Ab 06.08.22 • 09:00 Uhr",
    },
    {
      profileImage: require('../assets/profile1.jpg'),
      name: "Maria Wagner",
      lastMessage: "Wann treffen wir uns?",
      lastMessageTime: "13:45",
      appointment: "Ab 08.08.22 • 15:30 Uhr",
    },
    {
      profileImage: require('../assets/profile1.jpg'),
      name: "Hans Fischer",
      lastMessage: "Ich habe die Unterlagen vorbereitet.",
      lastMessageTime: "11:10",
      appointment: "Ab 10.08.22 • 12:15 Uhr",
    },
  ];

  const handleMenuPress = () => {
    // Navigate to Menu screen
    // Example: navigation.navigate('MenuScreen');
  };  

  

  const handleChatPress = (name: string, lastMessage: string, lastMessageTime: string) => {
    navigation.navigate('SingleChatScreen', { name, lastMessage, lastMessageTime });
  };

  return (
    <View style={styles.container}>
      <View style={styles.status_bar}/>
      <View style={styles.top_bar}>
        <Image style={styles.icon_top_bar} source={require('../assets/icons/menu.svg')} resizeMode="contain" />
        <Text style={styles.headline}> Chat </Text>
        <View style={styles.top_bar_groupe}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/search.svg')} resizeMode="contain" />
          <TouchableOpacity onPress={() => navigation.navigate('BacklogScreen')}>
            <Image style={styles.icon_top_bar} source={require('../assets/icons/menu_2.svg')} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {chats.map((chat, index) => (
          <ChatCard
            key={index}
            profileImage={chat.profileImage}
            name={chat.name}
            lastMessage={chat.lastMessage}
            lastMessageTime={chat.lastMessageTime}
            appointment={chat.appointment}
            onPress={() => handleChatPress(chat.name, chat.lastMessage, chat.lastMessageTime)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  status_bar: {
    height: 30,
    backgroundColor: '#2B4B51',
  },
  top_bar: {
    height: 48,
    backgroundColor: '#2B4B51',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  icon_top_bar: {
    height: 24,
    width: 24,
    color: '#ffffff',
  },

  headline: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },

  top_bar_groupe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },

  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
});

export default ChatScreen;

// import React from 'react';
// import { StyleSheet, ScrollView, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import ChatCard from '../components/ChatCard'; // Passe den Importpfad an
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../types/navigationTypes';

// type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatScreen'>;

// const ChatScreen: React.FC = () => {
//   const navigation = useNavigation<ChatScreenNavigationProp>();

//   const chats = [
//     {
//       profileImage: require('../assets/profile1.jpg'),
//       name: "Max Mustermann",
//       lastMessage: "Hallo, wie geht es dir?",
//       lastMessageTime: "12:30",
//       appointment: "Ab 29.07.22 • 13:00 Uhr",
//     },
//     {
//       profileImage: require('../assets/profile1.jpg'),
//       name: "Erika Musterfrau",
//       lastMessage: "Ich komme später dazu!",
//       lastMessageTime: "15:45",
//       appointment: "Ab 01.08.22 • 10:30 Uhr",
//     },
//     {
//       profileImage: require('../assets/profile1.jpg'),
//       name: "John Doe",
//       lastMessage: "Bis später!",
//       lastMessageTime: "09:15",
//       appointment: "Ab 03.08.22 • 14:00 Uhr",
//     },
//     {
//       profileImage: require('../assets/profile1.jpg'),
//       name: "Anna Schmidt",
//       lastMessage: "Kannst du mir das Dokument schicken?",
//       lastMessageTime: "10:20",
//       appointment: "Ab 05.08.22 • 11:30 Uhr",
//     },
//     {
//       profileImage: require('../assets/profile1.jpg'),
//       name: "Peter Müller",
//       lastMessage: "Bin gleich da!",
//       lastMessageTime: "16:00",
//       appointment: "Ab 06.08.22 • 09:00 Uhr",
//     },
//     {
//       profileImage: require('../assets/profile1.jpg'),
//       name: "Maria Wagner",
//       lastMessage: "Wann treffen wir uns?",
//       lastMessageTime: "13:45",
//       appointment: "Ab 08.08.22 • 15:30 Uhr",
//     },
//     {
//       profileImage: require('../assets/profile1.jpg'),
//       name: "Hans Fischer",
//       lastMessage: "Ich habe die Unterlagen vorbereitet.",
//       lastMessageTime: "11:10",
//       appointment: "Ab 10.08.22 • 12:15 Uhr",
//     },
//   ];

//   const handleChatPress = (name: string, lastMessage: string, lastMessageTime: string) => {
//     navigation.navigate('SingleChatScreen', { name, lastMessage, lastMessageTime });
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         {chats.map((chat, index) => (
//           <ChatCard
//             key={index}
//             profileImage={chat.profileImage}
//             name={chat.name}
//             lastMessage={chat.lastMessage}
//             lastMessageTime={chat.lastMessageTime}
//             appointment={chat.appointment}
//             onPress={() => handleChatPress(chat.name, chat.lastMessage, chat.lastMessageTime)}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     paddingVertical: 20,
//   },
// });

// export default ChatScreen;
