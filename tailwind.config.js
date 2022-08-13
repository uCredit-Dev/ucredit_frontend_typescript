module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'roadmap-pattern': "url('/img/roadmap_pattern.png')",
      },
      borderRadius: {
        curvy: '50% 150px',
      },
      minWidth: {
        yearMin: '250px',
        narrowest: '710px',
        planAdd: '360px',
      },
      maxWidth: {
        courseCard: '50%',
        yearheading: '240px',
      },
      minHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        addSVG: '12rem',
        full: '100%',
      },
      maxHeight: { mobileSearch: '75vh' },
      width: {
        year: '320px',
        courselist: '1400px',
        coursebars: '315px',
        yearheading: '16%',
        semesterheading: '18%',
        infocard: '350px',
        plancardinput: '205px',
        planselect: '200px',
        planchoose: '250px',
        loginPage: '520px',
      },
      height: {
        coursebars: '600px',
        header: '65px',
        yearheading: '32px',
        yearheading1: '31px',
        criteria: '300px',
        selectbox: '38px',
      },
      margin: {
        content: '80px',
      },
      inset: {
        blurr: '509px',
        blurrsm: '317px',
      },
      colors: {
        primary: 'skyblue',
        secondary: '#5395D2',
        testing3: '#f4c2c2', //M tried
        H: '#FFDBDB',
        N: '#FFE0CB',
        S: '#FFF9A3',
        Q: '#D1FFCD',
        E: '#BFE8FF',
        W: '#D0D0FF',
        background: '#83B9FF',
        emphasis: '#fad4f5',
        blue: {
          header: '#C6E8FF',
          footer: '#0C3A76',
          tag: '#83B9FF',
        },
        green: {
          tag: '#D1FDCD',
        },
        red: {
          tag: '#FFDBDB',
        },
        yellow: {
          tag: '#FFF9A3',
        },
        name: '#38596C',
        slogan: '#4851AA',
        // gray: '#5F5F5F',
      },
      backgroundColor: {
        gray: {
          semester: '#D4D4D4',
          year: '#DEDEDE',
          courselist: '#ECECEC',
          coursebars: 'E9E9E9',
          coursecard: '#C4C4C4',
        },
      },
      borderColor: {
        gray: {
          semester: '#BEBEBE',
          year: '#D4D4D4',
        },
        theme: '#3168AF',
      },
      fontFamily: {
        landingPage: ['Futura'],
      },
      boxShadow: {
        // eslint-disable-next-line no-multi-str
        card: '12px 0px 10px -15px rgba(31, 73, 125, 0.8), \
        -12px 0 10px -15px rgba(31, 73, 125, 0.8), \
        0px 12px 10px -15px rgba(31, 73, 125, 0.8), \
        0px -12px 10px -15px rgba(31, 73, 125, 0.8)',
      },
      fontSize: {
        myplan: ['2rem'],
        infocard: [
          '1.125rem',
          {
            lineHeight: '1.313rem',
          },
        ],
        coursecard: [
          '0.9rem',
          {
            lineHeight: '1rem',
          },
        ],
      },
      screens: {
        ml: '850px',
        monitor: '1300px',
        xxxl: '2000px',
        medium: '1500px',
        tight: { max: '1200px' },
        thin: { max: '820px' },
        narrow: { max: '710px' },
        tablet: { min: '800px', max: '1200px' },
        smTablet: { max: '800px' },
        smMobile: '500px',
      },
      scale: {
        0: '0',
        25: '.25',
        50: '.5',
        75: '.75',
        90: '.9',
        95: '.95',
        100: '1',
        101: '1.01',
        105: '1.05',
        110: '1.1',
        125: '1.25',
        150: '1.5',
        200: '2',
      },
      keyframes: {
        fadeOut: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
      },
      fill: (theme) => ({
        gold: theme('colors.yellow.400'),
        red: theme('colors.red.500'),
        green: theme('colors.green.500'),
        blue: theme('colors.blue.500'),
        gray: theme('colors.gray.500'),
        white: theme('colors.white'),
      }),
    },
  },
  variants: {
    extend: {
      display: ['hover'],
      transitionProperty: ['hover', 'group-hover'],
      transitionDuration: ['hover', 'group-hover', 'active'],
      transitionTimingFunction: ['hover', 'group-hover'],
      borderStyle: ['hover'],
      borderWidth: ['hover', 'focus'],
      margin: ['hover'],
      fill: ['hover'],
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
    },
  ],
};
