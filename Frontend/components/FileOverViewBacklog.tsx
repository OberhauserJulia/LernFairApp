import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import PopUpCompleteFile from './popUp_completeBacklog';

interface FileOverviewBacklogProps { 
  dateiname: string; 
  subject: string; 
  topic: string; 
  _id: string; 
  file_id: string; 
  filename: string; 
  classNumber?: string; // Optionaler Parameter hinzugefügt
  handleDelete: () => void;
}

export default function FileOverviewBacklog({ dateiname, subject, topic, _id, file_id, filename, classNumber, handleDelete }: FileOverviewBacklogProps) {
  const selfID = _id;
  const chunkID = file_id;
  const fileName = filename;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const deleteFile = async () => {
    try {
      // Senden des POST-Requests an den Server
      await axios.delete(`${process.env.IP_ADRESS}/deletefile/${file_id}/Elias/Backlog`);
      
      // Behandlung der Antwort
      console.log('File successfully deleted');
      
      // Aufruf des handleDelete Callback
      handleDelete();
    } catch (error) {
      // Fehlerbehandlung
      console.error('Error deleting file:', error);
    }
  };

  React.useEffect(() => {
    // Hier können Sie Initialisierungen vornehmen, die nur einmalig beim ersten Rendern ausgeführt werden sollen
    // Beispiel: Laden von Daten vom Server
    // getFiles();
  }, []);

  return (
    <View style={styles.file_overview} >
      <TouchableOpacity style={[styles.file, styles.shadowProp]} onPress={() => setIsModalVisible(true)}>
        <View style={styles.file_image}>
          <AntDesign name="filetext1" size={20} color="#FEDA50" />
        </View>
        <View style={styles.file_info}>
          <Text style={styles.headline}>{dateiname}</Text>
          <Text style={styles.text}>{subject} | {topic} </Text>
        </View>
        {/* <View style={styles.file_actions}>
          <Image source={require('../assets/icons/file_actions.svg')} />
        </View> */}
        <View>
          <TouchableOpacity onPress={deleteFile}>
          <AntDesign name="closecircle" size={20} color="#2B4B51" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <PopUpCompleteFile file_id='666be4e873fe1303f9bceaa4' filename='IMG_20240603_140500.jpg' visible={isModalVisible} hideModal={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
    
  );
}

const styles = StyleSheet.create({
  file_overview: {
    marginTop: 16, 
  },
  file: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, 
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  file_image: {
    marginRight: 16, 
  },
  file_info: {
    flex: 1,
  },
  headline: {
    fontWeight: 'medium',
    fontSize: 12,
    color: '#2B4B51',
  },
  text: {
    fontWeight: 'regular',
    fontSize: 12,
    color: '#2B4B51',
    marginTop: 8,
  },
  file_actions: {
    marginLeft: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
