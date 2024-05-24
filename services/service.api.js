import axios from 'axios';

const API_BASE_URL = 'https://codebinx.com/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// login
export const fetchData = async (email, password) => {
    const data = { email, password };

    try {
        const response = await api.post('users/signin-mobile', data);
        console.log('response', response);
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
        const response = await api.post('users/signup-mobile', data);
        console.log('response', response);
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; 
    }
};