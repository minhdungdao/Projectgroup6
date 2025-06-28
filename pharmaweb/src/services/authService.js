import httpClient from '../auth/httpClient';

const authService = {
    login: (data) => httpClient.post('/api/Candidates/login', data),
    register: (data) =>
        httpClient.post('/api/Candidates/register', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
};

export default authService;
