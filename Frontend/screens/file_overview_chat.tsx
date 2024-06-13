import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// import components
import Search from '../components/searchbar';
import FileOverview from '../components/file_overview';

export default function File_Overview_Chat() {

  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
      </View>

      <View style={styles.content}>
        <View>
          <Search></Search>
        </View>

        <FileOverview dateiname='Dummy Datei' subject='Dummy Subj' topic='Dummy Topic' _id='1234' file_id='567' filename='Dummy filename '></FileOverview>
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