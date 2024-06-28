import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

// import components
import Search from '../components/searchbar';
import Filter from '../components/filter';
import FileOverViewTeacherCart from '../components/FileOverViewTeacherCard';
import { useState } from 'react';
import NotificationModal from '../components/popUp_notification';

const initialAttributes = {
  Klassen: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  Bundesländer: ['Bayern', 'Berlin', 'Hamburg', 'Hessen', 'Nordrhein-Westfalen', 'Sachsen']
};

const initialChipsState = {
  1: false, 2: false, 3: false, 4: false, 5: false, 6: false,
  7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false,
  Bayern: false, Berlin: false, Hamburg: false, Hessen: false, 'Nordrhein-Westfalen': false, Sachsen: false,
};

export default function FileOverviewTeacher() {
  const [studentArray, setStudentArray] = useState([
    { name: "Elias", country: "Bayern", classNumber: 4 },
    { name: "Julia", country: "Berlin", classNumber: 4 },
    { name: "Tatjana", country: "Hamburg", classNumber: 10 },
    { name: "Hannah", country: "Hessen", classNumber: 2 },
    { name: "Schiffner", country: "Sachsen", classNumber: 13 }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState<string[]>([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const searchbarfunction = (query: string) => {
    setSearchQuery(query);
    console.log(query);
  };

  const filterfunction = (query: string) => {
    console.log("Filtered for", query);
    setFilterQuery(query ? query.split(',').map(item => item.trim()) : []);
  };

  const filteredStudents = studentArray.filter(student => {
    const matchesSearchQuery = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilterQuery = filterQuery.length === 0 || filterQuery.some(filter => 
      student.classNumber.toString() === filter || student.country.toLowerCase() === filter.toLowerCase()
    );
    return matchesSearchQuery && matchesFilterQuery;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.top_bar}>
        <Image style={styles.icon_top_bar} source={require('../assets/icons/menu.svg')} resizeMode="contain" />
        <Text style={styles.headline}> Dateiübersicht </Text>
        <View style={styles.top_bar_groupe}>
          <TouchableOpacity  onPress={() => navigation.navigate('BacklogScreen')}>
            <Image style={styles.icon_top_bar} source={require('../assets/icons/menu_2.svg')} resizeMode="contain"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.icon_top_bar} source={require('../assets/icons/notifications.svg')} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>	

      <NotificationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.content}>
      <View style={styles.bar}>
          <Search searchbarfunction={searchbarfunction}/>
          <Filter filterFunction={filterfunction}
            initialAttributes={initialAttributes} 
            initialChipsState={initialChipsState}/>
        </View>
        

        {filteredStudents.map((student, index) => (
          <FileOverViewTeacherCart
            key={index}
            studentname={student.name}
            countryname={student.country}
            classNumber={student.classNumber.toString()}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },

  top_bar: {
    height: 48,
    backgroundColor: '#2B4B51',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  icon_top_bar: {
    height: 24,
    width: 24,
    color: '#ffffff',
  },

  headline: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },

  top_bar_groupe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  content: {
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
  },
  bar: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
});
