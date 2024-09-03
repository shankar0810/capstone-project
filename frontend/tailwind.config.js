module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'blue-button': '#5995fd',
        'blue-button-hover': '#4d84e2',
      },
      backgroundImage: theme => ({
        'gradient-form': 'linear-gradient(-45deg, #4481eb 0%, #04befe 100%)',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}