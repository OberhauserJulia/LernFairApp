import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';
import ChatInput from '../components/ChatInput';

type SingleChatScreenRouteProp = RouteProp<RootStackParamList, 'SingleChatScreen'>;

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const SingleChatScreen: React.FC = () => {
  const route = useRoute<SingleChatScreenRouteProp>();
  const { name, lastMessage, lastMessageTime } = route.params;

  const [messages, setMessages] = useState<Message[]>([
    { text: lastMessage, isUser: false, timestamp: lastMessageTime }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObject: Message = {
        text: newMessage,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessageObject]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.isUser ? styles.userMessage : styles.receivedMessage,
            ]}
          >
            <Text style={message.isUser ? styles.userMessageText : styles.receivedMessageText}>
              {message.text}
            </Text>
            <Text style={message.isUser ? styles.userTimestampText : styles.receivedTimestampText}>
              {message.timestamp}
            </Text>
          </View>
        ))}
      </ScrollView>
      <ChatInput newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  messagesContainer: {},
  messageBubble: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2B4B51',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDF4F3',
  },
  userMessageText: {
    color: '#ffffff',
  },
  receivedMessageText: {
    color: '#2B4B51',
  },
  userTimestampText: {
    fontSize: 10,
    color: '#AAAAAA',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  receivedTimestampText: {
    fontSize: 10,
    color: '#888888',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default SingleChatScreen;
