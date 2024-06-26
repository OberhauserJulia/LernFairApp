import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';

// import components
import FileOverview from '../components/file_overview';
import { ArchiveFile } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import Search from '../components/searchbar';

export default function Archiv_Teacher() {
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
        <Image style={styles.icon_top_bar} source={require('../assets/icons/menu.svg')} resizeMode="contain" />
        <Text style={styles.headline}> Archiv </Text>
        <TouchableOpacity>
          <Image style={styles.icon_top_bar} source={require('../assets/icons/notifications.svg')} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>

        <View style={styles.category}>
          <View style={styles.text_container}>
            <Text style={styles.category_name}>Übungsblätter</Text>
            <TouchableOpacity onPress={() => showMore('Uebung')}>
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

      <TouchableOpacity style={styles.bottom_button} onPress={() => console.log('Button Pressed')}>
        <Image source={require('../assets/icons/plus.svg')} />
      </TouchableOpacity>

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
    fontWeight: 'regular',
    fontSize: 12,
    color: '#2B4B51',
  },
  bottom_button: {
    position: 'absolute',
    height: 48,
    width: 48,
    bottom: 16,
    right: 16,
    backgroundColor: '#2B4B51',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});