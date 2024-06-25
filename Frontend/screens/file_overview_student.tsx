import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// import components
import Search from '../components/searchbar';
import FileOverview from '../components/file_overview';
import { useState, useEffect } from 'react'; 
import { File } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import FileOverviewChat from '../components/FileOverviewChat';

export default function File_Overview_Chat() {
  const [files, setFiles] = useState<File[]>([]);
  const[math , setMath ] = useState<File[]>([]); 
  const[german , setGerman ] = useState<File[]>([]);
  const [english , setEnglish ] = useState<File[]>([]);
  const [computerscience , setComputerscience ] = useState<File[]>([]);

  useEffect(() => {
    getSubjectEntries(setMath , "Elias", "Mathe");
    getSubjectEntries(setGerman , "Elias", "Deutsch");
    getSubjectEntries(setEnglish , "Elias", "Englisch");
    getSubjectEntries(setComputerscience , "Elias", "Informatik");
    getSubjectEntries(setComputerscience , "Elias", "Informatik");

    
    }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
      </View>

      <View style={styles.content}>
        <View>
          <Search></Search>
        </View>
       
            <FileOverviewChat subject='Mathe' filecount={math.length}/>
            <FileOverviewChat subject='Englisch' filecount={english.length}/>
            <FileOverviewChat subject='Deutsch' filecount={german.length}/>
            <FileOverviewChat subject='Informatik' filecount={computerscience.length}/>



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
  },

  bar: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },

  content: {
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
  },
});