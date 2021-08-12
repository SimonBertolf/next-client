module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: { primary: ['Brown', 'sans-serif'] },
    colors: {
      primary: {
        100: '#CE423B',
        200: '#8C2B2D',
        300: '#d76762',
        400: '#a35557',
      },
      secondary: { 100: '#28304D', 200: '#4F5674' },
      common: {
        100: '#fafafa', // light backgroun
        200: '#f5f5f5', // darker background
        300: '#f0f0f0', // table hover
        400: '#D9D9D9', // all kind of dividers
        500: '#939393', // higlighting
      },
      black: '#000000',
      white: '#ffffff',
      transparent: 'transparent',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      '2xl': '1.1rem',
      '3xl': '1.25rem',
      '4xl': '1.5rem',
    },
    gradientColorStops: (theme) => ({
      ...theme('colors'),
    }),
    extend: {
      spacing: {
        48: '200px',
        140: '140px',
      },
      zIndex: { '-10': '-10' },
    },
  },
  variants: {
    padding: ['responsive', 'hover'],
    scrollbar: ['rounded'],
    extend: {
      width: ['hover', 'focus'],
      borderColor: ['hover', 'focus', 'active'],
      textColor: ['active'],
      overflow: ['hover'],
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwind-scrollbar'),
  ],
};
