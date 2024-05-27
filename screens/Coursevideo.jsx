import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native';
import { fetchCoursevideo ,fetchCourseDetails } from '../services/service.api';
import Header from '../components/Header';
import { WebView } from 'react-native-webview';

const Coursevideo = ({ route }) => {
    const { slug } = route.params;
    const [courseDetails, setCourseDetails] = useState({}); // Initialize courseDetails state
    const [videos, setVideos] = useState([]); // Initialize videos state as an empty array 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
    console.log()

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
                if (videoData.length > 0) {
                    setSelectedVideoUrl(videoData[0].video); // Set the first video URL as default
                }
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
        <Header title={courseDetails ? courseDetails.title : 'Loading...'} pageHeaderStyle={{marginBottom:16}} />
        <View style={styles.container}>
            {/* <Text style={styles.title}>{courseDetails.title}</Text> */}
             {/* Add your video player component here */}  
             {selectedVideoUrl && (
                    <WebView
                        style={styles.webView}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{ uri: selectedVideoUrl }}
                    />
                )}
            <Text style={styles.title}>Description</Text>
            <Text style={styles.shortDesc}>{courseDetails.short_desc}</Text>
            <ScrollView contentContainerStyle={styles.coursesCardsWrapper} showsVerticalScrollIndicator={false}>
            {/* {videos.map(video => (
                <View key={video.id}>
                    <Text style={styles.videoTitle}>{video.title}</Text>
                    <WebView
                                style={styles.webView}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: video.video }}
                            />
                </View>
            ))} */}
            {videos.map(video => (
                        <TouchableOpacity key={video.id} onPress={() => setSelectedVideoUrl(video.video)}>
                            <View style={styles.videoContainer}>
                                <Text style={styles.videoTitle}>{video.title}</Text>
                            </View>
                        </TouchableOpacity>
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
    videoContainer: {
        marginBottom: 16,
    },
    coursesCardsWrapper: {
        flexGrow: 1,
    },
    webView: {
        height: 200,
        marginBottom: 16,
    },
});
