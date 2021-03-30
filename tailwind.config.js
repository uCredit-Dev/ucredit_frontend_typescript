module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        year: "320px",
        courselist: "1400px",
        courebars: "301px",
        yearheading: "200px",
        semesterheading: "175px",
        infocard: "350px",
        plancardinput: "250px",
        planchoose: "274px",
      },
      height: {
        courebars: "1100px",
        header: "65px",
        yearheading: "42px",
      },
      margin: {
        content: "100px",
      },
      colors: {
        primary: "#489784",
        secondary: "#63D2B8",
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
