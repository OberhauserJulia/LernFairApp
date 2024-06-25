import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface FileOverviewChatProps { 
  studentname: string; 
  classNumber : string ;
  countryname : string ; 
}

export default function FileOverViewTeacherCart({studentname, classNumber, countryname}: FileOverviewChatProps) {
  


  return (
    <View style={styles.file_overview}>
      <View style={[styles.file, styles.shadowProp]}>
        <View style={styles.file_image}>
          <Image source={require('../assets/icons/file_icon.svg')} />
        </View>

        <View style={styles.file_info}>
          <Text style={styles.headline}>{studentname}</Text>
          <Text style={styles.text}>{countryname} | Klassenstufe {classNumber} </Text>
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
});