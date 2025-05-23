/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#030014',
        secondary: '#151312',
        ratingBox: '#221F3D',
        searchBar: '#0F0D23',
        text: '#9CA4AB',
        darkAccent: '#AB8BFF',
        accentText: '#A8B5DB',
        secondaryText: '#D6C7FF',
      },
      fontFamily: {
        smRegular: ['smRegular'],
      },
    },
  },
  plugins: [],
};
