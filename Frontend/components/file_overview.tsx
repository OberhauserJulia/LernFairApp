import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function FileOverview() {

  return (

        <View style={styles.file_overview}>
          <View style={[styles.file, styles.shadowProp]}>
            <View style={styles.file_image}>
              <Image source={require('./assets/file_icon.svg')} />
            </View>

            <View style={styles.file_info}>
              <Text style={styles.headline}>Dateiname</Text>
              <Text style={styles.text}>Fach | Thema</Text>
            </View>

            <View style={styles.file_actions}>
              <Image source={require('./assets/file_actions.svg')} />
            </View>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({

  file_overview: {
    marginTop: 16, 
  },

  file: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, 
  },

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  file_image: {
    width: 20,
    marginRight: 16, 
  },

  file_info: {
    flex: 1,
  },

  headline: {
    fontFamily: 'Montserrat',
    fontWeight: 'medium',
    fontSize: 12,
    color: '#121212',
  },

  text: {
    fontFamily: 'Montserrat',
    fontWeight: 'regular',
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
  },

  file_actions: {
    height: 16,
    marginLeft: 16,
  },
});