import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
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

  const handleChatPress = (name: string, lastMessage: string, lastMessageTime: string) => {
    navigation.navigate('SingleChatScreen', { name, lastMessage, lastMessageTime });
  };

  return (
    <View style={styles.container}>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
});

export default ChatScreen;
