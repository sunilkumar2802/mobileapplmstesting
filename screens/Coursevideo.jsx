import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ScrollView, ActivityIndicator } from 'react-native';
import { fetchCoursevideo ,fetchCourseDetails } from '../services/service.api';
import Header1 from '../components/Header1';

const Coursevideo = ({ route }) => {
    const { slug } = route.params;
    const [courseDetails, setCourseDetails] = useState({}); // Initialize courseDetails state
    const [videos, setVideos] = useState([]); // Initialize videos state as an empty array 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                // Fetch course details and videos
                const [course, videoData] = await Promise.all([
                    fetchCourseDetails(slug),
                    fetchCoursevideo(slug)
                ]);
                setCourseDetails(course);
                setVideos(videoData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [slug]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
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
        <Header1 title={courseDetails ? courseDetails.title : 'Loading...'} pageHeaderStyle={{marginBottom:16}} />
        <View style={styles.container}>
            {/* <Text style={styles.title}>{courseDetails.title}</Text> */}
            <Text style={styles.shortDesc}>{courseDetails.short_desc}</Text>
            <ScrollView contentContainerStyle={styles.coursesCardsWrapper} showsVerticalScrollIndicator={false}>
            {videos.map(video => (
                <View key={video.id}>
                    <Text style={styles.videoTitle}>{video.title}</Text>
                    {/* Add your video player component here */}
                </View>
            ))}
            </ScrollView>
        </View>
        </>
    );
};

export default Coursevideo;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
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
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    shortDesc: {
        fontSize: 16,
        marginBottom: 16,
    },
    videoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
