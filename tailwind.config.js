const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors :{
        PrimaryBg : colors.slate[50],
        secondaryBg : colors.white,
        cardBg : colors.slate[100],
        primaryText : colors.black,
        secondaryText : colors.gray[400],
        disabledText : colors.white,
        btnText : colors.white,
        primaryBtn : colors.green[400],
        secondaryBtn : colors.slate[100],
        bgHover : colors.slate[200],
        selected : colors.green[200],
        disabledBtn : colors.green[200],
        deleteBtn : colors.red[500],
        borderColor : colors.gray[200],
        secondaryBorderColor : colors.slate[300],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
