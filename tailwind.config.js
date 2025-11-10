/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      black: '#000000',
      Amethyst: '#866bd1',
      'Tropical-indigo': '#9376e6',
      'Tropical-indigo-2': '#a282fd',
      'Tropical-indigo-3': '#ad91fd',
      Mauve: '#b8a0fc',
      Periwinkle: '#cebefb',
      Seasalt: '#f9f9f9',
      white: '#ffffff',
    },
    fontFamily: {
      poppins: ['var(--font-poppins)'],
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      md: '1.125rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
      '4xl': '3.25rem',
      '5xl': '4.375rem',
    },
    fontWeight: {
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      'extra-bold': '800',
      black: '900',
    },
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
