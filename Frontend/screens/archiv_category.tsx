import * as React from 'react';
import { StyleSheet, View } from 'react-native';

// import components
import FileOverview from '../components/file_overview';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import { useEffect, useState } from 'react';
import { ArchiveFile } from '../interfaces/Backendfile';
interface File_Overview_CategoryProps { 
  filtype : string; 
} 


export default function Archiv_Category( {filtype} : File_Overview_CategoryProps ) {
  const [files, setFiles] = useState<ArchiveFile[]>([]); 

  useEffect(() => {
    getSubjectEntries(setFiles, "Archiv", filtype); 
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
      </View>

      <View style={styles.content}>

        {files.map(file => (
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
  },

  content: {
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
  },

});