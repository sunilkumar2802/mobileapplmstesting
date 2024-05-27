import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CourseCard from '../components/CourseCard'
import Header1 from '../components/Header1'
import { fetchLearnings } from '../services/service.api';

const Courselist = ({navigation}) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchLearnings();
                console.log('Fetched data:', data); // Log the fetched data
                setCourses(data.enrolments.map(enrolment => enrolment.course)); // Extracting courses from enrolments
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        loadCourses();
    }, []);
    

    if (loading) { 
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }
    return (
        <>
            {/* <Header title={'My Courses'} pageHeaderStyle={{marginBottom:16}} goBack={navigation.goBack} />  */}
            <Header1 title={'My Courses'} pageHeaderStyle={{marginBottom:16}} /> 
            
            {/* <ScrollView contentContainerStyle={styles.coursesCardsWrapper} showsVerticalScrollIndicator={false}>
                <CourseCard title={'Swift'} subTitle={'Advance 10 ios apps'} duration={'1 h 20 min'}    />
                <CourseCard title={'Swift'} subTitle={'Advance 10 ios apps'} duration={'1 h 20 min'}   />
                <CourseCard title={'Swift'} subTitle={'Advance 10 ios apps'} duration={'1 h 20 min'}  />
            </ScrollView>   */}
            <ScrollView contentContainerStyle={styles.coursesCardsWrapper} showsVerticalScrollIndicator={false}>
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        title={course.title}
                        subTitle={course.subTitle}
                        duration={course.duration}
                        image={course.image} // Adding course image
                    />
                ))}
            </ScrollView>
        </>
    );
};

export default Courselist;

const styles = StyleSheet.create({
    coursesCardsWrapper: {
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
});