import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
// import components
import Search from '../components/searchbar';
import Filter from '../components/filter';
import FileOverview from '../components/file_overview';
import { File } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import NotificationModal from '../components/popUp_notification';

interface File_Overview_CategoryProps {
  subjectname: string;
  studentname: string;
}

export default function File_Overview_Category_Student({ subjectname, studentname }: File_Overview_CategoryProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [studentName, setStudentName] = useState<string>(studentname);
  const [files, setFiles] = useState<File[]>([]);
  const subjectName: string = subjectname;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const searchbarfunction = (query: string) => { 
    setSearchQuery(query);
    console.log(query);
  }
 

  useEffect(() => {
    console.log("Loading");
    getSubjectEntries(setFiles , studentName, subjectName);
  }, []); // Abhängigkeiten-Array, um sicherzustellen, dass es nur einmal aufgerufen wird

  // Filter files based on the searchQuery
  const filteredFiles = files.filter(file =>
    file.documentname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/back_arrow.svg')} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headline}> {subjectname} </Text>
        <View style={styles.top_bar_groupe}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/menu_2.svg')} resizeMode="contain" />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.icon_top_bar} source={require('../assets/icons/notifications.svg')} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>	

      <NotificationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.content}>
        <View style={styles.bar}>
          <Search searchbarfunction={searchbarfunction}/>
        </View>
        {filteredFiles.map(file => (
          <FileOverview
            key={file._id.$oid}
            _id={file._id.$oid}
            file_id={file.file_id}
            topic={file.topic || 'Unknown Topic'}
            subject={file.subject || 'Unknown Subject'}
            dateiname={file.documentname}
            filename={file.name}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },

  top_bar: {
    height: 48,
    backgroundColor: '#2B4B51',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  icon_top_bar: {
    height: 24,
    width: 24,
    color: '#ffffff',
  },

  headline: {
    fontWeight: 'bold',
    fontSize: 16, // Adjust font size to fit better in the top bar
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },

  top_bar_groupe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },

  content: {
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
  },

  bar: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
});
