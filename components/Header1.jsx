import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RingIcon from './Icons/RingIcon'
import Heading from './Typography/Heading'

const Header1 = ({ title, pageHeaderStyle, goBack}) => {
    return (
    <View style={[styles.pageHeader, pageHeaderStyle]}> 
        <View style={styles.pageTitleWrapper}>
           <Heading title={title} />
        </View>
    </View>
    )
}

Header1.defaultProps = {
    goBack:()=>{}
}

export default Header1

const styles = StyleSheet.create({
    pageHeader: {
        marginTop:60,
        flexDirection:'row',
        alignItems:'center',
        //  marginLeft:16
    },

    pageHeaderLeft: {
        justifyContent:'flex-end',
        marginLeft:16
    },

    pageTitleWrapper: {
        alignItems:'center', 
        justifyContent:'center', 
        textAlign:'center', 
        width: 203 
    },
})
