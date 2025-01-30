/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#2A5C82',
          secondary: '#5C9CE5',
          accent: '#FF6B6B',
        },
      },
    },
    plugins: [],
  }