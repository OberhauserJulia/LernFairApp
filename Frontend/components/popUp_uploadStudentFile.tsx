import React, { useState , useEffect} from "react";
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle , Button} from "react-native";
import { PaperProvider, Portal, Modal, Text, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import DropdownComponent from "./DropdownComponent";
import ImagePickerComponent from "./ImagePickerComponent";
import ButtonComponent from "./ButtonComponent";
import SubButtonComponent from "./SubButtonComponent";
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';

interface PopUpCompleteFileProps {
  visible: boolean;
  hideModal: () => void;
}

interface Item {
  label: string;
  value: string;
}

const PopUpCompleteFile: React.FC<PopUpCompleteFileProps> = ({ visible, hideModal }) => {
  const [fileId, setFileId] = useState('');
  const [documentname, setdocumentname] = useState('');
  const [studentname , setstudentname] = useState('Elias'); 









  
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: 'white',
    padding: 20,
    height: '90%',
    width: '100%',
    borderRadius: 20,
    alignSelf: 'center',
  };

  

  const [open2, setOpen2] = useState<boolean>(false);
  const [subjectname, setsubjectname] = useState<string >("none");
  const [items2, setItems2] = useState<Item[]>([
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]);

  const [open3, setOpen3] = useState<boolean>(false);
  const [topic, settopic] = useState<string >("none");
  const [items3, setItems3] = useState<Item[]>([
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]);



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
  const [localImage, setLocalImage] = useState("");



  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
   
    setLocalImage(result.assets[0].uri || "TEST");
    console.log(result || "TEST"); // Hier wird der korrekte Wert von result.assets[0].name oder "TEST" geloggt
  };
  
  useEffect(() => {
    console.log(localImage); // Loggt den aktuellen Wert von localImage bei jeder Änderung
  }, [localImage]);
  



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
                onChangeText={text => setdocumentname(text)}              />
           
              
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
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#121212',
    marginBottom: 16,
  },
  labeling: {
    fontFamily: 'Montserrat',
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
