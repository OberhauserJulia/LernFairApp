





import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { Image, Video } from 'expo-av';
import { WebView } from 'react-native-webview';

export default function App() {
  const [fileId, setFileId] = useState('');
  const [documentname, setdocumentname] = useState('');
  const [studentname , setstudentname] = useState(''); 
  const [subjectname , setsubjectname] = useState(''); 
  const [topic , settopic] = useState('');
  const [deletefile_ID , setdeletefile_ID] = useState('');
  const [mediaElement, setMediaElement] = useState(null);




  const getFile = async () => {
    try {
      const response = await axios.get(`http://172.27.144.1:8000/getfile/${deletefile_ID}/${studentname}`, {
        responseType: 'arraybuffer', // Ensure the response is in a binary format
      });
      console.log('File fetched:', response);
    
      // Extract the content type
      const contentType = response.headers['content-type'];
      let base64EncodedData = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );
      let fileUrl = `data:${contentType};base64,${base64EncodedData}`;
    
      // Based on the content type, decide what to render
      let mediaElement;
      if (contentType.startsWith('image/')) {
        mediaElement = <Image style={{"width" : 200 , "height" : 200 }} src={fileUrl} alt="Media content" />;
      } else if (contentType.startsWith('video/')) {
        mediaElement = <Video
        source={{ uri: fileUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: 300, height: 300 }}
      />
      } else if (contentType === 'application/pdf') {
        const pdfUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}`;
        mediaElement = (
          <WebView
            originWhitelist={['*']}
            source={{ uri: pdfUrl }}
            style={{ flex: 1, width: '100%', height: 600 }}
          />
        );
      }
    
      // Set the media element in the state
      setMediaElement(mediaElement);
    
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };



  const uploadFile = async () => {
    if (!documentname) { 
      setdocumentname("none"); 
    } 
    if (!subjectname) {
      setsubjectname("none"); 
    }
    if (!topic) {
      settopic("none"); 
    } 
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



      

      const response = await axios.post(`http://172.27.144.1:8000/uploadfile/${studentname} `, formData, {
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
    axios.delete(`http://172.27.144.1:8000/deletefile/${deletefile_ID}/${studentname}/${subjectname}`) 



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
    {mediaElement ? (
      <View>
        <Text style={styles.title}>Media Content</Text>
        {mediaElement}
      </View>
    ) : null
  }
        <Button title="Get File " onPress={getFile} />


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