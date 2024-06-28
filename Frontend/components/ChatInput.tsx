import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Popup_completeStudentFile from './popUp_uploadStudentFile';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (text: string) => void;
  sendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ newMessage, setNewMessage, sendMessage }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  
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

          {/* Reihenfolge der Icons ändern und Büroklammer rechts hinzufügen */}
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <FontAwesome name="paperclip" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome name="send" style={styles.sendButtonText} />
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Popup_completeStudentFile visible={isModalVisible} hideModal={() => setIsModalVisible(false)} />
          </View>
        </Modal>
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
    justifyContent: 'flex-end', // Icons am Ende der Box ausrichten
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput;