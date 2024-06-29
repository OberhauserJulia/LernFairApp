import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';

// import components
import Search from '../components/searchbar';
import Filter from '../components/filter';
import FileOverview from '../components/file_overview';
import { useState, useEffect } from 'react'; 
import { File } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import { useNavigation, useRoute } from '@react-navigation/native';
import NotificationModal from '../components/popUp_notification';

const initialAttributes = {
  Fächer: ['Mathe', 'Englisch', 'Deutsch', 'Informatik'],
};

const initialChipsState = {
  Mathe: false, Englisch: false, Deutsch: false, Informatik: false,
};

interface File_Overview_CategoryProps {
  studentName: string;
}

export default function File_Overview_Category_Teacher({}: File_Overview_CategoryProps) {
  const [files, setFiles] = useState<File[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const { studentName } = route.params as { studentName: string };

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterQuery, setFilterQuery] = React.useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let allFiles: File[] = [];

      await Promise.all([
        getSubjectEntries((data: File[]) => { allFiles = [...allFiles, ...data]; }, studentName, "Mathe"),
        getSubjectEntries((data: File[]) => { allFiles = [...allFiles, ...data]; }, studentName, "Deutsch"),
        getSubjectEntries((data: File[]) => { allFiles = [...allFiles, ...data]; }, studentName, "Englisch"),
        getSubjectEntries((data: File[]) => { allFiles = [...allFiles, ...data]; }, studentName, "Informatik"),
      ]);

      setFiles(allFiles);
    };

    fetchData();
  }, []);

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
      file.subject?.toLowerCase() === filter.toLowerCase()
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
        <Text style={styles.headline}> {studentName} </Text>
        <View style={styles.top_bar_groupe}>
          <TouchableOpacity  onPress={() => navigation.navigate('BacklogScreen')}>
            <Image style={styles.icon_top_bar} source={require('../assets/icons/menu_2.svg')} resizeMode="contain"/>
          </TouchableOpacity>
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
          <Filter filterFunction={filterfunction}
            initialAttributes={initialAttributes} 
            initialChipsState={initialChipsState}/>
        </View>
        <View style={styles.bar}>
        </View>
       
       <ScrollView ontentContainerStyle={styles.scrollViewContent}>
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
        </ScrollView>
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

  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
});
