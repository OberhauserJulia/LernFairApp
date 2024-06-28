import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

// import components
import Search from '../components/searchbar';
import Filter from '../components/filter';
import FileOverview from '../components/file_overview';
import { useState, useEffect } from 'react'; 
import { File } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import { useNavigation } from '@react-navigation/native';

const initialAttributes = {
  Fächer: ['Mathematik', 'Englisch', 'Deutsch', 'Informatik'],
};

const initialChipsState = {
  Mathematik: false, Englisch: false, Deutsch: false, Informatik: false,
};

export default function File_Overview_Chat() {
  const [files, setFiles] = useState<File[]>([]);
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterQuery, setFilterQuery] = React.useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let allFiles: File[] = [];

      await Promise.all([
        getSubjectEntries((data: File[]) => { allFiles = [...allFiles, ...data]; }, "Elias", "Mathe"),
        getSubjectEntries((data: File[]) => { allFiles = [...allFiles, ...data]; }, "Elias", "Deutsch"),
        getSubjectEntries((data: File[]) => { allFiles = [...allFiles, ...data]; }, "Elias", "Englisch"),
        getSubjectEntries((data: File[]) => { allFiles = [...allFiles, ...data]; }, "Elias", "Informatik"),
        getSubjectEntries((data: File[]) => { allFiles = [...allFiles, ...data]; }, "Elias", "Backlog")
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
      <View style={styles.top_bar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/back_arrow.svg')} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headline}> Gesendete Dateien </Text>
      </View>  

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
