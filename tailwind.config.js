module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        yearMin: "250px",
        narrowest: "710px",
        planAdd: "360px",
      },
      maxWidth: {
        courseCard: "50%",
        yearheading: "240px",
      },
      minHeight: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        addSVG: "12rem",
        full: "100%",
      },
      maxHeight: { mobileSearch: "75vh" },
      width: {
        year: "320px",
        courselist: "1400px",
        coursebars: "315px",
        yearheading: "16%",
        semesterheading: "18%",
        infocard: "350px",
        plancardinput: "205px",
        planselect: "200px",
        planchoose: "250px",
        loginPage: "520px",
      },
      height: {
        coursebars: "600px",
        header: "65px",
        yearheading: "32px",
        yearheading1: "31px",
        criteria: "300px",
        selectbox: "38px",
      },
      margin: {
        content: "80px",
      },
      inset: {
        blurr: "509px",
        blurrsm: "317px",
      },
      colors: {
        primary: "#3168AF",
        secondary: "#5D90D3",
        background: "#f0f2f5",
        emphasis: "#fad4f5",
      },
      backgroundColor: {
        gray: {
          semester: "#D4D4D4",
          year: "#DEDEDE",
          courselist: "#ECECEC",
          coursebars: "E9E9E9",
          coursecard: "#C4C4C4",
        },
      },
      borderColor: {
        gray: {
          semester: "#BEBEBE",
          year: "#D4D4D4",
        },
        theme: "#3168AF",
      },
      fontSize: {
        myplan: ["2rem"],
        infocard: [
          "1.125rem",
          {
            lineHeight: "1.313rem",
          },
        ],
        coursecard: [
          "0.9rem",
          {
            lineHeight: "1rem",
          },
        ],
      },
      screens: {
        medium: "1500px",
        tight: { max: "1200px" },
        thin: { max: "820px" },
        narrow: { max: "710px" },
      },
      scale: {
        0: "0",
        25: ".25",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        101: "1.01",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        200: "2",
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
        gold: theme("colors.yellow.400"),
        red: theme("colors.red.500"),
        green: theme("colors.green.500"),
        blue: theme("colors.blue.500"),
        gray: theme("colors.gray.500"),
        white: theme("colors.white"),
      }),
    },
  },
  variants: {
    extend: {
      display: ["hover"],
      transitionProperty: ["hover", "group-hover"],
      transitionDuration: ["hover", "group-hover", "active"],
      transitionTimingFunction: ["hover", "group-hover"],
      borderStyle: ["hover"],
      borderWidth: ["hover", "focus"],
      margin: ["hover"],
      fill: ["hover"],
    },
  },
  plugins: [],
};
