

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { SignUpBanner } from '../svgs';
import Button from '../components/Button';
import TouchableLink from '../components/TouchableLink';
import CustomTextInput from '../components/CustomTextInput';

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = validateName(name) && validateEmail(email) && validatePassword(password) && validatePhoneNumber(phoneNumber);
        setIsFormValid(isValid);
    }, [name, email, password, phoneNumber]);

    const handleSignUp = async () => {
        setLoading(true);
        try {
            if (!validateName(name)) {
                throw new Error('Invalid name format');
            }

            if (!validateEmail(email)) {
                throw new Error('Invalid email format');
            }

            if (!validatePassword(password)) {
                throw new Error('Invalid password format');
            }

            if (!validatePhoneNumber(phoneNumber)) {
                throw new Error('Invalid phone number format');
            }

            const data = { name, email, password, phoneNumber };
            console.log('Sign up data', data);
            // Call your signup API here

            navigation.navigate('MainScreen');
        } catch (error) {
            console.error('Sign up error:', error);
            Alert.alert('Sign Up Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    const validateName = (name) => {
        return name.length > 0;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 4;
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    return (
        <View style={styles.container}>
            <SignUpBanner />
            <View style={styles.publicTextWrapper}>
                <View style={styles.textWrapper}>
                    <Text style={styles.pageTitle}>Sign up</Text>
                    <Text style={styles.pageDescription}>Create your account</Text>
                </View>
            </View>
            <View style={styles.loginFormWrapper}>
                <CustomTextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <CustomTextInput
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <CustomTextInput
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                <CustomTextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button
                    title="Sign up"
                    onClick={handleSignUp}
                    disabled={!isFormValid || loading}
                    btnWrapperStyle={styles.submitButton}
                />
                <TouchableLink
                    title="Log in"
                    onClick={() => navigation.navigate('Login')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 96,
    },
    publicTextWrapper: {
        marginTop: 16,
    },
    pageTitle: {
        color: "#3C3A36",
        marginBottom: 8,
        fontFamily: "Rubik_500Medium",
        fontSize: 24,
        textAlign: 'center',
    },
    pageDescription: {
        fontSize: 14,
        color: "#78746D",
        marginBottom: 8,
    },
    loginFormWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        marginTop: 16,
    },
});

export default SignUp;

