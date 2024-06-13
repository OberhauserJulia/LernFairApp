import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export default function UploadButtonComponent({ hideModal, text }) {
  return (
    <View style={styles.buttonContainer}>
      <Button mode="contained" onPress={hideModal} style={styles.button} labelStyle={styles.buttonText}>
        {text}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FEDA50',
    height: 44,
    width: '80%',
    marginTop: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: '#2B4B51',
    fontFamily: 'Montserrat',
    fontWeight: 'medium',
    fontSize: 16,
  },
});
