import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from "../../../assets/images/logo.png";
import BackArrow from "../../../assets/images/back-arrow.png";
import { useNavigation } from '@react-navigation/native';
import { FormStyles } from '../../styles/FormStyles';

const AuthHeader = () => {
    const navigation = useNavigation();
    const styles = FormStyles;
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
        <Image source={BackArrow} style={styles.backArrow}/>
      </TouchableOpacity>
    </View>
  );
};

export default AuthHeader;
