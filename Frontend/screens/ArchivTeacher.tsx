import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// import components
import FileOverview from '../components/file_overview';
import { ArchiveFile } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import Search from '../components/searchbar';
import PopUpCompleteFileArchive from '../components/popUp_uploadToArchive';
import NotificationModal from '../components/popUp_notification';
import { useIsFocused } from '@react-navigation/native';
export default function Archiv_Teacher() {
  const [worksheets, setWorksheets] = useState<ArchiveFile[]>([]);
  const [workshopFiles, setWorkshopFiles] = useState<ArchiveFile[]>([]);
  const [tests, setTests] = useState<ArchiveFile[]>([]);
  const databaseName = "Archiv";
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused(); // Hook to determine if screen is focused


  useEffect(() => {
    fetchData(); // Initial data fetch
    
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchData(); // Fetch data again when screen is focused
    }
  }, [isFocused, modalVisible, isModalVisible]);

  const fetchData = () => {
    getSubjectEntries(setWorksheets, databaseName, "Uebung");
    getSubjectEntries(setTests, databaseName, "Pruefungen");
    getSubjectEntries(setWorkshopFiles, databaseName, "Workshop");
  }

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
          {worksheets.slice(0, 2).map(file => (
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
          {tests.slice(0, 2).map(file => (
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
            <Text style={styles.category_name}>Workshop Unterlagen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ArchivCategory', { filtype: "Workshop" })}>
              <Text style={styles.more}>Alle anzeigen</Text>
            </TouchableOpacity>
          </View>
          {workshopFiles.slice(0, 2).map(file => (
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

      <TouchableOpacity style={styles.bottom_button} onPress={() => setIsModalVisible(true)}>
        <FontAwesome5 name="plus-circle" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <PopUpCompleteFileArchive visible={isModalVisible} hideModal={() => setIsModalVisible(false)} />
        </View>
      </Modal>
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
    tintColor: '#ffffff',
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
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
    fontSize: 12,
    color: '#2B4B51',
  },
  bottom_button: {
    position: 'absolute',
    height: 48,
    width: 48,
    bottom: 16,
    right: 16,
    backgroundColor: '#2B4B51',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});