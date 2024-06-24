import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

// import components
import FileOverview from '../components/file_overview';
import { ArchiveFile } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import Search from '../components/searchbar';

export default function Archiv_Student() {
  const [worksheets, setWorksheets] = useState<ArchiveFile[]>([]);
  const [workshopFiles, setWorkshopFiles] = useState<ArchiveFile[]>([]);
  const [tests, setTests] = useState<ArchiveFile[]>([]);
  const databaseName = "Archiv";

  useEffect(() => {
    getSubjectEntries(setWorksheets, databaseName, "Uebung");
    getSubjectEntries(setTests, databaseName, "Pruefungen");
    getSubjectEntries(setWorkshopFiles, databaseName, "Workshop");
  }, []);

  const showMore = (fileType: string) => {
    console.log('Show more ' + fileType);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
      </View>

      <View style={styles.content}>
        <View style={styles.bar}>
          <Search></Search>
        </View>

        <View style={styles.category}>
          <View style={styles.text_container}>
            <Text style={styles.category_name}>Übungsblätter</Text>
            <TouchableOpacity  onPress={() => showMore('Uebung')}>
              <Text style={styles.more}>Alle anzeigen</Text>
            </TouchableOpacity>
          </View>
          {worksheets.slice(0, 3).map(file => (
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

        <View style={styles.category}>
          <View style={styles.text_container}>
            <Text style={styles.category_name}>Probeklausuren</Text>
            <TouchableOpacity onPress={() => showMore('Pruefungen')}>
              <Text style={styles.more}>Alle anzeigen</Text>
            </TouchableOpacity>
          </View>
          {tests.slice(0, 3).map(file => (
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

        <View style={styles.category}>
          <View style={styles.text_container}>
            <Text style={styles.category_name}>Workshop Unterlagen</Text>
            <TouchableOpacity onPress={() => showMore('Workshop')}>
              <Text style={styles.more}>Alle anzeigen</Text>
            </TouchableOpacity>
          </View>
          {workshopFiles.slice(0, 3).map(file => (
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
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  category: {
    marginTop: 16,
  },
  text_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category_name: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#2B4B51',
  },
  more: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#2B4B51',
  },
});