import React from 'react';
import { StyleSheet, View } from 'react-native';
import Heading from './Typography/Heading';

const Header1 = ({ title, pageHeaderStyle }) => {
    return (
        <View style={[styles.pageHeader, pageHeaderStyle]}>
            <View style={styles.pageTitleWrapper}>
                <Heading title={title} />
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
    }
});
