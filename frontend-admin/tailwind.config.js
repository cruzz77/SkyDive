/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0ea5e9', // Sky blue
                secondary: '#6366f1', // Indigo
                accent: '#f43f5e', // Rose
                dark: '#0f172a', // Slate 900
                light: '#f8fafc', // Slate 50
                admin: '#1e293b', // Slate 800
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
