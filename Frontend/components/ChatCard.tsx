import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ChatCardProps {
  profileImage: any; // Typisiere das Profilbild entsprechend
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  appointment: string;
}

const ChatCard: React.FC<ChatCardProps> = ({
  profileImage,
  name,
  lastMessage,
  lastMessageTime,
  appointment,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.messageContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.lastMessageTime}>{lastMessageTime}</Text>
          </View>
          <Text style={styles.appointment}>{appointment}</Text>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    marginBottom: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999999',
  },
  appointment: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#555555',
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    marginTop: 12,
  },
});

export default ChatCard;
