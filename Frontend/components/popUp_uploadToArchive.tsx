import React, { useState } from "react";
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { PaperProvider, Portal, Modal, Text, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import DropdownComponent from "./DropdownComponent";
import ImagePickerComponent from "./ImagePickerComponent";
import ButtonComponent from "./ButtonComponent";
import SubButtonComponent from "./SubButtonComponent";
import axios from "axios";
import type { DocumentPickerResult } from 'expo-document-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useEffect  } from "react";
import { PopUpCompleteFilePropsArchive } from "../interfaces/PopUpCompleteFileProps";
import { FileAsset } from "../interfaces/FileAssets";
import { Item } from "../interfaces/PopUpItem";


const PopUpCompleteFileArchive: React.FC<PopUpCompleteFilePropsArchive> = ({ visible, hideModal }) => {
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: 'white',
    padding: 20,
    height: '90%',
    width: '100%',
    borderRadius: 20,
    alignSelf: 'center',
  };
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [documentname , setDocumentname] = useState<string>('');
  const [file, setfile] = useState<DocumentPickerResult | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [classNumber, setClassNumber] = useState<string | null>(null);


  
  useEffect(() => {
    console.log(localImage);
  }, [localImage]);

  const [items, setItems] = useState<Item[]>([
    { label: '4. Klasse', value: '4' },
    { label: '5. Klasse', value: '5' },
    { label: '6. Klasse', value: '6' },
    { label: '7. Klasse', value: '7' },
    { label: '8. Klasse', value: '8' },
    { label: '9. Klasse', value: '9' },
  ]);

  const [open2, setOpen2] = useState<boolean>(false);
  const [subject, setSubject] = useState<string | null>(null);
  const [items2, setItems2] = useState<Item[]>([
    { label: 'Mathe', value: 'Mathe' },
    { label: 'Deutsch', value: 'Deutsch' },
    { label: 'Englisch', value: 'Englisch' },
    { label: 'Informatik', value: 'Informatik' },
  ]);

  const [open3, setOpen3] = useState<boolean>(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [items3, setItems3] = useState<Item[]>([
    { label: 'Thema 1', value: '1' },
    { label: 'Thema 2', value: '2' },
    { label: 'Thema 3', value: '3' },
  ]);

  const [open4, setOpen4] = useState<boolean>(false);
  const [formularType, setFormularType] = useState<string | null>(null);
  const [items4, setItems4] = useState<Item[]>([
    { label: 'Übung', value: 'Uebung' },
    { label: 'Prüfungen', value: 'Pruefungen' },
    { label: 'Workshop', value: 'Workshop' },
  ]);


  const uploadArchive = () => {
    uploadFile(); 
    console.log('upload archive');
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    setfile(result);
    setLocalImage(result.assets?.[0]?.uri || 'TEST');
    console.log(result || 'TEST');
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Bitte wählen Sie eine Datei aus");
      return;
    }

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
      
      const response = await axios.post(`http://192.168.119.191:8000/archivefile/${formularType}/${documentname}/${subject}/${classNumber}/${topic}`, formData, {
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
              <Text style={styles.headline}>Datei im Archiv hochladen</Text>
              <Text style={styles.labeling}>Datei auswählen *</Text>
              <ImagePickerComponent image={localImage} pickImage={pickFile} />
              <Text style={styles.labeling}>Name *</Text>
              <TextInput 
                placeholder="Dateiname"
                style={styles.input}
                underlineColor="transparent"
                onChangeText={setDocumentname}
              />
              <Text style={styles.labeling}>Klasse auswählen *</Text>
              <DropdownComponent
                open={open}
                value={classNumber}
                items={items}
                setOpen={setOpen}
                setValue={setClassNumber}
                setItems={setItems}
                placeholder="Klasse wählen"
                zIndex={4000}
                zIndexInverse={1000}
              />
              <Text style={styles.labeling}>Fach auswählen *</Text>
              <DropdownComponent
                open={open2}
                value={subject}
                items={items2}
                setOpen={setOpen2}
                setValue={setSubject}
                setItems={setItems2}
                placeholder="Fach wählen"
                zIndex={3000}
                zIndexInverse={2000}
              />
              <Text style={styles.labeling}>Thema auswählen *</Text>
              <DropdownComponent
                open={open3}
                value={topic}
                items={items3}
                setOpen={setOpen3}
                setValue={setTopic}
                setItems={setItems3}
                placeholder="Thema wählen"
                zIndex={2000}
                zIndexInverse={3000}
              />
              <Text style={styles.labeling}>Dateiart auswählen *</Text>
              <DropdownComponent
                open={open4}
                value={formularType}
                items={items4}
                setOpen={setOpen4}
                setValue={setFormularType}
                setItems={setItems4}
                placeholder="Dateiart wählen"
                zIndex={1000}
                zIndexInverse={4000}
              />

              <ButtonComponent handleButtonClick={uploadArchive} hideModal={hideModal} text="Datei speichern" />
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

export default PopUpCompleteFileArchive;
