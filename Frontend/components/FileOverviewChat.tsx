import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';

interface FileOverviewChatProps { 
  subject: string; 
  filecount : number ; 
}

export default function FileOverviewChat({ subject,  filecount}: FileOverviewChatProps) {
  const navigation = useNavigation();


  return (
    <TouchableOpacity style={styles.file_overview} onPress={() => navigation.navigate('FileOverviewStudentCategory', {
      Subject: subject,
      Filecount: filecount,
    })}>
      <View style={[styles.file, styles.shadowProp]}>
        <View style={styles.file_image}>
          <AntDesign name="filetext1" size={24} color="#FEDA50" />
        </View>

        <View style={styles.file_info}>
          <Text style={styles.headline}>{subject}</Text>
          <Text style={styles.text}>Anzahl der Dateien: {filecount}</Text>
        </View>

        <View style={styles.file_actions}>
        <Entypo name="dots-three-vertical" size={20} color="#2B4B51" />
        </View>
      </View>
    </TouchableOpacity>
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
    height: 16,
    marginLeft: 16,
  },
});