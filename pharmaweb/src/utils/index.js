export const formatUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const showToast = (toast, message, options) => {
    toast(message, options);
};
