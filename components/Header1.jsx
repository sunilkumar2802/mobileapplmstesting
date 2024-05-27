

import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Heading from './Typography/Heading';
import EvilIcon from '../components/Icons/EvilIcon';
const Header1 = ({ title, pageHeaderStyle, goBack }) => {
    const navigation = useNavigation();

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
                <Button title="Logout" color="#E3562A" onPress={confirmLogout} />
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
