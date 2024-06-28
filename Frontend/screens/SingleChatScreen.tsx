import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';
import ChatInput from '../components/ChatInput';
import OpenModalComponent from '../components/openModalComponent';

type SingleChatScreenRouteProp = RouteProp<RootStackParamList, 'SingleChatScreen'>;

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const SingleChatScreen: React.FC = () => {
  const navigation = useNavigation();
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
    <View style={styles.screen}>
      <View style={styles.top_bar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/back_arrow.svg')} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headline}> Max Musterman </Text>
        <View style={styles.top_bar_groupe}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/search.svg')} resizeMode="contain" />
            <TouchableOpacity onPress={() => navigation.navigate('FileOverviewChat')}>
              <Image style={styles.icon_top_bar}  source={require('../assets/icons/menu.svg')} resizeMode="contain" />
            </TouchableOpacity>
        </View>
      </View>	

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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 16,
    paddingRight: 16,
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
  messagesContainer: {
    paddingTop: 16,
  },
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

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RootStackParamList } from '../types/navigationTypes';
// import ChatInput from '../components/ChatInput';

// type SingleChatScreenRouteProp = RouteProp<RootStackParamList, 'SingleChatScreen'>;

// interface Message {
//   text: string;
//   isUser: boolean;
//   timestamp: string;
// }

// const SingleChatScreen: React.FC = () => {
//   const route = useRoute<SingleChatScreenRouteProp>();
//   const { name, lastMessage, lastMessageTime } = route.params;

//   const [messages, setMessages] = useState<Message[]>([
//     { text: lastMessage, isUser: false, timestamp: lastMessageTime }
//   ]);
//   const [newMessage, setNewMessage] = useState('');

//   const sendMessage = () => {
//     if (newMessage.trim()) {
//       const newMessageObject: Message = {
//         text: newMessage,
//         isUser: true,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       };
//       setMessages([...messages, newMessageObject]);
//       setNewMessage('');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.messagesContainer}>
//         {messages.map((message, index) => (
//           <View
//             key={index}
//             style={[
//               styles.messageBubble,
//               message.isUser ? styles.userMessage : styles.receivedMessage,
//             ]}
//           >
//             <Text style={message.isUser ? styles.userMessageText : styles.receivedMessageText}>
//               {message.text}
//             </Text>
//             <Text style={message.isUser ? styles.userTimestampText : styles.receivedTimestampText}>
//               {message.timestamp}
//             </Text>
//           </View>
//         ))}
//       </ScrollView>
//       <ChatInput newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     padding: 16,
//   },
//   messagesContainer: {},
//   messageBubble: {
//     borderRadius: 20,
//     padding: 10,
//     marginVertical: 5,
//     maxWidth: '80%',
//   },
//   userMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#2B4B51',
//   },
//   receivedMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#EDF4F3',
//   },
//   userMessageText: {
//     color: '#ffffff',
//   },
//   receivedMessageText: {
//     color: '#2B4B51',
//   },
//   userTimestampText: {
//     fontSize: 10,
//     color: '#AAAAAA',
//     alignSelf: 'flex-end',
//     marginTop: 5,
//   },
//   receivedTimestampText: {
//     fontSize: 10,
//     color: '#888888',
//     alignSelf: 'flex-end',
//     marginTop: 5,
//   },
// });

// export default SingleChatScreen;
