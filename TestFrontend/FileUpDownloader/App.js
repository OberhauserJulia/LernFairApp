import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

export default function App() {
  const [fileId, setFileId] = useState('');
  const [documentname, setdocumentname] = useState('');
  const [studentname , setstudentname] = useState(''); 
  const [subjectname , setsubjectname] = useState(''); 



  const uploadFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      console.log(file);
      const formData = new FormData();
      formData.append('file', {
        uri: file.assets[0].uri, // URI der ausgewählten Datei
        name: file.assets[0].name, // Name der ausgewählten Datei
        type: file.assets[0].mimeType, // MIME-Typ der ausgewählten Datei
        
      });

      
      formData.append('documentname', documentname);
      formData.append('subjectname',subjectname);


      

      const response = await axios.post(`http://192.168.11.24:8000/uploadfile/${studentname} `, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setFileId(response.data.file_id);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Uploader and Downloader</Text>
      <Text style={styles.title}>Filename:</Text>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 2, width : 200 }}
        placeholder="DocumentName" 
        onChangeText={text => setdocumentname(text)}
        value={documentname}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 2, width : 200 }}
        placeholder="StudentName "
        onChangeText={text => setstudentname(text)}
        value={studentname}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 2, width : 200 }}
        placeholder="SubjectName "
        onChangeText={text => setsubjectname(text)}
        value={subjectname}
      />
      <Button title="Upload File" onPress={uploadFile} />
      {fileId ? (
        <View>
          <Text style={styles.fileId}>Uploaded File ID: {fileId}</Text>
        </View>
      ) : null}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fileId: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },
});
