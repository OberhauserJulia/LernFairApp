import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (text: string) => void;
  sendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ newMessage, setNewMessage, sendMessage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.messageBox}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Nachricht schreiben..."
            placeholderTextColor="#2B4B51"
          />
          <TouchableOpacity>
            <FontAwesome name="smile-o" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="microphone" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="paperclip" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome name="send" style={styles.sendButtonText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingVertical: 8,
  },
  messageBox: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF4F3',
    borderRadius: 5,
    flex: 1,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#2B4B51',
    opacity: 0.5,
  },
  icon: {
    marginHorizontal: 8,
    color: '#2B4B51',
    opacity: 0.5,
    fontSize: 24,
  },
  sendButton: {
    backgroundColor: '#FEDA50',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    marginLeft: 12,
  },
  sendButtonText: {
    color: '#2B4B51',
    fontSize: 24,
  },
});

export default ChatInput;
