import httpClient from '../auth/httpClient';

const quoteService = {
    getFeedback: () => httpClient.get('/api/Feedbacks/public'),
    createFeedback: (data) => httpClient.post('/api/Feedbacks', data),
};

export default quoteService;
