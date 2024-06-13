import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import PopUp_completeFile from './components/popUp_completeFile';
import PopUp_addFile from './components/popUp_addFile';
import PopUp_uploadToArchive from './components/popUp_uploadToArchive';

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
      {modalVisible && <PopUp_uploadToArchive visible={modalVisible} hideModal={() => setModalVisible(false)} />}
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
