import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ChatCardProps {
  profileImage: any;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  appointment: string;
  onPress: () => void;
}

const ChatCard: React.FC<ChatCardProps> = ({
  profileImage,
  name,
  lastMessage,
  lastMessageTime,
  appointment,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.messageContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.appointment}>{appointment}</Text>
            <Text style={styles.lastMessage}>{lastMessage}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.lastMessageTime}>{lastMessageTime}</Text>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    </TouchableOpacity>
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
    paddingHorizontal: 16,
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
    color: '#2B4B51',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#2B4B51',
  },
  appointment: {
    fontSize: 14,
    fontWeight: 'light',
    color: '#2B4B51',
    marginBottom: 4,
  },
  detailsContainer: {
    alignItems: 'flex-end',
  },
  lastMessage: {
    fontSize: 14,
    color: '#2B4B51',
    opacity: 0.5,
    fontWeight: 'bold',
  },
  separator: {
    height: 2,
    backgroundColor: '#EDF4F3',
    marginVertical: 12,
    marginHorizontal: 16,
  },
});

export default ChatCard;
