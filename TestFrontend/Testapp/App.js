import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const App = () => {
  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      if (res.type === 'cancel') {
        Alert.alert('User cancelled the picker');
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        uri: res.uri,
        type: res.mimeType || 'application/octet-stream',
        name: res.name || `filename.${res.uri.split('.').pop()}`,
      });

      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('File uploaded successfully!');
      console.log(response.data);
      
    } catch (err) {
      console.log(err.response || err.request);
      Alert.alert('Error', err.message || JSON.stringify(err));
    }
  };

  return (
    <View>
      <Button title="Upload File" onPress={handleFileUpload} />
    </View>
  );
};

export default App;
