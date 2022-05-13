const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in'
      }
    },
    fontFamily: {
      display: ['Oswald'],
      body: ['"Open Sans"']
    },
    colors: {
      transparent: 'transparent',
      blue: '#1E40AF',
      black: colors.black,
      white: colors.white,
      'light-gray': '#E5E7EB',
      gray: '#9CA3AF',
      'dark-gray': '#6B7280',
      'light-green': '#00CC00',
      green: '#00AA00',
      'dark-green': '#009900',
      red: '#FF0000',
      'dark-red': '#DD0000',
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')]
}
