import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import PopUpCompleteFile from './popUp_completeBacklog';



export default function openModalComponent() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button
        mode="contained"
        onPress={openModal}
        style={{
        position: 'absolute', 
        }}
      >
        Button Text
      </Button>
      {modalVisible && <PopUpCompleteFile visible={modalVisible} hideModal={() => setModalVisible(false)} file_id='123' filename='blala'  />}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});