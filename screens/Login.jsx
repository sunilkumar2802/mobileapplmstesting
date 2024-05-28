

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { LoginBanner } from '../svgs';
import Button from '../components/Button';
import TouchableLink from '../components/TouchableLink';
import CustomTextInput from '../components/CustomTextInput';
import EvilIcon from '../components/Icons/EvilIcon';
import { fetchData } from '../services/service.api';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = validateEmail(email) && validatePassword(password);
        setIsFormValid(isValid);
        console.log('Form valid:', isValid); // Debug log
    }, [email, password]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            if (!validateEmail(email)) {
                throw new Error('Invalid email format');
            }

            if (!validatePassword(password)) {
                throw new Error('Invalid password format');
            }

            const response = await fetchData(email, password);
            console.log('Login successful:', response);
            navigation.navigate('MainScreen');
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }


    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 4;
    };

    return (
        <View style={styles.container}>
            <LoginBanner style={styles.logo} />
            <View style={styles.publicTextWrapper}>
                <View style={styles.textWrapper}>
                    <Text style={styles.pageTitle}>Log in</Text>
                    {/* <Text style={styles.pageDescription}>Login with social networks</Text> */}
                </View>
                {/* <View style={styles.socialMediaWrapper}>
                    <EvilIcon size={22} name="sc-facebook" color="white" wrapperStyle={styles.socialMediaItem} isClickable={true} />
                    <EvilIcon size={22} name="sc-instagram" color="white" wrapperStyle={styles.socialMediaItem} isClickable={true} />
                    <EvilIcon size={22} name="sc-google-plus" color="white" wrapperStyle={styles.socialMediaItem} isClickable={true} />
                </View> */}
            </View>
            <View style={styles.loginFormWrapper}>
                <CustomTextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <CustomTextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {/* have to add "Forgot Password?" in below "title" */}
                <TouchableLink title="" /> 
                <Button title="Log in" onClick={handleLogin} disabled={!isFormValid || loading} />
                {/* <Button title={'Log in'} onClick={()=>{
                        console.log('here we are1 ')
                        navigation.navigate('MainScreen')
                    }} /> */}
                <TouchableLink  title="Sign up" onClick={() => navigation.navigate('SignUp')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    logo:{
marginTop:90,
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    
    },
    publicTextWrapper: {
        marginBottom: 20,
    },
    textWrapper: {
        alignItems: 'center',
        marginBottom: 2,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    pageDescription: {
        fontSize: 16,
        color: 'gray',
    },
    socialMediaWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    socialMediaItem: {
        marginHorizontal: 10,
    },
    // loginFormWrapper: {
    //     marginBottom: 20,
    // },
    loginFormWrapper: {
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 1,  
        width: '100%',  
        marginBottom: 30,
    },
});

export default Login;
