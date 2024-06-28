import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

// import components
import FileOverview from '../components/file_overview';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import { ArchiveFile } from '../interfaces/Backendfile';
import Search from '../components/searchbar';
import Filter from '../components/filter';
import NotificationModal from '../components/popUp_notification';

interface File_Overview_CategoryProps { 
  filtype: string; 
} 

const initialAttributes = {
  Klassen: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  Fächer: ['Mathematik', 'Englisch', 'Deutsch', 'Informatik'],
};

const initialChipsState = {
  1: false, 2: false, 3: false, 4: false, 5: false, 6: false,
  7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false,
  Mathematik: false, Englisch: false, Deutsch: false, Informatik: false,
};

export default function ArchivCategory() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterQuery, setFilterQuery] = React.useState<string[]>([]);
  const [files, setFiles] = useState<ArchiveFile[]>([]); 

  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const { filtype } = route.params as File_Overview_CategoryProps;

  useEffect(() => {
    getSubjectEntries(setFiles, "Archiv", filtype); 
  }, [filtype]);

  const searchbarfunction = (query: string) => { 
    setSearchQuery(query);
    console.log(query);
  }

  const filterfunction = (query: string) => {
    console.log("Filtered for", query);
    setFilterQuery(query ? query.split(',').map(item => item.trim()) : []);
  }

  const filteredFiles = files.filter(file => {
    const matchesSearchQuery = file.documentname.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilterQuery = filterQuery.length === 0 || filterQuery.some(filter => 
      file.classnumber === filter || file.subject?.toLowerCase() === filter.toLowerCase()
    );
    return matchesSearchQuery && matchesFilterQuery;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/back_arrow.svg')} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headline}> {filtype} </Text>
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
          <Search searchbarfunction={searchbarfunction}/>
          <Filter filterFunction={filterfunction}
            initialAttributes={initialAttributes} 
            initialChipsState={initialChipsState}/>
        </View>
        <View style={styles.bar}>
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
            classNumber={file.classnumber}
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
});