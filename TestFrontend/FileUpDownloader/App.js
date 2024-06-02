import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

export default function App() {
  const [fileId, setFileId] = useState('');
  const [documentname, setdocumentname] = useState('');
  const [studentname , setstudentname] = useState(''); 
  const [subjectname , setsubjectname] = useState(''); 
  const [topic , settopic] = useState('');
  const [deletefile_ID , setdeletefile_ID] = useState('');



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
      formData.append ("topic",topic); 


      

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



  const deleteFile = () => { 
    axios.delete(`http://192.168.11.24:8000/deletefile/${deletefile_ID}/Test`) 



  }
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
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 2, width : 200 }}
        placeholder="Topic"
        onChangeText={text => settopic(text)}
        value={topic}
      />
      <Button title="Upload File" onPress={uploadFile} />
      {fileId ? (
        <View>
          <Text style={styles.fileId}>Uploaded File ID: {fileId}</Text>
        </View>
      ) : null}

    <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 2, width : 200 }}
        placeholder="Delete File ID"
        onChangeText={text => setdeletefile_ID(text)}
        value={deletefile_ID}
      />
      <Button title="Delete File" onPress={deleteFile} />
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
