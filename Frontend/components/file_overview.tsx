import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

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
          <Image source={require('../assets/icons/file_icon.svg')} />
        </View>

        <View style={styles.file_info}>
          <Text style={styles.headline}>{dateiname}</Text>
          <Text style={styles.text}>{subject} | {topic} {classNumber ? `| Klasse: ${classNumber}` : ''}</Text>
        </View>

        <View style={styles.file_actions}>
          <Image source={require('../assets/icons/file_actions.svg')} />
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
    marginBottom: 16, 
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
    color: '#121212',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'regular',
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
  },
  file_actions: {
    height: 16,
    marginLeft: 16,
  },
});