import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useEffect } from "react";


interface UploadButtonComponentProps {
  hideModal: () => void;
  text: string;
  handleButtonClick: () => void;
}

const UploadButtonComponent: React.FC<UploadButtonComponentProps> = ({ hideModal, text, handleButtonClick }) => {
  const onButtonClick = () => {
    handleButtonClick();
    hideModal();
  };

  return (
    <View style={styles.buttonContainer}>
      <Button 
        mode="contained" 
        onPress={onButtonClick} 
        style={styles.button} 
        labelStyle={styles.buttonText}
      >
        {text}
      </Button>
    </View>
  );
};

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
    fontWeight: '500', // Changed 'medium' to '500' to correctly use fontWeight
    fontSize: 16,
  },
});

export default UploadButtonComponent;
