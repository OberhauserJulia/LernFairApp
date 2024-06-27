import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import PopUp_addFile from './popUp_completeBacklog';
import PopUp_uploadToArchive from './popUp_uploadToArchive';
import PopUpCompleteFile from './popUp_uploadStudentFile';

export default function OpenModalComponent({ modalType, renderTrigger }: { modalType: string, renderTrigger: (openModal: () => void) => React.ReactNode }) {
  const [modalVisible, setModalVisible] = useState(false);

  const renderModal = () => {
    switch (modalType) {
      case 'addFile':
        return <PopUp_addFile file_id='666be4e873fe1303f9bceaa4' filename='IMG_20240603_140500.jpg' visible={modalVisible} hideModal={() => setModalVisible(false)} />;
      case 'uploadToArchive':
        return <PopUp_uploadToArchive visible={modalVisible} hideModal={() => setModalVisible(false)} />;
      case 'completeFile':
        return <PopUpCompleteFile visible={modalVisible} hideModal={() => setModalVisible(false)} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {renderTrigger(() => setModalVisible(true))}
      {modalVisible && renderModal()}
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
