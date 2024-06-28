import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// import components
import FileOverview from '../components/file_overview';
import { ArchiveFile } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import Search from '../components/searchbar';
import NotificationModal from '../components/popUp_notification';

export default function Archiv_Student() {
  const [worksheets, setWorksheets] = useState<ArchiveFile[]>([]);
  const [workshopFiles, setWorkshopFiles] = useState<ArchiveFile[]>([]);
  const [tests, setTests] = useState<ArchiveFile[]>([]);
  const databaseName = "Archiv";
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getSubjectEntries(setWorksheets, databaseName, "Uebung");
    getSubjectEntries(setTests, databaseName, "Pruefungen");
    getSubjectEntries(setWorkshopFiles, databaseName, "Workshop");
  }, []);

  const showMore = (fileType: string) => {
    console.log('Show more ' + fileType);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.status_bar}/>
      <View style={styles.top_bar}>
        <Image style={styles.icon_top_bar} source={require('../assets/icons/menu.svg')} resizeMode="contain" />
        <Text style={styles.headline}> Archiv </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/notifications.svg')} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <NotificationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.content}>

        <View style={styles.category}>
          <View style={styles.text_container}>
            <Text style={styles.category_name}>Übungsblätter</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ArchivCategory', { filtype: "Uebung" })}>
              <Text style={styles.more}>Alle anzeigen</Text>
            </TouchableOpacity>
          </View>
          {worksheets.slice(0, 3).map(file => (
            <FileOverview
              key={file._id.$oid}
              _id={file._id.$oid}
              file_id={file.file_id}
              topic={file.topic || 'Unknown Topic'}
              subject={file.subject || 'Unknown Subject'}
              dateiname={file.documentname}
              filename={file.name}
              classNumber={file.classNumber}
            />
          ))}
        </View>

        <View style={styles.category}>
          <View style={styles.text_container}>
            <Text style={styles.category_name}>Probeklausuren</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ArchivCategory', { filtype: "Pruefungen" })}>
              <Text style={styles.more}>Alle anzeigen</Text>
            </TouchableOpacity>
          </View>
          {tests.slice(0, 3).map(file => (
            <FileOverview
              key={file._id.$oid}
              _id={file._id.$oid}
              file_id={file.file_id}
              topic={file.topic || 'Unknown Topic'}
              subject={file.subject || 'Unknown Subject'}
              dateiname={file.documentname}
              filename={file.name}
              classNumber={file.classNumber}
            />
          ))}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  status_bar: {
    height: 30,
    backgroundColor: '#2B4B51',
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
    fontSize: 16,
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
  category: {
    marginTop: 16,
  },
  text_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category_name: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#2B4B51',
  },
  more: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#2B4B51',
  },
});