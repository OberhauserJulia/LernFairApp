import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function Search() {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
    <View>
        <Searchbar
            placeholder="Suchen"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
            iconColor='#2B4B5180'
            placeholderTextColor={'#2B4B5180'}
            inputStyle={styles.searchbar_input}
        />
    </View>
    );
}

const styles = StyleSheet.create({

    searchbar: {
        backgroundColor: '#EDF4F3',
        height: 38,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },

    searchbar_input: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'regular',
        color: '#2B4B51',
    },
});