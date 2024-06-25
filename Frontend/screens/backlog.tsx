import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

// import components
import Search from '../components/searchbar';
import Filter from '../components/filter';
import FileOverview from '../components/file_overview';
import { File } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import FileOverviewChat from '../components/FileOverviewChat'; 
import FileOverviewBacklog from '../components/FileOverViewBacklog';
export default function Backlog() {
  const [studentName, setStudentName] = useState<string>("Elias");
  const [files, setFiles] = useState<File[]>([]);
  const subjectName: string = "Backlog";
  const [fileDetele, setFileDelete] = useState<boolean>(false);

  useEffect(() => {
    getSubjectEntries(setFiles , studentName, subjectName);
  }, []);

  const handleDelete = () => {
    setFileDelete(true);
    console.log("Delete");
    setFileDelete(false);
  }

  useEffect(() => {
    console.log("Loading");
    getSubjectEntries(setFiles , studentName, subjectName);
  }, [fileDetele]);

  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}></View>
      <View style={styles.content}>
        <View style={styles.bar}>
          <Search />
        </View>
        {files.map(file => (
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
  bar: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
});
