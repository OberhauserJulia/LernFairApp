import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function Search() {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Suchen"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchbar}
                iconColor='#82B1B0'
                placeholderTextColor={'#2B4B5180'}
                inputStyle={styles.searchbar_input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    searchbar: {
        backgroundColor: '#EDF4F3',
        height: 38, 
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchbar_input: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'regular',
        color: '#2B4B51',
        paddingBottom: 15,
    },
});