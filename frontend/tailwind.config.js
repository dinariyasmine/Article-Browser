/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Specify the files to be scanned for classes
  ],
  theme: {
    extend: {
      colors: {
        'grey': {
            DEFAULT: '#CED9E1',
        },
        'darkBlue': {
            DEFAULT: '#102B3E'
        },
        'lightBlue': {
            DEFAULT: '#3AC6EB'
        },
        'pink': {
            DEFAULT: '#EE4A6A'
        },
    },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        'montserrat-regular': 400, 
        'montserrat-bold': 700,  
      },
    },
  },
  plugins: [],
};
