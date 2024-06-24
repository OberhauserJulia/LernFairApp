import * as React from 'react';
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import { Chip, Button } from 'react-native-paper';

export default function Filter() {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View>
      <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.openButton}>
        <Image style={styles.icon_open} source={require('../assets/icons/filter.svg')} resizeMode="contain" />
      </Button>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <View style={styles.bar}>
              <Text style={styles.headline}> Dateien filtern </Text>
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
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 1 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 2 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 3 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 4 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 5 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 6 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 7 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 8 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 9 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 10 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 11 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 12 </Chip>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> 13 </Chip>
              </View>
            </View>

            {/* Fach */}
            <View style={styles.category}>
              <View style={styles.text_container}>
                <Text style={styles.category_name}>Fach</Text>
              </View>
              <View style={styles.chip_container}>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> Mathematik </Chip>
              </View>
            </View>

            {/* Thema */}
            <View style={styles.category}>
              <View style={styles.text_container}>
                <Text style={styles.category_name}>Thema</Text>
              </View>
              <View style={styles.chip_container}>
                <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText} onPress={() => console.log('Pressed')}> Stochastik </Chip>
              </View>
            </View>

            <View style={styles.buttons}>
              <Button mode="outlined" onPress={() => console.log('Pressed')} style={styles.button_reset}> Filter zurücksetzen </Button>
              <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.button_apply}> Filter anwenden </Button>
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
    fontFamily: 'Monsterrat-Bold',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#2B4B51',
  },
  icon_close: {
    width: 24,
    height: 24,
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
    fontFamily: 'Monsterrat-Bold',
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
  },

  chipText: {
    textAlign: 'center',
    fontSize: 12,
    borderColor: '#2B4B51',
    fontFamily: 'Monsterrat-Regular',
    fontWeight: 'regular',
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

  button_apply: {
    width: '48%',
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FEDA50',
    backgroundColor: '#FEDA50',
  },
});