import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native'; // Add useIsFocused hook

// Import components
import Search from '../components/searchbar';
import FileOverviewChat from '../components/FileOverviewChat';
import NotificationModal from '../components/popUp_notification';
import { File } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';

export default function FileOverviewStudent() {
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [math, setMath] = useState<File[]>([]);
  const [german, setGerman] = useState<File[]>([]);
  const [english, setEnglish] = useState<File[]>([]);
  const [computerscience, setComputerscience] = useState<File[]>([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to determine if screen is focused
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchData(); // Fetch data again when screen is focused
    }
  }, [isFocused]);

  const fetchData = () => {
    getSubjectEntries(setMath, "Elias", "Mathe");
    getSubjectEntries(setGerman, "Elias", "Deutsch");
    getSubjectEntries(setEnglish, "Elias", "Englisch");
    getSubjectEntries(setComputerscience, "Elias", "Informatik");
  };

  const searchbarfunction = (query: string) => {
    setSearchQuery(query);
    console.log(query);
  };

  const filteredSubjects = {
    math: searchQuery === '' || 'mathe'.includes(searchQuery.toLowerCase()) ? math : [],
    german: searchQuery === '' || 'deutsch'.includes(searchQuery.toLowerCase()) ? german : [],
    english: searchQuery === '' || 'englisch'.includes(searchQuery.toLowerCase()) ? english : [],
    computerscience: searchQuery === '' || 'informatik'.includes(searchQuery.toLowerCase()) ? computerscience : []
  };

  return (
    <View style={styles.screen}>
      <View style={styles.status_bar}/>
      <View style={styles.top_bar}>
        <Image style={styles.icon_top_bar} source={require('../assets/icons/menu.svg')} resizeMode="contain" />
        <Text style={styles.headline}> Dateiübersicht </Text>
        <View style={styles.top_bar_groupe}>
          <TouchableOpacity onPress={() => navigation.navigate('BacklogScreen')}>
            <Image style={styles.icon_top_bar} source={require('../assets/icons/menu_2.svg')} resizeMode="contain" />
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
          <Search searchbarfunction={searchbarfunction} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {filteredSubjects.math.length > 0 && (
            <FileOverviewChat subject='Mathe' filecount={filteredSubjects.math.length} />
          )}
          {filteredSubjects.english.length > 0 && (
            <FileOverviewChat subject='Englisch' filecount={filteredSubjects.english.length} />
          )}
          {filteredSubjects.german.length > 0 && (
            <FileOverviewChat subject='Deutsch' filecount={filteredSubjects.german.length} />
          )}
          {filteredSubjects.computerscience.length > 0 && (
            <FileOverviewChat subject='Informatik' filecount={filteredSubjects.computerscience.length} />
          )}
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
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
});
