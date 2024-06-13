import React from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from "react-native";

export default function DropdownComponent({ open, value, items, setOpen, setValue, setItems, placeholder, zIndex, zIndexInverse }) {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={styles.dropdown}
      placeholder={placeholder}
      placeholderStyle={{
        color: '#121212',
        fontSize: 12,
        fontFamily: 'Montserrat',
        fontWeight: 'regular',
      }}
      zIndex={zIndex}
      zIndexInverse={zIndexInverse}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#EDF4F3',
    borderRadius: 12,
    justifyContent: 'center',
    borderColor: 'transparent',
    marginBottom: 8,
    marginTop: 8,
  },
});
