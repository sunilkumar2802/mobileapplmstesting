import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity ,Image } from 'react-native' 

const CourseCard = ({ duration, title, subTitle,image ,slug, onClick }) => {
    console.log(image )
    console.log(slug)
    return (
    <TouchableOpacity style={styles.coursesCardsItem} onPress={onClick}> 
        <Image source={{ uri: image }} style={styles.courseImage} /> 
        <View>
            <Text style={styles.courseDuration}>{ duration }</Text>
            <Text style={styles.courseTitle}>{ title }</Text>
            <Text style={styles.courseSubTitle}>{ subTitle }</Text>
        </View>
     </TouchableOpacity>
    )
}

export default CourseCard

const styles = StyleSheet.create({

    courseTextWrapper:{
        margin:16
    },

    coursesCardsItem: {
        marginBottom:16,
        width:343,
        height:297,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#BEBAB3',
        flexDirection: "column",
        alignItems: "center",

    },

    courseDuration: {
        width:311,
        height:18,
        fontFamily: "Rubik_500Medium",
        fontSize:12,
        lineHeight:18,
        color:"#5BA092",
    },

    courseTitle: {
        width:311,
        height:32,
        fontFamily: "Rubik_500Medium",
        fontSize:24,
        lineHeight:32,
        color:"#3C3A36",
    },

    courseSubTitle: {
        width:311,
        height:21,
        fontFamily: "Rubik_400Regular",
        fontSize:14,
        lineHeight:21,
        color:"#3C3A36",
    },

    coursePriceWrapper: {
        marginLeft:16,
        backgroundColor:'#65AAEA',
        // width:54,
        height:24,
        borderRadius:12,
        paddingHorizontal:7,
        paddingVertical:11,
        justifyContent:'center',
        alignItems:'center',
    },
    courseImage: {
        width: '100%', 
        height: 200, 
        resizeMode: 'cover',
    },
    coursePrice: {
        fontFamily: 'Rubik_500Medium',
        fontSize:12,
        lineHeight:18,
        color:'#F2F2F2'
    }
})
