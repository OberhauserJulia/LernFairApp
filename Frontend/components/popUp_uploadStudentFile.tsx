import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { PaperProvider, Portal, Modal, Text, TextInput } from "react-native-paper";
import DropdownComponent from "./DropdownComponent";
import ImagePickerComponent from "./ImagePickerComponent";
import ButtonComponent from "./ButtonComponent";
import SubButtonComponent from "./SubButtonComponent";
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import type { DocumentPickerResult } from 'expo-document-picker';
import { PopUpCompleteFileProps } from "../interfaces/PopUpCompleteFileProps";
import { Item } from "../interfaces/PopUpItem";
import { FileAsset } from "../interfaces/FileAssets";

interface UploadFileProp{
  visible : boolean , 
  hideModal: () => void
}

const Popup_completeStudentFile: React.FC<UploadFileProp> = ({ visible, hideModal }) => {
  const [documentname, setdocumentname] = useState<string>('');
  const [studentname, setstudentname] = useState<string>('Elias');
  const [file, setfile] = useState<DocumentPickerResult | null>(null);
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [open2, setOpen2] = useState<boolean>(false);
  const [subjectname, setsubjectname] = useState<string>('none');


  const [items2, setItems2] = useState<Item[]>([
    { label: 'Mathe', value: 'Mathe' },
    { label: 'Deutsch', value: 'Deutsch' },
    { label: 'Englisch', value: 'Englisch' },
    { label: 'Informatik', value: 'Informatik' },

  ]);
  const [open3, setOpen3] = useState<boolean>(false);
  const [topic, settopic] = useState<string>('none');
  const [items3, setItems3] = useState<Item[]>([
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]);

  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: 'white',
    padding: 20,
    height: '90%',
    width: '100%',
    borderRadius: 20,
    alignSelf: 'center',
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    setfile(result);
    setLocalImage(result.assets?.[0]?.uri || 'TEST');
    console.log(result || 'TEST');
  };

  useEffect(() => {
    console.log(localImage);
  }, [localImage]);

  const uploadFile = async () => {
    if (!file) {
      alert("Bitte wählen Sie eine Datei aus");
      return;
    }

    if (!subjectname) setsubjectname("none");
    if (!topic) settopic("none");

    try {
      
      const formData = new FormData();
      const fileAsset = file.assets ? file.assets[0] as FileAsset : null;
      if (fileAsset) {
        formData.append('file', {
          uri: fileAsset.uri,
          name: fileAsset.name,
          type: fileAsset.mimeType,
        } as any);
      }
      
      if (!documentname ) {
        alert('Es müssen mindestens eine File und ein Name ausgewählt werden!');
        return 
      }
      if (!file) {
        alert("Bitte eine File auswählen")
      }
      formData.append('documentname', documentname);
      formData.append('subjectname', subjectname);
      formData.append("topic", topic);


      const response = await axios.post(`http://192.168.119.190:8000/uploadfile/${studentname}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <View style={{ width: '100%', height: "100%" }}>
      <PaperProvider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.headline}>Datei teilen</Text>
              <Text style={styles.labeling}>Datei auswählen *</Text>
              <ImagePickerComponent image={localImage} pickImage={pickFile} />
              <Text style={styles.labeling}>Name *</Text>
              <TextInput
                placeholder="Dateiname"
                style={styles.input}
                underlineColor="transparent"
                onChangeText={text => setdocumentname(text)}
              />
              <Text style={styles.labeling}>Fach auswählen</Text>
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
              <Text style={styles.labeling}>Thema auswählen</Text>
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
              <ButtonComponent handleButtonClick={uploadFile} hideModal={hideModal} text="Datei speichern" />
              <SubButtonComponent hideModal={hideModal} />
            </ScrollView>
          </Modal>
        </Portal>
      </PaperProvider>
    </View>
  );
};

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

export default Popup_completeStudentFile;