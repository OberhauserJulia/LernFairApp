import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

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

  const deleteFile = async () => {
    try {
      // Senden des POST-Requests an den Server
      await axios.delete(`http://192.168.119.190:8000/deletefile/${file_id}/Elias/Backlog`);
      
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
    <View style={styles.file_overview}>
      <View style={[styles.file, styles.shadowProp]}>
        <View style={styles.file_image}>
          <Image source={require('../assets/icons/file_icon.svg')} />
        </View>
        <View style={styles.file_info}>
          <Text style={styles.headline}>{dateiname}</Text>
          <Text style={styles.text}>{subject} | {topic} </Text>
        </View>
        <View style={styles.file_actions}>
          <Image source={require('../assets/icons/file_actions.svg')} />
        </View>
        <View>
          <TouchableOpacity onPress={deleteFile}>
            <Image source={require('../assets/icons/delete.svg')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
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
    width: 20,
    marginRight: 16, 
  },
  file_info: {
    flex: 1,
  },
  headline: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'medium',
    fontSize: 12,
    color: '#2B4B51',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'regular',
    fontSize: 12,
    color: '#2B4B51',
    marginTop: 8,
  },
  file_actions: {
    height: 16,
    marginLeft: 16,
  },
  icon: {
    width: 16,
    height: 16,
  },
});
