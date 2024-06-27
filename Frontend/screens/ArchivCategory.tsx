import * as React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

// import components
import FileOverview from '../components/file_overview';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import { useEffect, useState } from 'react';
import { ArchiveFile } from '../interfaces/Backendfile';
import { useNavigation } from '@react-navigation/native';
import Search from '../components/searchbar';
interface File_Overview_CategoryProps { 
  filtype : string; 
} 


export default function Archiv_Category( {filtype} : File_Overview_CategoryProps ) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const [files, setFiles] = useState<ArchiveFile[]>([]); 
  const navigation = useNavigation();

  useEffect(() => {
    getSubjectEntries(setFiles, "Archiv", filtype); 
  }, []);

  const searchbarfunction = (query: string) => { 
    setSearchQuery(query);
    console.log(query);
  }
  const filteredFiles = files.filter(file =>
    file.documentname.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/back_arrow.svg')} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headline}> Übungsblätter </Text>
        <TouchableOpacity>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/notifications.svg')} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
      <View style={styles.bar}>
          <Search searchbarfunction={searchbarfunction}/>
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
              classNumber={file.classNumber}
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
    fontFamily: 'Montserrat-Bold',
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