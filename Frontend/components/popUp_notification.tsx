import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import des Icons aus einem Iconset (z.B. Ionicons)

interface NotificationModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ modalVisible, setModalVisible }) => {
  const [notifications, setNotifications] = useState(Array.from(Array(10).keys()).map(index => ({
    id: index,
    text: `Max hat eine Datei in die Dateiübersicht hinzugefügt.`,
    read: false,
  })));

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <Text style={styles.modalHeaderText}>Benachrichtigungen</Text>
            <TouchableOpacity style={styles.closeIconModal} onPress={closeModal}>
              <Ionicons name="close" size={24} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={{ height: 300}}>
            <ScrollView style={styles.scrollView}>
              {notifications.map((notification) => (
                <View key={notification.id} style={styles.cardContainer}>
                  <View style={styles.cardContentContainer}>
                    {!notification.read && <View style={styles.statusIndicator}></View>}
                    <Text style={styles.cardText}>{notification.text}</Text>
                    <TouchableOpacity style={styles.closeIconContainer} onPress={() => handleDeleteNotification(notification.id)}>
                      <Ionicons name="close-circle" size={24} color="#2B4B51" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAll}>
              <Text style={styles.buttonText}>Alle Nachrichten löschen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMarkAllAsRead}>
              <Text style={styles.readAllText}>Alle als gelesen markieren</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#121212',
  },
  closeIconModal: {
    padding: 6,
  },
  scrollView: {
    maxHeight: 300,
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 10,
  },
  cardContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#EDF4F3',
    borderRadius: 8,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FEDA50',
    marginRight: 10,
  },
  cardText: {
    fontSize: 14,
    color: '2B4B51',
    opacity: 0.8,
  },
  closeIconContainer: {
    padding: 6,
    borderRadius: 12,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FEDA50',
    padding: 12,
    height: 44,
    width: '80%',
    borderRadius: 5,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: '#2B4B51',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  readAllText: {
    fontSize: 14,
    color: '#2B4B51',
    marginBottom: 10,
  },
});

export default NotificationModal;