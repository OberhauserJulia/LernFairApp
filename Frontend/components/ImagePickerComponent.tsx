import React from "react";
import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function ImagePickerComponent({ image, pickImage }) {
  return (
    <>
      {!image && (
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <MaterialIcons name="add-photo-alternate" size={24} color="black" style={styles.icon} />
          <View>
            <Text style={styles.imagePickerText}>Datei hochladen</Text>
            <Text style={styles.imagePickerSubText}>Nach der Datei suchen</Text>
          </View>
        </TouchableOpacity>
      )}
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    backgroundColor: '#EDF4F3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#121212',
    height: 140,
  },
  icon: {
    marginRight: 8,
  },
  imagePickerText: {
    color: '#2B4B51',
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: 'medium',
  },
  imagePickerSubText: {
    color: '#2B4B51',
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: 'regular',
  },
  imageContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#121212',
    borderRadius: 12,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
});
