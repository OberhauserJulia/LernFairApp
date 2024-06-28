import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

interface FileOverviewProps { 
  dateiname: string; 
  subject: string; 
  topic: string; 
  _id: string; 
  file_id: string; 
  filename: string; 
  classNumber?: string; // Optionaler Parameter hinzugefügt
}

export default function FileOverview({dateiname, subject, topic, _id, file_id, filename, classNumber}: FileOverviewProps) {
  const selfID = _id;
  const chunkID = file_id;
  const fileName = filename;

  return (
    <View style={styles.file_overview}>
      <View style={[styles.file, styles.shadowProp]}>
        <View style={styles.file_image}>
          <AntDesign name="filetext1" size={20} color="#FEDA50" />
        </View>

        <View style={styles.file_info}>
          <Text style={styles.headline}>{dateiname}</Text>
          <Text style={styles.text}>{subject} | {topic} {classNumber ? `| Klasse: ${classNumber}` : ''}</Text>
        </View>

        <View style={styles.file_actions}>
          <Entypo name="dots-three-vertical" size={20} color="#2B4B51" />
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
});