import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// import components
import Search from '../components/searchbar';
import Filter from '../components/filter';
import FileOverview from '../components/file_overview';
import { useState, useEffect } from 'react'; 
import { File } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import FileOverviewChat from '../components/FileOverviewChat';
import { useNavigation } from '@react-navigation/native';

export default function File_Overview_Chat() {
  const [files, setFiles] = useState<File[]>([]);
  const[math , setMath ] = useState<File[]>([]); 
  const[german , setGerman ] = useState<File[]>([]);
  const [english , setEnglish ] = useState<File[]>([]);
  const [Backlog , setBacklog ] = useState<File[]>([]);
  const [computerscience , setComputerscience ] = useState<File[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getSubjectEntries(setMath , "Elias", "Mathe");
    getSubjectEntries(setGerman , "Elias", "Deutsch");
    getSubjectEntries(setEnglish , "Elias", "Englisch");
    getSubjectEntries(setComputerscience , "Elias", "Informatik");
    getSubjectEntries(setComputerscience , "Elias", "Informatik");
    getSubjectEntries(setBacklog , "Elias", "Backlog");

    

    }, []);

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
        </View>
       
        {math.map(file => (
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
         {english.map(file => (
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
         {german.map(file => (
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
         {computerscience.map(file => (
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
         {Backlog.map(file => (
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
    fontFamily: 'Montserrat-Bold',
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