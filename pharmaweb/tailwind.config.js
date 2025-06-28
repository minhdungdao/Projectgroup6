/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    important: true,
    theme: {
        extend: {
            backgroundImage: {
                'gradient-main': 'linear-gradient(90deg, rgba(21, 228, 253, 0.9) 0%, rgba(36, 76, 253, 0.9) 100%)',
            },
        },
    },
    plugins: [],
};
