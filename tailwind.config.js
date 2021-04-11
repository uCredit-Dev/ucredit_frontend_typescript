module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        year: "320px",
        courselist: "1400px",
        courebars: "301px",
        yearheading: "240px",
        semesterheading: "175px",
        infocard: "350px",
        plancardinput: "250px",
        planchoose: "274px",
      },
      height: {
        coursebars: "600px",
        header: "65px",
        yearheading: "42px",
      },
      margin: {
        content: "100px",
      },
      inset: {
        blurr: "509px",
        blurrsm: "317px",
      },
      colors: {
        primary: "#489784",
        secondary: "#63D2B8",
        background: "#f0f2f5",
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
      },
      fontSize: {
        myplan: [
          "2.25rem",
          {
            lineHeight: "2.625rem",
          },
        ],
        infocard: [
          "1.125rem",
          {
            lineHeight: "1.313rem",
          },
        ],
        coursecard: [
          "0.9rem",
          {
            lineHeight: "1.2rem",
          },
        ],
      },
      screens: {
        medium: "1500px",
        tight: { max: "1200px" },
        thin: { max: "820px" },
        narrow: { max: "710px" },
      },
      minWidth: {
        narrowest: "710px",
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
    },
  },
  variants: {
    extend: {
      display: ["hover"],
      transitionProperty: ["hover", "group-hover"],
      transitionDuration: ["hover", "group-hover", "active"],
      transitionTimingFunction: ["hover", "group-hover"],
    },
  },
  plugins: [],
};
