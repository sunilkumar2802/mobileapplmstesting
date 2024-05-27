import axios from 'axios';
import { AsyncStorage } from 'react-native';

const API_BASE_URL = 'https://codebinx.com/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
 
const TOKEN_KEY = 'elarnivUsersToken';
const storeToken = async (token) => {
    try {
        // Store token using AsyncStorage for React Native or localStorage/sessionStorage for web
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error('Error storing token:', error);
    }
};

// Function to retrieve token from storage
const retrieveToken = async () => {
    try {
        // Retrieve token using AsyncStorage for React Native or localStorage/sessionStorage for web
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return token;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};
// login
export const fetchData = async (email, password) => {
    const data = { email, password };

    try {
        const response = await api.post('users/signin-mobile/', data); 
        const token = response.data.elarniv_users_token;
        console.log('response', token);
        await storeToken(token);;
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; 
    }
};
// signup
export const fetchDatasignup = async (first_name, email, password, mobile ) => {
    const data = { first_name, email, password, mobile  };

    try {
        const response = await api.post('users/signup-mobile/', data);
        console.log('response', response);
        const token = response.data.elarniv_users_token;
        await storeToken(token);
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; 
    }
};

//MY-Learnings
export const fetchLearnings = async () => {
    const elarnivUsersToken = await retrieveToken();
    if (!elarnivUsersToken) {
        throw new Error('User is not authenticated');
        console.log(' User is not authenticated');

    }

    try {
        const response = await api.get('learnings/', {
            headers: {
                'Authorization': `${elarnivUsersToken}`
            }
        });
        console.log('response', response);
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

//Course-Video
export const fetchCoursevideo = async (slug) => {
    console.log(slug);
    const elarnivUsersToken = await retrieveToken();
    if (!elarnivUsersToken) {
        throw new Error('User is not authenticated');
        console.log(' User is not authenticated');

    }

    try {
        const response = await api.get(`learnings/videos/${slug}/`, {
            headers: {
                'Authorization': `${elarnivUsersToken}`
            }
        });
        console.log('response', response);
        console.log('response response.data',response.data)
        return response.data.videos;
        
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const fetchCourseDetails = async (slug) => {
    console.log(slug);
    const elarnivUsersToken = await retrieveToken();
    if (!elarnivUsersToken) {
        throw new Error('User is not authenticated');
        console.log(' User is not authenticated');

    }

    try {
        const response = await api.get(`learnings/videos/${slug}/`, {
            headers: {
                'Authorization': `${elarnivUsersToken}`
            }
        });
        console.log('response', response);
        console.log('response response.data',response.data)
        return response.data.course;
        
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

