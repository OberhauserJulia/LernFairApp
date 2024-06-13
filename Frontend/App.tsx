import { StyleSheet, Text } from 'react-native';

// import Screens
import Archiv_Caregory from './screens/archiv_category';
import Archiv_Student from './screens/archiv_student';
import Archiv_Teacher from './screens/archiv_teacher';
import Backlog from './screens/backlog';
import File_Overview_Category from './screens/file_overview_category';  
import File_Overview_Chat from './screens/file_overview_chat';
import File_Overview_Student from './screens/file_overview_student';
import File_Overview_Teacher from './screens/file_overview_teacher';
import OpenModalComponent from './components/openModalComponent'; // Corrected import

export default function App() {
  return (
   <OpenModalComponent />  // Corrected component name
  );
}

const styles = StyleSheet.create({
});
