import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// import components
import Search from '../components/searchbar';
import FileOverview from '../components/file_overview';
import { useState, useEffect } from 'react'; 
import { File } from '../interfaces/Backendfile';
import { getSubjectEntries } from '../Backendfunctions/getSubjectEntries';
import FileOverviewChat from '../components/FileOverviewChat';
import FileOverViewTeacherCart from '../components/FileOverViewTeacherCard';
export default function File_Overview_Chat() {
  const [files, setFiles] = useState<File[]>([]);
  const[math , setMath ] = useState<File[]>([]); 
  const[german , setGerman ] = useState<File[]>([]);
  const [english , setEnglish ] = useState<File[]>([]);
  const [computerscience , setComputerscience ] = useState<File[]>([]);


  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
        <Image style={styles.icon_top_bar} source={require('../assets/icons/menu.svg')} resizeMode="contain" />
        <Text style={styles.headline}> Dateiübersicht </Text>
        <View style={styles.top_bar_groupe}>
          <TouchableOpacity>
            <Image style={styles.icon_top_bar} source={require('../assets/icons/menu_2.svg')} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.icon_top_bar} source={require('../assets/icons/notifications.svg')} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>	

      <View style={styles.content}>
        <View>
          <Search></Search>
        </View>
       <FileOverViewTeacherCart studentname='Elias' countryname="Bayern"  classNumber="4"/>
       <FileOverViewTeacherCart studentname='Julia' countryname="Bayern"  classNumber="4"/>
       <FileOverViewTeacherCart studentname='Tatjana' countryname="Bayern"  classNumber="10"/>
       <FileOverViewTeacherCart studentname='Hannah' countryname="Bayern"  classNumber="2"/>
       <FileOverViewTeacherCart studentname='Schiffner' countryname="Bayern"  classNumber="13"/>

           


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
    fontSize: 16, // Adjust font size to fit better in the top bar
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
});