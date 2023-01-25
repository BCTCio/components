const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './stories/*'],
  theme: {
    extend: {
      colors: {
        THEME: colors.blue,
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
};
