import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// import components
import Search from '../components/searchbar';
import FileOverview from '../components/file_overview';
import { useState, useEffect } from 'react'; 
import { File } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';

export default function File_Overview_Chat() {
  const [files, setFiles] = useState<File[]>([]);


  useEffect(() => {
    getSubjectEntries((newFiles) => {
      setFiles((currentFiles) => [...currentFiles, ...newFiles]);
    }, "Elias", "Mathe");
  
    getSubjectEntries((newFiles) => {
      setFiles((currentFiles) => [...currentFiles, ...newFiles]);
    }, "Elias", "Deutsch");
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
      </View>

      <View style={styles.content}>
        <View>
          <Search></Search>
        </View>
        {files.map(file => (
          <FileOverview 
            key={file._id.$oid}
            _id={file._id.$oid}
            file_id={file.file_id}
            topic={file.topic || 'Unknown Topic'}
            subject={file.subject || 'Unknown Subject'}
            dateiname={file.documentname}
            filename = {file.name}
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
  },

  content: {
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
  },
});