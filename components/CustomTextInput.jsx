
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CustomTextInput = ({ placeholder, onChangeText, style, keyboardType = 'default', autoCapitalize = 'none', secureTextEntry = false, validate = () => true }) => {
    const handleChangeText = (text) => {
        if (validate(text) || text === '') {
            onChangeText(text);
        }
    };

    return (
        <TextInput
            style={[styles.formInput, style]}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
        />
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    formInput: {
        backgroundColor: "#FFFFFF",
        width: 343,
        height: 53,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#BEBAB3',
        marginTop: 16,
    },
});

