import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface SubButtonComponentProps {
  hideModal: () => void;
}

const SubButtonComponent: React.FC<SubButtonComponentProps> = ({ hideModal }) => {
  return (
    <TouchableOpacity onPress={hideModal} style={styles.buttonContainer}>
      <Text style={styles.textButton}>Später hochladen</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  textButton: {
    color: '#2B4B51',
    fontFamily: 'Montserrat',
    fontWeight: '400', // Use '400' for regular font weight
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
  },
});

export default SubButtonComponent;
