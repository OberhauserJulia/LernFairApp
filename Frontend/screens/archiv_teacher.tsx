import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// import components
import FileOverview from '../components/file_overview';

export default function Archiv_Teacher() {

  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
      </View>

      <View style={styles.content}>

        <View style={styles.category}>

          <View style={styles.text_container}>
            <Text style={styles.category_name}>Übungsblätter</Text>
            <Text style={styles.more}>Alle anzeigen</Text>
          </View>

          <FileOverview></FileOverview>
          
        </View>

        <View style={styles.category}>

          <View style={styles.text_container}>
            <Text style={styles.category_name}>Probeklausuren</Text>
            <Text style={styles.more}>Alle anzeigen</Text>
          </View>

          <FileOverview></FileOverview>
        </View>

        <View style={styles.category}>

          <View style={styles.text_container}>
            <Text style={styles.category_name}>Workshop Unterlagen</Text>
            <Text style={styles.more}>Alle anzeigen</Text>
          </View>

          <FileOverview></FileOverview>

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

  category: {
    marginTop: 16,
  },

  text_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  category_name: {
    fontFamily: 'Monsterrat',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#2B4B51',
  },

  more: {
    fontFamily: 'Montserrat',
    fontWeight: 'regular',
    fontSize: 12,
    color: '#2B4B51',
  },
});