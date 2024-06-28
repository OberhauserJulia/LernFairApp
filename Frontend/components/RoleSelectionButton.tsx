import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface RoleSelectionButtonProps {
  text: string;
  handleButtonClick: () => void;
}

const RoleSelectionButton: React.FC<RoleSelectionButtonProps> = ({ text, handleButtonClick }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button 
        mode="contained" 
        onPress={handleButtonClick} 
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
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FEDA50',
    height: 50,
    borderRadius: 10,
    width: '100%',
    marginBottom: 16,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#2C4A52',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RoleSelectionButton;
