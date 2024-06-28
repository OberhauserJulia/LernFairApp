import React from 'react';
import { TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';

type ButtonTopBarProps = {
  icon: ImageSourcePropType;
  screen: keyof RootStackParamList;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Button_Top_Bar: React.FC<ButtonTopBarProps> = ({ icon, screen }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  icon: {
    height: 24,
    width: 24,
    color: '#ffffff',
  },
});

export default Button_Top_Bar;