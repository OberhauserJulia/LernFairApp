import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import { Chip, Button } from 'react-native-paper';

type ChipKey = number | string;

type ChipsEnabledState = {
  [key: ChipKey]: boolean;
};

interface FilterProps { 
  filterFunction: (searchQuery: string) => void;
}

const initialChipsState: ChipsEnabledState = {
  1: false, 2: false, 3: false, 4: false, 5: false, 6: false,
  7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false,
  Mathematik: false, Stochastik: false,
};

export default function Filter({ filterFunction }: FilterProps) {
  const [chipsEnabled, setChipsEnabled] = useState<ChipsEnabledState>(initialChipsState);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChipPress = (key: ChipKey) => {
    setChipsEnabled(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const applyFilter = () => {
    const enabledChips = Object.keys(chipsEnabled).filter(key => chipsEnabled[key as ChipKey]);
    filterFunction(enabledChips.join(', '));
    setModalVisible(false);
  };

  const resetFilter = () => {
    setChipsEnabled(initialChipsState);
    filterFunction('');
  };

  return (
    <View>
      <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.openButton}>
        <Image style={styles.icon_open} source={require('../assets/icons/filter.svg')} resizeMode="contain" />
      </Button>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <View style={styles.bar}>
              <Text style={styles.headline}>Dateien filtern</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image style={styles.icon_close} source={require('../assets/icons/close_icon.svg')} />
              </TouchableOpacity>
            </View>

            {/* Klasse */}
            <View style={styles.category}>
              <View style={styles.text_container}>
                <Text style={styles.category_name}>Klasse</Text>
              </View>
              <View style={styles.chip_container}>
                {[...Array(13).keys()].map(number => (
                  <Chip
                    key={number + 1}
                    mode="outlined"
                    style={[styles.chip, !chipsEnabled[number + 1] && styles.chipDisabled]}
                    textStyle={[styles.chipText, !chipsEnabled[number + 1] && styles.chipTextDisabled]}
                    onPress={() => handleChipPress(number + 1)}
                    disabled={false}
                  >
                    {number + 1}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Fach */}
            <View style={styles.category}>
              <View style={styles.text_container}>
                <Text style={styles.category_name}>Fach</Text>
              </View>
              <View style={styles.chip_container}>
                <Chip
                  mode="outlined"
                  style={[styles.chip, !chipsEnabled['Mathematik'] && styles.chipDisabled]}
                  textStyle={[styles.chipText, !chipsEnabled['Mathematik'] && styles.chipTextDisabled]}
                  onPress={() => handleChipPress('Mathematik')}
                  disabled={false}
                >
                  Mathematik
                </Chip>
                <Chip
                  mode="outlined"
                  style={[styles.chip, !chipsEnabled['Stochastik'] && styles.chipDisabled]}
                  textStyle={[styles.chipText, !chipsEnabled['Stochastik'] && styles.chipTextDisabled]}
                  onPress={() => handleChipPress('Stochastik')}
                  disabled={false}
                >
                  Stochastik
                </Chip>
              </View>
            </View>

            <View style={styles.buttons}>
              <Button mode="outlined" onPress={resetFilter} style={styles.button_reset} labelStyle={styles.button_reset_text}>Filter zurücksetzen</Button>
              <Button mode="contained" onPress={applyFilter} style={styles.button_apply} labelStyle={styles.button_apply_text}>Filter anwenden</Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  openButton: {
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#2B4B51',
  },
  icon_open: {
    height: 13,
    width: 13,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
    paddingBottom: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2B4B51',
  },
  headline: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#2B4B51',
  },
  icon_close: {
    width: 10,
    height: 10,
  },
  category: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomColor: '#2B4B51',
    borderBottomWidth: 1,
  },
  text_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category_name: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#2B4B51',
  },
  chip_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    backgroundColor: '#2B4B51',
    borderColor: '#2B4B51',
  },
  chipText: {
    textAlign: 'center',
    fontSize: 12,
    borderColor: '#2B4B51',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'regular',
    color: 'white',
  },
  chipTextDisabled: {
    color: '#2B4B51',
  },
  chipDisabled: {
    backgroundColor: 'white',
    borderColor: '#2B4B51',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  button_reset: {
    width: '48%',
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FEDA50',
  },
  button_reset_text: {
    color: '#2B4B51',
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
  },
  button_apply: {
    width: '48%',
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FEDA50',
    backgroundColor: '#FEDA50',
  },
  button_apply_text: {
    color: '#2B4B51',
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
  },
});
