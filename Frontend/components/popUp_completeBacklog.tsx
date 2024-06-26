import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import { PaperProvider, Portal, Modal, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import DropdownComponent from "./DropdownComponent";
import ImagePickerComponent from "./ImagePickerComponent";
import ButtonComponent from "./ButtonComponent";
import axios from "axios";
import { PopUpCompleteFileProps } from "../interfaces/PopUpCompleteFileProps";
import { Item } from "../interfaces/PopUpItem";
import UploadButtonComponent from "./UploadButtonComponent";





const PopUpCompleteFile: React.FC<PopUpCompleteFileProps> = ({ visible, hideModal, file_id , filename}) => {
  
  const studentname = 'Elias';
  const [fileID , setFileID ] = useState<string>(file_id);
  const [documentname, setDocumentname] = useState<string>('');
  const [topic, settopic] = useState<string>('');
  const [subjectname, setsubjectname] = useState<string>('');
  
  
  
  const completeBacklog = async () => {
    if (!documentname && !subjectname && !topic) {
      return alert('Bitte füllen Sie alle Felder aus!');
    }
  
    let formData = new FormData();
    formData.append('file_id', fileID);
    formData.append('filename', filename);
    formData.append('documentname', documentname);
    formData.append('subjectname', subjectname || '');
    formData.append('topic', topic || '');
  
    try {
      const response = await axios.put(
        `http://192.168.119.190:8000/updatefile/${studentname}/${fileID}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };
  
  
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: 'white',
    padding: 20,
    height: '70%',
    width: '100%',
    borderRadius: 20,
    alignSelf: 'center',
  };

 

  const [open2, setOpen2] = useState<boolean>(false);
  const [value2, setValue2] = useState<string | null>(null);
  const [items2, setItems2] = useState<Item[]>([
    { label: 'Mathe', value: 'Mathe' },
    { label: 'Deutsch', value: 'Deutsch' },
    { label: 'Englisch', value: 'Englisch' },
    { label: 'Informatik', value: 'Informatik' }
  ]);


  const [open3, setOpen3] = useState<boolean>(false);
  const [value3, setValue3] = useState<string | null>(null);
  const [items3, setItems3] = useState<Item[]>([
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]);

  return (
    <View style={{ width: '100%', height: "100%" }}>
      <PaperProvider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.headline}>Datei vervollständigen</Text>
              <Text style={styles.labeling}>Name </Text>
              <TextInput
                placeholder="Dateiname"
                style={styles.input}
                underlineColor="transparent"
                onChangeText={text => setDocumentname(text) }
              />
        
              <Text style={styles.labeling}>Klasse auswählen *</Text>
              
              <Text style={styles.labeling}>Fach auswählen *</Text>
              <DropdownComponent
                open={open2}
                value={subjectname}
                items={items2}
                setOpen={setOpen2}
                setValue={setsubjectname}
                setItems={setItems2}
                placeholder="Fach wählen"
                zIndex={2000}
                zIndexInverse={2000}
              />
              <Text style={styles.labeling}>Thema auswählen *</Text>
              <DropdownComponent
                open={open3}
                value={topic}
                items={items3}
                setOpen={setOpen3}
                setValue={settopic}
                setItems={setItems3}
                placeholder="Thema wählen"
                zIndex={1000}
                zIndexInverse={3000}
              />
              <UploadButtonComponent handleButtonClick={completeBacklog} text="Datei speichern" />
            </ScrollView>
          </Modal>
        </Portal>
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#121212',
    marginBottom: 16,
  },
  labeling: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'regular',
    fontSize: 16,
    color: '#2B4B51',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#EDF4F3',
    height: 38,
    borderRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});

export default PopUpCompleteFile;
