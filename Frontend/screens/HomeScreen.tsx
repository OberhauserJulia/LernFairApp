import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

interface Props {
  navigation: any; // Typisierung für die Navigation anpassen, falls verfügbar
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleTeacherMode = () => {
    navigation.navigate('TeacherNavigation'); // Navigiere zur Lehrer-Navigation
  };

  const handleStudentMode = () => {
    navigation.navigate('StudentNavigation'); // Navigiere zur Schüler-Navigation
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageCircle}>
          <Image 
            source={require('../assets/party.png')}
            style={styles.imageHeader}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Herzlich Willkommen bei Lern-Fair</Text>
        <Text style={styles.subHeaderText}>Melde dich hier mit deiner entsprechenden Rolle in der App an.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTeacherMode}>
          <Text style={styles.buttonText}>Lehrer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStudentMode}>
          <Text style={styles.buttonText}>Schüler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C4A52',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageCircle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHeader: {
    width: '65%',
    height: '65%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 18,
    textAlign: 'center',
    margin: 20,
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#FEDA50',
    height: 50,
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#2C4A52',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
