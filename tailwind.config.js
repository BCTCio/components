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
  plugins: [require('@tailwindcss/forms')],
};
