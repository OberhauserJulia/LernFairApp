import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
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
import FileOverviewChat from '../components/FileOverviewChat'; 
import FileOverviewBacklog from '../components/FileOverViewBacklog';
import NotificationModal from '../components/popUp_notification';

const initialAttributes = {
  Fächer: ['Englisch', 'Mathe', 'Deutsch', 'Informatik', 'Unknown'],
};

const initialChipsState = {
  Englisch: false, Mathe: false, Deutsch: false, Informatik: false, Unknown: false,
};

export default function Backlog() {
  const [studentName, setStudentName] = useState<string>("Elias");
  const [files, setFiles] = useState<File[]>([]);
  const subjectName: string = "Backlog";
  const [fileDetele, setFileDelete] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState<string[]>([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getSubjectEntries(setFiles, studentName, subjectName);
  }, []);

  const handleDelete = () => {
    setFileDelete(true);
    console.log("Delete");
    setFileDelete(false);
  }

  useEffect(() => {
    console.log("Loading");
    getSubjectEntries(setFiles, studentName, subjectName);
  }, [fileDetele]);

  const searchbarfunction = (query: string) => {
    setSearchQuery(query);
    console.log(query);
  };

  const filterfunction = (query: string) => {
    console.log("Filtered for", query);
    setFilterQuery(query ? query.split(',').map(item => item.trim()) : []);
  };

  const filteredFiles = files.filter(file => {
    const matchesSearchQuery = file.documentname.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilterQuery = filterQuery.length === 0 || filterQuery.some(filter => 
      (file.subject || 'Unknown').toLowerCase() === filter.toLowerCase()
    );
    return matchesSearchQuery && matchesFilterQuery;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.status_bar}/>
      <View style={styles.top_bar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/back_arrow.svg')} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headline}> Backlog </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/notifications.svg')} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <NotificationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.content}>
        <View style={styles.bar}>
          <Search searchbarfunction={searchbarfunction} />
          <Filter filterFunction={filterfunction}
            initialAttributes={initialAttributes} 
            initialChipsState={initialChipsState} />
        </View>

        {filteredFiles.map(file => (
          <FileOverviewBacklog
            handleDelete={handleDelete}
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
  bar: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
