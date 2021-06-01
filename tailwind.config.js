module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: { primary: ['Brown', 'sans-serif'] },
    colors: {
      primary: '#252D48',
      primaryl: '#4f5674',
      secondary: '#822829',
      tertiary: '#D0841C',
      quaternary: '#9B9B9B',
      neutral: '#FFFFFF',
      transparent: 'transparent',
      table: '#DA716B',
      dark: '#000000',
      background: '#F5F5F5',
      bgSecondary: '#FAFAFA',
      tableBody: '#D1D5DB',
      start: '#CE423B',
      startl: '#ff7466',
      input: '#d9d9d9',
      subTitle: '#3E3E3E',
      divider: '#E8E8E8',
      thumb: '#B2B2B2',
      magenta: '#FF00FF',
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
      stop: '#8C2B2D',
      stopl: '#c15956',
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
