import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { PaperProvider, Portal, Modal, Text, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import DropdownComponent from "./DropdownComponent";
import ImagePickerComponent from "./ImagePickerComponent";
import ButtonComponent from "./ButtonComponent";
import SubButtonComponent from "./SubButtonComponent";

export default function PopUp_completeFile({ visible, hideModal }) {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: '90%',
    width: '100%',
    borderRadius: 20,
    alignSelf: 'center',
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '5. Klasse', value: '5' },
    { label: '6. Klasse', value: '6' },
    { label: '7. Klasse', value: '7' },
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets?.[0]?.uri || null);
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
              <ImagePickerComponent image={image} pickImage={pickImage} />
              <Text style={styles.labeling}>Name *</Text>
              <TextInput placeholder="Dateiname"
                style={styles.input}
                underlineColor="transparent"
              />
              <Text style={styles.labeling}>Klasse auswählen</Text>
              <DropdownComponent
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Klasse wählen"
                zIndex={3000}
                zIndexInverse={1000}
              />
              <Text style={styles.labeling}>Fach auswählen</Text>
              <DropdownComponent
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
                placeholder="Fach wählen"
                zIndex={2000}
                zIndexInverse={2000}
              />
              <Text style={styles.labeling}>Thema auswählen</Text>
              <DropdownComponent
                open={open3}
                value={value3}
                items={items3}
                setOpen={setOpen3}
                setValue={setValue3}
                setItems={setItems3}
                placeholder="Thema wählen"
                zIndex={1000}
                zIndexInverse={3000}
              />
              <ButtonComponent hideModal={hideModal} text="Datei speichern" />
              <SubButtonComponent hideModal={hideModal} />
            </ScrollView>
          </Modal>
        </Portal>
      </PaperProvider>
    </View>
  );
}

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
