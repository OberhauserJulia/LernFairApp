import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatCard from '../components/ChatCard';
import SingleChatScreen from '../screens/SingleChatScreen';

const ChatScreen = () => {
  const navigation = useNavigation();

  const handleChatPress = (name) => {
    navigation.navigate('SingleChatScreen', { name });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity onPress={() => handleChatPress('Max Mustermann')}>
          <ChatCard
            profileImage={require('../assets/profile1.jpg')}
            name="Max Mustermann"
            lastMessage="Hallo, wie geht es dir?"
            lastMessageTime="12:30"
            appointment="Ab 29.07.22 • 13:00 Uhr"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChatPress('Erika Musterfrau')}>
          <ChatCard
            profileImage={require('../assets/profile1.jpg')}
            name="Erika Musterfrau"
            lastMessage="Ich komme später dazu!"
            lastMessageTime="15:45"
            appointment="Ab 01.08.22 • 10:30 Uhr"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChatPress('John Doe')}>
          <ChatCard
            profileImage={require('../assets/profile1.jpg')}
            name="John Doe"
            lastMessage="Bis später!"
            lastMessageTime="09:15"
            appointment="Ab 03.08.22 • 14:00 Uhr"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChatPress('Anna Schmidt')}>
          <ChatCard
            profileImage={require('../assets/profile1.jpg')}
            name="Anna Schmidt"
            lastMessage="Kannst du mir das Dokument schicken?"
            lastMessageTime="10:20"
            appointment="Ab 05.08.22 • 11:30 Uhr"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChatPress('Peter Müller')}>
          <ChatCard
            profileImage={require('../assets/profile1.jpg')}
            name="Peter Müller"
            lastMessage="Bin gleich da!"
            lastMessageTime="16:00"
            appointment="Ab 06.08.22 • 09:00 Uhr"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChatPress('Maria Wagner')}>
          <ChatCard
            profileImage={require('../assets/profile1.jpg')}
            name="Maria Wagner"
            lastMessage="Wann treffen wir uns?"
            lastMessageTime="13:45"
            appointment="Ab 08.08.22 • 15:30 Uhr"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChatPress('Hans Fischer')}>
          <ChatCard
            profileImage={require('../assets/profile1.jpg')}
            name="Hans Fischer"
            lastMessage="Ich habe die Unterlagen vorbereitet."
            lastMessageTime="11:10"
            appointment="Ab 10.08.22 • 12:15 Uhr"
          />
        </TouchableOpacity>
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
    paddingVertical: 50,
  },
});

export default ChatScreen;
