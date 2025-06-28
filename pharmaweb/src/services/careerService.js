import httpClient from '../auth/httpClient';

const careerService = {
    apply: (data) =>
        httpClient.post('/api/CVSubmission/submit', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
};

export default careerService;
