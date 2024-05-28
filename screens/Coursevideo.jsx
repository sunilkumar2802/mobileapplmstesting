


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { fetchCoursevideo, fetchCourseDetails, fetchCourseassets } from '../services/service.api';
import Header from '../components/Header';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const Coursevideo = ({ route }) => {
    const { slug, id } = route.params;
    const { width } = useWindowDimensions();
    const [courseDetails, setCourseDetails] = useState({});
    const [videos, setVideos] = useState([]);
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedGroup, setExpandedGroup] = useState(null);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const [course, videoData, assetData] = await Promise.all([
                    fetchCourseDetails(slug),
                    fetchCoursevideo(slug),
                    fetchCourseassets(id),
                ]);
                setCourseDetails(course);
                setVideos(videoData);
                setAssets((assetData.assets || []).sort((a, b) => a.assetorder - b.assetorder));
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
    }, [slug, id]);

    const handleDownload = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    const toggleAccordion = (group_name) => {
        setExpandedGroup(expandedGroup === group_name ? null : group_name);
    };

    const groupedVideos = videos.reduce((groups, video) => {
        if (!groups[video.group_name]) {
            groups[video.group_name] = [];
        }
        groups[video.group_name].push(video);
        return groups;
    }, {});


    const formatVideoLength = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} hours ${remainingMinutes} minutes`;
    };
    

    return (
        <>
            <Header title={courseDetails ? courseDetails.title : 'Loading...'} pageHeaderStyle={{ marginBottom: 16 }} />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.coursesCardsWrapper} showsVerticalScrollIndicator={false}>
                    {selectedVideoUrl && (
                        <WebView
                            style={styles.webView}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{ uri: selectedVideoUrl }}
                        />
                    )}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
                            onPress={() => setActiveTab('overview')}
                        >
                            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'asset' && styles.activeTab]}
                            onPress={() => setActiveTab('asset')}
                        >
                            <Text style={[styles.tabText, activeTab === 'asset' && styles.activeTabText]}>Assets</Text>
                        </TouchableOpacity>
                    </View>
                    {activeTab === 'overview' ? (
                        <ScrollView>
                            <Text style={styles.title}>Description</Text>
                            <RenderHtml
                                contentWidth={width}
                                source={{ html: courseDetails.overview || '' }}
                            />
                        </ScrollView>
                    ) : (
                        <ScrollView style={styles.Assets}>
                            <Text style={styles.title}>Assets</Text>
                            {assets.map((asset) => (
                                <View key={asset.id} style={styles.assetContainer}>
                                    <Text style={styles.assetName}>{asset.lecture_name}</Text>
                                    <TouchableOpacity onPress={() => handleDownload(asset.lecture_file)}>
                                        <Icon name="download" size={20} color="blue" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                    {Object.keys(groupedVideos).map((group_name, index) => (
                        <View key={group_name}>
                            <TouchableOpacity onPress={() => toggleAccordion(group_name)}>
                                <Text style={[styles.videoTitle, { marginBottom: 8 ,justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
                                    {group_name} {expandedGroup === group_name ? '-' : '+'}
                                </Text>
                            </TouchableOpacity>
                            {expandedGroup === group_name && (
                                <View>
                                    {groupedVideos[group_name].map((video) => (
                                        <TouchableOpacity key={video.id} onPress={() => setSelectedVideoUrl(video.video)}>
                                            <View style={styles.videoContainer}>
                                                <Text style={styles.videoTitle1}>{video.title} {formatVideoLength(video.video_length)}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
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
        marginTop: 8,
    },
    videoTitle1:{
        fontSize:16,
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
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    activeTabText: {
        color: '#ff5d5d',
        textDecorationLine: 'underline',
    },
    tabText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    Assets: {
        marginBottom: 20,
    },
    assetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    assetName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    assetLink: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
