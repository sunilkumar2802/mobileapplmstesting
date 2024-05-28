

import React from 'react';
import { StyleSheet, View, Button, Alert ,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Heading from './Typography/Heading';
import EvilIcon from '../components/Icons/EvilIcon';
import { SvgXml } from 'react-native-svg';
const Header1 = ({ title, pageHeaderStyle, goBack }) => {
    const navigation = useNavigation();
    const logoutIconSvg = `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg fill="#000000" height="24" width="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384.971 384.971" xml:space="preserve">
      <g>
        <g id="Sign_Out">
          <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
            C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
            C192.485,366.299,187.095,360.91,180.455,360.91z"/>
          <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
            c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
            c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
        </g>
      </g>
    </svg>`;
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('elarnivUsersToken');
            console.log('Token removed from local storage');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error removing token from storage:', error);
        }
    };

    const confirmLogout = () => {
        Alert.alert(
            "",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Logout cancelled"),
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: handleLogout,
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={[styles.pageHeader, pageHeaderStyle]}>
            <View style={styles.pageTitleWrapper}>
                <Heading title={title} />
            </View>
            <View style={styles.logoutButtonWrapper}>
                {/* <Button title="Logout" color="#E3562A" onPress={confirmLogout} /> */}

                <TouchableOpacity onPress={confirmLogout}>
                    <SvgXml xml={logoutIconSvg} width="24" height="24" />
                </TouchableOpacity>
                
            </View>
        </View>
    );
};

Header1.defaultProps = {
    goBack: () => {},
};

export default Header1;

const styles = StyleSheet.create({
    pageHeader: {
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    pageTitleWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 203
    },
    logoutButtonWrapper: {
        justifyContent: 'flex-end',
    },
});
